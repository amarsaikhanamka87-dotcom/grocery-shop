export type OtpError = "too_soon" | "too_many" | "no_code" | "expired" | "pending";

export type OtpResult = { ok: true } | { ok: false; error: OtpError };

/** What the buyer needs to send the verification SMS (from verify.mn). */
export type VerifySession = {
  sessionId: string;
  shortcode: string; // number to text, e.g. 144773
  text: string; // code to send
  smsUri: string; // sms:144773?body=...
};

export type RequestOtpResult = { ok: true; session: VerifySession } | { ok: false; error: OtpError };

/** verify.mn session state; VERIFIED = the buyer's SMS arrived from that phone. */
export type VerifyStatus = "PENDING" | "VERIFIED" | "EXPIRED";

/** What the phone-login server actions return to the form. */
export type PhoneState = { error?: string; pending?: boolean; session?: VerifySession; ticket?: string };
