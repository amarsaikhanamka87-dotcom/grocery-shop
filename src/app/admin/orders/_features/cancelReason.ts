import { TRANSFER_HOLD_HOURS } from "@/lib/constants";

type Order = { status: string; paymentMethod: string };

/**
 * Why a cancelled order was cancelled, so it doesn't just turn "Цуцалсан" overnight with no word.
 * Bank transfers: the money never came (owner's "Цуцлах" or the automatic 24 h cancel). Wire:
 * the only cancel is placeOrder's, when the payment page could not be opened.
 */
export function cancelReason(o: Order): string | null {
  if (o.status !== "CANCELLED") return null;
  if (o.paymentMethod === "TRANSFER")
    return `Мөнгө ороогүй тул цуцалсан (та эсвэл ${TRANSFER_HOLD_HOURS} цагийн дараа автоматаар). Бараа үлдэгдэлд буцсан.`;
  if (o.paymentMethod === "WIRE") return "Төлбөрийн хуудас нээгдээгүй тул цуцлагдсан.";
  return null;
}
