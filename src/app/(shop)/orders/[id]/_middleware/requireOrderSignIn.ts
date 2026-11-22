import "server-only";
import { requireSignIn } from "@/lib/auth/requireSignIn";

/** /orders/[id] guard: sign in first, then come back to this order. Returns the user id. */
export async function requireOrderSignIn(orderId: string): Promise<string> {
  return requireSignIn(`/orders/${orderId}`);
}
