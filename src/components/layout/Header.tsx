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
import { AddressDialog } from "@/components/location/AddressDialog";
import { ModeToggle } from "@/components/location/ModeToggle";

export async function Header() {
  const [categories, deals] = await Promise.all([getCategories(), getDeals(1)]);
  const nav = buildNav(categories, deals.length > 0);
  return (
    <header className="sticky top-0 z-40">
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
        <div className="container-x flex h-[60px] items-center gap-2 sm:gap-3 md:h-[64px] md:gap-4">
          <MobileMenu nav={nav} />
          <Logo />
          <SearchForm className="hidden min-w-[260px] flex-1 2xl:flex" />
          <div className="hidden sm:block">
            <ModeToggle />
          </div>
          <AddressPill />
          <div className="ml-auto flex shrink-0 items-center sm:gap-1 2xl:ml-0">
            <AdminLink className="hidden h-10 items-center gap-1.5 rounded-full border border-line px-3 text-[16px] font-bold hover:border-brand hover:text-brand lg:flex" />
            <AccountButton />
            <Link
              href="/wishlist"
              className="hidden h-11 min-w-11 items-center justify-center gap-1.5 rounded-full px-2.5 text-[16px] font-bold hover:bg-brand-50 lg:flex"
              aria-label="Хадгалсан бүтээгдэхүүн">
              <Heart className="size-[19px]" />
              <span className="hidden min-[1440px]:inline">Хадгалсан</span>
            </Link>
            <BasketButton />
          </div>
        </div>
        {/* Below 2xl: search on its own row (the top row has no room for it next to the switch,
            address, "Нэвтрэх" and the cart); on phones the "Хүргэлт | Очиж авах" switch sits next to it. */}
        <div className="group/search container-x flex items-center gap-2 pb-2.5 2xl:hidden">
          {/* While typing a search on a phone the switch steps aside so the box gets the whole row. */}
          <div className="group-has-[form:focus-within]/search:hidden sm:hidden">
            <ModeToggle />
          </div>
          <SearchForm className="min-w-0 flex-1" />
        </div>
      </div>

      <CategoryNav nav={nav} />
      {/* "Хаяг сонгох", once for the whole shop (opened by the pill, the phone address line, checkout). */}
      <AddressDialog />
    </header>
  );
}
