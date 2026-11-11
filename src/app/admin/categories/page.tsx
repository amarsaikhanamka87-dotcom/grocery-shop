import Image from "next/image";
import type { Metadata } from "next";
import { Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deleteCategory } from "../actions";
import { CategoryForm } from "./CategoryForm";

export const metadata: Metadata = { title: "Ангилал" };

export default async function AdminCategories() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div className="max-w-5xl">
      <h1 className="text-[28px] font-extrabold tracking-tight">Ангилал</h1>

      <section className="card mt-6 p-5">
        <h2 className="mb-3 font-extrabold">Шинэ ангилал</h2>
        <CategoryForm />
      </section>

      <ul className="mt-6 grid gap-3">
        {categories.map((c) => (
          <li key={c.id} className="card p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="relative size-10 overflow-hidden rounded-lg bg-cream-2">
                  <Image src={c.image} alt="" fill sizes="40px" className="object-cover" />
                </span>
                <p className="font-bold">
                  {c.name} <span className="text-[13px] font-medium text-muted">· {c._count.products} бүтээгдэхүүн</span>
                </p>
              </div>
              <form action={deleteCategory}>
                <input type="hidden" name="id" value={c.id} />
                <button
                  disabled={c._count.products > 0}
                  title={c._count.products > 0 ? "Бүтээгдэхүүнтэй ангиллыг устгах боломжгүй" : "Устгах"}
                  className="grid size-9 place-items-center rounded-full text-muted hover:bg-clay-50 hover:text-clay disabled:opacity-30"
                  aria-label="Устгах"
                >
                  <Trash2 className="size-4" />
                </button>
              </form>
            </div>
            <CategoryForm category={c} />
          </li>
        ))}
      </ul>
    </div>
  );
}
