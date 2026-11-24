import type { OrderStatus, PaymentStatus } from "@prisma/client";

type Order = { paymentStatus: PaymentStatus; status: OrderStatus; deliveryType: string | null };

/**
 * One status per order (instead of separate payment + order badges that said almost the same
 * thing), in the admin palette: green = done / to hand over, clay = waiting for money, grey = cancelled.
 */
export function orderState(o: Order): { label: string; className: string } {
  if (o.status === "CANCELLED") return { label: "Цуцалсан", className: "bg-ink/5 text-ink-2" };
  if (o.status === "DELIVERED") {
    const label = o.deliveryType === "store" ? "Кассаар зарсан" : o.deliveryType === "pickup" ? "Очиж авсан" : "Хүргэгдсэн";
    return { label, className: "bg-brand-50 text-brand" };
  }
  if (o.paymentStatus === "PAID") {
    const label = o.deliveryType === "pickup" ? "Төлсөн · ирж авна" : "Төлсөн · хүргэх";
    return { label, className: "bg-brand text-white" };
  }
  return { label: "Төлбөр хүлээж буй", className: "bg-clay-50 text-clay" };
}
