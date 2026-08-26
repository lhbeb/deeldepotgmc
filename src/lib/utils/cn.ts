/**
 * Joins class names, skipping falsy values. Keeps Tailwind-friendly patterns without extra deps.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
