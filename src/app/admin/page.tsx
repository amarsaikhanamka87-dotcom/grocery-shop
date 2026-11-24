import { Suspense } from "react";
import { getDayMoney } from "@/lib/orders/getDayMoney";
import { getDayOutgoing } from "@/lib/orders/getDayOutgoing";
import { getStoreDaySales } from "@/lib/orders/getStoreDaySales";
import { ubRecentDays } from "@/lib/date/ubRecentDays";
import { DASHBOARD_DAYS } from "@/lib/constants";
import { AdminPageHeader } from "./_components/AdminPageHeader";
import { DayButtons } from "./_components/DayButtons";
import { DayReport } from "./_components/DayReport";
import { DayReportSkeleton } from "./_components/DayReportSkeleton";

type Params = Promise<{ day?: string }>;

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Params;
}) {
  const { day: dayParam } = await searchParams;
  const days = ubRecentDays(DASHBOARD_DAYS);

  const day = days.find((d) => d.key === dayParam) ?? days[0];
  const dayTitle = day === days[0] ? "Өнөөдөр" : `${day.longLabel}, ${day.weekday}`;

  // Not awaited here: DayReport waits inside <Suspense key={day}>, so switching days shows the
  // skeleton at once instead of the previous day's numbers.
  const data = Promise.all([getDayMoney(day), getDayOutgoing(day), getStoreDaySales(day)]);
  return (
    <>
      <AdminPageHeader
        title="Хянах самбар"
        description="Өдрөөр нь орлого болон гарсан барааг харах."
      />
      <DayButtons days={days} selected={day.key} />
      <Suspense key={day.key} fallback={<DayReportSkeleton />}>
        <DayReport dayTitle={dayTitle} data={data} />
      </Suspense>
    </>
  );
}
