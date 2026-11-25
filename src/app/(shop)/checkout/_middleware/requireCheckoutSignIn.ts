import "server-only";
import { requireSignIn } from "@/lib/auth/requireSignIn";

/** /checkout guard: sign in first, then come back to /checkout. Returns the user id. */
export async function requireCheckoutSignIn(): Promise<string> {
  return requireSignIn("/checkout");
}
