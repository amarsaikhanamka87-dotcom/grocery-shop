import "server-only";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

/**
 * Page guard: signed-out visitors go to /sign-in and come back to `returnPath` after.
 * Returns the signed-in Clerk user id. Used by each page's `_middleware/` guard.
 */
export async function requireSignIn(returnPath: string): Promise<string> {
  const { userId } = await auth();
  if (!userId) redirect(`/sign-in?redirect_url=${encodeURIComponent(returnPath)}`);
  return userId;
}
