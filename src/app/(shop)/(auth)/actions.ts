"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSession, deleteSession } from "@/lib/session";

export type AuthState = { error?: string; fieldErrors?: Record<string, string>; values?: Record<string, string> };

function safeNext(value: FormDataEntryValue | null, fallback: string) {
  const v = typeof value === "string" ? value : "";
  // Only allow same-site relative paths.
  return v.startsWith("/") && !v.startsWith("//") ? v : fallback;
}

const registerSchema = z.object({
  companyName: z.string().trim().min(2, "Байгууллагын нэрээ оруулна уу"),
  companyRegNo: z.string().trim().regex(/^[0-9]{7}$/, "Байгууллагын регистр 7 оронтой тоо байна"),
  name: z.string().trim().min(2, "Холбогдох хүний нэрээ оруулна уу"),
  email: z.string().trim().toLowerCase().email("Имэйл хаяг буруу байна"),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/\D/g, ""))
    .refine((v) => /^[0-9]{8}$/.test(v), "8 оронтой утасны дугаар оруулна уу"),
  password: z.string().min(8, "Нууц үг хамгийн багадаа 8 тэмдэгт байна"),
});

export async function register(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const values = {
    companyName: String(formData.get("companyName") ?? ""),
    companyRegNo: String(formData.get("companyRegNo") ?? ""),
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
  };
  const parsed = registerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const i of parsed.error.issues) fieldErrors[String(i.path[0])] ??= i.message;
    return { fieldErrors, values };
  }
  const { companyName, companyRegNo, name, email, phone, password } = parsed.data;

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return { values, fieldErrors: { email: "Энэ имэйлээр бүртгэл үүссэн байна" } };

  const user = await prisma.user.create({
    data: { companyName, companyRegNo, name, email, phone, passwordHash: await bcrypt.hash(password, 10) },
  });
  await createSession({ userId: user.id, role: user.role });
  redirect(safeNext(formData.get("next"), "/account"));
}

export async function login(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { values: { email }, error: "Имэйл болон нууц үгээ оруулна уу" };

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return { values: { email }, error: "Имэйл эсвэл нууц үг буруу байна" };
  }
  await createSession({ userId: user.id, role: user.role });
  redirect(safeNext(formData.get("next"), user.role === "ADMIN" ? "/admin" : "/account"));
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
