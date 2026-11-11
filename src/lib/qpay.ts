import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * QPay merchant API v2.
 * Sandbox: https://merchant-sandbox.qpay.mn/v2 (TEST_MERCHANT / 123456 / TEST_INVOICE)
 * Production: https://merchant.qpay.mn/v2 (credentials from your QPay merchant contract)
 */
const BASE = process.env.QPAY_BASE_URL ?? "https://merchant-sandbox.qpay.mn/v2";
const CLIENT_ID = process.env.QPAY_CLIENT_ID ?? "";
const CLIENT_SECRET = process.env.QPAY_CLIENT_SECRET ?? "";
const INVOICE_CODE = process.env.QPAY_INVOICE_CODE ?? "";

export const qpayIsSandbox = BASE.includes("sandbox");

let cached: { token: string; expiresAt: number } | null = null;

async function token(): Promise<string> {
  if (cached && cached.expiresAt > Date.now() + 60_000) return cached.token;
  if (!CLIENT_ID || !CLIENT_SECRET) throw new Error("QPAY_CLIENT_ID / QPAY_CLIENT_SECRET are not set");
  const res = await fetch(`${BASE}/auth/token`, {
    method: "POST",
    headers: { Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`QPay auth failed: ${res.status}`);
  const data = (await res.json()) as { access_token: string; expires_in: number };
  // expires_in is a unix timestamp (seconds) in QPay's API.
  const expiresAt = data.expires_in > 1e9 ? data.expires_in * 1000 : Date.now() + data.expires_in * 1000;
  cached = { token: data.access_token, expiresAt };
  return data.access_token;
}

async function call<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${await token()}`, ...init.headers },
    cache: "no-store",
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`QPay ${path} failed: ${res.status} ${text.slice(0, 200)}`);
  return (text ? JSON.parse(text) : {}) as T;
}

export type QPayUrl = { name: string; description: string; logo: string; link: string };

export type QPayInvoice = {
  invoice_id: string;
  qr_text: string;
  qr_image: string; // base64 PNG
  qPay_shortUrl: string;
  urls: QPayUrl[];
};

export function createInvoice(input: { orderNo: string; amount: number; description: string; callbackUrl: string }) {
  return call<QPayInvoice>("/invoice", {
    method: "POST",
    body: JSON.stringify({
      invoice_code: INVOICE_CODE,
      sender_invoice_no: input.orderNo,
      invoice_receiver_code: "terminal",
      invoice_description: input.description,
      amount: input.amount,
      callback_url: input.callbackUrl,
    }),
  });
}

type PaymentCheck = {
  count: number;
  paid_amount?: number;
  rows: { payment_id: string; payment_status: string; payment_amount: string | number }[];
};

/** Returns the total amount QPay reports as PAID for this invoice. */
export async function paidAmount(invoiceId: string) {
  const data = await call<PaymentCheck>("/payment/check", {
    method: "POST",
    body: JSON.stringify({ object_type: "INVOICE", object_id: invoiceId, offset: { page_number: 1, page_limit: 100 } }),
  });
  return data.rows
    .filter((r) => r.payment_status === "PAID")
    .reduce((sum, r) => sum + Number(r.payment_amount), 0);
}

export async function cancelInvoice(invoiceId: string) {
  try {
    await call(`/invoice/${invoiceId}`, { method: "DELETE" });
  } catch (e) {
    console.error(e);
  }
}

/* Callback URLs carry an HMAC so random requests can't trigger checks for arbitrary orders. */
function sign(orderId: string) {
  return createHmac("sha256", process.env.AUTH_SECRET ?? "").update(`qpay:${orderId}`).digest("hex").slice(0, 32);
}

export function callbackUrl(orderId: string) {
  const base = (process.env.APP_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return `${base}/api/qpay/callback?order=${encodeURIComponent(orderId)}&sig=${sign(orderId)}`;
}

export function verifyCallback(orderId: string, sig: string) {
  const expected = Buffer.from(sign(orderId));
  const given = Buffer.from(sig);
  return expected.length === given.length && timingSafeEqual(expected, given);
}
