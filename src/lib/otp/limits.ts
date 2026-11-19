/** Phone-login rules (verify.mn sessions last 5 minutes on their side). */
export const OTP_LIMITS = {
  resendAfterMs: 60_000,
  maxPerHour: 5,
} as const;
