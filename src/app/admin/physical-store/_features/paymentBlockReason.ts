import { formatPrice } from "@/lib/format/formatPrice";
import type { StorePaymentMethod } from "./storePaymentMethods";

type Bill = { isEmpty: boolean; total: number; method: StorePaymentMethod; received: string };

/**
 * Why "Төлбөр авах" can't be pressed yet, or null when it can. An empty bill blocks it; cash also
 * needs the amount handed over to cover the total.
 */
export function paymentBlockReason({ isEmpty, total, method, received }: Bill): string | null {
  if (isEmpty) return "Тооцоонд бараа нэмнэ үү.";
  if (method !== "CASH") return null;
  if (received === "") return "Авсан мөнгөө оруулна уу.";
  const short = total - Number(received);
  return short > 0 ? `Авсан мөнгө ${formatPrice(short)} дутуу байна.` : null;
}
