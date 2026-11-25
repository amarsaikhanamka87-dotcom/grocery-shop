"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNav } from "../_features/adminNav";
import { isActivePath } from "../_features/isActivePath";

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="grid gap-1 p-3" aria-label="Админ цэс">
      {adminNav.map(({ href, label, icon: Icon }) => {
        const active = isActivePath(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-semibold transition-colors ${
              active ? "bg-brand text-white" : "text-ink-2 hover:bg-cream-2 hover:text-ink"
            }`}
          >
            <Icon className="size-[18px] shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
