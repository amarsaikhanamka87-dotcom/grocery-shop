import { Skeleton } from "@/components/skeleton/Skeleton";

export default function DemoPayLoading() {
  return (
    <div className="container-x grid max-w-md pt-10">
      <Skeleton className="h-[460px] w-full rounded-3xl" />
    </div>
  );
}
