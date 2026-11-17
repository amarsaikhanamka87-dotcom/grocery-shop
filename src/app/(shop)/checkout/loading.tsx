import { Skeleton } from "@/components/skeleton/Skeleton";
import { PageTitleSkeleton } from "@/components/skeleton/PageTitleSkeleton";

export default function CheckoutLoading() {
  return (
    <div className="container-x pt-8">
      <PageTitleSkeleton />
      <div className="mt-6 grid grid-cols-1 items-start gap-6 sm:mt-8 lg:grid-cols-[1fr_400px] lg:gap-8">
        <div className="grid gap-6">
          <Skeleton className="h-[320px] w-full rounded-3xl" />
          <Skeleton className="h-[280px] w-full rounded-3xl" />
        </div>
        <Skeleton className="h-[420px] w-full rounded-3xl" />
      </div>
    </div>
  );
}
