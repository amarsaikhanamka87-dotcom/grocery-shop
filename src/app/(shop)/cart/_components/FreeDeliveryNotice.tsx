"use client";

import { Store, Truck } from "lucide-react";
import { formatPrice } from "@/lib/format/formatPrice";
import { useIsB2B } from "@/lib/roles/useIsB2B";
import { useDeliveryLocation } from "@/components/location/useDeliveryLocation";
import { amountToFreeDelivery } from "../_features/amountToFreeDelivery";

const BAR = "flex items-center gap-3 rounded-t-[20px] bg-brand-50 px-5 py-4 text-[15px]";

/** Top of the cart: pickup = no delivery fee; delivery = free already, or how much more for free delivery. */
export function FreeDeliveryNotice({ subtotal }: { subtotal: number }) {
  const isB2B = useIsB2B();
  const isPickup = useDeliveryLocation().mode === "pickup";
  if (isPickup) {
    return (
      <div className={`${BAR} font-semibold text-brand`}>
        <Store className="size-5 shrink-0" /> Очиж авна: хүргэлтийн төлбөргүй.
      </div>
    );
  }
  const left = amountToFreeDelivery(subtotal, isB2B);
  if (left === 0) {
    return (
      <div className={`${BAR} font-semibold text-brand`}>
        <Truck className="size-5 shrink-0" /> {isB2B ? "B2B хэрэглэгч: хүргэлт үнэгүй!" : "Танд хүргэлт үнэгүй!"}
      </div>
    );
  }
  return (
    <div className={BAR}>
      <Truck className="size-5 shrink-0 text-brand" />
      <p>
        Үнэгүй хүргэлт авахад <b>{formatPrice(left)}</b> дутуу байна.
      </p>
    </div>
  );
}
