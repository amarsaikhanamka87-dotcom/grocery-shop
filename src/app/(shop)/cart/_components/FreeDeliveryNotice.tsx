"use client";

import { Truck } from "lucide-react";
import { formatPrice } from "@/lib/format/formatPrice";
import { useIsB2B } from "@/lib/roles/useIsB2B";
import { amountToFreeDelivery } from "../_features/amountToFreeDelivery";

export function FreeDeliveryNotice({ subtotal }: { subtotal: number }) {
  const isB2B = useIsB2B();
  const left = amountToFreeDelivery(subtotal, isB2B);
  if (left === 0) {
    return (
      <div className="flex items-center gap-3 rounded-t-[20px] bg-brand-50 px-5 py-4 text-[14.5px] font-semibold text-brand">
        <Truck className="size-5 shrink-0" /> {isB2B ? "B2B хэрэглэгч: хүргэлт үнэгүй!" : "Танд хүргэлт үнэгүй!"}
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3 rounded-t-[20px] bg-brand-50 px-5 py-4 text-[14.5px]">
      <Truck className="size-5 shrink-0 text-brand" />
      <p>
        Үнэгүй хүргэлт авахад <b>{formatPrice(left)}</b> дутуу байна.
      </p>
    </div>
  );
}
