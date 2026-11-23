import "server-only";
import { prisma } from "@/lib/prisma";

export function getMyOrder(orderId: string, clerkUserId: string) {
  return prisma.order.findFirst({
    where: { id: orderId, clerkUserId },
    include: { items: true },
  });
}
