export type StockLevel = "out" | "low" | "ok";

/** Out = can't fill even one minimum order; low = fewer than 5 minimum orders left. */
export function stockLevel(stock: number, minQty: number): StockLevel {
  if (stock < minQty) return "out";
  if (stock < minQty * 5) return "low";
  return "ok";
}
