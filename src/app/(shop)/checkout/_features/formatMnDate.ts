/** "2026-11-18" → "11-р сарын 18" (the date format used everywhere on the site). */
export function formatMnDate(iso: string): string {
  const [, m, d] = iso.split("-").map(Number);
  return `${m}-р сарын ${d}`;
}
