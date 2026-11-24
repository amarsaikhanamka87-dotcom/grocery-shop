import { ChevronRight } from "lucide-react";
import { formatPrice } from "@/lib/format/formatPrice";
import { formatDateTime } from "@/lib/format/formatDateTime";
import { formatDayMn } from "@/lib/format/formatDayMn";
import type { AdminOrder } from "@/lib/orders/listAdminOrders";
import { orderState } from "../_features/orderState";
import { FulfillmentPill } from "./FulfillmentPill";
import { StatusPill } from "./StatusPill";
import { AdminOrderDialog } from "./AdminOrderDialog";
import { DELIVERY_TYPE_LABEL } from "@/lib/orders/deliveryTypeLabel";
import { PAYMENT_METHOD_LABEL } from "@/lib/orders/paymentMethodLabel";

/** One order row; clicking it opens the read-only detail dialog. */
export function AdminOrderRow({ order: o }: { order: AdminOrder }) {
  const day = formatDayMn(o.deliveryDate);
  // Pickup: the type tag already says "Очиж авах", so the time line is just day + slot.
  const typeText = o.deliveryType === "pickup" ? "" : `${DELIVERY_TYPE_LABEL[o.deliveryType ?? ""] ?? "Хүргэлт"} · `;
  return (
    <li>
      <AdminOrderDialog order={o}>
        <span className="grid gap-3 px-4 py-4 sm:px-5 lg:grid-cols-[110px_1.2fr_1.4fr_1.2fr_auto_16px] lg:items-center lg:gap-5">
          <span>
            <span className="block text-[15px] font-extrabold">#{o.number}</span>
            <span className="block text-[12.5px] text-muted-foreground">{formatDateTime(o.createdAt)}</span>
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[14.5px] font-semibold">{o.customerName || "—"}</span>
            <span className="block text-[13px] text-muted-foreground">{o.phone}</span>
            <span className="block truncate text-[13px] text-muted-foreground">
              {o.district}, {o.address}
            </span>
          </span>
          <span className="min-w-0 text-[13.5px]">
            <span className="block truncate">{o.items.map((i) => `${i.name} × ${i.quantity} ${i.unit}`).join(", ")}</span>
            <span className="block text-muted-foreground">
              {typeText}
              {day}, {o.deliverySlot}
            </span>
          </span>
          {/* One status badge + how it leaves. The payment method shows only for store sales
              (Бэлэн / Карт / Дансаар); "Wire" on every online order told the owner nothing. */}
          <span className="flex flex-wrap items-center gap-2">
            <StatusPill {...orderState(o)} />
            <FulfillmentPill deliveryType={o.deliveryType} />
            {o.deliveryType === "store" && (
              <span className="text-[13px] font-semibold text-muted-foreground">{PAYMENT_METHOD_LABEL[o.paymentMethod]}</span>
            )}
          </span>
          <span className="text-[16px] font-extrabold tabular-nums lg:text-right">{formatPrice(o.total)}</span>
          <ChevronRight className="hidden size-4 text-muted-foreground lg:block" />
        </span>
      </AdminOrderDialog>
    </li>
  );
}
