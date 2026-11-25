import type { Metadata } from "next";
import { listHandwritingScans } from "@/lib/ocr/listHandwritingScans";
import { AdminPageHeader } from "../_components/AdminPageHeader";
import { HandwritingReader } from "./_components/HandwritingReader";
import { RecentScans } from "./_components/RecentScans";

export const metadata: Metadata = { title: "Гар бичмэл" };

// Admin role is checked in app/admin/layout.tsx (requireAdmin) and again in every action here.
export default async function AdminHandwritingPage() {
  const scans = await listHandwritingScans().catch((err: unknown) => {
    console.error("[ocr] could not load scans", err);
    return null;
  });
  return (
    <>
      <AdminPageHeader
        title="Гар бичмэл"
        description="Гараар бичсэн захиалга, тэмдэглэлийн зургийг текст болгоно. Шалгаж засаад хадгалах, хуулах эсвэл Касс руу оруулна."
      />
      <HandwritingReader />
      <RecentScans scans={scans} />
    </>
  );
}
