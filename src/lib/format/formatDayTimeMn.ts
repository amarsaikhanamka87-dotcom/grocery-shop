const fmt = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Ulaanbaatar",
  month: "numeric",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/** A moment in Ulaanbaatar time in the one admin date format: "11-р сарын 25, 09:47". */
export function formatDayTimeMn(date: Date): string {
  const p = Object.fromEntries(fmt.formatToParts(date).map((x) => [x.type, x.value]));
  return `${p.month}-р сарын ${p.day}, ${p.hour}:${p.minute}`;
}
