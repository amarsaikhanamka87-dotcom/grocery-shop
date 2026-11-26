import type { OrderStatus, PaymentStatus } from "@prisma/client";
import { transferReference } from "@/lib/orders/transferReference";

type Order = {
  number: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  deliveryType: string | null;
};

/**
 * One status per order, worded like the tabs (ORDER_VIEWS), in the admin palette: clay = needs
 * the owner (money), green = paid / done, grey = cancelled. Bank transfers carry their code.
 */
export function orderState(o: Order): { label: string; className: string } {
  if (o.status === "CANCELLED") return { label: "Цуцалсан", className: "bg-ink/5 text-ink-2" };
  if (o.status === "DELIVERED") {
    const label = o.deliveryType === "store" ? "Кассаар зарсан" : o.deliveryType === "pickup" ? "Өгсөн" : "Хүргэсэн";
    return { label, className: "bg-brand-50 text-brand" };
  }
  if (o.paymentStatus === "PAID") {
    const label = o.deliveryType === "pickup" ? "Төлсөн · өгөх" : "Төлсөн · хүргэх";
    return { label, className: "bg-brand text-white" };
  }
  if (o.paymentMethod === "TRANSFER")
    return { label: `Данс шалгах · ${transferReference(o.number)}`, className: "bg-clay text-white" };
  return { label: "Төлөгдөөгүй", className: "bg-clay-50 text-clay" };
}
