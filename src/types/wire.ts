/** Wire.mn API shapes we use (https://docs.wire.mn). Amounts are integer tögrög. */
export type WirePaymentIntentStatus =
  | "requires_payment_method"
  | "requires_action"
  | "requires_capture"
  | "processing"
  | "succeeded"
  | "canceled";

export type WirePaymentIntent = {
  id: string; // pi_…
  status: WirePaymentIntentStatus;
  amount: number;
  currency: "MNT";
  expires_at?: number;
  metadata?: Record<string, string>;
};

export type WireCheckoutSession = { id: string; status: string; url: string; payment_intent: string };

export type WireEvent = {
  id: string; // evt_…
  type: "payment_intent.succeeded" | "payment_intent.payment_failed" | "payment_intent.canceled" | "charge.refunded";
  created: number;
  data: { id: string; object: string; status: string; amount: number; currency?: string };
};
