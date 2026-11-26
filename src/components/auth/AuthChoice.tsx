import { Suspense } from "react";
import { PhoneLogin } from "./PhoneLogin";

/** Clerk's card (Google) on top, our Mongolian phone login below. Used by /sign-in and /sign-up. */
export function AuthChoice({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid place-items-center gap-4 px-4 py-12">
      {children}
      <div className="flex w-full max-w-[400px] items-center gap-3 text-[16px] font-bold text-muted-foreground">
        <span className="h-px flex-1 bg-line" /> эсвэл утасны дугаараар <span className="h-px flex-1 bg-line" />
      </div>
      <Suspense>
        <PhoneLogin />
      </Suspense>
    </div>
  );
}
