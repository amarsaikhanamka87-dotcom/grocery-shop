import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HERO_SRC = "/images/hero-beets.jpg";
const HERO_ALT = "Талбайдаа шинэхэн улаан манжин хурааж буй тариаланч";

/**
 * Landing hero, kept minimal on purpose: the headline, one short line and one main button
 * (business sign-up lives at the end of the farms section). The photo sits beside it from sm up.
 */
export function HeroSection() {
  return (
    <section className="container-x grid items-center gap-10 pt-6 pb-2 sm:pt-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
      <div>
        <h1 className="text-[42px] font-extrabold leading-[1.04] tracking-[-0.04em] text-ink sm:text-[60px] xl:text-[68px]">
          Фермийн ногоо, бөөний үнээр, <span className="text-brand">өглөө бүр</span>
        </h1>
        <p className="mt-5 max-w-[480px] text-[16px] leading-relaxed text-ink/70 sm:mt-6">
          Ресторан, дэлгүүрт фермийн ногоог бөөний үнээр хүргэнэ.
        </p>
        <Link href="/shop" className="btn btn-primary mt-7 h-13 w-full px-7 text-[16px] sm:mt-8 sm:w-auto">
          Үнийн жагсаалт үзэх <ArrowRight className="size-4" />
        </Link>
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
