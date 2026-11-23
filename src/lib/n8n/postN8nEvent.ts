import "server-only";

export async function postN8nEvent(event: { event: string }): Promise<boolean> {
  const url = process.env.N8N_ORDER_EVENT_URL;
  const secret = process.env.N8N_WEBHOOK_SECRET;
  if (!url || !secret) {
    console.error(
      `[n8n] ${event.event} not sent: N8N_ORDER_EVENT_URL or N8N_WEBHOOK_SECRET is not set`,
    );
    return false;
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", "x-n8n-secret": secret },
      body: JSON.stringify(event),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok)
      console.error(`[n8n] ${event.event} rejected: HTTP ${response.status}`);
    return response.ok;
  } catch (err) {
    console.error(`[n8n] ${event.event} failed`, err);
    return false;
  }
}
