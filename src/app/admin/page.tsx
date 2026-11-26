import { Suspense } from "react";
import { PeriodNavigator } from "@/components/admin/PeriodNavigator";
import { resolvePeriod } from "@/lib/date/resolvePeriod";
import { ubRecentDays } from "@/lib/date/ubRecentDays";
import { getDayMoney } from "@/lib/orders/getDayMoney";
import { getDayOutgoing } from "@/lib/orders/getDayOutgoing";
import { getStoreDaySales } from "@/lib/orders/getStoreDaySales";
import { AdminPageHeader } from "./_components/AdminPageHeader";
import { DayReport } from "./_components/DayReport";
import { DayReportSkeleton } from "./_components/DayReportSkeleton";

type Params = Promise<{ period?: string; date?: string; day?: string }>;

export default async function AdminDashboardPage({ searchParams }: { searchParams: Params }) {
  const params = await searchParams;
  const [today] = ubRecentDays(1);
  // ?day= is the old one-day link (bookmarks); it still opens that day.
  const period = resolvePeriod(params.period, params.date ?? params.day, today);

  // Not awaited here: DayReport waits inside <Suspense key={period}>, so switching periods shows
  // the skeleton at once instead of the previous period's numbers. The queries take any range.
  const data = Promise.all([getDayMoney(period), getDayOutgoing(period), getStoreDaySales(period)]);
  return (
    <>
      <AdminPageHeader title="Хянах самбар" />
      <PeriodNavigator path="/admin" period={period} todayKey={today.key} />
      <Suspense key={`${period.kind}-${period.key}`} fallback={<DayReportSkeleton />}>
        <DayReport dayTitle={period.title} data={data} />
      </Suspense>
    </>
  );
}
