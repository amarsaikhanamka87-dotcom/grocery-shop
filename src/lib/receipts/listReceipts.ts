import "server-only";
import type { ReceiptEmailStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type Range = { start: Date; end: Date };

/** Admin "Баримт": receipts issued in a period, newest first, optionally only one email status. */
export function listReceipts(range: Range, emailStatus?: ReceiptEmailStatus) {
  return prisma.receipt.findMany({
    where: { createdAt: { gte: range.start, lt: range.end }, ...(emailStatus && { emailStatus }) },
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
          paymentMethod: true,
          items: { select: { name: true, quantity: true, unit: true } },
        },
      },
    },
  });
}

export type ReceiptListRow = Awaited<ReturnType<typeof listReceipts>>[number];
