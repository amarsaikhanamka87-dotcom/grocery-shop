import { ubRecentDays } from "@/lib/date/ubRecentDays";

type Issued = { createdAt: Date; order: { total: number } };
export type ReceiptDayGroup<T> = { key: string; title: string; total: number; receipts: T[] };

// Mongolia is UTC+8 all year (no daylight saving).
const UB_OFFSET_MS = 8 * 60 * 60 * 1000;

/**
 * Splits the (newest-first) receipts into the Ulaanbaatar days they were issued, each with its
 * money: "Өнөөдөр, 11-р сарын 25 · 3 баримт · 12,400₮". Used for week / month / year periods.
 */
export function groupReceiptsByDay<T extends Issued>(receipts: T[], now: Date = new Date()): ReceiptDayGroup<T>[] {
  const [today, yesterday] = ubRecentDays(2, now);
  const groups: ReceiptDayGroup<T>[] = [];
  for (const receipt of receipts) {
    const ub = new Date(receipt.createdAt.getTime() + UB_OFFSET_MS);
    const key = ub.toISOString().slice(0, 10);
    const last = groups.at(-1);
    if (last?.key === key) {
      last.receipts.push(receipt);
      last.total += receipt.order.total;
      continue;
    }
    const near = key === today.key ? "Өнөөдөр, " : key === yesterday.key ? "Өчигдөр, " : "";
    const title = `${near}${ub.getUTCMonth() + 1}-р сарын ${ub.getUTCDate()}`;
    groups.push({ key, title, total: receipt.order.total, receipts: [receipt] });
  }
  return groups;
}
