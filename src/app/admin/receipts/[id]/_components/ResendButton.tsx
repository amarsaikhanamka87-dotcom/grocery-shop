"use client";

import { useState, useTransition } from "react";
import { Loader2, Send } from "lucide-react";
import { resendReceipt } from "../_features/resendReceipt";

/** "И-мэйлээр илгээх" (or a quieter "Дахин илгээх" once it was sent), then shows the outcome. */
export function ResendButton({ receiptId, alreadySent }: { receiptId: string; alreadySent: boolean }) {
  const [pending, start] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        disabled={pending}
        onClick={() => start(async () => setResult(await resendReceipt(receiptId)))}
        className={`btn h-11 px-4 ${alreadySent ? "btn-outline" : "btn-primary"}`}
      >
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}{" "}
        {alreadySent ? "Дахин илгээх" : "И-мэйлээр илгээх"}
      </button>
      {result && (
        <p className={`text-[13px] font-medium ${result.ok ? "text-brand" : "text-clay"}`}>{result.message}</p>
      )}
    </div>
  );
}
