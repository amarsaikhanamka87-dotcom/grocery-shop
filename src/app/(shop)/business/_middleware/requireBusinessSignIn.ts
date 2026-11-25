import "server-only";
import { requireSignIn } from "@/lib/auth/requireSignIn";

/** /business guard: sign in first, then come back to /business. Returns the user id. */
export async function requireBusinessSignIn(): Promise<string> {
  return requireSignIn("/business");
}
