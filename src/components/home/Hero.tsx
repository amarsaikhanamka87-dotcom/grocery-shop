import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Leaf } from "lucide-react";
import { img } from "@/lib/format";

const perks = [
  "200,000₮-с дээш үнэгүй хүргэлт",
  "Өглөө 06:00-с хүргэнэ",
  "QPay-ээр төлнө",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-2/3 bg-[radial-gradient(ellipse_at_70%_30%,#ffffff_0%,rgba(255,255,255,0)_65%)]"
      />
      <div className="container-x relative grid items-center gap-12 pb-16 pt-10 md:pb-20 lg:grid-cols-[1.02fr_1fr] lg:gap-6 lg:pb-24 lg:pt-14">
        {/* Copy */}
        <div className="max-w-[560px]">
          <p className="inline-flex items-center gap-2.5 rounded-full bg-white py-1.5 pl-2 pr-4 text-[13px] font-semibold text-ink-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <span className="grid size-5 place-items-center rounded-full bg-brand-50">
              <span className="size-2 rounded-full bg-brand/60" />
            </span>
            Ресторан, зочид буудал, дэлгүүрт зориулсан
          </p>

          <h1 className="mt-6 text-[44px] font-extrabold leading-[1.02] tracking-[-0.045em] sm:text-[58px] lg:text-[66px] xl:text-[72px]">
            Фермийн ногоо,
            <br />
            бөөний үнээр,
            <br />
            <span className="relative inline-block text-brand">
              өглөө бүр
              <svg
                aria-hidden
                viewBox="0 0 340 22"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-[14px] w-full text-clay">
                <path
                  d="M3 15 C 80 4, 200 2, 337 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="btn btn-primary h-[52px] px-6 text-[15px] shadow-float">
              Үнийн жагсаалт үзэх <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/register"
              className="btn btn-outline h-[52px] px-6 text-[15px]">
              Байгууллагаар бүртгүүлэх
            </Link>
          </div>

          <ul className="mt-6 flex max-w-[460px] flex-wrap gap-x-6 gap-y-2.5">
            {perks.map((p) => (
              <li
                key={p}
                className="flex items-center gap-2 text-[14px] font-medium text-ink-2">
                <span className="grid size-5 place-items-center rounded-full bg-brand text-white">
                  <Check className="size-3" strokeWidth={3.5} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual */}
        <div className="relative mx-auto aspect-[1/0.92] w-full max-w-[560px] lg:mr-0">
          {/* main arch image */}
          <div className="absolute right-0 top-0 h-[92%] w-[76%] overflow-hidden rounded-t-[200px] rounded-b-[28px] bg-cream-2 shadow-float">
            <Image
              src={img("1542838132-92c53300491e", 1000)}
              alt="Шинэхэн ногооны лангуу"
              fill
              priority
              sizes="(min-width: 1024px) 430px, 76vw"
              className="object-cover"
            />
          </div>

          {/* secondary image */}
          <div className="absolute bottom-[2%] left-0 h-[46%] w-[38%] overflow-hidden rounded-[22px] border-[5px] border-white bg-cream-2 shadow-float">
            <Image
              src={img("1557844352-761f2565b576", 600)}
              alt="Сагстай шинэхэн ногоо"
              fill
              sizes="220px"
              className="object-cover"
            />
          </div>

          {/* picked this morning */}
          <div className="absolute left-0 top-[10%] flex max-w-[64%] items-center gap-3 rounded-2xl bg-white py-2.5 pl-2.5 pr-4 shadow-float sm:left-[4%] sm:top-[12%] sm:max-w-none sm:py-3 sm:pl-3 sm:pr-5">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand sm:size-10">
              <Leaf className="size-5" />
            </span>
            <div className="min-w-0 leading-tight">
              <p className="text-[13px] font-bold sm:text-[14px]">
                Өнөө өглөө хураасан
              </p>
              <p className="mt-0.5 hidden text-[12px] text-muted sm:block">
                Сэлэнгийн улаан лооль, өргөст хэмх
              </p>
            </div>
          </div>

          {/* organic badge */}
          <div className="absolute -right-2 top-[5%] grid size-[92px] rotate-[14deg] place-items-center rounded-full bg-clay text-center text-white shadow-float sm:-right-4 sm:size-[104px]">
            <p className="text-[15px] font-extrabold leading-[1.05] tracking-tight sm:text-[17px]">
              100%
              <br />
              <span className="text-[11px] tracking-[0.06em] sm:text-[12px]">
                ОРГАНИК
              </span>
            </p>
          </div>

          {/* stat */}
          <div className="absolute -bottom-2 right-[4%] rounded-2xl bg-brand px-5 py-3.5 text-white shadow-float">
            <p className="text-[30px] font-extrabold leading-none tracking-tight">
              40+
            </p>
            <p className="mt-1.5 text-[12.5px] font-medium text-white/85">
              Монгол түнш фермүүд
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
