import "server-only";
import { prisma } from "@/lib/prisma";

type DayRange = { start: Date; end: Date };

export async function getDayMoney({ start, end }: DayRange) {
  const paid = await prisma.order.aggregate({
    where: { paymentStatus: "PAID", paidAt: { gte: start, lt: end } },
    _sum: { total: true },
    _count: true,
  });
  const income = paid._sum.total ?? 0;
  const expenses = 0;
  return {
    income,
    paidOrders: paid._count,
    expenses,
    balance: income - expenses,
  };
}
