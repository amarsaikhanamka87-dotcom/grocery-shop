export type OtpError = "too_soon" | "too_many" | "no_code" | "expired" | "locked" | "wrong";

export type OtpResult = { ok: true } | { ok: false; error: OtpError };

/** What the phone-login server actions return to the form. */
export type PhoneState = { error?: string; sent?: boolean; ticket?: string };
