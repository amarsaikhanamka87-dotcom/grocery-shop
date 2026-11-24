import { Skeleton } from "@/components/skeleton/Skeleton";

/** Shown while a newly picked day loads, so the old day's money never looks like the new day's. */
export function DayReportSkeleton() {
  return (
    <div aria-busy="true" aria-label="Ачаалж байна">
      <Skeleton className="mt-6 h-6 w-40" />
      <div className="mt-3 grid gap-4 sm:grid-cols-3">
        <Skeleton className="h-24 rounded-[20px]" />
        <Skeleton className="h-24 rounded-[20px]" />
        <Skeleton className="h-24 rounded-[20px]" />
      </div>
      <Skeleton className="mt-6 h-80 rounded-[20px]" />
    </div>
  );
}
