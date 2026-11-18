import "server-only";
import type { PaymentStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

/**
 * Admin: newest orders first with everything the list and the detail dialog show (so opening
 * an order needs no extra request), filtered by payment and by delivery vs pickup ("Очиж авах").
 * Old QPay QR images are left out.
 */
export function listAdminOrders(filter: { payment?: PaymentStatus; method?: "delivery" | "pickup" } = {}) {
  const where: Prisma.OrderWhereInput = {
    ...(filter.payment && { paymentStatus: filter.payment }),
    ...(filter.method === "pickup" && { deliveryType: "pickup" }),
    // Old orders have no deliveryType; they were all delivered.
    ...(filter.method === "delivery" && { OR: [{ deliveryType: null }, { deliveryType: { not: "pickup" } }] }),
  };
  return prisma.order.findMany({
    where,
    select: {
      id: true,
      number: true,
      createdAt: true,
      customerName: true,
      companyName: true,
      companyRegNo: true,
      phone: true,
      district: true,
      address: true,
      note: true,
      deliveryType: true,
      deliveryDate: true,
      deliverySlot: true,
      recurrence: true,
      recurrenceDays: true,
      recurrenceStart: true,
      recurrenceEnd: true,
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
