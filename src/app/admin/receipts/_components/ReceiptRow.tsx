import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { formatPrice } from "@/lib/format/formatPrice";
import { formatDateTime } from "@/lib/format/formatDateTime";
import { DELIVERY_TYPE_LABEL } from "@/lib/orders/deliveryTypeLabel";
import type { ReceiptListRow } from "@/lib/receipts/listReceipts";
import { RECEIPT_STATUS_BADGE } from "../_features/receiptStatusBadge";

/** One issued receipt; opens its БМ-3 sheet. */
export function ReceiptRow({ receipt: r }: { receipt: ReceiptListRow }) {
  const badge = RECEIPT_STATUS_BADGE[r.emailStatus];
  return (
    <li>
      <Link
        href={`/admin/receipts/${r.id}`}
        className="grid gap-3 px-4 py-4 hover:bg-cream sm:px-5 lg:grid-cols-[120px_1.2fr_1.6fr_auto_120px_16px] lg:items-center lg:gap-5"
      >
        <span>
          <span className="block text-[15px] font-extrabold">№ {r.number}</span>
          <span className="block text-[12.5px] text-muted-foreground">{formatDateTime(r.createdAt)}</span>
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[14.5px] font-semibold">
            {r.order.companyName || r.order.customerName || "—"}
          </span>
          <span className="block truncate text-[13px] text-muted-foreground">{r.email ?? r.order.phone}</span>
        </span>
        <span className="min-w-0 text-[13.5px]">
          <span className="block truncate">
            {r.order.items.map((i) => `${i.name} ×${i.quantity} ${i.unit}`).join(", ")}
          </span>
          <span className="block text-muted-foreground">
            Захиалга #{r.order.number} · {DELIVERY_TYPE_LABEL[r.order.deliveryType ?? ""] ?? "Хүргэлт"}
          </span>
        </span>
        <span className={`w-fit rounded-full px-2.5 py-1 text-[12px] font-bold ${badge.className}`}>{badge.label}</span>
        <span className="text-[16px] font-extrabold tabular-nums lg:text-right">{formatPrice(r.order.total)}</span>
        <ChevronRight className="hidden size-4 text-muted-foreground lg:block" />
      </Link>
    </li>
  );
}
