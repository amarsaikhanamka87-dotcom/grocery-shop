import { ChevronRight } from "lucide-react";
import { formatPrice } from "@/lib/format/formatPrice";
import type { AdminOrder } from "@/lib/orders/listAdminOrders";
import { orderState } from "../_features/orderState";
import { FulfillmentPill } from "./FulfillmentPill";
import { StatusPill } from "./StatusPill";
import { AdminOrderDialog } from "./AdminOrderDialog";

/**
 * One order row; clicking it opens the dialog. Three lines on a phone: number + buyer + total,
 * the goods (plus the address for deliveries), then the one status badge and how it leaves.
 * Day and slot are in the group heading; the placed time is in the dialog.
 */
export function AdminOrderRow({ order: o }: { order: AdminOrder }) {
  const isPickup = o.deliveryType === "pickup";
  return (
    <li>
      <AdminOrderDialog order={o}>
        <span className="grid gap-1.5 px-4 py-3.5 sm:px-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.6fr)_auto_7rem_16px] lg:items-center lg:gap-5">
          <span className="flex min-w-0 items-baseline justify-between gap-3">
            <span className="min-w-0 truncate text-[15px]">
              <span className="font-extrabold">#{o.number}</span> · <span className="font-semibold">{o.customerName || "—"}</span>
            </span>
            <span className="text-[16px] font-extrabold tabular-nums lg:hidden">{formatPrice(o.total)}</span>
          </span>
          <span className="min-w-0 text-[13.5px]">
            <span className="block truncate">{o.items.map((i) => `${i.name} × ${i.quantity} ${i.unit}`).join(", ")}</span>
            {!isPickup && (
              <span className="block truncate text-muted-foreground">
                {o.district}, {o.address}
              </span>
            )}
          </span>
          <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 lg:mt-0">
            <StatusPill {...orderState(o)} />
            <FulfillmentPill deliveryType={o.deliveryType} />
          </span>
          <span className="hidden text-[16px] font-extrabold tabular-nums lg:block lg:text-right">{formatPrice(o.total)}</span>
          <ChevronRight className="hidden size-4 text-muted-foreground lg:block" />
        </span>
      </AdminOrderDialog>
    </li>
  );
}
