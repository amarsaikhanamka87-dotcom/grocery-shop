import type { Product } from "@prisma/client";

/** One line of a B2B monthly order list, with the product it refers to. */
export type MonthlyItem = { product: Product; quantity: number };

/** The monthly order list as the editor uses it. */
export type MonthlyOrder = { dayOfMonth: number; active: boolean; items: MonthlyItem[] };
