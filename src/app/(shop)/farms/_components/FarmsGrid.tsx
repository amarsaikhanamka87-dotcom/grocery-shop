import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Farm } from "../_features/farms";
import { FarmCard } from "./FarmCard";

type Props = { farms: Farm[]; products: { name: string; slug: string }[] };

/** The farm cards, each with the products we sell from it, then the way to the full list. */
export function FarmsGrid({ farms, products }: Props) {
  return (
    <>
      <ul className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
        {farms.map((farm) => (
          <FarmCard
            key={farm.name}
            name={farm.name}
            place={farm.place}
            photo={farm.photo}
            products={products.filter((p) => farm.productSlugs.includes(p.slug))}
          />
        ))}
      </ul>
      <div className="mt-10 text-center">
        <Link href="/shop" className="btn btn-primary h-12 px-7 text-[16px]">
          Бүх ногоо <ArrowRight className="size-4" />
        </Link>
      </div>
    </>
  );
}
