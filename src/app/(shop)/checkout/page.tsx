import type { Metadata } from "next";
import { auth, currentUser } from "@clerk/nextjs/server";
import { SignInRequired } from "./_components/SignInRequired";
import { CheckoutForm } from "./_components/CheckoutForm";
import { profileDefaults } from "@/lib/auth/profileDefaults";
import { getMyApplication } from "@/lib/business/getMyApplication";

export const metadata: Metadata = { title: "Захиалга хийх" };

export default async function CheckoutPage() {
  const { userId } = await auth();
  if (!userId) return <SignInRequired />;

  const [user, application] = await Promise.all([currentUser(), getMyApplication(userId)]);
  const defaults = profileDefaults(user);
  const company =
    application?.status === "APPROVED" ? { name: application.companyName, regNo: application.companyRegNo } : null;

  return (
    <div className="container-x pt-8">
      <h1 className="text-[34px] font-extrabold tracking-[-0.03em] sm:text-[42px]">Захиалга хийх</h1>
      <CheckoutForm defaults={defaults} company={company} />
    </div>
  );
}
