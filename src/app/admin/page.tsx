import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { countPendingApplications } from "@/lib/business/countPendingApplications";
import { AdminPageHeader } from "./_components/AdminPageHeader";

export default async function AdminDashboardPage() {
  const pending = await countPendingApplications();
  return (
    <>
      <AdminPageHeader title="Хянах самбар" description="Өнөөдрийн захиалга, орлого, хүлээгдэж буй хүсэлтүүд." />
      <Link href="/admin/business" className="card mt-6 flex max-w-sm items-center gap-4 p-5 hover:shadow-card">
        <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand">
          <Building2 className="size-5" />
        </span>
        <span className="flex-1">
          <span className="block text-[28px] font-extrabold leading-none">{pending}</span>
          <span className="text-[14px] text-muted-foreground">B2B хүсэлт хүлээгдэж байна</span>
        </span>
        <ArrowRight className="size-4 text-brand" />
      </Link>
    </>
  );
}
