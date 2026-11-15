import type { CategoryWithCount } from "@/types/catalog";
import { shopHref, type ShopParams } from "../_features/shopHref";
import { CategoryLink } from "./CategoryLink";
import { FilterToggle } from "./FilterToggle";

type Props = { categories: CategoryWithCount[]; total: number; params: ShopParams };

export function ShopSidebar({ categories, total, params }: Props) {
  return (
    <aside className="min-w-0 lg:sticky lg:top-[200px] lg:self-start">
      <h2 className="text-[13px] font-bold uppercase tracking-[0.08em] text-muted-foreground max-lg:sr-only">
        Ангилал
      </h2>
      <ul className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:grid lg:gap-1 lg:px-0">
        <li>
          <CategoryLink
            href={shopHref(params, { category: undefined })}
            label="Бүгд"
            count={total}
            active={!params.category}
          />
        </li>
        {categories.map((c) => (
          <li key={c.id}>
            <CategoryLink
              href={shopHref(params, { category: c.slug })}
              label={c.name}
              count={c.productCount}
              active={params.category === c.slug}
            />
          </li>
        ))}
      </ul>
      <div className="mt-6 hidden gap-2 lg:grid">
        <h2 className="text-[13px] font-bold uppercase tracking-[0.08em] text-muted-foreground">Шүүлтүүр</h2>
        <FilterToggle
          href={shopHref(params, { organic: params.organic ? undefined : "1" })}
          label="Зөвхөн органик"
          active={!!params.organic}
        />
        <FilterToggle
          href={shopHref(params, { deals: params.deals ? undefined : "1" })}
          label="Хямдралтай"
          active={!!params.deals}
        />
      </div>
    </aside>
  );
}
