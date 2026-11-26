import { timingSafeEqual } from "node:crypto";
import { cancelExpiredTransfers } from "@/lib/orders/cancelExpiredTransfers";

const isValidSecret = (given: string | null) => {
  const expected = process.env.CRON_SECRET;
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
};

/** Called hourly by netlify/functions/cancelExpiredTransfers.mts (header x-cron-secret). */
export async function POST(request: Request) {
  if (!isValidSecret(request.headers.get("x-cron-secret"))) return new Response("forbidden", { status: 403 });
  const cancelledCount = await cancelExpiredTransfers();
  return Response.json({ cancelled: cancelledCount });
}
