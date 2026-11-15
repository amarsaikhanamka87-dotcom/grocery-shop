"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CartContext, type CartContextValue, type CartItem } from "./CartContext";
import { loadFromStorage } from "./loadFromStorage";
import { saveToStorage } from "./saveToStorage";

const CART_KEY = "urgats-cart";
const WISH_KEY = "urgats-wishlist";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Restore persisted state once on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(loadFromStorage<CartItem[]>(CART_KEY, []).map((i) => ({ ...i, minQty: i.minQty ?? 1 })));
    setWishlist(loadFromStorage<string[]>(WISH_KEY, []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) saveToStorage(CART_KEY, items);
  }, [items, ready]);

  useEffect(() => {
    if (ready) saveToStorage(WISH_KEY, wishlist);
  }, [wishlist, ready]);

  const add = useCallback<CartContextValue["add"]>((item, quantity) => {
    quantity = Math.max(quantity ?? item.minQty, item.minQty);
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId
            ? { ...i, ...item, quantity: Math.min(i.quantity + quantity, item.stock) }
            : i,
        );
      }
      return [...prev, { ...item, quantity: Math.min(quantity, item.stock) }];
    });
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.productId !== productId)
        : prev.map((i) =>
            i.productId === productId
              ? { ...i, quantity: Math.max(i.minQty, Math.min(quantity, i.stock)) }
              : i,
          ),
    );
  }, []);

  const remove = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const toggleWish = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    );
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.length,
      subtotal: items.reduce((n, i) => n + i.price * i.quantity, 0),
      ready,
      add,
      setQuantity,
      remove,
      clear,
      wishlist,
      toggleWish,
    }),
    [items, ready, add, setQuantity, remove, clear, wishlist, toggleWish],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
