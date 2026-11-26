import type { ReceiptEmailStatus } from "@prisma/client";

type Badge = { label: string; className: string };

// Same words as the filter tabs (ReceiptFilterTabs). Admin palette: green ok, clay problem, grey neutral.
const BADGES: Record<ReceiptEmailStatus, Badge> = {
  SENT: { label: "И-мэйл илгээсэн", className: "bg-brand-50 text-brand" },
  SKIPPED: { label: "Илгээгээгүй", className: "bg-ink/5 text-ink-2" },
  PENDING: { label: "Илгээж байна", className: "bg-ink/5 text-ink-2" },
  FAILED: { label: "Илгээж чадаагүй", className: "bg-clay-50 text-clay" },
};

/**
 * Label + pill colors for a receipt's email status. A receipt with no email (walk-in / phone-only
 * buyer) reads "И-мэйлгүй" instead of "Илгээгээгүй", which looked like something had failed.
 */
export function receiptStatusBadge(status: ReceiptEmailStatus, email: string | null): Badge {
  if (!email && status !== "SENT") return { label: "И-мэйлгүй", className: "bg-ink/5 text-ink-2" };
  return BADGES[status];
}
