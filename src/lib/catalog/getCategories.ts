import "server-only";
import { prisma } from "@/lib/prisma";
import type { CategoryWithCount } from "@/types/catalog";

export async function getCategories(): Promise<CategoryWithCount[]> {
  const rows = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  });
  return rows.map(({ _count, ...c }) => ({ ...c, productCount: _count.products }));
}
