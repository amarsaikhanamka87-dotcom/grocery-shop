import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "../ProductForm";
import { deleteProduct } from "../../actions";

export default async function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { sortOrder: "asc" }, select: { id: true, name: true } }),
  ]);
  if (!product) notFound();

  return (
    <div className="max-w-5xl">
      <Link href="/admin/products" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-brand">
        <ArrowLeft className="size-4" /> Бүтээгдэхүүн
      </Link>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-[28px] font-extrabold tracking-tight">{product.name}</h1>
        <div className="flex gap-2">
          <Link href={`/product/${product.slug}`} className="btn btn-outline h-10 px-4 text-sm">
            <ExternalLink className="size-4" /> Сайтад харах
          </Link>
          <form action={deleteProduct}>
            <input type="hidden" name="id" value={product.id} />
            <button className="btn h-10 border border-clay/30 bg-clay-50 px-4 text-sm text-clay hover:bg-clay hover:text-white">
              <Trash2 className="size-4" /> Устгах
            </button>
          </form>
        </div>
      </div>
      <ProductForm product={product} categories={categories} />
    </div>
  );
}
