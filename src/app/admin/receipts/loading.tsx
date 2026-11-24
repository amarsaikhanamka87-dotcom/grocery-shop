import { PageTitleSkeleton } from "@/components/skeleton/PageTitleSkeleton";
import { ListSkeleton } from "@/components/skeleton/ListSkeleton";

/** While this list loads: a title + filter chips + rows, the same shape as the page. */
export default function Loading() {
  return (
    <>
      <PageTitleSkeleton description />
      <ListSkeleton rows={6} />
    </>
  );
}
