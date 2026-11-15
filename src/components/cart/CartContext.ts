"use client";

import { createContext } from "react";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  unit: string;
  price: number;
  quantity: number;
  stock: number;
  minQty: number;
};

export type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  ready: boolean;
  add: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  wishlist: string[];
  toggleWish: (productId: string) => void;
};

/** Cart + wishlist state, provided by <CartProvider> and read with useCart(). */
export const CartContext = createContext<CartContextValue | null>(null);
