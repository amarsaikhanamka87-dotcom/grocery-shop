import { buildUbDay, type UbDay } from "./buildUbDay";

export type { UbDay };

// Mongolia is UTC+8 all year (no daylight saving).
const UB_OFFSET_MS = 8 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

/** The last `count` days in Ulaanbaatar time, today first. */
export function ubRecentDays(count: number, now: Date = new Date()): UbDay[] {
  const ubNow = new Date(now.getTime() + UB_OFFSET_MS);
  const todayMidnight = Date.UTC(ubNow.getUTCFullYear(), ubNow.getUTCMonth(), ubNow.getUTCDate());
  return Array.from({ length: count }, (_, i) => buildUbDay(new Date(todayMidnight - i * DAY_MS)));
}
