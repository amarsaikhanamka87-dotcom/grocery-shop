type OrderPaymentKind = { paymentMethod: string; deliveryType: string | null };

/**
 * Online orders paid by bank transfer take their stock when they are placed (so nobody buys the
 * goods while the owner waits for the money) and give it back when cancelled. Every other order
 * (Wire, Касс sales incl. their "Дансаар") takes stock only when it is paid, in payOrder.
 */
export function holdsStock({ paymentMethod, deliveryType }: OrderPaymentKind) {
  return paymentMethod === "TRANSFER" && deliveryType !== "store";
}
