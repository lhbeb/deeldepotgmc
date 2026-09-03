import { trackPixelEvent, type MetaPixelEvent } from "@/lib/pixel";

/** Backwards-compatible event helper used by the EK6 product experience. */
export function trackEvent(
  event: MetaPixelEvent,
  params?: Record<string, unknown>,
): void {
  trackPixelEvent(event, params);
}
