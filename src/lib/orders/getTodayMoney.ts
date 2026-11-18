import "server-only";
import { prisma } from "@/lib/prisma";

// Mongolia is UTC+8 all year (no daylight saving).
const UB_OFFSET_MS = 8 * 60 * 60 * 1000;

/**
 * Admin dashboard: today's (Ulaanbaatar day) income = total of orders paid today. Expenses have
 * no table yet, so they are 0 until that feature exists; balance = income − expenses.
 */
export async function getTodayMoney() {
  const ubNow = new Date(Date.now() + UB_OFFSET_MS);
  const start = new Date(Date.UTC(ubNow.getUTCFullYear(), ubNow.getUTCMonth(), ubNow.getUTCDate()) - UB_OFFSET_MS);
  const paid = await prisma.order.aggregate({
    where: { paymentStatus: "PAID", paidAt: { gte: start } },
    _sum: { total: true },
    _count: true,
  });
  const income = paid._sum.total ?? 0;
  const expenses = 0;
  return { income, paidOrders: paid._count, expenses, balance: income - expenses };
}
