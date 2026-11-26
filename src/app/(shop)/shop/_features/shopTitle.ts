import type { Category } from "@/types/catalog";
import type { ShopParams } from "./shopHref";

/** Heading for /shop: the search text, else the category and any filters, else "all". */
export function shopTitle(params: ShopParams, current: Category | undefined): string {
  if (params.q) return `“${params.q}” хайлтын үр дүн`;
  if (current) {
    const filters = [params.organic && "Органик", params.deals && "Хямдралтай"].filter(Boolean);
    // A no-break space after "·" so "· Органик" wraps as one piece.
    return [current.name, ...filters].join(" ·\u00a0");
  }
  if (params.deals && params.organic) return "Хямдралтай органик бүтээгдэхүүн";
  if (params.deals) return "Хямдралтай бүтээгдэхүүн";
  if (params.organic) return "Органик бүтээгдэхүүн";
  return "Бүх бүтээгдэхүүн";
}
