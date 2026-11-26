import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import { Manrope } from "next/font/google";
import { CartProvider } from "@/components/cart/CartProvider";
import { LocationProvider } from "@/components/location/LocationProvider";
import { SHOP_NAME } from "@/lib/constants";
import { clerkLocalization } from "@/lib/auth/clerkLocalization";
import "./globals.css";
import { AppToaster } from "@/components/cart/AppToaster";

// Cyrillic subset is needed for the Mongolian UI text.
const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: { default: `${SHOP_NAME}: бөөний хүнсний ногоо`, template: `%s | ${SHOP_NAME}` },
  description:
    "Ресторан, зочид буудал, дэлгүүрт Монголын фермийн шинэхэн хүнсний ногоог бөөний үнээр нийлүүлнэ.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn" className={manrope.variable}>
      <body className="min-h-dvh">
        {/* Current Clerk SDKs expect the provider inside <body>. */}
        {/* Phone login is our own form (components/auth/PhoneLogin): Clerk can't text +976.
            Clerk's optional phone field stays hidden (showOptionalFields defaults to false). */}
        {/* unsafe_disableDevelopmentModeWarnings: hides the "Development mode" badge (dev keys only;
            production keys never show it). "Secured by Clerk" is off in Clerk config (branding). */}
        {/* Mongolian card text (clerkLocalization); the Google button is a 44px+ tap target. */}
        <ClerkProvider
          localization={clerkLocalization}
          appearance={{
            theme: shadcn,
            options: { unsafe_disableDevelopmentModeWarnings: true },
            // Storefront rules: 16px text, white card footer (Clerk's default panel was cream).
            elements: {
              socialButtonsBlockButton: "min-h-11 text-[16px]",
              headerTitle: "text-[16px] font-bold",
              headerSubtitle: "text-[16px]",
              footer: "bg-white bg-none",
              footerActionText: "text-[16px]",
              footerActionLink: "text-[16px] font-bold",
              dividerText: "text-[16px]",
            },
          }}
        >
          <LocationProvider>
            <CartProvider>
              {children}
              <AppToaster />
            </CartProvider>
          </LocationProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
