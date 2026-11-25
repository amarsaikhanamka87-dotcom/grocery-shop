import { Store, Truck } from "lucide-react";
import { DELIVERY_TYPE_LABEL } from "@/lib/orders/deliveryTypeLabel";

/**
 * How the order leaves: "Хүргэлт" (truck), "Очиж авах" / "Касс" (store), as quiet text next to
 * the status badge. Store icon, not a basket: the basket means the cart on the storefront.
 */
export function FulfillmentPill({ deliveryType }: { deliveryType: string | null }) {
  const isPickup = deliveryType === "pickup" || deliveryType === "store";
  const Icon = isPickup ? Store : Truck;
  const label = isPickup ? (DELIVERY_TYPE_LABEL[deliveryType ?? ""] ?? "Очиж авах") : "Хүргэлт";
  return (
    <span className="inline-flex items-center gap-1 text-[13px] font-semibold whitespace-nowrap text-muted-foreground">
      <Icon className="size-4" /> {label}
    </span>
  );
}
