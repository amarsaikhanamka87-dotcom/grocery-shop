import { cn } from "@/lib/utils";
import { Skeleton } from "./Skeleton";

/** Placeholder for ProductGrid: cards with image, price, name and the cart button. */
export function ProductGridSkeleton({ count = 8, columns = 4 }: { count?: number; columns?: 3 | 4 }) {
  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3", columns === 4 && "lg:grid-cols-4")}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="grid gap-3 rounded-3xl bg-cream-2 p-3">
          <Skeleton className="aspect-square w-full rounded-2xl" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-12 w-full rounded-2xl" />
        </div>
      ))}
    </div>
  );
}
