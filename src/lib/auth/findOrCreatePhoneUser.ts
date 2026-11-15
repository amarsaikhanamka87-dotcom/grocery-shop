import "server-only";
import { clerkClient } from "@clerk/nextjs/server";

/**
 * Finds the Clerk user with this phone, or creates one. Only call this after the phone was
 * verified by our own SMS code (src/lib/otp): numbers added through the Backend API are
 * marked verified by Clerk.
 */
export async function findOrCreatePhoneUser(phone: string): Promise<string> {
  const clerk = await clerkClient();
  const { data } = await clerk.users.getUserList({ phoneNumber: [phone], limit: 1 });
  if (data[0]) return data[0].id;
  const user = await clerk.users.createUser({ phoneNumber: [phone] });
  return user.id;
}
