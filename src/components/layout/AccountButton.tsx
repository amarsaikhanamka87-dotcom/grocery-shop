import { Suspense } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { Show, UserButton } from "@clerk/nextjs";

// Clerk Core 3: <Show> replaces <SignedIn>/<SignedOut>; wrap it in <Suspense> in Server Components.
export function AccountButton() {
  return (
    <Suspense fallback={<span className="block h-11 w-[4.5rem]" />}>
      <Show when="signed-out">
        {/* In words at every width (a bare person icon wasn't read as "sign in"). */}
        <Link
          href="/sign-in"
          className="flex h-11 shrink-0 items-center gap-1.5 rounded-full px-1 text-[16px] font-bold sm:px-2.5 whitespace-nowrap hover:bg-ink/5"
        >
          <User className="hidden size-[18px] lg:block" /> Нэвтрэх
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
