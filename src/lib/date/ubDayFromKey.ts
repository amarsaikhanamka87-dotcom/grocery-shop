import { buildUbDay, type UbDay } from "./buildUbDay";

const KEY = /^(\d{4})-(\d{2})-(\d{2})$/;

/** "2026-11-22" (from ?day=) → that Ulaanbaatar day; null when it isn't a real calendar date. */
export function ubDayFromKey(key: string | undefined): UbDay | null {
  const match = key ? KEY.exec(key) : null;
  if (!match) return null;
  const day = buildUbDay(new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]))));
  // Date.UTC rolls "2026-02-31" over to March; such a key is not a real day.
  return day.key === key ? day : null;
}
