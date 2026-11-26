import "server-only";
import { prisma } from "@/lib/prisma";
import type { OrderKind, OrderView } from "@/types/orders";
import { adminOrderWhere } from "./adminOrderWhere";

/**
 * Admin: one tab of orders (see adminOrderWhere) with everything the list and the detail dialog
 * show, so opening an order needs no extra request. Sorted by hand-over day and slot: soonest first
 * for open tabs, newest first for "Дууссан" / "Цуцалсан". Old QPay QR images are left out.
 */
export function listAdminOrders(view: OrderView, kind: OrderKind) {
  const direction = view === "done" || view === "cancelled" ? "desc" : "asc";
  return prisma.order.findMany({
    where: adminOrderWhere(view, kind),
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
      items: {
        select: {
          id: true,
          name: true,
          image: true,
          unit: true,
          price: true,
          quantity: true,
        },
      },
    },
    orderBy: [
      { deliveryDate: { sort: direction, nulls: "last" } },
      { deliverySlot: direction },
      { number: direction },
    ],
    take: 200,
  });
}

export type AdminOrder = Awaited<ReturnType<typeof listAdminOrders>>[number];
