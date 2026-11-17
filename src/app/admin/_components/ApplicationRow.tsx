import type { BusinessApplication } from "@prisma/client";
import { BUSINESS_STATUS } from "@/lib/business/businessStatusLabel";
import { ReviewActions } from "./ReviewActions";

export function ApplicationRow({ application: a }: { application: BusinessApplication }) {
  return (
    <tr className="border-t border-line align-top">
      <td className="px-4 py-3">
        <p className="font-bold">{a.companyName}</p>
        <p className="text-[13px] text-muted-foreground">Регистр {a.companyRegNo}</p>
      </td>
      <td className="px-4 py-3 text-[14px]">
        <p>{a.contactName}</p>
        <p className="text-muted-foreground">{a.phone}{a.address ? ` · ${a.address}` : ""}</p>
      </td>
      <td className="px-4 py-3">
        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${BUSINESS_STATUS[a.status].className}`}>
          {BUSINESS_STATUS[a.status].label}
        </span>
        {a.rejectReason && <p className="mt-1 text-[12.5px] text-clay">{a.rejectReason}</p>}
      </td>
      <td className="px-4 py-3 text-[13px] text-muted-foreground">{a.createdAt.toLocaleDateString("mn-MN")}</td>
      <td className="px-4 py-3">
        <ReviewActions id={a.id} status={a.status} />
      </td>
    </tr>
  );
}
