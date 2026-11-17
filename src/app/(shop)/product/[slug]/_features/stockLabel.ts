import type { Product } from "@/types/catalog";
import { stockLevel } from "@/lib/catalog/stockLevel";

/** Stock line on the product page: plenty, only N left, or out of stock. */
export function stockLabel(p: Pick<Product, "stock" | "minQty" | "unit">): { text: string; inStock: boolean } {
  const level = stockLevel(p.stock, p.minQty);
  if (level === "ok") return { text: "● Нөөцөд байгаа", inStock: true };
  if (level === "low") return { text: `● Зөвхөн ${p.stock} ${p.unit} үлдсэн`, inStock: true };
  return { text: "● Түр дууссан", inStock: false };
}
