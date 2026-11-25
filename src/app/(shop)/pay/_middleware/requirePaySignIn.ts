import "server-only";
import { requireSignIn } from "@/lib/auth/requireSignIn";

export async function requirePaySignIn(orderId: string): Promise<string> {
  return requireSignIn(`/pay?order=${orderId}`);
}
