/** A calendar day (a `@db.Date`, stored at UTC midnight) as "11-р сарын 25"; "" when missing. */
export function formatDayMn(date: Date | null | undefined): string {
  if (!date) return "";
  return `${date.getUTCMonth() + 1}-р сарын ${date.getUTCDate()}`;
}
