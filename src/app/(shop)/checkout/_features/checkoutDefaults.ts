import type { User } from "@clerk/nextjs/server";

/** Pre-fills the recipient from the Clerk account: full name and the 8-digit local phone. */
export function checkoutDefaults(user: User | null): { name: string; phone: string } {
  return {
    name: user?.fullName ?? "",
    phone: user?.primaryPhoneNumber?.phoneNumber.replace(/^\+976/, "") ?? "",
  };
}
