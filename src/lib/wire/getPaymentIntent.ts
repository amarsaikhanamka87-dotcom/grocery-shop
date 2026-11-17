import "server-only";
import type { WirePaymentIntent } from "@/types/wire";
import { wireRequest } from "./wireRequest";

/** Reads a PaymentIntent from Wire.mn (fallback when the webhook hasn't arrived). */
export function getPaymentIntent(id: string): Promise<WirePaymentIntent> {
  if (!/^pi_[a-z0-9]+$/i.test(id)) throw new Error("Bad PaymentIntent id");
  return wireRequest<WirePaymentIntent>(`/payment_intents/${id}`);
}
