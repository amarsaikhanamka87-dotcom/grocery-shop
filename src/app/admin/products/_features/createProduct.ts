"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { syncShopKnowledge } from "@/lib/chat/syncShopKnowledge";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/roles/requireAdmin";
import type { FormState } from "@/types/forms";
import { parseProductForm } from "./parseProductForm";

/** Adds a new product from the admin "create" dialog. */
export async function createProduct(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const form = parseProductForm(formData);
  if ("state" in form) return form.state;

  try {
    await prisma.product.create({ data: form.data });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { values: form.values, fieldErrors: { slug: "Энэ slug өөр бүтээгдэхүүнд байна" } };
    }
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2003") {
      return { values: form.values, fieldErrors: { categoryId: "Ангилал олдсонгүй" } };
    }
    throw e;
  }

  revalidatePath("/", "layout");
  after(syncShopKnowledge); // the chat assistant learns the new product text
  return { ok: true };
}
