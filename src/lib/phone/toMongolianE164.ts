/**
 * Mongolian mobile numbers: 8 digits starting with 6–9 (Unitel, Mobicom, Skytel, G-Mobile).
 * Accepts "99112233", "9911-2233", "+976 9911 2233" and returns E.164 ("+97699112233"), or null.
 */
export function toMongolianE164(input: string): string | null {
  const digits = input.replace(/[\s()-]/g, "").replace(/^\+?976/, "");
  return /^[6-9]\d{7}$/.test(digits) ? `+976${digits}` : null;
}
