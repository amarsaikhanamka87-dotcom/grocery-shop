import Link from "next/link";
import { Heart } from "lucide-react";
import { getCategories } from "@/lib/catalog/getCategories";
import { getDeals } from "@/lib/catalog/getDeals";
import { buildNav } from "./buildNav";
import { Logo } from "./Logo";
import { SearchForm } from "./SearchForm";
import { AccountButton } from "./AccountButton";
import { AdminLink } from "./AdminLink";
import { BasketButton } from "./BasketButton";
import { MobileMenu } from "./MobileMenu";
import { CategoryNav } from "./CategoryNav";
import { AddressPill } from "@/components/location/AddressPill";
import { ModeToggle } from "@/components/location/ModeToggle";

export async function Header() {
  const [categories, deals] = await Promise.all([getCategories(), getDeals(1)]);
  const nav = buildNav(categories, deals.length > 0);
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
      <div className=" bg-white/95 backdrop-blur">
        <div className="container-x flex h-[60px] items-center gap-3 md:h-[64px] md:gap-4">
          <MobileMenu nav={nav} />
          <Logo />
          <SearchForm className="hidden flex-1 md:flex lg:min-w-[300px]" />
          <div className="hidden sm:block">
            <ModeToggle />
          </div>
          <AddressPill />
          <div className="ml-auto flex items-center gap-1 md:ml-0">
            <AdminLink className="hidden h-10 items-center gap-1.5 rounded-full border border-line px-3 text-[14px] font-bold hover:border-brand hover:text-brand lg:flex" />
            <AccountButton />
            <Link
              href="/wishlist"
              className="hidden size-10 place-items-center rounded-full hover:bg-brand-50 sm:grid"
              aria-label="Хадгалсан бүтээгдэхүүн">
              <Heart className="size-[19px]" />
            </Link>
            <BasketButton />
          </div>
        </div>
        {/* Below md: search on its own row; on phones the "Хүргэлт | Очиж авах" switch sits next to
            it (with words, not bare icons) because the top row has no room for it. */}
        <div className="container-x flex items-center gap-2 pb-2.5 md:hidden">
          <div className="sm:hidden">
            <ModeToggle />
          </div>
          <SearchForm className="min-w-0 flex-1" />
        </div>
      </div>

      <CategoryNav nav={nav} />
    </header>
  );
}
