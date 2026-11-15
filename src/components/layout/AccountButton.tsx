import { Suspense } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { Show, UserButton } from "@clerk/nextjs";

// Clerk Core 3: <Show> replaces <SignedIn>/<SignedOut>; wrap it in <Suspense> in Server Components.
export function AccountButton() {
  return (
    <Suspense fallback={<span className="hidden size-10 sm:block" />}>
      <Show when="signed-out">
        <Link
          href="/sign-in"
          className="hidden size-10 place-items-center rounded-full hover:bg-cream-2 sm:grid"
          aria-label="Нэвтрэх"
          title="Нэвтрэх"
        >
          <User className="size-[20px]" />
        </Link>
      </Show>
      <Show when="signed-in">
        <span className="grid size-10 place-items-center">
          <UserButton />
        </span>
      </Show>
    </Suspense>
  );
}
