import type { Product } from "@/types/catalog";

/** Stock line on the product page: plenty, only N left, or out of stock. */
export function stockLabel(p: Pick<Product, "stock" | "minQty" | "unit">): { text: string; inStock: boolean } {
  if (p.stock >= p.minQty * 5) return { text: "● Нөөцөд байгаа", inStock: true };
  if (p.stock >= p.minQty) return { text: `● Зөвхөн ${p.stock} ${p.unit} үлдсэн`, inStock: true };
  return { text: "● Түр дууссан", inStock: false };
}
