import "server-only";
import type { WireCheckoutSession, WirePaymentIntent } from "@/types/wire";
import { wireRequest } from "./wireRequest";

type Input = { orderId: string; orderNumber: number; amount: number; successUrl: string; cancelUrl: string };

/**
 * Creates a Wire.mn PaymentIntent for the order, then a hosted checkout session for it.
 * The buyer is sent to `url` (QR / bank app); the order is paid only via the webhook.
 */
export async function createWireCheckout(input: Input): Promise<{ intentId: string; url: string }> {
  const intent = await wireRequest<WirePaymentIntent>("/payment_intents", {
    method: "POST",
    idempotencyKey: `order-${input.orderId}-intent`,
    body: {
      amount: input.amount,
      currency: "MNT",
      description: `Захиалга #${input.orderNumber}`,
      metadata: { order_id: input.orderId },
    },
  });
  const session = await wireRequest<WireCheckoutSession>("/checkout/sessions", {
    method: "POST",
    idempotencyKey: `order-${input.orderId}-checkout`,
    body: { payment_intent: intent.id, success_url: input.successUrl, cancel_url: input.cancelUrl },
  });
  return { intentId: intent.id, url: session.url };
}
