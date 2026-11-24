import "server-only";
import { prisma } from "@/lib/prisma";

type DayRange = { start: Date; end: Date };

/** Admin POS: the in-store sales (deliveryType "store") paid on one Ulaanbaatar day. */
export async function getStoreDaySales({ start, end }: DayRange) {
  const sales = await prisma.order.aggregate({
    where: { deliveryType: "store", paymentStatus: "PAID", paidAt: { gte: start, lt: end } },
    _sum: { total: true },
    _count: true,
  });
  return { total: sales._sum.total ?? 0, count: sales._count };
}
