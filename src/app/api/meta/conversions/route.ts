import { createHash, randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getRegionCode } from "@/lib/shipping";
import { getOrderById } from "@/lib/supabase/orders";
import { checkRateLimit, getClientIp } from "@/utils/rateLimit";

export const runtime = "nodejs";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1320756103302554";
const GRAPH_API_VERSION = process.env.META_GRAPH_API_VERSION || "v26.0";
const EXTERNAL_ID_COOKIE = "dd_meta_external_id";
const ALLOWED_EVENTS = new Set(["PageView", "AddToCart", "InitiateCheckout", "Purchase"]);

type EventBody = {
  eventName?: unknown;
  eventId?: unknown;
  eventSourceUrl?: unknown;
  customData?: unknown;
  orderId?: unknown;
};

type OrderMatchData = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  countryCode?: string;
};

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function normalizeText(value: unknown): string {
  return typeof value === "string"
    ? value.trim().toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "")
    : "";
}

function normalizeEmail(value: unknown): string {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function normalizePhone(value: unknown, countryCode: string): string {
  if (typeof value !== "string") return "";
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);

  const dialCodes: Record<string, string> = {
    US: "1", CA: "1", GB: "44", AU: "61", NZ: "64", FR: "33", DE: "49",
    IT: "39", NL: "31", PT: "351", ES: "34", PL: "48", AT: "43",
  };
  const dialCode = dialCodes[countryCode.toUpperCase()];
  if (dialCode && !digits.startsWith(dialCode)) {
    digits = `${dialCode}${digits.replace(/^0+/, "")}`;
  }
  return digits;
}

function splitName(value: unknown): { firstName: string; lastName: string } {
  if (typeof value !== "string") return { firstName: "", lastName: "" };
  const parts = value.trim().split(/\s+/).filter(Boolean);
  return { firstName: parts[0] || "", lastName: parts.length > 1 ? parts.slice(1).join(" ") : "" };
}

function parseRecord(value: unknown): Record<string, any> {
  if (value && typeof value === "object" && !Array.isArray(value)) return value as Record<string, any>;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
    } catch {
      return {};
    }
  }
  return {};
}

function cleanCustomData(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const input = value as Record<string, unknown>;
  const output: Record<string, unknown> = {};

  if (typeof input.value === "number" && Number.isFinite(input.value) && input.value >= 0) output.value = input.value;
  if (typeof input.currency === "string" && /^[A-Za-z]{3}$/.test(input.currency)) output.currency = input.currency.toUpperCase();
  if (typeof input.content_name === "string") output.content_name = input.content_name.slice(0, 500);
  if (typeof input.content_type === "string") output.content_type = input.content_type.slice(0, 100);
  if (typeof input.order_id === "string") output.order_id = input.order_id.slice(0, 200);
  if (typeof input.num_items === "number" && Number.isFinite(input.num_items)) output.num_items = Math.max(0, Math.floor(input.num_items));
  if (Array.isArray(input.content_ids)) {
    output.content_ids = input.content_ids
      .filter((id): id is string | number => typeof id === "string" || typeof id === "number")
      .slice(0, 100)
      .map(String);
  }
  return output;
}

function cleanEventSourceUrl(value: unknown): string | null {
  if (typeof value !== "string" || value.length > 2048) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function setExternalIdCookie(response: NextResponse, externalId: string): NextResponse {
  response.cookies.set(EXTERNAL_ID_COOKIE, externalId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365 * 2,
  });
  return response;
}

async function getOrderContext(orderId: unknown, eventName: string) {
  if (
    (eventName !== "InitiateCheckout" && eventName !== "Purchase") ||
    typeof orderId !== "string" ||
    !/^[0-9a-f-]{20,64}$/i.test(orderId)
  ) return null;

  const order = await getOrderById(orderId);
  if (!order) return null;
  const fullOrderData = parseRecord(order.full_order_data);
  const shippingData = parseRecord(fullOrderData.shippingData);
  const product = parseRecord(fullOrderData.product);
  const rawName = shippingData.fullName || (
    order.customer_name && order.customer_name !== order.customer_email && !order.customer_name.includes("@")
      ? order.customer_name
      : ""
  );
  const name = splitName(rawName);

  return {
    matchData: {
      email: order.customer_email || shippingData.email,
      phone: order.customer_phone || shippingData.phone,
      firstName: name.firstName,
      lastName: name.lastName,
      city: order.shipping_city || shippingData.city,
      state: order.shipping_state || shippingData.state,
      postalCode: order.shipping_zip || shippingData.zipCode,
      countryCode: order.shipping_country_code || shippingData.countryCode,
    } as OrderMatchData,
    customData: cleanCustomData({
      value: Number(order.product_price),
      currency: product.currency || "USD",
      content_ids: [order.product_slug],
      content_name: order.product_title,
      content_type: "product",
      num_items: Number(product.quantity) || 1,
      order_id: order.id,
    }),
  };
}

