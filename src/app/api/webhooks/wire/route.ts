import { verifyWireWebhook } from "@/lib/wire/verifyWireWebhook";
import { markOrderPaid } from "@/lib/orders/markOrderPaid";

/**
 * Wire.mn webhook. Register https://<site>/api/webhooks/wire for `payment_intent.succeeded`
 * and put its whsec_… secret in WIRE_WEBHOOK_SECRET. The only place an order becomes PAID.
 */
export async function POST(request: Request) {
  const raw = await request.text(); // the signature covers the exact raw body
  const event = verifyWireWebhook(raw, request.headers.get("wirepayment-signature"));
  if (!event) return new Response("invalid signature", { status: 400 });

  if (event.type === "payment_intent.succeeded" && event.data.status === "succeeded") {
    try {
      await markOrderPaid(event.data.id, event.data.amount);
    } catch (err) {
      console.error("[wire] webhook failed", err);
      return new Response("retry", { status: 500 }); // Wire retries 5xx
    }
  }
  return new Response("ok", { status: 200 });
}
