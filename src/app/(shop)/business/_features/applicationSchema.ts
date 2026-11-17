import { z } from "zod";

/** B2B application form. Mongolian company registry numbers are 7 digits. */
export const applicationSchema = z.object({
  companyName: z.string().trim().min(2, "Байгууллагын нэрээ оруулна уу"),
  companyRegNo: z.string().trim().regex(/^\d{7}$/, "Регистрийн дугаар 7 оронтой байна"),
  contactName: z.string().trim().min(2, "Холбоо барих хүний нэрийг оруулна уу"),
  phone: z.string().trim().regex(/^[6-9]\d{7}$/, "8 оронтой утасны дугаар оруулна уу"),
  address: z.string().trim().max(300).optional(),
});
