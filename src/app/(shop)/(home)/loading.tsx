import { Skeleton } from "@/components/skeleton/Skeleton";
import { ProductGridSkeleton } from "@/components/skeleton/ProductGridSkeleton";

export default function HomeLoading() {
  return (
    <div className="container-x grid gap-10 pt-6">
      <Skeleton className="h-[260px] w-full rounded-3xl sm:h-[380px]" />
      <div className="grid gap-5">
        <Skeleton className="h-8 w-56" />
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  );
}
