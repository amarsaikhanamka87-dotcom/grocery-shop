import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Leaf, MapPin, RotateCcw, Truck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { FREE_DELIVERY_FROM } from "@/lib/constants";
import { AddToCart } from "@/components/product/AddToCartButton";
import { WishButton } from "@/components/product/WishButton";
import { ProductCard } from "@/components/product/ProductCard";

type Params = Promise<{ slug: string }>;

async function getProduct(slug: string) {
  return prisma.product.findUnique({ where: { slug }, include: { category: true } });
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const p = await getProduct((await params).slug);
  return p ? { title: p.name, description: p.description } : {};
}

export default async function ProductPage({ params }: { params: Params }) {
  const p = await getProduct((await params).slug);
  if (!p) notFound();

  const related = await prisma.product.findMany({
    where: { categoryId: p.categoryId, id: { not: p.id } },
    take: 4,
    orderBy: { isFeatured: "desc" },
  });
  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;

  return (
    <div className="container-x pt-8">
      <nav className="text-[13px] font-medium text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-brand">Нүүр</Link> <span className="mx-1.5">/</span>
        <Link href={`/shop?category=${p.category.slug}`} className="hover:text-brand">{p.category.name}</Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink">{p.name}</span>
      </nav>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-square overflow-hidden rounded-[28px] bg-cream-2">
          <Image src={p.image.replace("w=800", "w=1200")} alt={p.name} fill priority sizes="(min-width:1024px) 540px, 100vw" className="object-cover" />
          <div className="absolute left-5 top-5 flex flex-col items-start gap-2">
            {discount > 0 && <span className="rounded-full bg-clay px-3 py-1.5 text-sm font-bold text-white">-{discount}%</span>}
            {p.isOrganic && (
              <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-bold text-brand">
                <Leaf className="size-4" /> Органик
              </span>
            )}
          </div>
          <WishButton productId={p.id} className="absolute right-5 top-5 size-11" />
        </div>

        <div className="lg:py-4">
          {p.origin && (
            <p className="flex items-center gap-1.5 text-sm font-semibold text-muted">
              <MapPin className="size-4" /> {p.origin}
            </p>
          )}
          <h1 className="mt-2 text-[34px] font-extrabold leading-tight tracking-[-0.03em] sm:text-[42px]">{p.name}</h1>
          <p className="mt-1 text-[15px] text-muted">Бөөний үнэ · {p.unit}-ээр</p>

          <div className="mt-6 flex items-end gap-3">
            <p className="text-[34px] font-extrabold tabular-nums tracking-tight">
              {formatPrice(p.price)}
              <span className="text-lg font-bold text-muted"> / {p.unit}</span>
            </p>
            {p.oldPrice && <p className="pb-1.5 text-lg font-semibold text-muted line-through">{formatPrice(p.oldPrice)}</p>}
          </div>

          <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-ink-2">{p.description}</p>

          <p className={`mt-6 text-sm font-semibold ${p.stock > 0 ? "text-brand" : "text-clay"}`}>
            {p.stock >= p.minQty * 5
              ? "● Нөөцөд байгаа"
              : p.stock >= p.minQty
                ? `● Зөвхөн ${p.stock} ${p.unit} үлдсэн`
                : "● Түр дууссан"}
          </p>
          <p className="mt-1 text-sm text-muted">
            Хамгийн бага захиалга: <b className="text-ink">{p.minQty} {p.unit}</b>
          </p>

          <div className="mt-4">
            <AddToCart
              item={{ productId: p.id, slug: p.slug, name: p.name, image: p.image, unit: p.unit, price: p.price, stock: p.stock, minQty: p.minQty }}
            />
          </div>

          <ul className="mt-8 grid gap-3 rounded-[20px] border border-line bg-white p-5 text-[14.5px]">
            <li className="flex items-center gap-3">
              <Truck className="size-5 text-brand" />
              {formatPrice(FREE_DELIVERY_FROM)}-с дээш захиалгад хүргэлт үнэгүй
            </li>
            <li className="flex items-center gap-3">
              <Leaf className="size-5 text-brand" /> QPay-ээр бүх банкны аппаар төлнө
            </li>
            <li className="flex items-center gap-3">
              <RotateCcw className="size-5 text-brand" /> Чанарын шаардлага хангаагүй бол хүлээн авахдаа буцаана
            </li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="h-section">Төстэй бүтээгдэхүүн</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {related.map((r) => (
              <ProductCard key={r.id} product={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
