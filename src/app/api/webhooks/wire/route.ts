import { verifyWireWebhook } from "@/lib/wire/verifyWireWebhook";
import { markOrderPaid } from "@/lib/orders/markOrderPaid";

export async function POST(request: Request) {
  const raw = await request.text();
  const event = verifyWireWebhook(
    raw,
    request.headers.get("wirepayment-signature"),
  );
  if (!event) return new Response("invalid signature", { status: 400 });

  if (
    event.type === "payment_intent.succeeded" &&
    event.data.status === "succeeded"
  ) {
    try {
      await markOrderPaid(event.data.id, event.data.amount);
    } catch (err) {
      console.error("[wire] webhook failed", err);
      return new Response("retry", { status: 500 }); // Wire retries 5xx
    }
  }
  return new Response("ok", { status: 200 });
}
