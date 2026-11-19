import type { OtpError } from "@/types/auth";

/** Mongolian error texts for the phone-login form. */
export const PHONE_MESSAGES: Record<OtpError | "phone" | "server", string> = {
  phone: "8 оронтой утасны дугаар оруулна уу (жишээ нь 99112233).",
  too_soon: "Саяхан код авсан. 1 минутын дараа дахин оролдоно уу.",
  too_many: "Хэт олон удаа код авлаа. 1 цагийн дараа дахин оролдоно уу.",
  no_code: "Баталгаажуулалт олдсонгүй. Шинэ код авна уу.",
  expired: "Хугацаа дууссан. Шинэ код авна уу.",
  pending: "SMS хараахан ирээгүй байна.",
  server: "Алдаа гарлаа. Дахин оролдоно уу.",
};
