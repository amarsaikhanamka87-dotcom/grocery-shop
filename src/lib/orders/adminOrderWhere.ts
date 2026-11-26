import type { Prisma } from "@prisma/client";
import type { OrderKind, OrderView } from "@/types/orders";

const OPEN = { status: { notIn: ["CANCELLED", "DELIVERED"] } } satisfies Prisma.OrderWhereInput;

const BY_VIEW: Record<OrderView, Prisma.OrderWhereInput> = {
  check: { ...OPEN, paymentMethod: "TRANSFER", paymentStatus: "UNPAID" },
  todo: { ...OPEN, paymentStatus: "PAID" },
  unpaid: { ...OPEN, paymentMethod: { not: "TRANSFER" }, paymentStatus: "UNPAID" },
  done: { status: "DELIVERED" },
  cancelled: { status: "CANCELLED" },
};

/**
 * Prisma filter for one /admin/orders tab + type. Касс (walk-in) sales are never listed: they live
 * on /admin/physical-store and in Баримт. A null deliveryType (old orders, all delivered) must stay
 * in, so never a plain `not: "store"`.
 */
export function adminOrderWhere(view: OrderView, kind: OrderKind): Prisma.OrderWhereInput {
  const byKind: Prisma.OrderWhereInput =
    kind === "pickup"
      ? { deliveryType: "pickup" }
      : kind === "delivery"
        ? { OR: [{ deliveryType: null }, { deliveryType: { notIn: ["pickup", "store"] } }] }
        : {};
  return {
    AND: [{ OR: [{ deliveryType: null }, { deliveryType: { not: "store" } }] }, BY_VIEW[view], byKind],
  };
}
