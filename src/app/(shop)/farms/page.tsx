import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, MapPin } from "lucide-react";
import { img } from "@/lib/format";

export const metadata: Metadata = { title: "Манай фермүүд" };

const farms = [
  { name: "Шаамарын ногоон хүлэмж", place: "Сэлэнгэ, Шаамар", items: "Улаан лооль, өргөст хэмх, брокколи", image: "1592924357228-91a4daadcfea" },
  { name: "Дарханы тариаланч", place: "Дархан-Уул", items: "Лууван, байцаа, сонгино", image: "1598170845058-32b9d6a5da37" },
  { name: "Борнуурын төмс", place: "Төв, Борнуур", items: "Шаргал төмс", image: "1518977676601-b53f82aba655" },
  { name: "Зуунмодын навчит ногоо", place: "Төв, Зуунмод", items: "Салатны навч, бууцай, ногоон сонгино", image: "1622206151226-18ca2c9ab4a1" },
  { name: "Орхоны хүлэмж", place: "Орхон", items: "Чихэрлэг чинжүү, цуккини", image: "1601648764658-cf37e8c89b70" },
  { name: "Сэлэнгийн манжин, сармис", place: "Сэлэнгэ", items: "Манжин, сармис, цэцэгт байцаа", image: "1506807803488-8eafc15316c7" },
];

export default function FarmsPage() {
  return (
    <div className="container-x pt-10">
      <div className="max-w-2xl">
        <p className="eyebrow">Манай фермүүд</p>
        <h1 className="mt-2 text-[38px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[52px]">
          Таны гал тогооны ногоо хаанаас ирдгийг мэдээрэй
        </h1>
        <p className="mt-5 text-[17px] leading-relaxed text-muted">
          Бид Монголын 40 гаруй ногооны фермтэй шууд гэрээтэй ажилладаг. Улирлын дагуу тариалж, захиалгын өмнөх
          өдөр хураадаг тул ногоо шинэхэн, бөөний үнэ бодитой.
        </p>
      </div>
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {farms.map((f) => (
          <li key={f.name} className="card overflow-hidden">
            <div className="relative aspect-[4/3] bg-cream-2">
              <Image src={img(f.image, 700)} alt={f.name} fill sizes="(min-width:1024px) 360px, 50vw" className="object-cover" />
            </div>
            <div className="p-6">
              <p className="flex items-center gap-1.5 text-[13px] font-semibold text-muted">
                <MapPin className="size-4" /> {f.place}
              </p>
              <h2 className="mt-2 text-lg font-extrabold">{f.name}</h2>
              <p className="mt-1 text-[15px] text-ink-2">{f.items}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-12 text-center">
        <Link href="/shop" className="btn btn-primary h-12 px-7">
          Үнийн жагсаалт үзэх <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
