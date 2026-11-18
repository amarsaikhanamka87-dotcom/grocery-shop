import type { OrderStatus } from "@prisma/client";
import { ORDER_BADGES } from "./orderBadges";

/** The order-status badge; a delivered pickup order reads "Очиж авсан" instead of "Хүргэгдсэн". */
export function statusBadge(status: OrderStatus, pickup: boolean) {
  const badge = ORDER_BADGES.status[status];
  return pickup && status === "DELIVERED" ? { ...badge, label: "Очиж авсан" } : badge;
}
