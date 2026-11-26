"use client";

import { useState, useTransition } from "react";
import { cancelTransferOrder } from "./cancelTransferOrder";

/** Ask-first state for "Цуцлах" on an unpaid bank-transfer order. */
export function useCancelTransfer(orderId: string) {
  const [isPending, start] = useTransition();
  const [isConfirming, setIsConfirming] = useState(false);
  const [hasError, setHasError] = useState(false);

  const confirmCancel = () =>
    start(async () => {
      const result = await cancelTransferOrder(orderId);
      setHasError(!result.ok);
      if (result.ok) setIsConfirming(false);
    });

  return { isPending, isConfirming, hasError, setIsConfirming, confirmCancel };
}
