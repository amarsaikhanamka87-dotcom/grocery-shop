import { Skeleton } from "@/components/skeleton/Skeleton";

/** While the Касс loads: the title row, product tiles and the bill, the same shape as the page. */
export default function Loading() {
  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-9 w-56 rounded-full" />
      </div>
      <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(400px,0.9fr)]">
        <div className="card p-4">
          <Skeleton className="h-11 w-full" />
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <Skeleton key={i} className="h-36 rounded-xl" />
            ))}
          </div>
        </div>
        <Skeleton className="hidden h-[480px] rounded-[20px] lg:block" />
      </div>
    </>
  );
}
