"use client";

import { useState, useTransition } from "react";
import { CheckCheck, Loader2, PackageCheck } from "lucide-react";
import type { AdminOrder } from "@/lib/orders/listAdminOrders";
import { markDelivered } from "../_features/markDelivered";

/**
 * "Хүргэж өгсөн" (delivery) or "Очиж авсан" (pickup) in the order dialog; shown only for paid
 * orders not yet delivered/cancelled. Both set the status to DELIVERED, which cannot be undone, so
 * the first tap asks "sure?" with the order number before anything is saved.
 */
export function DeliveredButton({ order }: { order: AdminOrder }) {
  const [pending, start] = useTransition();
  const [isConfirming, setConfirming] = useState(false);
  const [error, setError] = useState(false);
  const pickup = order.deliveryType === "pickup";
  const label = pickup ? "Ирж авсан" : "Хүргэж өгсөн";
  const Icon = pickup ? PackageCheck : CheckCheck;
  if (order.paymentStatus !== "PAID" || order.status === "DELIVERED" || order.status === "CANCELLED") return null;

  const markOrderDelivered = () =>
    start(async () => {
      const res = await markDelivered(order.id);
      setError(!res.ok);
    });

  return (
    <div>
      {isConfirming ? (
        <div className="grid gap-3">
          <p className="text-center text-[15px] font-semibold">
            #{order.number} захиалгыг “{label}” болгох уу? Буцааж болохгүй.
          </p>
          <div className="flex gap-3">
            <button type="button" disabled={pending} onClick={() => setConfirming(false)} className="btn btn-outline h-12 px-6">
              Болих
            </button>
            <button type="button" disabled={pending} onClick={markOrderDelivered} className="btn btn-primary h-12 flex-1">
              {pending ? <Loader2 className="size-4 animate-spin" /> : <Icon className="size-4" />} Тийм, {label.toLowerCase()}
            </button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => setConfirming(true)} className="btn btn-primary h-12 w-full">
          <Icon className="size-4" /> {label}
        </button>
      )}
      {error && (
        <p className="mt-2 text-center text-[13px] font-medium text-clay">Төлөв өөрчлөгдсөн байна. Хуудсаа шинэчилнэ үү.</p>
      )}
    </div>
  );
}
