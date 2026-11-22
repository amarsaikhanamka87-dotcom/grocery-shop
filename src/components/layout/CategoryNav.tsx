import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { NavItem } from "@/types/nav";

export function CategoryNav({ nav }: { nav: NavItem[] }) {
  return (
    <nav
      className="hidden border-b border-line bg-cream lg:block"
      aria-label="Үндсэн цэс">
      <div className="container-x flex h-[42px] items-center justify-between">
        <ul className="-ml-2.5 flex items-center gap-1">
          {nav.map((item) => (
            <li key={item.label} className="group relative">
              <Link
                href={item.href}
                className={`flex h-[42px] items-center gap-1 px-2.5 text-[14.5px] font-semibold transition-colors hover:text-brand ${
                  item.dot ? "text-clay" : "text-ink-2"
                }`}>
                {item.dot && (
                  <span className="mr-1 size-1.5 rounded-full bg-clay" />
                )}
                {item.label}
                {item.children && (
                  <ChevronDown className="size-4 transition-transform group-hover:rotate-180" />
                )}
              </Link>
              {item.children && (
                <div className="invisible absolute left-0 top-full z-50 min-w-56 translate-y-1 rounded-2xl border border-line bg-white p-2 opacity-0 shadow-float transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="block rounded-xl px-3.5 py-2.5 text-sm font-semibold text-ink-2 hover:bg-brand-50 hover:text-brand">
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
