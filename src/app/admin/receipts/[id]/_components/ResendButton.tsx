"use client";

import { useState, useTransition } from "react";
import { Loader2, Send } from "lucide-react";
import { resendReceipt } from "../_features/resendReceipt";

/** "И-мэйлээр илгээх": sends this receipt to the buyer's email again, then shows the outcome. */
export function ResendButton({ receiptId, disabled }: { receiptId: string; disabled: boolean }) {
  const [pending, start] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        disabled={disabled || pending}
        onClick={() => start(async () => setResult(await resendReceipt(receiptId)))}
        className="btn btn-primary h-10 px-4"
      >
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />} И-мэйлээр илгээх
      </button>
      {result && (
        <p className={`text-[13px] font-medium ${result.ok ? "text-brand" : "text-clay"}`}>{result.message}</p>
      )}
    </div>
  );
}
