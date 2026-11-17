import type { FoundAddress } from "@/types/location";

/** One-line text for an address, e.g. "Сүхбаатарын талбай, Сүхбаатар дүүрэг". */
export function addressLabel(a: FoundAddress): string {
  return [a.detail, a.district && `${a.district} дүүрэг`].filter(Boolean).join(", ");
}
