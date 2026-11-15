/** Phone-login code rules. */
export const OTP_LIMITS = {
  codeTtlMs: 5 * 60_000,
  resendAfterMs: 60_000,
  maxPerHour: 5,
  maxAttempts: 5,
} as const;
