/** How a walk-in buyer can pay at the market stall (saved as Order.paymentMethod). */
export const STORE_PAYMENT_METHODS = ["CASH", "CARD", "TRANSFER"] as const;

export type StorePaymentMethod = (typeof STORE_PAYMENT_METHODS)[number];
