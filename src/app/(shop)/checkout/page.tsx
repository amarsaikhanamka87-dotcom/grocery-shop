import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { CheckoutForm } from "./_components/CheckoutForm";
import { profileDefaults } from "@/lib/auth/profileDefaults";
import { getMyApplication } from "@/lib/business/getMyApplication";
import { requireCheckoutSignIn } from "./_middleware/requireCheckoutSignIn";

export const metadata: Metadata = { title: "Захиалга өгөх" };

export default async function CheckoutPage() {
  const userId = await requireCheckoutSignIn();

  const [user, application] = await Promise.all([
    currentUser(),
    getMyApplication(userId),
  ]);
  const defaults = profileDefaults(user);
  const company =
    application?.status === "APPROVED"
      ? { name: application.companyName, regNo: application.companyRegNo }
      : null;

  return (
    <div className="container-x pt-8">
      <h1 className="text-[34px] font-extrabold tracking-[-0.03em] sm:text-[42px]">
        Захиалга өгөх
      </h1>
      <CheckoutForm defaults={defaults} company={company} />
    </div>
  );
}
