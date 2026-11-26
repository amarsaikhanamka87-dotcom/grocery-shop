"use client";

import { useState } from "react";

export type PaymentChoice = "WIRE" | "TRANSFER";

/** Checkout "Төлбөрийн хэлбэр": Wire.mn (QR / bank app) or a direct bank transfer. */
export function usePaymentChoice() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentChoice>("WIRE");
  return { paymentMethod, setPaymentMethod, isTransfer: paymentMethod === "TRANSFER" };
}
