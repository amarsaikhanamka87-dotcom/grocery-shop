import "server-only";
import { prisma } from "@/lib/prisma";

/** Name + slug of the products with these slugs (unknown slugs are skipped). */
export async function getProductsBySlugs(slugs: string[]): Promise<{ name: string; slug: string }[]> {
  if (slugs.length === 0) return [];
  return prisma.product.findMany({
    where: { slug: { in: slugs } },
    select: { name: true, slug: true },
    orderBy: { name: "asc" },
  });
}
