import { EXPRESS_FROM_HOUR, EXPRESS_MINUTES, EXPRESS_UNTIL_HOUR } from "@/lib/constants";

const hhmm = (d: Date) => `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

/**
 * Today's "Шуурхай" window, e.g. 12:40–13:40 (start rounded up to 10 minutes),
 * or null outside express hours.
 */
export function expressWindow(now: Date): { day: Date; from: string; to: string } | null {
  const start = new Date(now);
  start.setSeconds(0, 0);
  start.setMinutes(Math.ceil(start.getMinutes() / 10) * 10);
  const end = new Date(start.getTime() + EXPRESS_MINUTES * 60_000);
  if (start.getHours() < EXPRESS_FROM_HOUR) return null;
  const endLimit = new Date(now);
  endLimit.setHours(EXPRESS_UNTIL_HOUR, 0, 0, 0);
  if (end > endLimit) return null;
  return { day: start, from: hhmm(start), to: hhmm(end) };
}
