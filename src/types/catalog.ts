import type { Category, Product } from "@prisma/client";

// Shapes come from the database schema (prisma/schema/*.prisma), so they can't drift from it.
export type { Category, Product };

export type CategoryWithCount = Category & { productCount: number };

export type ProductWithCategory = Product & { category: Category };

export type ProductSort = "popular" | "new" | "price-asc" | "price-desc";

export type ProductFilter = {
  category?: string;
  q?: string;
  sort?: string;
  deals?: boolean;
  organic?: boolean;
};
