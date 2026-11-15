import Link from "next/link";
import { Heart, Truck } from "lucide-react";
import { SHOP_PHONE } from "@/lib/constants";
import { getCategories } from "@/lib/catalog/getCategories";
import { buildNav } from "./buildNav";
import { Logo } from "./Logo";
import { SearchForm } from "./SearchForm";
import { AccountButton } from "./AccountButton";
import { BasketButton } from "./BasketButton";
import { MobileMenu } from "./MobileMenu";
import { CategoryNav } from "./CategoryNav";

export async function Header() {
  const nav = buildNav(await getCategories());
  return (
    <header className="sticky -top-[30px] z-40 lg:top-0">
      {/* Top bar */}
      <div className="bg-brand text-[13px] font-semibold text-white">
        <div className="container-x flex h-[30px] items-center justify-between gap-4">
          <a href={`tel:${SHOP_PHONE}`} className="hidden md:block">
            Утас, WhatsApp: {SHOP_PHONE}
          </a>
          <p className="truncate text-center max-md:w-full">
            <span className="md:hidden">Өнөөдөр захиалаад маргааш өглөө аваарай</span>
            <span className="hidden md:inline">
              Ресторан, зочид буудал, дэлгүүрт зориулсан бөөний ногоо — өнөөдөр захиалаад маргааш өглөө хүлээж аваарай
            </span>
          </p>
          <Link href="/help#delivery" className="hidden underline underline-offset-2 md:block">
            Хүргэлтийн бүс
          </Link>
        </div>
      </div>

      {/* Main row */}
      <div className="border-b border-line bg-cream/95 backdrop-blur">
        <div className="container-x flex h-[60px] items-center gap-3 md:h-[64px] md:gap-4 lg:gap-8">
          <MobileMenu nav={nav} />
          <Logo />
          <SearchForm className="hidden flex-1 md:flex" />
          <div className="hidden items-center gap-3 rounded-xl bg-cream-2 px-3.5 py-1.5 lg:flex">
            <Truck className="size-5 text-ink-2" />
            <div className="leading-tight">
              <p className="text-[11px] font-medium text-muted-foreground">Дараагийн хүргэлт</p>
              <p className="text-[13px] font-bold">Маргааш, 06:00-с</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1 md:ml-0">
            <AccountButton />
            <Link
              href="/wishlist"
              className="hidden size-10 place-items-center rounded-full hover:bg-cream-2 sm:grid"
              aria-label="Хадгалсан бүтээгдэхүүн"
            >
              <Heart className="size-[19px]" />
            </Link>
            <BasketButton />
          </div>
        </div>
        <div className="container-x pb-2.5 md:hidden">
          <SearchForm />
        </div>
      </div>

      <CategoryNav nav={nav} />
    </header>
  );
}
