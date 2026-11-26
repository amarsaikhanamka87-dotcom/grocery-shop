// Netlify Scheduled Function: every hour, ask the site to cancel bank-transfer orders that are
// still unpaid after TRANSFER_HOLD_HOURS (their held stock goes back). Needs CRON_SECRET set in
// Netlify's environment variables (same value the Next.js route checks). URL is set by Netlify.
export default async function cancelExpiredTransfers() {
  const siteUrl = process.env.URL;
  const secret = process.env.CRON_SECRET;
  if (!siteUrl || !secret) return;
  try {
    await fetch(`${siteUrl}/api/cron/cancel-expired-transfers`, {
      method: "POST",
      headers: { "x-cron-secret": secret },
    });
  } catch (error) {
    console.error("[cron] cancel-expired-transfers failed", error);
  }
}

export const config = { schedule: "@hourly" };
