import type { getDayMoney } from "@/lib/orders/getDayMoney";
import type { getDayOutgoing } from "@/lib/orders/getDayOutgoing";
import type { getStoreDaySales } from "@/lib/orders/getStoreDaySales";
import { InventoryTable } from "./InventoryTable";
import { TodayMoney } from "./TodayMoney";

type DayData = [
  Awaited<ReturnType<typeof getDayMoney>>,
  Awaited<ReturnType<typeof getDayOutgoing>>,
  Awaited<ReturnType<typeof getStoreDaySales>>,
];

type Props = { dayTitle: string; data: Promise<DayData> };

/**
 * One day's money + outgoing goods. Waits for the data page.tsx started loading, so the page can
 * wrap it in <Suspense key={day}> and show a skeleton while a newly picked day loads.
 */
export async function DayReport({ dayTitle, data }: Props) {
  const [money, outgoing, store] = await data;
  return (
    <>
      <TodayMoney title={dayTitle} money={money} store={store} />
      <InventoryTable dayTitle={dayTitle} rows={outgoing} deliveryFees={money.deliveryFees} />
    </>
  );
}
