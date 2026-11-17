import "server-only";
import { prisma } from "@/lib/prisma";
import type { CheckoutInput } from "./checkoutSchema";

type Line = { productId: string; name: string; image: string; unit: string; price: number; quantity: number };

/**
 * Re-reads every cart product from the DB (price, stock, minimum quantity) and builds the order
 * lines. The browser's prices are never used. Returns an error text when something is off.
 */
export async function priceOrderLines(
  items: CheckoutInput["items"],
): Promise<{ lines: Line[]; subtotal: number } | { error: string }> {
  const products = await prisma.product.findMany({ where: { id: { in: items.map((i) => i.productId) } } });
  const lines: Line[] = [];
  for (const item of items) {
    const p = products.find((x) => x.id === item.productId);
    if (!p) return { error: "Сагсанд байгаа зарим бүтээгдэхүүн олдсонгүй. Сагсаа шинэчилнэ үү." };
    if (item.quantity < p.minQty) return { error: `${p.name}: хамгийн багадаа ${p.minQty} ${p.unit} захиална.` };
    if (item.quantity > p.stock) return { error: `${p.name}: үлдэгдэл ${p.stock} ${p.unit} байна.` };
    lines.push({ productId: p.id, name: p.name, image: p.image, unit: p.unit, price: p.price, quantity: item.quantity });
  }
  return { lines, subtotal: lines.reduce((n, l) => n + l.price * l.quantity, 0) };
}
