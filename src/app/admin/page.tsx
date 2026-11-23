import { getDayMoney } from "@/lib/orders/getDayMoney";
import { getDayOutgoing } from "@/lib/orders/getDayOutgoing";
import { ubRecentDays } from "@/lib/date/ubRecentDays";
import { DASHBOARD_DAYS } from "@/lib/constants";
import { AdminPageHeader } from "./_components/AdminPageHeader";
import { DayButtons } from "./_components/DayButtons";
import { TodayMoney } from "./_components/TodayMoney";
import { InventoryTable } from "./_components/InventoryTable";

type Params = Promise<{ day?: string }>;

// Admin role is checked in app/admin/layout.tsx (requireAdmin).
export default async function AdminDashboardPage({ searchParams }: { searchParams: Params }) {
  const { day: dayParam } = await searchParams;
  const days = ubRecentDays(DASHBOARD_DAYS);
  // Only one of the listed days is accepted; anything else falls back to today.
  const day = days.find((d) => d.key === dayParam) ?? days[0];
  const dayTitle = day === days[0] ? "Өнөөдөр" : `${day.label}, ${day.weekday}`;

  const [money, outgoing] = await Promise.all([getDayMoney(day), getDayOutgoing(day)]);
  return (
    <>
      <AdminPageHeader
        title="Хянах самбар"
        description="Өдрөөр нь орлого болон гарсан барааг харах."
      />
      <DayButtons days={days} selected={day.key} />
      <TodayMoney title={dayTitle} money={money} />

      <InventoryTable dayTitle={dayTitle} rows={outgoing} />
    </>
  );
}
