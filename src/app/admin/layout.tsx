import type { Metadata } from "next";
import { requireAdmin } from "@/lib/roles/requireAdmin";
import { AdminSidebar } from "./_components/AdminSidebar";
import { AdminTopbar } from "./_components/AdminTopbar";

export const metadata: Metadata = { title: { default: "Админ", template: "%s | Ургац Админ" } };

/** Admin shell: fixed sidebar (lg+) + top bar. Every /admin page is admin-only (server-side role check). */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="min-h-dvh bg-cream">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminTopbar />
        <main className="px-4 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
