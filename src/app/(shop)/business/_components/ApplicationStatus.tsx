import { CheckCircle2, Clock, XCircle } from "lucide-react";
import type { BusinessApplication } from "@prisma/client";
import { BUSINESS_STATUS } from "@/lib/business/businessStatusLabel";

const ICONS = { PENDING: Clock, APPROVED: CheckCircle2, REJECTED: XCircle };
const TEXT = {
  PENDING: "Таны хүсэлтийг шалгаж байна. Ихэвчлэн 1 ажлын өдөрт хариу өгнө.",
  APPROVED: "Та бизнес хэрэглэгч боллоо. Бүх захиалгад хүргэлт үнэгүй.",
  REJECTED: "Таны хүсэлтийг зөвшөөрөөгүй. Мэдээллээ засаад дахин илгээж болно.",
};

export function ApplicationStatus({ application: a }: { application: BusinessApplication }) {
  const Icon = ICONS[a.status];
  return (
    <div className="card mt-8 flex gap-4 p-6">
      <Icon className="mt-0.5 size-6 shrink-0 text-brand" />
      <div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${BUSINESS_STATUS[a.status].className}`}>
          {BUSINESS_STATUS[a.status].label}
        </span>
        <p className="mt-2 font-bold">{a.companyName} · {a.companyRegNo}</p>
        <p className="mt-1 text-[15px] text-muted-foreground">{TEXT[a.status]}</p>
        {a.rejectReason && <p className="mt-2 text-[14px] text-clay">Шалтгаан: {a.rejectReason}</p>}
      </div>
    </div>
  );
}
