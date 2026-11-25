import type { Category } from "@/types/catalog";
import type { NavItem } from "@/types/nav";

/**
 * Main menu: categories come from the database, the rest are fixed site pages. "Хямдрал" only
 * when some product is on sale; otherwise it would open an empty page.
 */
export function buildNav(categories: Category[], hasDeals: boolean): NavItem[] {
  return [
    {
      label: "Ангилал",
      href: "/shop",
      children: categories.map((c) => ({ label: c.name, href: `/shop?category=${c.slug}` })),
    },
    ...(hasDeals ? [{ label: "Хямдрал", href: "/shop?deals=1", dot: true }] : []),
    { label: "Манай фермүүд", href: "/farms" },
    { label: "Хэрхэн захиалах", href: "/help" },
  ];
}
