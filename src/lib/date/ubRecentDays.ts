import { WEEKDAY_OPTIONS } from "@/lib/orders/weekdayOptions";

// Mongolia is UTC+8 all year (no daylight saving).
const UB_OFFSET_MS = 8 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

export type UbDay = {
  key: string; // "2026-11-23", used in the URL (?day=)
  label: string; // "11:23"
  weekday: string; // "Даваа"
  start: Date; // the day's UB midnight as a real UTC Date
  end: Date; // next UB midnight
};

const pad = (n: number) => String(n).padStart(2, "0");

/** The last `count` days in Ulaanbaatar time, today first. */
export function ubRecentDays(count: number, now: Date = new Date()): UbDay[] {
  const ubNow = new Date(now.getTime() + UB_OFFSET_MS);
  const todayMidnight = Date.UTC(ubNow.getUTCFullYear(), ubNow.getUTCMonth(), ubNow.getUTCDate());
  return Array.from({ length: count }, (_, i) => {
    const day = new Date(todayMidnight - i * DAY_MS);
    const month = day.getUTCMonth() + 1;
    const date = day.getUTCDate();
    const start = new Date(day.getTime() - UB_OFFSET_MS);
    return {
      key: `${day.getUTCFullYear()}-${pad(month)}-${pad(date)}`,
      label: `${month}:${pad(date)}`,
      weekday: WEEKDAY_OPTIONS.find((w) => w.value === day.getUTCDay())?.label ?? "",
      start,
      end: new Date(start.getTime() + DAY_MS),
    };
  });
}
