import { Truck } from "lucide-react";
import { formatPrice } from "@/lib/format/formatPrice";
import { amountToFreeDelivery } from "../_features/amountToFreeDelivery";

export function FreeDeliveryNotice({ subtotal }: { subtotal: number }) {
  const left = amountToFreeDelivery(subtotal);
  if (left === 0) {
    return (
      <div className="flex items-center gap-3 rounded-t-[20px] bg-brand-50 px-5 py-4 text-[14.5px] font-semibold text-brand">
        <Truck className="size-5 shrink-0" /> Танд хүргэлт үнэгүй!
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
