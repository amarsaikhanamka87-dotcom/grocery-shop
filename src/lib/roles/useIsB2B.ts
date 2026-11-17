"use client";

import { useUser } from "@clerk/nextjs";

/** Browser-side check for showing B2B perks (free delivery). Prices are re-checked on the server. */
export function useIsB2B(): boolean {
  const { user } = useUser();
  return user?.publicMetadata.role === "b2b";
}
