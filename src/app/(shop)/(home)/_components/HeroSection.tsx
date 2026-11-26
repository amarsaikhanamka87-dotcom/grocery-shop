import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { HeroFacts } from "./HeroFacts";

const HERO_SRC = "/images/hero-beets.jpg";
const HERO_ALT = "Талбайдаа шинэхэн улаан манжин хурааж буй тариаланч";

/**
 * Photo banner: the beet farmer, the headline in white over a dark fade (bottom on phones, the
 * empty field on the right from lg, so the text never covers the farmer), two actions, and the
 * delivery facts under it. Colors: ink fade, white text, brand green button.
 */
export function HeroSection() {
  return (
    <section className="container-x pt-4 sm:pt-6">
      <div className="relative isolate flex min-h-[440px] overflow-hidden rounded-[28px] ring-1 ring-line sm:min-h-[420px] lg:min-h-[460px] lg:justify-end">
        <Image
          src={HERO_SRC}
          alt={HERO_ALT}
          fill
          priority
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="-z-20 object-cover object-[32%_20%] lg:object-[32%_30%]"
        />
        {/* Phones: fade up from the bottom. lg: fade in from the right, over the open field. */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 from-10% via-ink/45 via-40% to-transparent to-65% lg:bg-gradient-to-l lg:from-ink/85 lg:via-ink/50 lg:to-transparent" />

        <div className="mt-auto w-full p-5 sm:p-8 lg:my-auto lg:max-w-[520px] lg:p-12">
          <h1 className="text-[34px] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-[44px] lg:text-[52px]">
            Барс захын ногоо, <span className="text-brand-100">бөөний үнээр</span>
          </h1>
          <p className="mt-3 max-w-[440px] text-[16px] leading-relaxed text-white/85">
            Ресторан, гуанз, дэлгүүрт шуудайгаар.
            <span className="hidden sm:inline"> Захиалгаа утаснаасаа өгөөд, маргааш хүлээж аваарай.</span>
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <Link href="/shop" className="btn btn-primary h-12 gap-2 px-3 text-[16px] sm:px-6">
              Бараа үзэх
              <ArrowRight className="size-5" aria-hidden />
            </Link>
            <Link
              href="/business"
              className="btn h-12 gap-2 border border-white/70 px-3 text-[16px] text-white hover:bg-white/10 sm:px-6"
            >
              <Building2 className="hidden size-5 shrink-0 sm:block" aria-hidden />
              Байгууллагаар
            </Link>
          </div>
        </div>
      </div>
      <HeroFacts />
    </section>
  );
}
