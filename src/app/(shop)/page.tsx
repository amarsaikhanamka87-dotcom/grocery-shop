import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ChefHat,
  Clock,
  Hotel,
  Leaf,
  QrCode,
  Scale,
  Store,
  Tractor,
  Truck,
  UtensilsCrossed,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { img } from "@/lib/format";
import { Hero } from "@/components/home/Hero";
import { ProductCard } from "@/components/product/ProductCard";

const features = [
  { icon: Scale, title: "Бөөний үнэ", text: "Кг-аар, зуучлагчгүй" },
  { icon: Truck, title: "Өглөө 06:00-с", text: "200,000₮-с дээш үнэгүй" },
  { icon: Tractor, title: "40+ ферм", text: "Монголын тариаланчид" },
  { icon: QrCode, title: "QPay төлбөр", text: "Бүх банкны аппаар" },
];

const steps = [
  {
    icon: Building2,
    title: "Байгууллагаар бүртгүүл",
    text: "Байгууллагын нэр, регистрээ оруулна. Бид 1 ажлын өдөрт баталгаажуулна.",
  },
  {
    icon: QrCode,
    title: "Захиалаад QPay-ээр төл",
    text: "Кг-аар захиалгаа өгөөд, QR кодыг банкны аппаараа уншуулж төлнө.",
  },
  {
    icon: Clock,
    title: "Маргааш өглөө хүлээж ав",
    text: "Ногоог шөнө фермээс бэлтгэж, өглөө 06:00-с гал тогоонд тань хүргэнэ.",
  },
];

const segments = [
  {
    icon: ChefHat,
    title: "Ресторан",
    text: "Өдөр бүрийн шинэхэн ногоо, тогтвортой чанар, өглөөний хүргэлт.",
  },
  {
    icon: Hotel,
    title: "Зочид буудал",
    text: "Өглөөний цай, банкетад их хэмжээний ногоог нэг дор.",
  },
  {
    icon: UtensilsCrossed,
    title: "Гуанз, цайны газар",
    text: "Төмс, лууван, сонгино, байцааг шуудайгаар хямд үнээр.",
  },
  {
    icon: Store,
    title: "Хүнсний дэлгүүр",
    text: "Лангуундаа тавих шинэхэн ногоо, жижиглэнгийн ашигтай үнээр.",
  },
];

