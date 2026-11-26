import "server-only";
import type { ReceiptEmailStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type Range = { start: Date; end: Date };

export type ReceiptPeriodSummary = {
  count: number;
  total: number;
  storeTotal: number;
  storeCount: number;
  byStatus: Record<ReceiptEmailStatus, number>;
};

/**
 * Totals for the receipts issued in a period (all of them, not just the 200 the list shows): how
 * many, their money split into online and Касс, and how many per e-mail status (for the tabs).
 */
export async function getReceiptPeriodSummary({ start, end }: Range): Promise<ReceiptPeriodSummary> {
  const issued = { receipt: { is: { createdAt: { gte: start, lt: end } } } };
  const [all, store, statuses] = await Promise.all([
    prisma.order.aggregate({ where: issued, _sum: { total: true }, _count: true }),
    prisma.order.aggregate({ where: { ...issued, deliveryType: "store" }, _sum: { total: true }, _count: true }),
    prisma.receipt.groupBy({ by: ["emailStatus"], where: { createdAt: { gte: start, lt: end } }, _count: true }),
  ]);
  const byStatus: Record<ReceiptEmailStatus, number> = { PENDING: 0, SENT: 0, SKIPPED: 0, FAILED: 0 };
  for (const row of statuses) byStatus[row.emailStatus] = row._count;
  return {
    count: all._count,
    total: all._sum.total ?? 0,
    storeTotal: store._sum.total ?? 0,
    storeCount: store._count,
    byStatus,
  };
}
