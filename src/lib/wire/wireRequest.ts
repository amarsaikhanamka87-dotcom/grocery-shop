import "server-only";

const WIRE_API = "https://api.wire.mn/v1";

/**
 * Calls the Wire.mn REST API with the secret key (WIRE_API_KEY, sk_live_…).
 * Every POST needs an Idempotency-Key so a retry never charges twice.
 */
export async function wireRequest<T>(
  path: string,
  init: { method?: "GET" | "POST"; body?: unknown; idempotencyKey?: string } = {},
): Promise<T> {
  const key = process.env.WIRE_API_KEY;
  if (!key) throw new Error("WIRE_API_KEY is not set");

  const headers: Record<string, string> = { Authorization: `Bearer ${key}` };
  if (init.body !== undefined) headers["Content-Type"] = "application/json";
  if (init.idempotencyKey) headers["Idempotency-Key"] = init.idempotencyKey;

  const res = await fetch(`${WIRE_API}${path}`, {
    method: init.method ?? "GET",
    headers,
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const code = data?.error?.code ?? data?.code ?? res.status;
    throw new Error(`Wire ${init.method ?? "GET"} ${path} failed: ${code}`);
  }
  return data as T;
}
