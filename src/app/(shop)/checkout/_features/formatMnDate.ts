/** "2026-11-18" → "11-р сар 18, 2026". */
export function formatMnDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${m}-р сар ${d}, ${y}`;
}
