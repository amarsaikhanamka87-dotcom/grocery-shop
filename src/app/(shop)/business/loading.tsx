import { Skeleton } from "@/components/skeleton/Skeleton";
import { PageTitleSkeleton } from "@/components/skeleton/PageTitleSkeleton";

export default function BusinessLoading() {
  return (
    <div className="container-x grid gap-6 pt-8">
      <PageTitleSkeleton description />
      <Skeleton className="h-[200px] w-full rounded-3xl" />
      <Skeleton className="h-[320px] w-full rounded-3xl" />
    </div>
  );
}
