import Link from "next/link";
import { Building2, ChevronDown, Heart, Search, Truck, User } from "lucide-react";
import { getCurrentUser } from "@/lib/session";
import { SHOP_PHONE } from "@/lib/constants";
import { Logo } from "./Logo";
import { NAV } from "./nav";
import { BasketButton } from "./BasketButton";
import { MobileMenu } from "./MobileMenu";

function SearchForm({ className = "" }: { className?: string }) {
  return (
    <form action="/shop" role="search" className={`relative flex items-center ${className}`}>
      <Search className="pointer-events-none absolute left-4 size-[18px] text-muted" />
      <input
        name="q"
        type="search"
        placeholder="Төмс, лууван, лооль хайх"
        aria-label="Бүтээгдэхүүн хайх"
        className="h-11 w-full rounded-full border border-line bg-white pl-11 pr-24 text-[16px] outline-none md:h-12 md:pr-28 md:text-[15px] placeholder:text-muted/80 focus:border-brand"
      />
      <button type="submit" className="btn btn-primary absolute right-1 h-9 px-4 text-sm md:right-1.5 md:px-5">
        Хайх
      </button>
    </form>
  );
}

export async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="sticky -top-[30px] z-40 lg:top-0">
      {/* Top bar */}
      <div className="bg-brand text-[13px] font-semibold text-white">
        <div className="container-x flex h-[30px] items-center justify-between gap-4">
          <a href={`tel:${SHOP_PHONE.replace("-", "")}`} className="hidden md:block">
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
          <MobileMenu user={user ? { name: user.name, role: user.role } : null} />
          <Logo />
          <SearchForm className="hidden flex-1 md:flex" />
          <div className="hidden items-center gap-3 rounded-xl bg-cream-2 px-3.5 py-1.5 lg:flex">
            <Truck className="size-5 text-ink-2" />
            <div className="leading-tight">
              <p className="text-[11px] font-medium text-muted">Дараагийн хүргэлт</p>
              <p className="text-[13px] font-bold">Маргааш, 06:00-с</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1 md:ml-0">
            <Link
              href={user ? (user.role === "ADMIN" ? "/admin" : "/account") : "/login"}
              className="hidden size-10 place-items-center rounded-full hover:bg-cream-2 sm:grid"
              aria-label={user ? "Миний бүртгэл" : "Нэвтрэх"}
              title={user ? user.name : "Нэвтрэх"}
            >
              <User className="size-[20px]" />
            </Link>
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

      {/* Category nav */}
      <nav className="hidden border-b border-line bg-cream lg:block" aria-label="Үндсэн цэс">
        <div className="container-x flex h-[42px] items-center justify-between">
          <ul className="-ml-2.5 flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className={`flex h-[42px] items-center gap-1 px-2.5 text-[14.5px] font-semibold transition-colors hover:text-brand ${
                    item.dot ? "text-clay" : "text-ink-2"
                  }`}
                >
                  {item.dot && <span className="mr-1 size-1.5 rounded-full bg-clay" />}
                  {item.label}
                  {item.children && <ChevronDown className="size-4 transition-transform group-hover:rotate-180" />}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-0 top-full z-50 min-w-56 translate-y-1 rounded-2xl border border-line bg-white p-2 opacity-0 shadow-float transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block rounded-xl px-3.5 py-2.5 text-sm font-semibold text-ink-2 hover:bg-brand-50 hover:text-brand"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          {user ? (
            <span className="flex h-[30px] items-center gap-2 rounded-lg border border-dashed border-ink-2/40 bg-white px-4 text-sm font-bold">
              <Building2 className="size-4" />
              {user.companyName ?? user.name}
            </span>
          ) : (
            <Link
              href="/register"
              className="flex h-[30px] items-center gap-2 rounded-lg border border-dashed border-ink-2/40 bg-white px-4 text-sm font-bold hover:border-brand hover:text-brand"
            >
              <Building2 className="size-4" />
              Байгууллагаар бүртгүүлэх
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
