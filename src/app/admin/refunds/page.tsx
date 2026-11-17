import type { Metadata } from "next";
import { AdminPageHeader } from "../_components/AdminPageHeader";

export const metadata: Metadata = { title: "Буцаалт" };

// Placeholder: built on Day 9 (docs/full-flow.md). Role check comes on Day 2.
export default function AdminRefundsPage() {
  return <AdminPageHeader title="Буцаалт" description="Татгалзсан захиалгын мөнгийг буцаах." />;
}
