import Image from "next/image";
import Link from "next/link";
import { MapPin, Sprout } from "lucide-react";

type Props = {
  name: string;
  place: string;
  photo?: string;
  products: { name: string; slug: string }[];
};

/** One farm: photo (or a plain tile), name, place, and its products as links to buy them. */
export function FarmCard({ name, place, photo, products }: Props) {
  return (
    <li className="card flex flex-col gap-4 p-4 sm:p-5">
      <div className="flex items-center gap-4">
        <span className="relative grid size-20 shrink-0 place-items-center overflow-hidden rounded-2xl bg-brand-50 text-brand">
          {photo ? <Image src={photo} alt={name} fill sizes="80px" className="object-cover" /> : <Sprout className="size-8" />}
        </span>
        <div className="min-w-0">
          <h2 className="text-[16px] font-bold">{name}</h2>
          <p className="mt-1 flex items-center gap-1.5 text-[16px] text-muted-foreground">
            <MapPin className="size-4 shrink-0" /> {place}
          </p>
        </div>
      </div>
      {products.length > 0 && (
        <ul className="flex flex-wrap gap-2" aria-label={`${name}-ийн ногоо`}>
          {products.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/product/${p.slug}`}
                className="flex h-11 items-center rounded-full border border-line bg-white px-4 text-[16px] font-bold hover:border-brand hover:text-brand"
              >
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
