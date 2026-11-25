"use client";

import { useState, useTransition } from "react";
import { recordStoreSale } from "./recordStoreSale";
import type { StorePaymentMethod } from "./storePaymentMethods";
import type { PosLine } from "./usePosCart";

type DoneSale = { orderNumber: number; total: number; receiptId: string | null };

/** Sends the POS bill to recordStoreSale and keeps the result (done sale or error). */
export function useStoreCheckout(onSaved: () => void) {
  const [isSaving, startSaving] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [doneSale, setDoneSale] = useState<DoneSale | null>(null);

  const checkout = (lines: PosLine[], paymentMethod: StorePaymentMethod, customerName: string) =>
    startSaving(async () => {
      setError(null);
      const result = await recordStoreSale({
        items: lines.map((line) => ({ productId: line.product.id, quantity: line.quantity })),
        paymentMethod,
        customerName: customerName.trim() || undefined,
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setDoneSale({ orderNumber: result.orderNumber, total: result.total, receiptId: result.receiptId });
      onSaved();
    });

  return { checkout, isSaving, error, doneSale, startNext: () => setDoneSale(null) };
}
