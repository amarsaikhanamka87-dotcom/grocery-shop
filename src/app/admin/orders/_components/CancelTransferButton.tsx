"use client";

import { Loader2, XCircle } from "lucide-react";
import type { AdminOrder } from "@/lib/orders/listAdminOrders";
import { useCancelTransfer } from "../_features/useCancelTransfer";

/**
 * "Цуцлах" under "Дансаар төлсөн" (in TransferCheckBox): for a transfer that never arrived. The order is cancelled and
 * its held stock goes back, which can't be undone, so the first tap asks in words.
 */
export function CancelTransferButton({ order }: { order: AdminOrder }) {
  const { isPending, isConfirming, hasError, setIsConfirming, confirmCancel } = useCancelTransfer(order.id);
  if (order.paymentMethod !== "TRANSFER" || order.paymentStatus !== "UNPAID" || order.status === "CANCELLED") return null;

  return (
    <div>
      {isConfirming ? (
        <div className="grid gap-3">
          <p className="text-center text-[15px] font-semibold">
            #{order.number} захиалгыг цуцлах уу? Барааг үлдэгдэлд буцааж нэмнэ. Буцааж болохгүй.
          </p>
          <div className="flex gap-3">
            <button type="button" disabled={isPending} onClick={() => setIsConfirming(false)} className="btn btn-outline h-12 bg-white px-6">
              Болих
            </button>
            <button type="button" disabled={isPending} onClick={confirmCancel} className="btn h-12 flex-1 bg-clay text-white">
              {isPending ? <Loader2 className="size-4 animate-spin" /> : <XCircle className="size-4" />} Тийм, цуцлах
            </button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => setIsConfirming(true)} className="btn h-11 w-full border border-clay bg-white text-clay hover:bg-clay hover:text-white">
          <XCircle className="size-4" /> Мөнгө ороогүй · Цуцлах
        </button>
      )}
      {hasError && (
        <p className="mt-2 text-center text-[13px] font-medium text-clay">Цуцалж чадсангүй. Хуудсаа шинэчилээд дахин оролдоно уу.</p>
      )}
    </div>
  );
}
