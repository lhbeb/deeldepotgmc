const META_CAPI_ENDPOINT = "/api/meta/conversions";

export type MetaPixelEvent = "PageView" | "AddToCart" | "InitiateCheckout" | "Purchase";

function createEventId(eventName: MetaPixelEvent): string {
  const randomPart =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  return `${eventName}-${randomPart}`;
}

/**
 * Fires matching browser Pixel and server Conversions API events. Meta uses the
 * shared event ID to deduplicate the two copies into one conversion.
 */
export function trackPixelEvent(
  eventName: MetaPixelEvent,
  params?: Record<string, any>,
  maxRetries = 20
): void {
  if (typeof window === "undefined") return;

  const eventId = createEventId(eventName);
  let attempts = 0;

  const attempt = () => {
    if ((window as any).fbq) {
      if (params) {
        (window as any).fbq("track", eventName, params, { eventID: eventId });
      } else {
        (window as any).fbq("track", eventName, {}, { eventID: eventId });
      }
    } else if (attempts < maxRetries) {
      attempts++;
      setTimeout(attempt, 100); // retry every 100ms, up to 2 seconds
    }
  };

  attempt();

  // The access token stays on the server; this request contains only event data.
  void fetch(META_CAPI_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventName,
      eventId,
      eventSourceUrl: window.location.href,
      customData: params ?? {},
    }),
    keepalive: true,
  }).catch(() => {
    // Analytics must never interrupt the shopping flow.
  });
}
