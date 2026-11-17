import type { Metadata } from "next";
import { AdminPageHeader } from "../_components/AdminPageHeader";

export const metadata: Metadata = { title: "Захиалга" };

// Placeholder: built on Day 9 (docs/full-flow.md). Role check comes on Day 2.
export default function AdminOrdersPage() {
  return <AdminPageHeader title="Захиалга" description="Бүх захиалгыг төлөв, огноогоор шүүж харах." />;
}
