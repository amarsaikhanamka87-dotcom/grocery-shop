import { Building2 } from "lucide-react";
import type { BusinessApplication } from "@prisma/client";

export function CompanyCard({ application: a }: { application: BusinessApplication }) {
  return (
    <section className="card flex gap-4 p-6">
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand">
        <Building2 className="size-6" />
      </span>
      <div className="min-w-0">
        <h2 className="text-lg font-extrabold">{a.companyName}</h2>
        <p className="text-[14px] text-muted-foreground">Регистр {a.companyRegNo}</p>
        <p className="mt-2 text-[14px]">
          {a.contactName} · {a.phone}
          {a.address ? ` · ${a.address}` : ""}
        </p>
        {a.reviewedAt && (
          <p className="mt-1 text-[13px] text-muted-foreground">
            Бизнес хэрэглэгч: {a.reviewedAt.toLocaleDateString("mn-MN")}-с хойш
          </p>
        )}
      </div>
    </section>
  );
}
