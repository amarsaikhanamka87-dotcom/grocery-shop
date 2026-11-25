"use client";

import { useState } from "react";
import type { PosProduct } from "@/lib/catalog/getPosProducts";

export type PosLine = { product: PosProduct; quantity: number };

/**
 * The POS basket: products the cashier tapped, quantities capped at the stock left. Can start
 * filled (a handwritten order sent from /admin/handwriting).
 */
export function usePosCart(initialLines: PosLine[] = []) {
  const [lines, setLines] = useState<PosLine[]>(initialLines);

  const setQuantity = (productId: string, quantity: number) =>
    setLines((current) =>
      current
        .map((line) =>
          line.product.id === productId
            ? { ...line, quantity: Math.min(Math.max(0, Math.floor(quantity)), line.product.stock) }
            : line,
        )
        .filter((line) => line.quantity > 0),
    );

  const add = (product: PosProduct) => {
    if (product.stock < 1) return;
    setLines((current) => {
      const existing = current.find((line) => line.product.id === product.id);
      if (!existing) return [...current, { product, quantity: 1 }];
      return current.map((line) =>
        line === existing ? { ...line, quantity: Math.min(line.quantity + 1, product.stock) } : line,
      );
    });
  };

  const total = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  // productId → quantity, for the count badges on the product tiles.
  const quantities = new Map(lines.map((line) => [line.product.id, line.quantity]));
  return { lines, add, setQuantity, clear: () => setLines([]), total, quantities };
}
