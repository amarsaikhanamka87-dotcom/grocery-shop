import { WEEKDAY_OPTIONS } from "@/lib/orders/weekdayOptions";

// Mongolia is UTC+8 all year (no daylight saving).
const UB_OFFSET_MS = 8 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

export type UbDay = {
  key: string; // "2026-11-23", used in the URL (?day=)
  label: string; // "11/23" (short)
  longLabel: string; // "11-р сарын 23" (headings)
  weekday: string; // "Даваа"
  start: Date; // the day's UB midnight as a real UTC Date
  end: Date; // next UB midnight
};

const pad = (n: number) => String(n).padStart(2, "0");

/** One Ulaanbaatar calendar day, from that day's date at UTC midnight (e.g. Date.UTC(2026, 10, 23)). */
export function buildUbDay(dayAtUtcMidnight: Date): UbDay {
  const month = dayAtUtcMidnight.getUTCMonth() + 1;
  const date = dayAtUtcMidnight.getUTCDate();
  const start = new Date(dayAtUtcMidnight.getTime() - UB_OFFSET_MS);
  return {
    key: `${dayAtUtcMidnight.getUTCFullYear()}-${pad(month)}-${pad(date)}`,
    label: `${month}/${pad(date)}`,
    longLabel: `${month}-р сарын ${date}`,
    weekday: WEEKDAY_OPTIONS.find((w) => w.value === dayAtUtcMidnight.getUTCDay())?.label ?? "",
    start,
    end: new Date(start.getTime() + DAY_MS),
  };
}
