import Link from "next/link";
import { Leaf } from "lucide-react";
import { formatPrice } from "@/lib/format/formatPrice";
import { FREE_DELIVERY_FROM } from "@/lib/constants";

export function CtaSection() {
  return (
    <section className="container-x mt-24">
      <div className="relative overflow-hidden rounded-[28px] bg-brand px-6 py-14 text-center text-white sm:px-12">
        <Leaf aria-hidden className="absolute -left-6 -top-6 size-40 rotate-12 text-white/5" />
        <Leaf aria-hidden className="absolute -bottom-10 -right-6 size-52 -rotate-12 text-white/5" />
        <h2 className="relative mx-auto max-w-2xl text-[30px] font-extrabold leading-tight tracking-[-0.03em] sm:text-[40px]">
          Байгууллагаараа бүртгүүлж, бөөний үнээр аваарай
        </h2>
        <p className="relative mx-auto mt-4 max-w-lg text-white/75">
          Бүртгэлийг 1 ажлын өдөрт баталгаажуулна. {formatPrice(FREE_DELIVERY_FROM)}-с дээш захиалгад хүргэлт үнэгүй.
        </p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/sign-up" className="btn h-12 bg-white px-7 text-brand hover:bg-cream">
            Байгууллагаар бүртгүүлэх
          </Link>
          <Link href="/shop" className="btn h-12 border border-white/30 px-7 text-white hover:bg-white/10">
            Үнийн жагсаалт
          </Link>
        </div>
      </div>
    </section>
  );
}
