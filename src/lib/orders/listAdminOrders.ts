import "server-only";
import type { PaymentStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

/**
 * Admin: newest orders first with everything the list and the detail dialog show (so opening
 * an order needs no extra request). Old QPay QR images are left out.
 */
export function listAdminOrders(payment?: PaymentStatus) {
  return prisma.order.findMany({
    where: payment ? { paymentStatus: payment } : {},
    select: {
      id: true,
      number: true,
      createdAt: true,
      customerName: true,
      companyName: true,
      phone: true,
      district: true,
      address: true,
      note: true,
      deliveryType: true,
      deliveryDate: true,
      deliverySlot: true,
      paymentMethod: true,
      paymentStatus: true,
      paidAt: true,
      wireIntentId: true,
      status: true,
      subtotal: true,
      deliveryFee: true,
      total: true,
      items: { select: { id: true, name: true, image: true, unit: true, price: true, quantity: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 200,
  });
}

export type AdminOrder = Awaited<ReturnType<typeof listAdminOrders>>[number];
