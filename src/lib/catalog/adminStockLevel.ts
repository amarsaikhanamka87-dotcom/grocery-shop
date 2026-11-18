export type StockLevel = "out" | "low" | "ok";

/** "out" at 0, "low" when a buyer can't order the min qty, otherwise "ok". */
export function adminStockLevel(stock: number, minQty: number): StockLevel {
  if (stock <= 0) return "out";
  return stock < minQty ? "low" : "ok";
}
