/** Admin report periods: one day, a Monday–Sunday week, a calendar month, a calendar year. */
export type PeriodKind = "day" | "week" | "month" | "year";

export type Period = {
  kind: PeriodKind;
  /** First day of the period, "2026-11-23" (goes in the URL as ?date=). */
  key: string;
  /** Ulaanbaatar midnight at the start, and at the day after the end, as real UTC Dates. */
  start: Date;
  end: Date;
  /** Short heading word: "Өнөөдөр", "Энэ 7 хоног", or the dates for a past period. */
  title: string;
  /** Navigator text: "Өнөөдөр · 11-р сарын 25", "11-р сарын 23 – 29", "2026 оны 11-р сар". */
  label: string;
  /** The period holds today. */
  isCurrent: boolean;
  /** ?date= was given but not a real day up to today, so the current period is shown. */
  isFallback: boolean;
  previousKey: string;
  /** null for the current period: there is nothing later to step to. */
  nextKey: string | null;
};
