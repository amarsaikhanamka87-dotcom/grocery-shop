import "server-only";
import type { ReceiptEmailStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

/** Admin "Баримт": issued receipts, newest first, optionally only one email status. */
export function listReceipts(emailStatus?: ReceiptEmailStatus) {
  return prisma.receipt.findMany({
    where: emailStatus ? { emailStatus } : undefined,
    orderBy: { number: "desc" },
    take: 200,
    select: {
      id: true,
      number: true,
      email: true,
      emailStatus: true,
      emailedAt: true,
      createdAt: true,
      order: {
        select: {
          number: true,
          customerName: true,
          companyName: true,
          phone: true,
          total: true,
          deliveryType: true,
          items: { select: { name: true, quantity: true, unit: true } },
        },
      },
    },
  });
}

export type ReceiptListRow = Awaited<ReturnType<typeof listReceipts>>[number];
