import Link from "next/link";
import { Building2, ShieldCheck } from "lucide-react";

type Role = "admin" | "b2b" | null;

/** Right side of the category bar: admin → panel, b2b → badge, signed-in buyer → apply, signed-out → sign up. */
export function RoleLink({ role, signedIn }: { role: Role; signedIn: boolean }) {
  const base =
    "flex h-[30px] items-center gap-2 rounded-lg border border-dashed border-ink-2/40 bg-white px-4 text-sm font-bold hover:border-brand hover:text-brand";
  if (role === "admin") {
    return (
      <Link href="/admin" className={base}>
        <ShieldCheck className="size-4" /> Админ
      </Link>
    );
  }
  if (role === "b2b") {
    return (
      <Link href="/business" className="flex h-[30px] items-center gap-2 rounded-lg bg-brand-50 px-4 text-sm font-bold text-brand hover:underline">
        <Building2 className="size-4" /> B2B самбар · хүргэлт үнэгүй
      </Link>
    );
  }
  return (
    <Link href={signedIn ? "/business" : "/sign-up"} className={base}>
      <Building2 className="size-4" /> Байгууллагаар бүртгүүлэх
    </Link>
  );
}
