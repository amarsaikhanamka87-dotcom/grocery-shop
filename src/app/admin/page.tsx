import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { countPendingApplications } from "@/lib/business/countPendingApplications";
import { getTodayMoney } from "@/lib/orders/getTodayMoney";
import { getInventory } from "@/lib/catalog/getInventory";
import { AdminPageHeader } from "./_components/AdminPageHeader";
import { TodayMoney } from "./_components/TodayMoney";
import { InventoryTable } from "./_components/InventoryTable";

export default async function AdminDashboardPage() {
  const [pending, money, inventory] = await Promise.all([
    countPendingApplications(),
    getTodayMoney(),
    getInventory(),
  ]);
  return (
    <>
      <AdminPageHeader
        title="Хянах самбар"
        description="Өнөөдрийн захиалга, орлого, хүлээгдэж буй хүсэлтүүд."
      />
      <TodayMoney money={money} />

      <InventoryTable rows={inventory} />
    </>
  );
}
