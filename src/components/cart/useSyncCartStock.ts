"use client";

import { useEffect } from "react";
import { getStockLevels } from "@/lib/catalog/getStockLevels";
import { useCart } from "./useCart";

/** Re-reads the DB stock of every cart product when the page opens or the cart's products change. */
export function useSyncCartStock() {
  const { items, ready, refreshStock } = useCart();
  const key = items.map((i) => i.productId).sort().join(",");

  useEffect(() => {
    if (!ready || !key) return;
    let live = true;
    getStockLevels(key.split(","))
      .then((levels) => live && refreshStock(levels))
      .catch(() => {}); // offline: keep the cart's copy, checkout re-checks on the server anyway
    return () => {
      live = false;
    };
  }, [key, ready, refreshStock]);
}
