"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderTree, LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";

const LINKS = [
  { href: "/admin", label: "Хянах самбар", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Захиалгууд", icon: ShoppingCart },
  { href: "/admin/products", label: "Бүтээгдэхүүн", icon: Package },
  { href: "/admin/categories", label: "Ангилал", icon: FolderTree },
  { href: "/admin/users", label: "Байгууллагууд", icon: Users },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="no-scrollbar flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:pb-0">
      {LINKS.map((l) => {
        const active = l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-2.5 text-[14.5px] font-semibold ${
              active ? "bg-brand text-white" : "text-ink-2 hover:bg-brand-50"
            }`}
          >
            <l.icon className="size-[18px]" /> {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
