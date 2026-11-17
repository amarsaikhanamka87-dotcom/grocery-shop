import { DELIVERY_FEE, FREE_DELIVERY_FROM } from "@/lib/constants";

/** B2B buyers always get free delivery; others from FREE_DELIVERY_FROM. None for an empty cart. */
export function deliveryFeeFor(subtotal: number, isB2B = false) {
  return isB2B || subtotal === 0 || subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
}
