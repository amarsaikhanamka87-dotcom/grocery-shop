import { buildUbDay, type UbDay } from "@/lib/date/buildUbDay";
import { ubDayFromKey } from "@/lib/date/ubDayFromKey";

const DAY_MS = 24 * 60 * 60 * 1000;

export type DashboardDay = {
  day: UbDay;
  isToday: boolean;
  /** ?day= was given but is not a real past day, so today is shown instead (the page says so). */
  isFallback: boolean;
  previousKey: string;
  /** null on today: there is no later day to step to. */
  nextKey: string | null;
};

/** The dashboard's day from ?day= (any real day up to today), plus the keys for the ‹ › arrows. */
export function resolveDashboardDay(dayParam: string | undefined, today: UbDay): DashboardDay {
  const asked = ubDayFromKey(dayParam);
  const day = asked && asked.key <= today.key ? asked : today;
  const midnight = Date.parse(`${day.key}T00:00:00Z`);
  return {
    day,
    isToday: day.key === today.key,
    isFallback: Boolean(dayParam) && day.key !== dayParam,
    previousKey: buildUbDay(new Date(midnight - DAY_MS)).key,
    nextKey: day.key === today.key ? null : buildUbDay(new Date(midnight + DAY_MS)).key,
  };
}
