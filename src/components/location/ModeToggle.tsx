"use client";

import { ShoppingBasket, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FulfillmentMode } from "@/types/fulfillment";
import { useDeliveryLocation } from "./useDeliveryLocation";

const OPTIONS: { id: FulfillmentMode; label: string; icon: typeof Truck }[] = [
  { id: "delivery", label: "Хүргэлтээр", icon: Truck },
  { id: "pickup", label: "Очиж авах", icon: ShoppingBasket },
];

/** Header switch "Хүргэлтээр | Очиж авах"; the chosen one is dark. Labels hide on small screens. */
export function ModeToggle() {
  const { mode, setMode } = useDeliveryLocation();
  return (
    <div role="radiogroup" aria-label="Хүлээн авах хэлбэр" className="flex shrink-0 rounded-xl bg-cream-2 p-0.5 md:rounded-2xl md:p-1">
      {OPTIONS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          role="radio"
          aria-checked={mode === id}
          aria-label={label}
          onClick={() => setMode(id)}
          className={cn(
            "flex h-8 items-center gap-2 rounded-xl px-2 text-[14px] font-bold transition-colors md:h-10 md:px-3.5",
            mode === id ? "bg-ink text-white" : "text-ink hover:bg-line/60",
          )}
        >
          <Icon className="size-5" />
          <span className="hidden xl:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}
