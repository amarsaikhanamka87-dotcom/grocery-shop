import type { OrderStatus, PaymentStatus } from "@prisma/client";

/** Mongolian labels + badge colors for an order's payment and order status. */
export const ORDER_BADGES: {
  payment: Record<PaymentStatus, { label: string; className: string }>;
  status: Record<OrderStatus, { label: string; className: string }>;
} = {
  payment: {
    PAID: { label: "Төлөгдсөн", className: "bg-emerald-100 text-emerald-800" },
    UNPAID: { label: "Төлөгдөөгүй", className: "bg-amber-100 text-amber-800" },
  },
  status: {
    PENDING: { label: "Хүлээгдэж буй", className: "bg-cream-2 text-ink-2" },
    CONFIRMED: { label: "Баталгаажсан", className: "bg-sky-100 text-sky-800" },
    DELIVERING: { label: "Хүргэлтэнд", className: "bg-indigo-100 text-indigo-800" },
    DELIVERED: { label: "Хүргэгдсэн", className: "bg-emerald-100 text-emerald-800" },
    CANCELLED: { label: "Цуцлагдсан", className: "bg-rose-100 text-rose-800" },
  },
};
