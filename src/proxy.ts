import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Must be signed in for these. The admin *role* is checked on the server in app/admin/layout.tsx
// (requireAdmin), so a signed-in non-admin still can't see /admin.
const needsSignIn = createRouteMatcher(["/admin(.*)", "/business(.*)", "/checkout(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (needsSignIn(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
