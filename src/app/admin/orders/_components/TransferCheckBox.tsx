import { Landmark } from "lucide-react";
import { CopyButton } from "@/components/payment/CopyButton";
import { TRANSFER_HOLD_HOURS } from "@/lib/constants";
import { formatDayTimeMn } from "@/lib/format/formatDayTimeMn";
import { formatPrice } from "@/lib/format/formatPrice";
import type { AdminOrder } from "@/lib/orders/listAdminOrders";
import { transferReference } from "@/lib/orders/transferReference";
import { CancelTransferButton } from "./CancelTransferButton";
import { TransferPaidButton } from "./TransferPaidButton";

/**
 * Top of the dialog for an unpaid bank-transfer order: what to look for in the bank app (amount +
 * code, with copy), until when the goods stay held, then "Дансаар төлсөн" / "Цуцлах".
 */
export function TransferCheckBox({ order }: { order: AdminOrder }) {
  const reference = transferReference(order.number);
  const deadline = new Date(order.createdAt.getTime() + TRANSFER_HOLD_HOURS * 60 * 60 * 1000);
  return (
    <section className="grid gap-3 rounded-2xl bg-clay-50 p-4">
      <p className="flex items-center gap-2 text-[15px] font-extrabold text-clay">
        <Landmark className="size-5" /> Банкны аппаас шалгана уу
      </p>
      <div className="flex items-center justify-between gap-3 rounded-xl bg-white p-3">
        <div className="min-w-0">
          <p className="text-[13px] text-muted-foreground">Гүйлгээний утга · {formatPrice(order.total)}</p>
          <p className="text-[22px] font-extrabold tracking-wider">{reference}</p>
        </div>
        <CopyButton text={reference} label="Гүйлгээний утга" />
      </div>
      <p className="text-[13.5px] text-ink-2">
        {formatDayTimeMn(deadline)} хүртэл мөнгө ороогүй бол автоматаар цуцлагдаж, бараа үлдэгдэлд буцна.
      </p>
      <TransferPaidButton order={order} />
      <CancelTransferButton order={order} />
    </section>
  );
}
