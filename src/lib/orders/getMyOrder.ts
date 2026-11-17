import "server-only";
import { prisma } from "@/lib/prisma";

/** One order with its lines, only if it belongs to this Clerk user. */
export function getMyOrder(orderId: string, clerkUserId: string) {
  return prisma.order.findFirst({
    where: { id: orderId, clerkUserId },
    include: { items: true },
  });
}
