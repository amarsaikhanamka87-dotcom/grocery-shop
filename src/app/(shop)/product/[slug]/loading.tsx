import { Skeleton } from "@/components/skeleton/Skeleton";

export default function ProductLoading() {
  return (
    <div className="container-x pt-8">
      <Skeleton className="h-4 w-56" />
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
        <Skeleton className="aspect-square w-full rounded-3xl" />
        <div className="grid content-start gap-4">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-11 w-4/5" />
          <Skeleton className="h-9 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
          <div className="mt-4 flex gap-3">
            <Skeleton className="h-14 w-44 rounded-full" />
            <Skeleton className="h-14 flex-1 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
