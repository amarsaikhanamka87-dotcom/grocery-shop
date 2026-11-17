const fmt = new Intl.DateTimeFormat("mn-MN", {
  timeZone: "Asia/Ulaanbaatar",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/** Date + time in Ulaanbaatar time, e.g. "2026.11.17 13:47". */
export function formatDateTime(date: Date): string {
  const p = Object.fromEntries(fmt.formatToParts(date).map((x) => [x.type, x.value]));
  return `${p.year}.${p.month}.${p.day} ${p.hour}:${p.minute}`;
}
