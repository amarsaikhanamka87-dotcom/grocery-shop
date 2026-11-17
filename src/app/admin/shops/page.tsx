import type { Metadata } from "next";
import { AdminPageHeader } from "../_components/AdminPageHeader";

export const metadata: Metadata = { title: "Дэлгүүрүүд" };

// Placeholder: built on Day 3 (docs/full-flow.md). Role check comes on Day 2.
export default function AdminShopsPage() {
  return <AdminPageHeader title="Дэлгүүрүүд" description="Бүртгүүлсэн дэлгүүрүүдийг баталгаажуулах, татгалзах." />;
}
