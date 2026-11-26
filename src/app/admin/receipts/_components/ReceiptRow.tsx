import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { formatDayTimeMn } from "@/lib/format/formatDayTimeMn";
import { formatPrice } from "@/lib/format/formatPrice";
import { PAYMENT_METHOD_LABEL } from "@/lib/orders/paymentMethodLabel";
import type { ReceiptListRow } from "@/lib/receipts/listReceipts";
import { receiptStatusBadge } from "../_features/receiptStatusBadge";

/**
 * One issued receipt; opens its БМ-3 sheet. Three lines on a phone: № + buyer + money, the goods,
 * then the e-mail badge with where it came from (Касс · Бэлэн / Захиалга #44) and the time.
 */
export function ReceiptRow({ receipt: r }: { receipt: ReceiptListRow }) {
  const badge = receiptStatusBadge(r.emailStatus, r.email);
  const isStore = r.order.deliveryType === "store";
  const payment = PAYMENT_METHOD_LABEL[r.order.paymentMethod] ?? "";
  const source = isStore ? `Касс · ${payment}` : `Захиалга #${r.order.number}${payment ? ` · ${payment}` : ""}`;
  return (
    <li>
      <Link
        href={`/admin/receipts/${r.id}`}
        className="grid gap-1.5 px-4 py-3.5 hover:bg-cream sm:px-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.6fr)_auto_7rem_16px] lg:items-center lg:gap-5"
      >
        <span className="flex min-w-0 items-baseline justify-between gap-3">
          <span className="min-w-0 truncate text-[15px]">
            <span className="font-extrabold">№ {r.number}</span> ·{" "}
            <span className="font-semibold">{r.order.companyName || r.order.customerName || "—"}</span>
          </span>
          <span className="text-[16px] font-extrabold tabular-nums lg:hidden">{formatPrice(r.order.total)}</span>
        </span>
        <span className="block min-w-0 truncate text-[13.5px]">
          {r.order.items.map((i) => `${i.name} × ${i.quantity} ${i.unit}`).join(", ")}
        </span>
        <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-muted-foreground lg:mt-0">
          <span className={`rounded-full px-2.5 py-1 text-[12.5px] font-bold whitespace-nowrap ${badge.className}`}>{badge.label}</span>
          <span className="whitespace-nowrap">{source}</span>
          <span className="whitespace-nowrap">{formatDayTimeMn(r.createdAt)}</span>
        </span>
        <span className="hidden text-[16px] font-extrabold tabular-nums lg:block lg:text-right">{formatPrice(r.order.total)}</span>
        <ChevronRight className="hidden size-4 text-muted-foreground lg:block" />
      </Link>
    </li>
  );
}
