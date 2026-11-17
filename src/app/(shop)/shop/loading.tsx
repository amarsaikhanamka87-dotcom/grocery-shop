import { Skeleton } from "@/components/skeleton/Skeleton";
import { PageTitleSkeleton } from "@/components/skeleton/PageTitleSkeleton";
import { ProductGridSkeleton } from "@/components/skeleton/ProductGridSkeleton";

export default function ShopLoading() {
  return (
    <div className="container-x pt-8">
      <Skeleton className="h-4 w-40" />
      <div className="mt-3">
        <PageTitleSkeleton />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        <div className="hidden gap-3 lg:grid lg:content-start">
          {Array.from({ length: 7 }, (_, i) => (
            <Skeleton key={i} className="h-9 w-full" />
          ))}
        </div>
        <ProductGridSkeleton count={9} columns={3} />
      </div>
    </div>
  );
}
