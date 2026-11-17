import "server-only";

/**
 * Demo payments: with no WIRE_API_KEY set, checkout goes to our own /pay/demo page instead of
 * Wire.mn, so orders and stock can be tested without real money. Set the key to go live.
 */
export function isDemoPayment(): boolean {
  return !process.env.WIRE_API_KEY;
}
