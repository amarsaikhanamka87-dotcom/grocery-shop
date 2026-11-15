import "server-only";
import { clerkClient } from "@clerk/nextjs/server";
import { findOrCreatePhoneUser } from "./findOrCreatePhoneUser";

/** A short-lived, single-use ticket the browser exchanges for a Clerk session. */
export async function createPhoneSignInTicket(phone: string): Promise<string> {
  const clerk = await clerkClient();
  const userId = await findOrCreatePhoneUser(phone);
  const token = await clerk.signInTokens.createSignInToken({ userId, expiresInSeconds: 60 });
  return token.token;
}
