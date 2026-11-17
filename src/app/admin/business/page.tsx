import type { Metadata } from "next";
import { listApplications } from "@/lib/business/listApplications";
import { AdminPageHeader } from "../_components/AdminPageHeader";
import { ApplicationsTable } from "../_components/ApplicationsTable";

export const metadata: Metadata = { title: "B2B хүсэлт" };

export default async function AdminBusinessPage() {
  const applications = await listApplications();
  const pending = applications.filter((a) => a.status === "PENDING").length;
  return (
    <>
      <AdminPageHeader
        title="B2B хүсэлт"
        description={`Байгууллагын хүсэлтийг зөвшөөрөхөд үнэгүй хүргэлт идэвхжинэ. ${pending} хүсэлт хүлээгдэж байна.`}
      />
      <ApplicationsTable applications={applications} />
    </>
  );
}
