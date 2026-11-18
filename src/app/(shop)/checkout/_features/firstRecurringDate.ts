import { toIsoDate } from "./toIsoDate";

/** First delivery of a "Давтамжит" plan: the start date, or the next day after it that is one of `days`. */
export function firstRecurringDate(start: string, days: number[]): string {
  const d = new Date(`${start}T00:00`);
  for (let i = 0; i < 7 && !days.includes(d.getDay()); i++) d.setDate(d.getDate() + 1);
  return toIsoDate(d);
}
