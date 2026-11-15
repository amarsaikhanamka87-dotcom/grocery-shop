import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { img } from "@/lib/format/img";

export function FarmsStory({ productCount }: { productCount: number }) {
  const stats = [
    ["40+", "Түнш ферм"],
    [String(productCount), "Төрлийн ногоо"],
    ["24ц", "Фермээс гал тогоо хүртэл"],
  ];
  return (
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
        <h2 className="h-section mt-2">Бид дундын зуучлагчгүйгээр шууд фермерээс авдаг</h2>
        <p className="mt-5 text-[16px] leading-relaxed text-muted-foreground">
          Сэлэнгэ, Дархан, Төв, Орхон аймгийн 40 гаруй ногооны фермтэй шууд гэрээтэй ажилладаг. Тиймээс
          бөөний үнэ бодитой, ногоо хураагдсанаас хойш 24 цагийн дотор танай гал тогоонд хүрнэ.
        </p>
        <dl className="mt-8 grid grid-cols-3 gap-4">
          {stats.map(([n, l]) => (
            <div key={l} className="rounded-2xl border border-line bg-white p-4">
              <dt className="text-[28px] font-extrabold tracking-tight text-brand">{n}</dt>
              <dd className="mt-1 text-[13px] text-muted-foreground">{l}</dd>
            </div>
          ))}
        </dl>
        <Link href="/farms" className="btn btn-outline mt-8 h-12 px-6">
          Фермүүдтэй танилцах <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
