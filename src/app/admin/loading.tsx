import { PageTitleSkeleton } from "@/components/skeleton/PageTitleSkeleton";
import { Skeleton } from "@/components/skeleton/Skeleton";

/**
 * Fallback for admin pages while they load (the dashboard, orders, receipts, POS): a neutral shape
 * (title, a row of 3 cards, one big panel) that doesn't pretend to be a specific page.
 */
export default function AdminLoading() {
  return (
    <>
      <PageTitleSkeleton />
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Skeleton className="h-24 rounded-[20px]" />
        <Skeleton className="h-24 rounded-[20px]" />
        <Skeleton className="h-24 rounded-[20px]" />
      </div>
      <Skeleton className="mt-6 h-80 rounded-[20px]" />
    </>
  );
}
