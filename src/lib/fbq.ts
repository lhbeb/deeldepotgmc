/**
 * Safe wrapper around `fbq()` — no-ops silently if the pixel hasn't loaded yet
 * (e.g. ad blockers, SSR, or script not yet evaluated).
 */
export function trackEvent(
  event: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
    (window as any).fbq("track", event, params ?? {});
  }
}
