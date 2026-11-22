import "server-only";
import { requireSignIn } from "@/lib/auth/requireSignIn";

/** /pay guard: sign in first, then come back to pay this order. Returns the user id. */
export async function requirePaySignIn(orderId: string): Promise<string> {
  return requireSignIn(`/pay?order=${orderId}`);
}
