import { ubRecentDays } from "@/lib/date/ubRecentDays";

type Dated = { createdAt: Date };
export type OrderDayGroup<T> = { key: string; title: string; orders: T[] };

// Mongolia is UTC+8 all year (no daylight saving).
const UB_OFFSET_MS = 8 * 60 * 60 * 1000;

/**
 * Splits the (newest-first) order list into Ulaanbaatar days by when the order was placed, so
 * the owner sees "Өнөөдөр", "Өчигдөр", then "11-р сарын 22" headings instead of reading dates.
 */
export function groupOrdersByDay<T extends Dated>(orders: T[], now: Date = new Date()): OrderDayGroup<T>[] {
  const [today, yesterday] = ubRecentDays(2, now);
  const groups: OrderDayGroup<T>[] = [];
  for (const order of orders) {
    const ub = new Date(order.createdAt.getTime() + UB_OFFSET_MS);
    const key = ub.toISOString().slice(0, 10);
    const last = groups.at(-1);
    if (last?.key === key) {
      last.orders.push(order);
      continue;
    }
    const title =
      key === today.key ? "Өнөөдөр" : key === yesterday.key ? "Өчигдөр" : `${ub.getUTCMonth() + 1}-р сарын ${ub.getUTCDate()}`;
    groups.push({ key, title, orders: [order] });
  }
  return groups;
}
