"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const FAILED = "Нэвтрэх үед алдаа гарлаа. Дахин оролдоно уу.";

/**
 * Exchanges our one-time Clerk sign-in ticket for a session, then goes to `redirectUrl`.
 * - Already signed in (`session_exists`): just go on.
 * - A pending session task (e.g. "choose-organization" while force organization selection is on):
 *   open Clerk's task page instead of the target, or the session stays unusable.
 * Returns an error text (with Clerk's code, also logged) or null.
 */
export function useTicketSignIn(redirectUrl: string) {
  const { signIn } = useSignIn();
  const router = useRouter();
  const target = redirectUrl.startsWith("/") ? redirectUrl : "/";

  const go = (url: string) => (url.startsWith("http") ? window.location.assign(url) : router.push(url));

  return async function finish(ticket: string): Promise<string | null> {
    const res = await signIn.ticket({ ticket });
    if (res.error) {
      console.error("[phone-login] ticket", res.error.code, res.error.longMessage ?? res.error.message);
      if (res.error.code === "session_exists") {
        router.push(target);
        return null;
      }
      return `${FAILED} (${res.error.code})`;
    }
    const done = await signIn.finalize({
      navigate: ({ session, decorateUrl }) => {
        const task = session.currentTask?.key;
        go(decorateUrl(task ? `/sign-in/tasks/${task}?redirect_url=${encodeURIComponent(target)}` : target));
      },
    });
    if (done.error) {
      console.error("[phone-login] finalize", done.error.code, done.error.longMessage ?? done.error.message);
      return `${FAILED} (${done.error.code})`;
    }
    return null;
  };
}
