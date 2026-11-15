import type { Category } from "@/types/catalog";
import type { NavItem } from "@/types/nav";

/** Main menu: categories come from the database, the rest are fixed site pages. */
export function buildNav(categories: Category[]): NavItem[] {
  return [
    {
      label: "Ангилал",
      href: "/shop",
      children: categories.map((c) => ({ label: c.name, href: `/shop?category=${c.slug}` })),
    },
    { label: "Хямдрал", href: "/shop?deals=1", dot: true },
    { label: "Манай фермүүд", href: "/farms" },
    { label: "Хэрхэн захиалах", href: "/help" },
  ];
}
