import type { OtpError } from "@/types/auth";

/** Mongolian error texts for the phone-login form. */
export const PHONE_MESSAGES: Record<OtpError | "phone" | "code" | "server", string> = {
  phone: "8 оронтой утасны дугаар оруулна уу (жишээ нь 99112233).",
  code: "6 оронтой кодоо оруулна уу.",
  too_soon: "Код саяхан илгээсэн. 1 минутын дараа дахин оролдоно уу.",
  too_many: "Хэт олон удаа код авлаа. 1 цагийн дараа дахин оролдоно уу.",
  no_code: "Код олдсонгүй. Шинэ код авна уу.",
  expired: "Кодын хугацаа дууссан. Шинэ код авна уу.",
  locked: "Буруу код олон удаа орууллаа. Шинэ код авна уу.",
  wrong: "Код буруу байна.",
  server: "Алдаа гарлаа. Дахин оролдоно уу.",
};
