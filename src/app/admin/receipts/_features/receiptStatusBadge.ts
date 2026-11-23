import type { ReceiptEmailStatus } from "@prisma/client";

/** Label + pill colors for a receipt's email status (admin "Баримт"). */
export const RECEIPT_STATUS_BADGE: Record<ReceiptEmailStatus, { label: string; className: string }> = {
  SENT: { label: "И-мэйл илгээсэн", className: "bg-brand-50 text-brand" },
  SKIPPED: { label: "Илгээгээгүй", className: "bg-cream-2 text-muted-foreground" },
  PENDING: { label: "Илгээж байна", className: "bg-amber-100 text-amber-800" },
  FAILED: { label: "Илгээж чадсангүй", className: "bg-clay/15 text-clay" },
};
