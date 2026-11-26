/** /admin/orders tabs: check a bank transfer, hand over, unpaid (Wire), done, cancelled. */
export type OrderView = "check" | "todo" | "unpaid" | "done" | "cancelled";

/** /admin/orders type switch: all, delivery, pickup. */
export type OrderKind = "" | "delivery" | "pickup";
