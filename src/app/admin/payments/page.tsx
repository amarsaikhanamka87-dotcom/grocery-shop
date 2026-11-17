import type { Metadata } from "next";
import { AdminPageHeader } from "../_components/AdminPageHeader";

export const metadata: Metadata = { title: "Төлбөр" };

// Placeholder: built on Day 9 (docs/full-flow.md). Role check comes on Day 2.
export default function AdminPaymentsPage() {
  return <AdminPageHeader title="Төлбөр" description="Wire.mn-ээр орж ирсэн төлбөрүүдийг хянах." />;
}
