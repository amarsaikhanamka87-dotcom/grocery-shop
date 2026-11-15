import type { CategoryWithCount } from "@/types/catalog";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CategoryTile } from "./CategoryTile";

export function CategoriesSection({ categories }: { categories: CategoryWithCount[] }) {
  return (
    <section className="container-x mt-24">
      <SectionHeading
        eyebrow="Ангилал"
        title="Юу хайж байна вэ?"
        link={{ href: "/shop", label: "Бүгдийг үзэх" }}
      />
      <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {categories.map((c) => (
          <li key={c.id}>
            <CategoryTile category={c} />
          </li>
        ))}
      </ul>
    </section>
  );
}
