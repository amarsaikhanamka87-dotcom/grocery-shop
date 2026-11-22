"use client";

import { useState, useTransition } from "react";
import { Check, Loader2, X } from "lucide-react";
import type { BusinessStatus } from "@prisma/client";
import { approveApplication } from "../_features/approveApplication";
import { rejectApplication } from "../_features/rejectApplication";

export function ReviewActions({ id, status }: { id: string; status: BusinessStatus }) {
  const [pending, start] = useTransition();
  const [reason, setReason] = useState("");
  const [rejecting, setRejecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reject = () => start(async () => setError((await rejectApplication(id, reason)).error));
  const approve = () => start(async () => setError((await approveApplication(id)).error));
  const errorText = error && <p role="alert" className="w-full text-[13px] font-semibold text-clay">{error}</p>;

  if (rejecting) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Шалтгаан" className="input h-9 w-48 py-1" />
        <button disabled={pending} onClick={reject} className="btn h-9 bg-clay px-3 text-sm text-white">
          {pending ? <Loader2 className="size-4 animate-spin" /> : <X className="size-4" />} Татгалзах
        </button>
        <button onClick={() => setRejecting(false)} className="text-sm font-semibold text-muted-foreground">Болих</button>
        {errorText}
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-2">
      {status !== "APPROVED" && (
        <button disabled={pending} onClick={approve} className="btn btn-primary h-9 px-3 text-sm">
          {pending ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />} Зөвшөөрөх
        </button>
      )}
      {status !== "REJECTED" && (
        <button onClick={() => setRejecting(true)} className="btn btn-outline h-9 px-3 text-sm">
          <X className="size-4" /> {status === "APPROVED" ? "Цуцлах" : "Татгалзах"}
        </button>
      )}
      {errorText}
    </div>
  );
}
