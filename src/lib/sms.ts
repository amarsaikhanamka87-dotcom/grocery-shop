import "server-only";

/**
 * Sends one SMS through the Mongolian SMS provider's HTTP API.
 *
 * TODO(provider): the request below is a generic JSON POST. Once the provider is chosen, change
 * the URL/body/headers to match its API docs. Config lives in env (see .env.example):
 * SMS_API_URL, SMS_API_KEY, SMS_SENDER.
 *
 * Without SMS_API_URL in development, the message is printed to the dev server terminal so phone
 * login can be tested locally. In production a missing config is an error (never log codes there).
 */
export async function sendSms(to: string, text: string): Promise<void> {
  const url = process.env.SMS_API_URL;

  if (!url) {
    if (process.env.NODE_ENV === "production") throw new Error("SMS_API_URL is not set");
    // eslint-disable-next-line no-console -- intentional dev-only fallback, see above
    console.info(`[dev sms] to ${to}: ${text}`);
    return;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.SMS_API_KEY ?? ""}`,
    },
    body: JSON.stringify({ from: process.env.SMS_SENDER, to: to.replace(/^\+976/, ""), text }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`SMS provider responded ${res.status}`);
}
