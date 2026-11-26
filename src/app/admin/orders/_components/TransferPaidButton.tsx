"use client";

import { Landmark, Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/format/formatPrice";
import type { AdminOrder } from "@/lib/orders/listAdminOrders";
import { transferReference } from "@/lib/orders/transferReference";
import { useTransferPaid } from "../_features/useTransferPaid";

/**
 * "Дансаар төлсөн" in the order dialog, for unpaid orders the buyer chose to pay by bank transfer. Paying can't be undone (receipt,
 * stock, income), so the first tap asks with the amount and transfer code to check in the bank app.
 */
export function TransferPaidButton({ order }: { order: AdminOrder }) {
  const { isPending, isConfirming, hasError, setIsConfirming, confirmTransfer } = useTransferPaid(order.id);
  if (order.paymentMethod !== "TRANSFER" || order.paymentStatus !== "UNPAID" || order.status === "CANCELLED") return null;

  return (
    <div>
      {isConfirming ? (
        <div className="grid gap-3">
          <p className="text-center text-[15px] font-semibold">
            Дансанд {formatPrice(order.total)} «{transferReference(order.number)}» утгатай орсон уу? Төлсөн болгосны дараа
            буцаахгүй.
          </p>
          <div className="flex gap-3">
            <button type="button" disabled={isPending} onClick={() => setIsConfirming(false)} className="btn btn-outline h-12 bg-white px-6">
              Болих
            </button>
            <button type="button" disabled={isPending} onClick={confirmTransfer} className="btn btn-primary h-12 flex-1">
              {isPending ? <Loader2 className="size-4 animate-spin" /> : <Landmark className="size-4" />} Тийм, төлсөн
            </button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => setIsConfirming(true)} className="btn btn-primary h-12 w-full">
          <Landmark className="size-4" /> Дансаар төлсөн
        </button>
      )}
      {hasError && (
        <p className="mt-2 text-center text-[13px] font-medium text-clay">Төлсөн болгож чадсангүй. Хуудсаа шинэчилээд дахин оролдоно уу.</p>
      )}
    </div>
  );
}
