import type { CategoryWithCount } from "@/types/catalog";
import { shopHref, type ShopParams } from "../_features/shopHref";
import { CategoryLink } from "./CategoryLink";
import { ChipRow } from "./ChipRow";

type Props = { categories: CategoryWithCount[]; total: number; params: ShopParams };

const HEADING = "text-[16px] font-bold text-ink max-lg:sr-only";

/** The categories. Counts are per category in the whole shop, so they hide while a search or a
 *  ?deals / ?organic link (footer "Хямдрал") is on: they would not match the results. */
export function ShopSidebar({ categories, total, params }: Props) {
  const filtered = !!(params.q || params.deals || params.organic);
  return (
    <aside className="min-w-0 lg:sticky lg:top-[200px] lg:self-start">
      <div className="min-w-0">
        <h2 className={HEADING}>Ангилал</h2>
        <ChipRow activeKey={params.category ?? ""}>
          <li>
            <CategoryLink
              href={shopHref(params, { category: undefined })}
              label="Бүгд"
              count={filtered ? undefined : total}
              active={!params.category}
            />
          </li>
          {categories.map((c) => (
            <li key={c.id}>
              <CategoryLink
                href={shopHref(params, { category: c.slug })}
                label={c.name}
                count={filtered ? undefined : c.productCount}
                active={params.category === c.slug}
              />
            </li>
          ))}
        </ChipRow>
      </div>
    </aside>
  );
}
