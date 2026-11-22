import "server-only";
import { Wire } from "@buildry-wire/wire";

let client: Wire | null = null;

/** The Wire.mn SDK client with our secret key (WIRE_API_KEY, sk_live_…). Server only. */
export function getWireClient(): Wire {
  const key = process.env.WIRE_API_KEY;
  if (!key) throw new Error("WIRE_API_KEY is not set");
  client ??= new Wire(key, { timeoutMs: 15_000 });
  return client;
}
