import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";
import { AuthChoice } from "@/components/auth/AuthChoice";

export const metadata: Metadata = { title: "Бүртгүүлэх" };

export default function SignUpPage() {
  return (
    <AuthChoice>
      <SignUp />
    </AuthChoice>
  );
}
