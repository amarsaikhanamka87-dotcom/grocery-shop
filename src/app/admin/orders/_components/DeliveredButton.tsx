"use client";

import { useState, useTransition } from "react";
import { CheckCheck, Loader2, PackageCheck } from "lucide-react";
import type { AdminOrder } from "@/lib/orders/listAdminOrders";
import { markDelivered } from "../_features/markDelivered";

/**
 * "Хүргэж өгсөн" (delivery) or "Очиж авсан" (pickup) in the order dialog; shown only for paid
 * orders not yet delivered/cancelled. Both set the status to DELIVERED.
 */
export function DeliveredButton({ order }: { order: AdminOrder }) {
  const [pending, start] = useTransition();
  const [error, setError] = useState(false);
  const pickup = order.deliveryType === "pickup";
  const Icon = pickup ? PackageCheck : CheckCheck;
  if (order.paymentStatus !== "PAID" || order.status === "DELIVERED" || order.status === "CANCELLED") return null;
  return (
    <div className="mt-5 border-t border-line pt-4">
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          start(async () => {
            const res = await markDelivered(order.id);
            setError(!res.ok);
          })
        }
        className="btn btn-primary h-11 w-full"
      >
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Icon className="size-4" />} {pickup ? "Очиж авсан" : "Хүргэж өгсөн"}
      </button>
      {error && (
        <p className="mt-2 text-center text-[13px] font-medium text-clay">Төлөв өөрчлөгдсөн байна. Хуудсаа шинэчилнэ үү.</p>
      )}
    </div>
  );
}
