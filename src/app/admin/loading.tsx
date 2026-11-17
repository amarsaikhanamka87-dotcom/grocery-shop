import { PageTitleSkeleton } from "@/components/skeleton/PageTitleSkeleton";
import { ListSkeleton } from "@/components/skeleton/ListSkeleton";

/** Fallback for every admin page while it loads its data. */
export default function AdminLoading() {
  return (
    <>
      <PageTitleSkeleton description />
      <ListSkeleton rows={6} />
    </>
  );
}
