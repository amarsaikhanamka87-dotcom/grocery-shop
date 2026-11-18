import { toIsoDate } from "./toIsoDate";

export type CalendarCell = { iso: string; day: number; inMonth: boolean };

/** Monday-first weeks covering `month` (0–11) of `year`, padded with the days around it. */
export function monthGrid(year: number, month: number): CalendarCell[] {
  const first = new Date(year, month, 1);
  const lead = (first.getDay() + 6) % 7; // days before the 1st since Monday
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const total = Math.ceil((lead + daysInMonth) / 7) * 7;
  return Array.from({ length: total }, (_, i) => {
    const d = new Date(year, month, 1 - lead + i);
    return { iso: toIsoDate(d), day: d.getDate(), inMonth: d.getMonth() === month };
  });
}
