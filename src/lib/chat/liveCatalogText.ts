import "server-only";
import { formatPrice } from "@/lib/format/formatPrice";
import { prisma } from "@/lib/prisma";

/**
 * Today's prices and stock, read from the DB for every chat question (they change with each sale,
 * so they are never put in the Pinecone file). The assistant is told to quote prices only from here.
 */
export async function liveCatalogText(): Promise<string> {
  const products = await prisma.product.findMany({
    orderBy: { name: "asc" },
    select: {
      name: true,
      price: true,
      oldPrice: true,
      unit: true,
      stock: true,
      minQty: true,
      category: { select: { name: true } },
    },
  });
  const lines = products.map((product) => {
    const stock = product.stock > 0 ? `үлдэгдэл ${product.stock} ${product.unit}` : "дууссан";
    const deal = product.oldPrice ? ` (ХЯМДАРСАН, өмнө ${formatPrice(product.oldPrice)})` : "";
    return `- ${product.name} (${product.category.name}): ${formatPrice(product.price)}${deal} / ${product.unit}, хамгийн бага ${product.minQty}, ${stock}`;
  });
  return ["[Одоогийн үнэ ба үлдэгдэл]", ...lines].join("\n");
}
