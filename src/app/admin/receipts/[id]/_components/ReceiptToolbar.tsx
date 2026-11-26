import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";
import type { ReceiptEmailStatus } from "@prisma/client";
import { formatDayTimeMn } from "@/lib/format/formatDayTimeMn";
import { receiptStatusBadge } from "../../_features/receiptStatusBadge";
import { ResendButton } from "./ResendButton";

type Props = {
  receiptId: string;
  email: string | null;
  emailStatus: ReceiptEmailStatus;
  emailedAt: Date | null;
};

/** Above the sheet: back link, email status, "Хэвлэх" (print page in a new tab) and resend. */
export function ReceiptToolbar({ receiptId, email, emailStatus, emailedAt }: Props) {
  const badge = receiptStatusBadge(emailStatus, email);
  return (
    <div className="card mt-6 flex flex-wrap items-start justify-between gap-4 p-4 sm:p-5">
      <div className="grid gap-1.5">
        <Link href="/admin/receipts" className="flex h-11 items-center gap-1 text-[14px] font-bold text-brand hover:underline">
          <ArrowLeft className="size-4" /> Бүх баримт
        </Link>
        <span className="flex flex-wrap items-center gap-2 text-[13.5px]">
          <span className={`rounded-full px-2.5 py-1 text-[13px] font-bold ${badge.className}`}>{badge.label}</span>
          {/* No email: the "И-мэйлгүй" badge already says it, so no second text. */}
          {email && (
            <span className="text-muted-foreground">
              {email}
              {emailedAt && ` · ${formatDayTimeMn(emailedAt)}`}
            </span>
          )}
        </span>
      </div>
      <div className="flex flex-wrap items-start gap-2">
        <a href={`/admin/receipts/${receiptId}/print`} target="_blank" rel="noopener" className="btn btn-outline h-11 px-4">
          <Printer className="size-4" /> Хэвлэх
        </a>
        {/* No email = nothing to send to, so no (dead, greyed-out) send button. */}
        {email && <ResendButton receiptId={receiptId} alreadySent={emailStatus === "SENT"} />}
      </div>
    </div>
  );
}
