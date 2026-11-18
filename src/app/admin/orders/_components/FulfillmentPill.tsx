import { ShoppingBasket, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

/** "Хүргэлт" (truck) or "Очиж авах" (basket) tag, so the two kinds of orders stand apart. */
export function FulfillmentPill({ pickup }: { pickup: boolean }) {
  const Icon = pickup ? ShoppingBasket : Truck;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-bold",
        pickup ? "bg-violet-100 text-violet-800" : "bg-cream-2 text-ink-2",
      )}
    >
      <Icon className="size-3.5" /> {pickup ? "Очиж авах" : "Хүргэлт"}
    </span>
  );
}
