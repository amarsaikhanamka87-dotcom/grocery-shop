import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Photo + why we're cheaper (straight from the farms) + link to /farms. */
export function FarmsStory() {
  return (
    <section className="container-x mt-16 sm:mt-24 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Our own farm photo (also on /farms), not a stock field of grass. */}
      <div className="relative aspect-[5/4] overflow-hidden rounded-[32px] ring-1 ring-line">
        <Image
          src="/images/farms/zuunmod.jpg"
          alt="Зуунмодын навчит ногооны ферм"
          fill
          sizes="(min-width:1024px) 560px, 100vw"
          className="object-cover"
        />
      </div>
      <div>
        <h2 className="h-section text-ink">Зуучлагчгүйгээр шууд фермерээс</h2>
        <p className="mt-5 text-[16px] leading-relaxed text-ink/70">
          Сэлэнгэ, Дархан, Төв, Орхон аймгийн 40 гаруй ногооны фермтэй шууд гэрээтэй ажилладаг. Тиймээс
          бөөний үнэ бодитой, ногоо хураагдсанаас хойш 24 цагийн дотор танай гал тогоонд хүрнэ.
        </p>
        {/* The page ends with a next step for businesses (the bottom CTA panel is gone). */}
        <div className="mt-8 grid gap-3 sm:flex">
          <Link href="/business" className="btn btn-primary h-13 px-7 text-[16px]">
            Байгууллагаар бүртгүүлэх <ArrowRight className="size-4" />
          </Link>
          <Link href="/farms" className="btn btn-outline h-13 px-7 text-[16px]">
            Фермүүдтэй танилцах
          </Link>
        </div>
      </div>
    </section>
  );
}
