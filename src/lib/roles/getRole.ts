import "server-only";
import { currentUser } from "@clerk/nextjs/server";

/** The signed-in user's role from Clerk publicMetadata (server-set only), or null. */
export async function getRole(): Promise<"admin" | "b2b" | null> {
  const user = await currentUser();
  return user?.publicMetadata.role ?? null;
}
