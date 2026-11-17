"use client";

import { useState, useTransition } from "react";
import type { Product } from "@prisma/client";
import type { MonthlyItem, MonthlyOrder } from "@/types/business";
import { saveMonthlyOrder } from "./saveMonthlyOrder";

/** Editable copy of the monthly list + save. Quantities never go below a product's minimum. */
export function useMonthlyOrderDraft(initial: MonthlyOrder) {
  const [items, setItems] = useState<MonthlyItem[]>(initial.items);
  const [dayOfMonth, setDayOfMonth] = useState(initial.dayOfMonth);
  const [active, setActive] = useState(initial.active);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [saving, startSaving] = useTransition();

  const add = (product: Product) =>
    setItems((prev) => (prev.some((i) => i.product.id === product.id) ? prev : [...prev, { product, quantity: product.minQty }]));
  const remove = (productId: string) => setItems((prev) => prev.filter((i) => i.product.id !== productId));
  const setQuantity = (productId: string, q: number) =>
    setItems((prev) => prev.map((i) => (i.product.id === productId ? { ...i, quantity: Math.max(i.product.minQty, Math.round(q) || 0) } : i)));

  const save = () =>
    startSaving(async () => {
      const res = await saveMonthlyOrder({
        dayOfMonth,
        active,
        items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
      });
      setMessage(res.error ? { ok: false, text: res.error } : { ok: true, text: "Хадгалагдлаа." });
    });

  return { items, dayOfMonth, setDayOfMonth, active, setActive, add, remove, setQuantity, save, saving, message };
}
