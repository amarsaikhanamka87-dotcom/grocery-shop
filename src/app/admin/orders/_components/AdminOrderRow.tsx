import { ChevronRight } from "lucide-react";
import { formatPrice } from "@/lib/format/formatPrice";
import { formatDateTime } from "@/lib/format/formatDateTime";
import type { AdminOrder } from "@/lib/orders/listAdminOrders";
import { ORDER_BADGES } from "../_features/orderBadges";
import { StatusPill } from "./StatusPill";
import { AdminOrderDialog } from "./AdminOrderDialog";

const TYPE_LABEL: Record<string, string> = { express: "Шуурхай", scheduled: "Хуваарьт" };

/** One order row; clicking it opens the read-only detail dialog. */
export function AdminOrderRow({ order: o }: { order: AdminOrder }) {
  const day = o.deliveryDate?.toISOString().slice(0, 10) ?? "";
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
            <span className="block truncate">{o.items.map((i) => `${i.name} ×${i.quantity}${i.unit}`).join(", ")}</span>
            <span className="block text-muted-foreground">
              {TYPE_LABEL[o.deliveryType ?? ""] ?? "Хүргэлт"} · {day} {o.deliverySlot}
            </span>
          </span>
          <span className="flex flex-wrap items-center gap-1.5">
            <StatusPill {...ORDER_BADGES.payment[o.paymentStatus]} />
            <StatusPill {...ORDER_BADGES.status[o.status]} />
            <span className="text-[12px] font-semibold text-muted-foreground">{o.paymentMethod}</span>
          </span>
          <span className="text-[16px] font-extrabold tabular-nums lg:text-right">{formatPrice(o.total)}</span>
          <ChevronRight className="hidden size-4 text-muted-foreground lg:block" />
        </span>
      </AdminOrderDialog>
    </li>
  );
}
