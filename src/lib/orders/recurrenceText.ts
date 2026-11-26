import type { Recurrence } from "@prisma/client";
import { RECURRENCE_LABEL } from "./recurrenceLabel";
import { WEEKDAY_OPTIONS } from "./weekdayOptions";

/** "7 хоног бүр · Даваа, Лхагва · 2026-11-18 – 2026-12-31" (dates as YYYY-MM-DD). */
export function recurrenceText(
  frequency: Recurrence,
  days: number[],
  start: string,
  end: string,
): string {
  const names = WEEKDAY_OPTIONS.filter((d) => days.includes(d.value)).map(
    (d) => d.label,
  );
  // Monthly + weekdays means the first such weekday of each month ("эхний Даваа").
  const dayText = frequency === "MONTHLY" ? names.map((n) => `эхний ${n}`).join(", ") : names.join(", ");
  return `${RECURRENCE_LABEL[frequency]} · ${dayText} · ${start} – ${end}`;
}