export default async function HomePage() {
  const [categories, featured, deals] = await Promise.all([
    prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
      include: { _count: { select: { products: true } } },
    }),
    prisma.product.findMany({
      where: { isFeatured: true },
      orderBy: { createdAt: "asc" },
      take: 8,
    }),
    prisma.product.findMany({
      where: { oldPrice: { not: null } },
      orderBy: { updatedAt: "desc" },
      take: 4,
    }),
  ]);

  return (
    <>
      <Hero />

      {/* Feature strip */}
      <section className="container-x">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[22px] border border-line bg-line lg:grid-cols-4">
          {features.map((f) => (
            <li
              key={f.title}
              className="flex flex-col items-start gap-3 bg-white p-4 sm:flex-row sm:items-center sm:gap-3.5 sm:p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand">
                <f.icon className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="text-[15px] font-bold">{f.title}</p>
                <p className="text-[13px] text-muted">{f.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Categories */}
      <section className="container-x mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Ангилал</p>
            <h2 className="h-section mt-2">Юу хайж байна вэ?</h2>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-1.5 text-[15px] font-bold text-brand hover:underline">
            Бүгдийг үзэх <ArrowRight className="size-4" />
          </Link>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((c) => (
            <li key={c.id}>
              <Link
                href={`/shop?category=${c.slug}`}
                className="group flex flex-col items-center gap-2.5 rounded-[20px] border border-line bg-white p-3 text-center transition-shadow hover:shadow-card sm:flex-row sm:gap-3.5 sm:text-left">
                <span className="relative aspect-square w-full shrink-0 overflow-hidden rounded-2xl bg-cream-2 sm:size-[72px] sm:w-auto">
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 72px, 45vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </span>
                <span className="min-w-0 pb-1 sm:pb-0">
                  <span className="block text-[15px] font-bold leading-snug group-hover:text-brand sm:truncate">
                    {c.name}
                  </span>
                  <span className="text-[13px] text-muted">
                    {c._count.products} бүтээгдэхүүн
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Featured products */}
      <section className="container-x mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Үнийн жагсаалт</p>
            <h2 className="h-section mt-2">Хамгийн их захиалагддаг ногоо</h2>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-1.5 text-[15px] font-bold text-brand hover:underline">
            Дэлгүүр рүү <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Promo banners */}
      <section className="container-x mt-24 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
        <div className="relative flex min-h-[340px] overflow-hidden rounded-[28px] bg-brand text-white">
          <div className="relative z-10 flex max-w-[60%] flex-col justify-center p-8 sm:p-10">
            <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-brand-100">
              Рестораны хайрцаг
            </p>
            <h3 className="mt-3 text-[30px] font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-[36px]">
              Гал тогооны 20 кг ногоо, нэг хайрцагт
            </h3>
            <p className="mt-3 text-[15px] text-white/75">
              Төмс, лууван, сонгино, байцаа, лооль, хэмх, чинжүү — өдөр бүр
              хэрэгтэй бүхэн.
            </p>
            <Link
              href="/product/restaurant-box"
              className="btn mt-7 h-12 w-fit bg-white px-6 text-[15px] text-brand hover:bg-cream">
              75,000₮ — Захиалах <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="absolute inset-y-0 right-0 w-[48%]">
            <Image
              src={img("1579113800032-c38bd7635818", 700)}
              alt=""
              fill
              sizes="400px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand via-brand/30 to-transparent" />
          </div>
        </div>
        <div className="relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-[28px] bg-clay-50 p-8 sm:p-10">
          <Image
            src={img("1540420773420-3366772f4999", 700)}
            alt=""
            fill
            sizes="500px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
          <div className="relative text-white">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-clay px-3 py-1 text-[13px] font-bold">
              <BadgeCheck className="size-4" /> Органик
            </span>
            <h3 className="mt-3 text-[28px] font-extrabold leading-[1.1] tracking-[-0.03em]">
              Салатны ногооны 10 кг хайрцаг
            </h3>
            <Link
              href="/product/salad-box"
              className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-bold underline-offset-4 hover:underline">
              Одоо авах <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Deals */}
      {deals.length > 0 && (
        <section className="container-x mt-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">
                <span className="size-1.5 rounded-full bg-clay" /> Хямдрал
              </p>
              <h2 className="h-section mt-2">Энэ долоо хоногийн санал</h2>
            </div>
            <Link
              href="/shop?deals=1"
              className="flex items-center gap-1.5 text-[15px] font-bold text-brand hover:underline">
              Бүх хямдрал <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {deals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Farms story */}
      <section className="container-x mt-24 grid items-center gap-12 lg:grid-cols-2">
        <div className="relative aspect-[5/4] overflow-hidden rounded-[28px] rounded-tl-[160px]">
          <Image
            src={img("1586771107445-d3ca888129ff", 1000)}
            alt="Ногооны талбай"
            fill
            sizes="(min-width:1024px) 560px, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="eyebrow">Манай фермүүд</p>
          <h2 className="h-section mt-2">
            Бид дундын зуучлагчгүйгээр шууд фермерээс авдаг
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-muted">
            Сэлэнгэ, Дархан, Төв, Орхон аймгийн 40 гаруй ногооны фермтэй шууд
            гэрээтэй ажилладаг. Тиймээс бөөний үнэ бодитой, ногоо хураагдсанаас
            хойш 24 цагийн дотор танай гал тогоонд хүрнэ.
          </p>
          <dl className="mt-8 grid grid-cols-3 gap-4">
            {[
              ["40+", "Түнш ферм"],
              ["22", "Төрлийн ногоо"],
              ["24ц", "Фермээс гал тогоо хүртэл"],
            ].map(([n, l]) => (
              <div
                key={l}
                className="rounded-2xl border border-line bg-white p-4">
                <dt className="text-[28px] font-extrabold tracking-tight text-brand">
                  {n}
                </dt>
                <dd className="mt-1 text-[13px] text-muted">{l}</dd>
              </div>
            ))}
          </dl>
          <Link href="/farms" className="btn btn-outline mt-8 h-12 px-6">
            Фермүүдтэй танилцах <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* Who we serve */}
      <section className="container-x mt-24">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow">Хэнд зориулсан бэ</p>
          <h2 className="h-section mt-2">
            Хоол үйлдвэрлэл, худалдааны байгууллагуудад
          </h2>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {segments.map((g) => (
            <li key={g.title} className="card p-7">
              <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand">
                <g.icon className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-extrabold">{g.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                {g.text}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="container-x mt-24">
        <div className="relative overflow-hidden rounded-[28px] bg-brand px-6 py-14 text-center text-white sm:px-12">
          <Leaf
            aria-hidden
            className="absolute -left-6 -top-6 size-40 rotate-12 text-white/5"
          />
          <Leaf
            aria-hidden
            className="absolute -bottom-10 -right-6 size-52 -rotate-12 text-white/5"
          />
          <h2 className="relative mx-auto max-w-2xl text-[30px] font-extrabold leading-tight tracking-[-0.03em] sm:text-[40px]">
            Байгууллагаараа бүртгүүлж, бөөний үнээр аваарай
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-white/75">
            Бүртгэлийг 1 ажлын өдөрт баталгаажуулна. 200,000₮-с дээш захиалгад
            хүргэлт үнэгүй.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/register"
              className="btn h-12 bg-white px-7 text-brand hover:bg-cream">
              Байгууллагаар бүртгүүлэх
            </Link>
            <Link
              href="/shop"
              className="btn h-12 border border-white/30 px-7 text-white hover:bg-white/10">
              Үнийн жагсаалт
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
