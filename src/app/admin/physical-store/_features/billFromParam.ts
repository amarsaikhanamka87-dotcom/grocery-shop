import type { PosProduct } from "@/lib/catalog/getPosProducts";
import type { PosLine } from "./usePosCart";

/**
 * Starting bill from "?bill=productId:qty,productId:qty" (sent by /admin/handwriting). Unknown
 * products, out-of-stock items and bad numbers are dropped; quantities are capped at the stock.
 */
export function billFromParam(bill: string | undefined, products: PosProduct[]): PosLine[] {
  if (!bill) return [];
  const byId = new Map(products.map((product) => [product.id, product]));
  const lines = new Map<string, PosLine>();
  for (const entry of bill.split(",").slice(0, 100)) {
    const [productId, rawQuantity] = entry.split(":");
    const product = byId.get(productId);
    const quantity = Math.floor(Number(rawQuantity));
    if (!product || product.stock < 1 || !Number.isFinite(quantity) || quantity < 1) continue;
    const previous = lines.get(productId)?.quantity ?? 0;
    lines.set(productId, { product, quantity: Math.min(previous + quantity, product.stock) });
  }
  return [...lines.values()];
}
