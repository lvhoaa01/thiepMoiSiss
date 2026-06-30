/**
 * Tiny className combiner — keeps conditional Tailwind classes readable
 * without pulling in clsx/tailwind-merge (the spec asks for a minimal bundle
 * and only the listed libraries).
 */
export type ClassValue = string | number | false | null | undefined;

export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
