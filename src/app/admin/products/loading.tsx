import { Skeleton } from "@/components/skeleton/Skeleton";
import { PageTitleSkeleton } from "@/components/skeleton/PageTitleSkeleton";
import { ProductGridSkeleton } from "@/components/skeleton/ProductGridSkeleton";

export default function AdminProductsLoading() {
  return (
    <>
      <PageTitleSkeleton description />
      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-20 rounded-2xl" />
        ))}
      </div>
      <section className="card mt-6 grid gap-4 p-4">
        <Skeleton className="h-10 w-full" />
        <ProductGridSkeleton count={8} />
      </section>
    </>
  );
}
