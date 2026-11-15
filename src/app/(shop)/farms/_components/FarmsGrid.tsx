import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FarmCard, type Farm } from "./FarmCard";

const farms: Farm[] = [
  { name: "Шаамарын ногоон хүлэмж", place: "Сэлэнгэ, Шаамар", items: "Улаан лооль, өргөст хэмх, брокколи", image: "1592924357228-91a4daadcfea" },
  { name: "Дарханы тариаланч", place: "Дархан-Уул", items: "Лууван, байцаа, сонгино", image: "1598170845058-32b9d6a5da37" },
  { name: "Борнуурын төмс", place: "Төв, Борнуур", items: "Шаргал төмс", image: "1518977676601-b53f82aba655" },
  { name: "Зуунмодын навчит ногоо", place: "Төв, Зуунмод", items: "Салатны навч, бууцай, ногоон сонгино", image: "1622206151226-18ca2c9ab4a1" },
  { name: "Орхоны хүлэмж", place: "Орхон", items: "Чихэрлэг чинжүү, цуккини", image: "1601648764658-cf37e8c89b70" },
  { name: "Сэлэнгийн манжин, сармис", place: "Сэлэнгэ", items: "Манжин, сармис, цэцэгт байцаа", image: "1506807803488-8eafc15316c7" },
];

export function FarmsGrid() {
  return (
    <>
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {farms.map((f) => (
          <FarmCard key={f.name} farm={f} />
        ))}
      </ul>
      <div className="mt-12 text-center">
        <Link href="/shop" className="btn btn-primary h-12 px-7">
          Үнийн жагсаалт үзэх <ArrowRight className="size-4" />
        </Link>
      </div>
    </>
  );
}
