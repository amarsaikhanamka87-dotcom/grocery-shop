import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Sprout } from "lucide-react";
import { formatPrice } from "@/lib/format/formatPrice";
import { FREE_DELIVERY_FROM } from "@/lib/constants";
import { HeroBadges } from "./HeroBadges";

const HERO_SRC = "/images/hero-beets.jpg";
const HERO_ALT = "Талбайдаа шинэхэн улаан манжин хурааж буй тариаланч";

const perks = [
  `${formatPrice(FREE_DELIVERY_FROM)}-с дээш үнэгүй хүргэлт`,
  "Өглөө 06:00-с хүргэнэ",
  "QR кодоор төлнө",
];

/**
 * Phones/tablets: the photo fills the hero, dark fade at the bottom, white text on it.
 * Desktop (lg+): cream text column on the left, photo on the right fading into the page.
 */
export function HeroSection() {
  return (
    <section className="relative flex min-h-[740px] items-end overflow-hidden sm:min-h-[760px] lg:block lg:min-h-0">
      <div className="absolute inset-0 lg:left-auto lg:w-[58%]">
        <Image
          src={HERO_SRC}
          alt={HERO_ALT}
          fill
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover object-[24%_20%] lg:object-[30%_25%]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 via-45% to-ink/0 to-75% lg:hidden" />
        <div
          aria-hidden
          className="absolute inset-0 hidden bg-gradient-to-r from-cream via-cream/0 via-30% to-transparent lg:block"
        />
      </div>

      <div className="container-x relative w-full grid items-center gap-6 pt-40 pb-8 sm:pb-12 lg:grid-cols-[1.02fr_1fr] lg:pt-14 lg:pb-24">
        <div className="max-w-[560px] text-white lg:text-ink">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[12.5px] font-bold backdrop-blur lg:hidden">
            <Sprout className="size-4" /> 40+ Монгол түнш ферм · 100% органик
          </p>
          <h1 className="mt-4 text-[38px] font-extrabold leading-[1.04] tracking-[-0.04em] sm:text-[56px] lg:mt-6 lg:text-[66px] lg:leading-[1.02] lg:tracking-[-0.045em] xl:text-[72px]">
            Фермийн ногоо,
            <br />
            бөөний үнээр,
            <br />
            <span className="relative inline-block text-brand-100 lg:text-brand">
              өглөө бүр
              <svg
                aria-hidden
                viewBox="0 0 340 22"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-[12px] w-full text-clay lg:h-[14px]"
              >
                <path d="M3 15 C 80 4, 200 2, 337 10" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap lg:mt-9">
            <Link href="/shop" className="btn btn-primary h-[52px] px-6 text-[15px] shadow-float">
              Үнийн жагсаалт үзэх <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/sign-up"
              className="btn btn-outline h-[52px] border-white/40 bg-white/10 px-6 text-[15px] text-white backdrop-blur hover:bg-white/20 lg:border-line lg:bg-transparent lg:text-ink lg:backdrop-blur-none lg:hover:bg-white"
            >
              Байгууллагаар бүртгүүлэх
            </Link>
          </div>

          <ul className="mt-6 grid gap-2 sm:flex sm:max-w-[460px] sm:flex-wrap sm:gap-x-6 sm:gap-y-2.5">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-2 text-[14px] font-medium text-white/90 lg:text-ink-2">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <Check className="size-3" strokeWidth={3.5} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <HeroBadges />
      </div>
    </section>
  );
}
