import type { UbDay } from "@/lib/date/buildUbDay";
import { ubDayFromKey } from "@/lib/date/ubDayFromKey";
import type { Period, PeriodKind } from "@/types/period";

const DAY_MS = 24 * 60 * 60 * 1000;
// Mongolia is UTC+8 all year (no daylight saving).
const UB_OFFSET_MS = 8 * 60 * 60 * 1000;
const KINDS: PeriodKind[] = ["day", "week", "month", "year"];
const NOW_TITLE: Record<PeriodKind, string> = { day: "Өнөөдөр", week: "Энэ 7 хоног", month: "Энэ сар", year: "Энэ жил" };

const keyOf = (ms: number) => new Date(ms).toISOString().slice(0, 10);
const dayMn = (ms: number) => `${new Date(ms).getUTCMonth() + 1}-р сарын ${new Date(ms).getUTCDate()}`;

/** [first day, day after the last] of the period holding `dayMs`, both at UTC midnight. */
function bounds(kind: PeriodKind, dayMs: number): [number, number] {
  const d = new Date(dayMs);
  const [y, m] = [d.getUTCFullYear(), d.getUTCMonth()];
  if (kind === "week") {
    const monday = dayMs - ((d.getUTCDay() + 6) % 7) * DAY_MS;
    return [monday, monday + 7 * DAY_MS];
  }
  if (kind === "month") return [Date.UTC(y, m, 1), Date.UTC(y, m + 1, 1)];
  if (kind === "year") return [Date.UTC(y, 0, 1), Date.UTC(y + 1, 0, 1)];
  return [dayMs, dayMs + DAY_MS];
}

function pastLabel(kind: PeriodKind, from: number, to: number, weekday: string): string {
  const last = to - DAY_MS;
  if (kind === "day") return `${dayMn(from)}, ${weekday}`;
  if (kind === "week") {
    const sameMonth = new Date(from).getUTCMonth() === new Date(last).getUTCMonth();
    return `${dayMn(from)} – ${sameMonth ? new Date(last).getUTCDate() : dayMn(last)}`;
  }
  if (kind === "month") return `${new Date(from).getUTCFullYear()} оны ${new Date(from).getUTCMonth() + 1}-р сар`;
  return `${new Date(from).getUTCFullYear()} он`;
}

/**
 * The admin report period from ?period= and ?date= (any day up to today; the period is the
 * day / week / month / year holding it), with the ‹ › keys. Unknown values fall back to today.
 */
export function resolvePeriod(kindParam: string | undefined, dateParam: string | undefined, today: UbDay): Period {
  const kind = KINDS.find((k) => k === kindParam) ?? "day";
  const asked = ubDayFromKey(dateParam);
  const day = asked && asked.key <= today.key ? asked : today;
  const todayMs = Date.parse(`${today.key}T00:00:00Z`);
  const [from, to] = bounds(kind, Date.parse(`${day.key}T00:00:00Z`));
  const isCurrent = todayMs >= from && todayMs < to;
  const label = pastLabel(kind, from, to, day.weekday);
  return {
    kind,
    key: keyOf(from),
    start: new Date(from - UB_OFFSET_MS),
    end: new Date(to - UB_OFFSET_MS),
    title: isCurrent ? NOW_TITLE[kind] : kind === "day" ? dayMn(from) : label,
    label: isCurrent ? `${NOW_TITLE[kind]} · ${kind === "day" ? dayMn(from) : label}` : label,
    isCurrent,
    isFallback: Boolean(dateParam) && day.key !== dateParam,
    previousKey: keyOf(from - DAY_MS),
    nextKey: isCurrent ? null : keyOf(to),
  };
}
