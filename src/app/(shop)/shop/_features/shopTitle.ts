import type { Category } from "@/types/catalog";
import type { ShopParams } from "./shopHref";

/** Heading for /shop: search text, deals, the chosen category, or "all". */
export function shopTitle(params: ShopParams, current: Category | undefined): string {
  if (params.q) return `“${params.q}” хайлтын үр дүн`;
  if (params.deals) return "Хямдралтай бүтээгдэхүүн";
  return current?.name ?? "Бүх бүтээгдэхүүн";
}
