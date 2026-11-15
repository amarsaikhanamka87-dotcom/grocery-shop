import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import { AuthChoice } from "@/components/auth/AuthChoice";

export const metadata: Metadata = { title: "Нэвтрэх" };

export default function SignInPage() {
  return (
    <AuthChoice>
      <SignIn />
    </AuthChoice>
  );
}
