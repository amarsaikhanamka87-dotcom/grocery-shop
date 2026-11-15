import { DELIVERY_FEE, FREE_DELIVERY_FROM } from "@/lib/constants";

/** Free delivery from FREE_DELIVERY_FROM, otherwise a flat fee (none for an empty cart). */
export function deliveryFeeFor(subtotal: number) {
  return subtotal === 0 || subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
}
