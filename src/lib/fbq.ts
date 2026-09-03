import { trackPixelEvent } from "@/lib/pixel";

/** Backwards-compatible event helper used by the EK6 product experience. */
export function trackEvent(
  event: string,
  params?: Record<string, unknown>,
): void {
  trackPixelEvent(event, params);
}
