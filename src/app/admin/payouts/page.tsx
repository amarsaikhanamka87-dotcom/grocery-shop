import type { Metadata } from "next";
import { AdminPageHeader } from "../_components/AdminPageHeader";

export const metadata: Metadata = { title: "Шилжүүлэг" };

// Placeholder: built on Day 9 (docs/full-flow.md). Role check comes on Day 2.
export default function AdminPayoutsPage() {
  return <AdminPageHeader title="Шилжүүлэг" description="Дэлгүүрүүдэд орлогыг шилжүүлэх." />;
}
