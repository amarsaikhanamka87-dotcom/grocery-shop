"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { ShieldCheck } from "lucide-react";

/**
 * "Админ" link, only for the admin (Clerk publicMetadata.role). The admin pages check the role again
 * on the server; this only decides whether to show the link.
 */
export function AdminLink({ className }: { className: string }) {
  const { user } = useUser();
  if (user?.publicMetadata.role !== "admin") return null;
  return (
    <Link href="/admin" className={className}>
      <ShieldCheck className="size-4" /> Админ
    </Link>
  );
}
