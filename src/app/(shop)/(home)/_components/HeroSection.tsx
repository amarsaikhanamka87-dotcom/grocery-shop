import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { formatPrice } from "@/lib/format/formatPrice";
import { FREE_DELIVERY_FROM } from "@/lib/constants";

const HERO_SRC = "/images/hero-beets.jpg";
const HERO_ALT = "Талбайдаа шинэхэн улаан манжин хурааж буй тариаланч";

// Same hours as the footer ("Хүргэлт 06:00–18:00").
const perks = [
  `${formatPrice(FREE_DELIVERY_FROM)}-с дээш үнэгүй хүргэлт`,
  "06:00–18:00 хүргэнэ",
  "Монгол фермээс шууд",
];

/**
 * Landing hero, 3 colors (white, ink, brand green), display + body text: headline, one line of copy,
 * two buttons (business one says why: free delivery), the perks; the photo beside it (sm+).
 * Phones: the perks are one short line, so the first products start on the first screen.
 */
export function HeroSection() {
  return (
    <section className="container-x grid items-center gap-10 pt-6 pb-2 sm:pt-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
      <div>
        <h1 className="text-[42px] font-extrabold leading-[1.04] tracking-[-0.04em] text-ink sm:text-[60px] xl:text-[68px]">
          Фермийн ногоо, бөөний үнээр, <span className="text-brand">өглөө бүр</span>
        </h1>
        <p className="mt-5 max-w-[480px] text-[16px] leading-relaxed text-ink/70 sm:mt-6">
          Ресторан, зочид буудал, дэлгүүрт Монголын фермийн шинэхэн ногоог бөөний үнээр хүргэнэ.
        </p>
        <p className="mt-2 text-[16px] font-semibold text-brand sm:hidden">06:00–18:00 · фермээс шууд</p>
        <div className="mt-6 grid gap-3 sm:mt-8 sm:flex">
          <Link href="/shop" className="btn btn-primary h-13 px-7 text-[16px]">
            Үнийн жагсаалт үзэх <ArrowRight className="size-4" />
          </Link>
          <Link href="/business" className="btn btn-outline h-13 px-7 text-[16px]">
            Байгууллагаар бүртгүүлэх
          </Link>
        </div>
        <p className="mt-3 text-[16px] text-ink/70">Бүртгэлтэй байгууллагад хүргэлт үнэгүй.</p>
        <ul className="mt-8 hidden gap-3 sm:grid">
          {perks.map((perk) => (
            <li key={perk} className="flex items-center gap-3 text-[16px] text-ink">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand text-white">
                <Check className="size-3.5" strokeWidth={3} />
              </span>
              {perk}
            </li>
          ))}
        </ul>
      </div>
      {/* Hidden on phones so the first products show sooner. A line border keeps the pale sky at
          the top from melting into the white page. */}
      <div className="relative hidden aspect-[4/3] overflow-hidden rounded-[32px] ring-1 ring-line sm:block lg:aspect-square">
        <Image
          src={HERO_SRC}
          alt={HERO_ALT}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-[30%_35%]"
        />
      </div>
    </section>
  );
}
