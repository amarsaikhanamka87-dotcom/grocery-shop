import { Skeleton } from "./Skeleton";

/** Placeholder for a card with a toolbar and rows (admin lists, orders). */
export function ListSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <section className="card mt-6 overflow-hidden">
      <div className="flex gap-2 border-b border-line px-4 py-3 sm:px-5">
        <Skeleton className="h-9 w-16" />
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-28" />
      </div>
      <ul className="divide-y divide-line">
        {Array.from({ length: rows }, (_, i) => (
          <li key={i} className="grid gap-3 px-4 py-4 sm:px-5 lg:grid-cols-[110px_1.2fr_1.4fr_1.2fr_auto] lg:items-center lg:gap-5">
            <div className="grid gap-1.5">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-3.5 w-20" />
            </div>
            <div className="grid gap-1.5">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3.5 w-1/2" />
            </div>
            <Skeleton className="h-4 w-5/6" />
            <div className="flex gap-1.5">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <Skeleton className="h-5 w-20" />
          </li>
        ))}
      </ul>
    </section>
  );
}
