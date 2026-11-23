import type { ReceiptEmailStatus } from "@prisma/client";

const STATUSES: ReceiptEmailStatus[] = ["SENT", "SKIPPED", "PENDING", "FAILED"];

/** `?status=` from the URL → a known email status, or undefined for "Бүгд". */
export function parseReceiptStatus(value: string | undefined): ReceiptEmailStatus | undefined {
  return STATUSES.find((status) => status === value);
}
