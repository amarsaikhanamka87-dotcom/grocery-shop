import type { BusinessApplication, Product } from "@prisma/client";
import type { MonthlyOrder } from "@/types/business";
import { CompanyCard } from "./CompanyCard";
import { PerksCard } from "./PerksCard";
import { MonthlyOrderEditor } from "./MonthlyOrderEditor";

type Props = { application: BusinessApplication; monthly: MonthlyOrder; products: Product[] };

/** What an approved B2B customer sees at /business. */
export function B2BDashboard({ application, monthly, products }: Props) {
  return (
    <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_320px]">
      <MonthlyOrderEditor initial={monthly} products={products} />
      <div className="grid gap-6">
        <CompanyCard application={application} />
        <PerksCard />
      </div>
    </div>
  );
}
