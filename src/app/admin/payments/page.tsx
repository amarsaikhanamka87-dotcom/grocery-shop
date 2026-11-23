import type { Metadata } from "next";
import { AdminPageHeader } from "../_components/AdminPageHeader";

export const metadata: Metadata = { title: "Төлбөр" };
export default function AdminPaymentsPage() {
  return (
    <AdminPageHeader
      title="Төлбөр"
      description="Wire.mn-ээр орж ирсэн төлбөрүүдийг хянах."
    />
  );
}
