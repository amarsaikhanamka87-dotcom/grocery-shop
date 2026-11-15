import { FREE_DELIVERY_FROM } from "@/lib/constants";

/** How much more the buyer must add to get free delivery (0 = already free). */
export function amountToFreeDelivery(subtotal: number): number {
  return Math.max(0, FREE_DELIVERY_FROM - subtotal);
}
