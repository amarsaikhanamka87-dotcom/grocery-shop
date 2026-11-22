"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/format/formatPrice";
import { startPayment } from "../_features/startPayment";

/** "Төлөх" button: opens Wire.mn's payment page, or shows a friendly error. */
export function PayButton({ orderId, total }: { orderId: string; total: number }) {
  const [state, payAction, isPending] = useActionState(() => startPayment(orderId), { error: null });

  return (
    <form action={payAction} className="grid gap-2">
      <button type="submit" disabled={isPending} className="btn btn-primary h-12 w-full text-[15px]">
        {isPending && <Loader2 className="size-4 animate-spin" />} Төлөх · {formatPrice(total)}
      </button>
      {state.error && (
        <p role="alert" className="text-[13.5px] font-semibold text-clay">
          {state.error}
        </p>
      )}
    </form>
  );
}
