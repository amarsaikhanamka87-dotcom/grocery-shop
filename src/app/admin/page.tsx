import { Suspense } from "react";
import { getDayMoney } from "@/lib/orders/getDayMoney";
import { getDayOutgoing } from "@/lib/orders/getDayOutgoing";
import { getStoreDaySales } from "@/lib/orders/getStoreDaySales";
import { ubRecentDays } from "@/lib/date/ubRecentDays";
import { AdminPageHeader } from "./_components/AdminPageHeader";
import { DayNavigator } from "./_components/DayNavigator";
import { DayReport } from "./_components/DayReport";
import { DayReportSkeleton } from "./_components/DayReportSkeleton";
import { resolveDashboardDay } from "./_features/resolveDashboardDay";

type Params = Promise<{ day?: string }>;

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Params;
}) {
  const { day: dayParam } = await searchParams;
  const [today] = ubRecentDays(1);
  const dashboardDay = resolveDashboardDay(dayParam, today);
  const { day } = dashboardDay;
  // One date format on the page: "11-р сарын 22, Ням" (today also says "Өнөөдөр").
  const dayLabel = `${day.longLabel}, ${day.weekday}`;
  const dayTitle = dashboardDay.isToday ? "Өнөөдөр" : dayLabel;

  // Not awaited here: DayReport waits inside <Suspense key={day}>, so switching days shows the
  // skeleton at once instead of the previous day's numbers.
  const data = Promise.all([getDayMoney(day), getDayOutgoing(day), getStoreDaySales(day)]);
  return (
    <>
      <AdminPageHeader
        title="Хянах самбар"
        description="Өдрөөр нь орлого болон гарсан барааг харах."
      />
      <DayNavigator
        dashboardDay={dashboardDay}
        todayKey={today.key}
        label={dashboardDay.isToday ? `Өнөөдөр · ${day.longLabel}` : dayLabel}
      />
      <Suspense key={day.key} fallback={<DayReportSkeleton />}>
        <DayReport dayTitle={dayTitle} data={data} />
      </Suspense>
    </>
  );
}
