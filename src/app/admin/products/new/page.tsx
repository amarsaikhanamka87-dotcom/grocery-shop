import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "../ProductForm";

export default async function NewProduct() {
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: "asc" }, select: { id: true, name: true } });
  return (
    <div className="max-w-5xl">
      <Link href="/admin/products" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-brand">
        <ArrowLeft className="size-4" /> Бүтээгдэхүүн
      </Link>
      <h1 className="mt-3 text-[28px] font-extrabold tracking-tight">Шинэ бүтээгдэхүүн</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
