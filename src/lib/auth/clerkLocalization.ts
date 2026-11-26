import { mnMN } from "@clerk/localizations";

/**
 * Clerk's sign-in / sign-up card in Mongolian. Uses Clerk's mn-MN pack, with our own wording where
 * it would show the English app name ("grocery-store") or read awkwardly.
 */
export const clerkLocalization = {
  ...mnMN,
  socialButtonsBlockButton: "{{provider|titleize}}-ээр нэвтрэх",
  signIn: {
    ...mnMN.signIn,
    start: {
      ...mnMN.signIn?.start,
      title: "Нэвтрэх",
      subtitle: "Google эсвэл утасны дугаараа нэвтэрнэ үү.",
    },
  },
  signUp: {
    ...mnMN.signUp,
    start: {
      ...mnMN.signUp?.start,
      title: "Бүртгүүлэх",
      subtitle: "Google эсвэл утасны дугаараа бүртгүүлнэ үү.",
    },
  },
};
