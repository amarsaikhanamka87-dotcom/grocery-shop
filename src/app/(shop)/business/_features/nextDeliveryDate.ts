/** Next date (today or later) that falls on `dayOfMonth`, formatted "2026.12.05". */
export function nextDeliveryDate(dayOfMonth: number, today = new Date()): string {
  const d = new Date(today.getFullYear(), today.getMonth(), dayOfMonth);
  if (d < new Date(today.getFullYear(), today.getMonth(), today.getDate())) d.setMonth(d.getMonth() + 1);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
}
