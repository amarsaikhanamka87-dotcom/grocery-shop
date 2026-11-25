import "server-only";
import type { WirePaymentIntent } from "@/types/wire";
import { getWireClient } from "./getWireClient";

/** Reads a PaymentIntent from Wire.mn (fallback when the webhook hasn't arrived). */
export function getPaymentIntent(id: string): Promise<WirePaymentIntent> {
  if (!/^pi_[a-z0-9]+$/i.test(id)) throw new Error("Bad PaymentIntent id");
  return getWireClient().request<WirePaymentIntent>("GET", `/v1/payment_intents/${id}`);
}
