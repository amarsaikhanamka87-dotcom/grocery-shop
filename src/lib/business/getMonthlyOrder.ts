import "server-only";
import { prisma } from "@/lib/prisma";
import type { MonthlyOrder } from "@/types/business";

/** The B2B customer's saved monthly list, or null if they haven't made one yet. */
export async function getMonthlyOrder(clerkUserId: string): Promise<MonthlyOrder | null> {
  const row = await prisma.standingOrder.findUnique({
    where: { clerkUserId },
    include: { items: { include: { product: true }, orderBy: { product: { name: "asc" } } } },
  });
  if (!row) return null;
  return {
    dayOfMonth: row.dayOfMonth,
    active: row.active,
    items: row.items.map((i) => ({ product: i.product, quantity: i.quantity })),
  };
}
