"use client";

import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { usePaymentPolling } from "../_features/usePaymentPolling";

/** Re-checks the order every few seconds while unpaid, plus a manual "Төлбөр шалгах" button. */
export function PaymentPoller() {
  const router = useRouter();
  usePaymentPolling(() => router.refresh());
  return (
    <button type="button" onClick={() => router.refresh()} className="btn btn-outline h-11 px-5">
      <RefreshCw className="size-4" /> Төлбөр шалгах
    </button>
  );
}
