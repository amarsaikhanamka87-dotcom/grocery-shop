import Image from "next/image";
import { DELIVERY_SLOTS, FREE_DELIVERY_FROM } from "@/lib/constants";
import { formatPrice } from "@/lib/format/formatPrice";

const HERO_SRC = "/images/hero-beets.jpg";
const firstDeliveryTime = (DELIVERY_SLOTS[0] ?? "").split("–")[0];
const HERO_ALT = "Талбайдаа шинэхэн улаан манжин хурааж буй тариаланч";

/**
 * Short hero: one headline and the free-delivery line, so the categories and the first prices
 * show on a phone's first screen. The photo only from lg, at half height, beside the text.
 */
export function HeroSection() {
  return (
    <section className="container-x grid items-center gap-8 pt-5 sm:pt-8 lg:grid-cols-[1fr_440px] lg:gap-12">
      <div>
        <h1 className="text-[34px] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[42px]">
          Барс захын ногоо, <span className="text-brand">бөөний үнээр</span>
        </h1>
        <p className="mt-3 max-w-[520px] text-[16px] leading-relaxed text-muted-foreground">
          {/* By when: a cook ordering at 06:00 must not expect it the same morning. */}
          Ресторан, гуанз, дэлгүүрт шуудайгаар. Өнөөдөр захиалбал маргааш {firstDeliveryTime}-аас
          хүргэнэ, {formatPrice(FREE_DELIVERY_FROM)}-с дээш хүргэлт үнэгүй.
        </p>
      </div>
      {/* A line border keeps the pale sky at the top from melting into the white page. */}
      <div className="relative hidden aspect-[16/10] overflow-hidden rounded-[28px] ring-1 ring-line lg:block">
        <Image src={HERO_SRC} alt={HERO_ALT} fill priority sizes="440px" className="object-cover object-[30%_35%]" />
      </div>
    </section>
  );
}
