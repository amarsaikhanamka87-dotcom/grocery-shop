/**
 * The Clerk username we give a phone-login user: "p" + the E.164 digits, e.g. "p97699112233".
 * Clerk needs at least one identifier on a user to issue a sign-in token, and it rejects +976
 * phone numbers; usernames can't be all digits, hence the "p". Nobody types it.
 */
export function phoneUsername(e164: string): string {
  return `p${e164.replace(/\D/g, "")}`;
}
