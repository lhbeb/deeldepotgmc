import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/utils/rateLimit";

export const runtime = "nodejs";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1320756103302554";
const GRAPH_API_VERSION = process.env.META_GRAPH_API_VERSION || "v26.0";
const ALLOWED_EVENTS = new Set([
  "PageView",
  "AddToCart",
  "InitiateCheckout",
  "Purchase",
]);

type EventBody = {
  eventName?: unknown;
  eventId?: unknown;
  eventSourceUrl?: unknown;
  customData?: unknown;
};

function cleanCustomData(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  const input = value as Record<string, unknown>;
  const output: Record<string, unknown> = {};

  if (typeof input.value === "number" && Number.isFinite(input.value) && input.value >= 0) {
    output.value = input.value;
  }
  if (typeof input.currency === "string" && /^[A-Za-z]{3}$/.test(input.currency)) {
    output.currency = input.currency.toUpperCase();
  }
  if (typeof input.content_name === "string") {
    output.content_name = input.content_name.slice(0, 500);
  }
  if (typeof input.content_type === "string") {
    output.content_type = input.content_type.slice(0, 100);
  }
  if (typeof input.order_id === "string") {
    output.order_id = input.order_id.slice(0, 200);
  }
  if (typeof input.num_items === "number" && Number.isFinite(input.num_items)) {
    output.num_items = Math.max(0, Math.floor(input.num_items));
  }
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

export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit(`meta-capi:${clientIp}`, {
    windowMs: 60_000,
    max: 120,
  });

  if (!rateLimit.success) {
    return NextResponse.json({ error: "Too many events" }, { status: 429 });
  }

  const accessToken = process.env.META_CONVERSIONS_API_TOKEN;
  if (!accessToken) {
    return NextResponse.json({ error: "Meta CAPI is not configured" }, { status: 503 });
  }

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

  const fbp = request.cookies.get("_fbp")?.value;
  const fbc = request.cookies.get("_fbc")?.value;
  const userAgent = request.headers.get("user-agent");
  const userData: Record<string, string> = { client_ip_address: clientIp };

  if (userAgent) userData.client_user_agent = userAgent;
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: eventSourceUrl,
        action_source: "website",
        user_data: userData,
        custom_data: cleanCustomData(body.customData),
      },
    ],
    partner_agent: "deeldepot-nextjs-capi",
  };

  const testEventCode = process.env.META_TEST_EVENT_CODE;
  if (testEventCode) payload.test_event_code = testEventCode;

  try {
    const response = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${PIXEL_ID}/events`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.error("Meta CAPI rejected an event", {
        eventName,
        status: response.status,
      });
      return NextResponse.json({ error: "Meta rejected the event" }, { status: 502 });
    }

    return NextResponse.json({ accepted: true }, { status: 202 });
  } catch (error) {
    console.error("Meta CAPI request failed", {
      eventName,
      message: error instanceof Error ? error.message : "Unknown error",
    });
    return NextResponse.json({ error: "Meta request failed" }, { status: 502 });
  }
}
