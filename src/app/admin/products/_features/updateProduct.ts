"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/roles/requireAdmin";
import type { FormState } from "@/types/forms";
import { parseProductForm } from "./parseProductForm";

/** Saves the admin's edits to one product. Bound to the product id by the edit dialog's form. */
export async function updateProduct(id: string, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const form = parseProductForm(formData);
  if ("state" in form) return form.state;

  try {
    await prisma.product.update({ where: { id }, data: form.data });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { values: form.values, fieldErrors: { slug: "Энэ slug өөр бүтээгдэхүүнд байна" } };
    }
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
      return { values: form.values, error: "Бүтээгдэхүүн олдсонгүй (устгагдсан байж магадгүй)." };
    }
    throw e;
  }

  revalidatePath("/", "layout");
  return { ok: true };
}
