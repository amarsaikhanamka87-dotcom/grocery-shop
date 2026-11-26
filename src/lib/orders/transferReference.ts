import { TRANSFER_CODE_PREFIX } from "@/lib/constants";

/**
 * The code the buyer writes as "Гүйлгээний утга" on a bank transfer: prefix + order number
 * (1042 -> "BZ1042"). Order numbers are unique, so the code finds exactly one order.
 */
export function transferReference(orderNumber: number) {
  return `${TRANSFER_CODE_PREFIX}${orderNumber}`;
}