function addHashedMatchData(userData: Record<string, string | string[]>, matchData?: OrderMatchData): void {
  if (!matchData) return;
  const countryCode = String(matchData.countryCode || "").trim().toUpperCase();
  const normalizedState = countryCode && matchData.state
    ? normalizeText(getRegionCode(countryCode, matchData.state))
    : normalizeText(matchData.state);
  const matches: Array<[string, string, boolean]> = [
    ["em", normalizeEmail(matchData.email), true],
    ["ph", normalizePhone(matchData.phone, countryCode), true],
    ["fn", normalizeText(matchData.firstName), false],
    ["ln", normalizeText(matchData.lastName), false],
    ["ct", normalizeText(matchData.city), false],
    ["st", normalizedState, false],
    ["zp", normalizeText(matchData.postalCode), false],
    ["country", normalizeText(countryCode), false],
  ];
  for (const [key, value, asArray] of matches) {
    if (value) userData[key] = asArray ? [sha256(value)] : sha256(value);
  }
}

export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit(`meta-capi:${clientIp}`, { windowMs: 60_000, max: 120 });
  if (!rateLimit.success) return NextResponse.json({ error: "Too many events" }, { status: 429 });

  const accessToken = process.env.META_CONVERSIONS_API_TOKEN;
  if (!accessToken) return NextResponse.json({ error: "Meta CAPI is not configured" }, { status: 503 });

  let body: EventBody;
  try {
    body = (await request.json()) as EventBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventName = typeof body.eventName === "string" ? body.eventName : "";
  const eventId = typeof body.eventId === "string" ? body.eventId.slice(0, 200) : "";
  const eventSourceUrl = cleanEventSourceUrl(body.eventSourceUrl);
  if (!ALLOWED_EVENTS.has(eventName) || !eventId || !eventSourceUrl) {
    return NextResponse.json({ error: "Invalid event" }, { status: 400 });
  }

  const externalId = request.cookies.get(EXTERNAL_ID_COOKIE)?.value || randomUUID();
  const fbp = request.cookies.get("_fbp")?.value;
  const sourceUrl = new URL(eventSourceUrl);
  const fbclid = sourceUrl.searchParams.get("fbclid");
  const fbc = request.cookies.get("_fbc")?.value || (
    fbclid && /^[A-Za-z0-9_-]{1,500}$/.test(fbclid)
      ? `fb.1.${Date.now()}.${fbclid}`
      : undefined
  );
  const userAgent = request.headers.get("user-agent");
  const userData: Record<string, string | string[]> = {
    client_ip_address: clientIp,
    external_id: [sha256(externalId)],
  };
  if (userAgent) userData.client_user_agent = userAgent;
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;

  const orderContext = await getOrderContext(body.orderId, eventName);
  addHashedMatchData(userData, orderContext?.matchData);

  const payload: Record<string, unknown> = {
    data: [{
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      event_source_url: eventSourceUrl,
      action_source: "website",
      user_data: userData,
      custom_data: orderContext?.customData || cleanCustomData(body.customData),
    }],
    partner_agent: "deeldepot-nextjs-capi",
  };
  const testEventCode = process.env.META_TEST_EVENT_CODE;
  if (testEventCode) payload.test_event_code = testEventCode;

  try {
    const response = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/${PIXEL_ID}/events`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("Meta CAPI rejected an event", { eventName, status: response.status });
      return setExternalIdCookie(NextResponse.json({ error: "Meta rejected the event" }, { status: 502 }), externalId);
    }
    return setExternalIdCookie(NextResponse.json({ accepted: true }, { status: 202 }), externalId);
  } catch (error) {
    console.error("Meta CAPI request failed", {
      eventName,
      message: error instanceof Error ? error.message : "Unknown error",
    });
    return setExternalIdCookie(NextResponse.json({ error: "Meta request failed" }, { status: 502 }), externalId);
  }
}
