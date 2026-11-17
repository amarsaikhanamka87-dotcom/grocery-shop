"use client";

import { toast } from "sonner";
import type { CartItem } from "./CartContext";
import { AddedToast } from "./AddedToast";

/** Shows the "added to cart" pop-up; one per product, so repeated taps update it instead of stacking. */
export function notifyAdded(item: Omit<CartItem, "quantity">, quantity: number) {
  toast.custom((id) => <AddedToast item={item} quantity={quantity} onClose={() => toast.dismiss(id)} />, {
    id: `cart-${item.productId}`,
    duration: 2500,
  });
}
