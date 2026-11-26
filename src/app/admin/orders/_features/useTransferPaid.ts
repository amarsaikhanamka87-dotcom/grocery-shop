"use client";

import { useState, useTransition } from "react";
import { markPaidByTransfer } from "./markPaidByTransfer";

/** Ask-first state for "Дансаар төлсөн": confirm step, saving, and a failed save. */
export function useTransferPaid(orderId: string) {
  const [isPending, start] = useTransition();
  const [isConfirming, setIsConfirming] = useState(false);
  const [hasError, setHasError] = useState(false);

  const confirmTransfer = () =>
    start(async () => {
      const result = await markPaidByTransfer(orderId);
      setHasError(!result.ok);
      if (result.ok) setIsConfirming(false);
    });

  return { isPending, isConfirming, hasError, setIsConfirming, confirmTransfer };
}
