import { Skeleton } from "./Skeleton";

/** Placeholder for a page heading (+ optional description line). */
export function PageTitleSkeleton({ description = false }: { description?: boolean }) {
  return (
    <div className="grid gap-2.5">
      <Skeleton className="h-10 w-64 max-w-full sm:h-12" />
      {description && <Skeleton className="h-4 w-96 max-w-full" />}
    </div>
  );
}
