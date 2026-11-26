import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { getMyApplication } from "@/lib/business/getMyApplication";
import { getMonthlyOrder } from "@/lib/business/getMonthlyOrder";
import { getAllProducts } from "@/lib/catalog/getAllProducts";
import { profileDefaults } from "@/lib/auth/profileDefaults";
import { ApplyView } from "./_components/ApplyView";
import { B2BDashboard } from "./_components/B2BDashboard";
import { requireBusinessSignIn } from "./_middleware/requireBusinessSignIn";

export const metadata: Metadata = { title: "Бизнес хэрэглэгч" };

const EMPTY_MONTHLY = { dayOfMonth: 1, active: true, items: [] };

export default async function BusinessPage() {
  const userId = await requireBusinessSignIn();
  const [application, user] = await Promise.all([getMyApplication(userId), currentUser()]);
  const isB2B = user?.publicMetadata.role === "b2b" && application?.status === "APPROVED";

  if (!isB2B || !application) {
    const { name, phone } = profileDefaults(user);
    return (
      <div className="container-x pt-10">
        <ApplyView application={application} defaults={{ contactName: name, phone }} />
      </div>
    );
  }

  const [monthly, products] = await Promise.all([getMonthlyOrder(userId), getAllProducts()]);
  return (
    <div className="container-x pt-10">
      <h1 className="text-[34px] font-extrabold tracking-[-0.03em] sm:text-[42px]">Бизнес самбар</h1>
      <B2BDashboard application={application} monthly={monthly ?? EMPTY_MONTHLY} products={products} />
    </div>
  );
}
