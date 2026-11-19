import "server-only";

export async function sendSms(to: string, text: string): Promise<void> {
  const url = process.env.SMS_API_URL;

  if (!url) {
    if (process.env.NODE_ENV === "production")
      throw new Error("SMS_API_URL is not set");

    console.info(`[dev sms] to ${to}: ${text}`);
    return;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.SMS_API_KEY ?? ""}`,
    },

    body: JSON.stringify({ phone: to.replace(/^\+976/, ""), text }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(
      `SMS provider responded ${res.status}: ${detail.slice(0, 300)}`,
    );
  }
}
