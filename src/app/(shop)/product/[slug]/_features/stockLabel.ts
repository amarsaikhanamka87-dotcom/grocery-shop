import type { Product } from "@/types/catalog";
import { stockLevel } from "@/lib/catalog/stockLevel";
import { cartUnitLabel } from "@/lib/format/cartUnitLabel";

/** Stock line on the product page, worded like the product cards ("Бэлэн 50 шуудай"). */
export function stockLabel(p: Pick<Product, "stock" | "minQty" | "unit">): { text: string; inStock: boolean } {
  const level = stockLevel(p.stock, p.minQty);
  const unit = cartUnitLabel(p.unit);
  if (level === "ok") return { text: `Бэлэн ${p.stock} ${unit}`, inStock: true };
  if (level === "low") return { text: `Зөвхөн ${p.stock} ${unit} үлдсэн`, inStock: true };
  return { text: "Түр дууссан", inStock: false };
}
