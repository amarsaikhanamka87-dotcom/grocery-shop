import Link from "next/link";
import { Heart } from "lucide-react";
import { SHOP_PHONE } from "@/lib/constants";
import { auth } from "@clerk/nextjs/server";
import { getCategories } from "@/lib/catalog/getCategories";
import { getRole } from "@/lib/roles/getRole";
import { buildNav } from "./buildNav";
import { Logo } from "./Logo";
import { SearchForm } from "./SearchForm";
import { AccountButton } from "./AccountButton";
import { BasketButton } from "./BasketButton";
import { MobileMenu } from "./MobileMenu";
import { CategoryNav } from "./CategoryNav";
import { AddressPill } from "@/components/location/AddressPill";

export async function Header() {
  const [categories, role, { userId }] = await Promise.all([
    getCategories(),
    getRole(),
    auth(),
  ]);
  const nav = buildNav(categories);
  return (
    <header className="sticky -top-[30px] z-40 lg:top-0">
      {/* Top bar */}
      {/* <div className="bg-brand text-[13px] font-semibold text-white">
        <div className="container-x flex h-[30px] items-center justify-between gap-4">
          <a href={`tel:${SHOP_PHONE}`} className="hidden md:block">
            Утас, WhatsApp: {SHOP_PHONE}
          </a>
          <p className="truncate text-center max-md:w-full">
            <span className="md:hidden">
              Өнөөдөр захиалаад маргааш өглөө аваарай
            </span>
            <span className="hidden md:inline">
              Ресторан, зочид буудал, дэлгүүрт зориулсан бөөний ногоо — өнөөдөр
              захиалаад маргааш өглөө хүлээж аваарай
            </span>
          </p>
          <Link
            href="/help#delivery"
            className="hidden underline underline-offset-2 md:block">
            Хүргэлтийн бүс
          </Link>
        </div>
      </div> */}

      {/* Main row */}
      <div className=" bg-cream/95 backdrop-blur">
        <div className="container-x flex h-[60px] items-center gap-3 md:h-[64px] md:gap-4 lg:gap-8">
          <MobileMenu nav={nav} />
          <Logo />
          <SearchForm className="hidden flex-1 md:flex" />
          <AddressPill />
          <div className="ml-auto flex items-center gap-1 md:ml-0">
            <AccountButton />
            <Link
              href="/wishlist"
              className="hidden size-10 place-items-center rounded-full hover:bg-cream-2 sm:grid"
              aria-label="Хадгалсан бүтээгдэхүүн">
              <Heart className="size-[19px]" />
            </Link>
            <BasketButton />
          </div>
        </div>
        <div className="container-x pb-2.5 md:hidden">
          <SearchForm />
        </div>
      </div>

      <CategoryNav nav={nav} role={role} signedIn={!!userId} />
    </header>
  );
}
