import { ubRecentDays } from "@/lib/date/ubRecentDays";
import { formatDayMn } from "@/lib/format/formatDayMn";

type HandOver = { deliveryDate: Date | null; deliverySlot: string };
export type HandOverGroup<T> = { key: string; title: string; orders: T[] };

const DAY_MS = 24 * 60 * 60 * 1000;
const isTimeSlot = (slot: string) => /^\d{2}:\d{2}–\d{2}:\d{2}$/.test(slot);

/**
 * Splits the (already sorted) list into the day + time slot the goods go out, the way the owner
 * works: "Маргааш, 11-р сарын 26 · 06:00–09:00". Old orders without a date go under "Огноогүй".
 */
export function groupOrdersByHandOverDay<T extends HandOver>(orders: T[], now: Date = new Date()): HandOverGroup<T>[] {
  const [today] = ubRecentDays(1, now);
  const todayMs = Date.parse(`${today.key}T00:00:00Z`);
  const keyOf = (ms: number) => new Date(ms).toISOString().slice(0, 10);
  const near: Record<string, string> = {
    [today.key]: "Өнөөдөр",
    [keyOf(todayMs + DAY_MS)]: "Маргааш",
    [keyOf(todayMs - DAY_MS)]: "Өчигдөр",
  };
  const groups: HandOverGroup<T>[] = [];
  for (const order of orders) {
    const dayKey = order.deliveryDate?.toISOString().slice(0, 10) ?? "";
    const key = `${dayKey}|${order.deliverySlot}`;
    const last = groups.at(-1);
    if (last?.key === key) {
      last.orders.push(order);
      continue;
    }
    const day = dayKey ? [near[dayKey], formatDayMn(order.deliveryDate)].filter(Boolean).join(", ") : "Огноогүй";
    const slot = isTimeSlot(order.deliverySlot) ? ` · ${order.deliverySlot}` : "";
    groups.push({ key, title: `${day}${slot}`, orders: [order] });
  }
  return groups;
}
