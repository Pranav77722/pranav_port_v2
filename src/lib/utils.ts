/**
 * Merge class names conditionally.
 * Filters out falsy values and joins with space.
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}
