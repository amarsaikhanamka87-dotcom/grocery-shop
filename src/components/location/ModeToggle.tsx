"use client";

import { Store, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FulfillmentMode } from "@/types/fulfillment";
import { useDeliveryLocation } from "./useDeliveryLocation";

const OPTIONS: { id: FulfillmentMode; label: string; short: string; icon: typeof Truck }[] = [
  { id: "delivery", label: "Хүргэлт", short: "Хүргэлт", icon: Truck },
  // Store, not a basket: the basket icon is the cart ("Сагс").
  { id: "pickup", label: "Очиж авах", short: "Очиж авах", icon: Store },
];

/**
 * Header switch "Хүргэлт | Очиж авах" (same words at every width); the chosen one is dark. Phones:
 * words only (a bare truck / store icon wasn't understood), 44px tall. md–lg: icons only (crowded
 * header). xl+: icon + words.
 */
export function ModeToggle() {
  const { mode, setMode } = useDeliveryLocation();
  return (
    <div role="radiogroup" aria-label="Хүлээн авах хэлбэр" className="flex shrink-0 rounded-xl bg-ink/5 p-0.5 md:rounded-2xl md:p-1">
      {OPTIONS.map(({ id, label, short, icon: Icon }) => (
        <button
          key={id}
          type="button"
          role="radio"
          aria-checked={mode === id}
          aria-label={label}
          onClick={() => setMode(id)}
          className={cn(
            "flex h-11 items-center gap-2 rounded-xl px-2 text-[16px] font-bold sm:px-2.5 whitespace-nowrap transition-colors md:px-3.5",
            mode === id ? "bg-ink text-white" : "text-ink hover:bg-ink/10",
          )}
        >
          <Icon className="hidden size-5 md:block" />
          <span className="md:hidden">{short}</span>
          <span className="hidden xl:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}
