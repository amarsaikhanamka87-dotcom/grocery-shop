import Link from "next/link";
import type { CategoryWithCount } from "@/types/catalog";

// Same look as the /shop chips (16 bold, 44px, counts only on desktop). Nothing is chosen on the
// home page, so "Бүгд" is a plain chip too.
const chip =
  "flex h-11 shrink-0 items-center gap-2 rounded-full border border-line bg-white px-4 text-[16px] font-bold whitespace-nowrap text-ink-2 hover:border-brand hover:text-brand";

/**
 * The categories (from the DB) as one row of chips under the hero: on a phone the only way into a
 * category besides the ☰ menu. The row scrolls sideways inside itself; the page never does.
 */
export function CategoryChips({ categories }: { categories: CategoryWithCount[] }) {
  return (
    <nav aria-label="Ангилал" className="container-x mt-5 sm:mt-6">
      <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        <li>
          <Link href="/shop" className={chip}>
            Бүгд
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={`/shop?category=${category.slug}`} className={chip}>
              {category.name}
              <span className="tabular-nums opacity-80 max-lg:hidden">{category.productCount}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
