import "server-only";
import { auth, currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

/**
 * Guards admin pages and admin server actions. Signed-out → sign-in; signed-in non-admin → 404
 * (so the admin area isn't advertised). Returns the admin's Clerk user id.
 */
export async function requireAdmin(): Promise<string> {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?redirect_url=/admin");
  const user = await currentUser();
  if (user?.publicMetadata.role !== "admin") notFound();
  return userId;
}
