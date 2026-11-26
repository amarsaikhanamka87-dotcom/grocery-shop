import "server-only";
import { prisma } from "@/lib/prisma";
import { TRANSFER_HOLD_HOURS } from "@/lib/constants";
import { cancelHeldOrder } from "./cancelHeldOrder";

/**
 * Cancels every bank-transfer order still unpaid TRANSFER_HOLD_HOURS after it was placed and
 * returns its held stock. Run hourly (Netlify schedule) and when checkout / order pages open.
 * Never throws: a failure here must not break the page that called it. Returns how many changed.
 */
export async function cancelExpiredTransfers(): Promise<number> {
  try {
    const cutoff = new Date(Date.now() - TRANSFER_HOLD_HOURS * 60 * 60 * 1000);
    const expired = await prisma.order.findMany({
      where: {
        paymentMethod: "TRANSFER",
        paymentStatus: "UNPAID",
        status: { not: "CANCELLED" },
        createdAt: { lt: cutoff },
        OR: [{ deliveryType: null }, { deliveryType: { not: "store" } }],
      },
      select: { id: true },
      take: 100,
    });
    let cancelledCount = 0;
    for (const order of expired) {
      if (await cancelHeldOrder(order.id)) cancelledCount += 1;
    }
    return cancelledCount;
  } catch (error) {
    console.error("[transfer] expiring old orders failed", error);
    return 0;
  }
}
