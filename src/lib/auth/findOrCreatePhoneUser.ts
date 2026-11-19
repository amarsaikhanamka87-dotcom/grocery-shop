import "server-only";
import { clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { phoneUsername } from "./phoneUsername";

/**
 * Returns the Clerk user id for this phone, creating the user if needed. Only call this after
 * the phone was verified by our own SMS code (src/lib/otp).
 * Clerk rejects +976 numbers, so the phone is stored in our `phone_users` table and the
 * Clerk user gets a username made from it instead (Clerk can't issue a sign-in token to a user
 * with no identifier). Older users created without one get it added here.
 */
export async function findOrCreatePhoneUser(phone: string): Promise<string> {
  const clerk = await clerkClient();

  const link = await prisma.phoneUser.findUnique({ where: { phone } });
  if (link) {
    const existing = await clerk.users.getUser(link.clerkUserId).catch(() => null);
    if (existing) {
      if (!existing.username) await clerk.users.updateUser(existing.id, { username: phoneUsername(phone) });
      return existing.id;
    }
    // The Clerk user was deleted: drop the stale link and make a new user below.
    await prisma.phoneUser.deleteMany({ where: { phone, clerkUserId: link.clerkUserId } });
  }

  const user = await clerk.users.createUser({ username: phoneUsername(phone), skipPasswordRequirement: true });
  try {
    await prisma.phoneUser.create({ data: { phone, clerkUserId: user.id } });
    return user.id;
  } catch (err) {
    // Another request linked this phone at the same time: keep theirs, remove ours.
    await clerk.users.deleteUser(user.id).catch(() => {});
    const winner = await prisma.phoneUser.findUnique({ where: { phone } });
    if (winner) return winner.clerkUserId;
    throw err;
  }
}
