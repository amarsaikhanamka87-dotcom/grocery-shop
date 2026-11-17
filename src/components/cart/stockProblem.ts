import type { CartItem } from "./CartContext";

/** "out" = sold out, "short" = the cart wants more than is left, null = fine. */
export function stockProblem(i: Pick<CartItem, "quantity" | "stock" | "minQty">): "out" | "short" | null {
  if (i.stock < i.minQty) return "out";
  if (i.quantity > i.stock) return "short";
  return null;
}
