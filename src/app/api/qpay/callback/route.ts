import { NextResponse, type NextRequest } from "next/server";
import { verifyCallback } from "@/lib/qpay";
import { syncOrderPayment } from "@/lib/payments";

// QPay calls this URL after a successful payment.
async function handle(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get("order") ?? "";
  const sig = req.nextUrl.searchParams.get("sig") ?? "";
  if (!orderId || !verifyCallback(orderId, sig)) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }
  try {
    const order = await syncOrderPayment(orderId);
    return NextResponse.json({ ok: true, paid: order?.paymentStatus === "PAID" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export const GET = handle;
export const POST = handle;
