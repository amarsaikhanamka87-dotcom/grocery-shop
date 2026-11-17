import { Skeleton } from "@/components/skeleton/Skeleton";
import { PageTitleSkeleton } from "@/components/skeleton/PageTitleSkeleton";

export default function OrderLoading() {
  return (
    <div className="container-x grid max-w-3xl gap-6 pt-8">
      <PageTitleSkeleton />
      <Skeleton className="h-[120px] w-full rounded-3xl" />
      <Skeleton className="h-[300px] w-full rounded-3xl" />
    </div>
  );
}
