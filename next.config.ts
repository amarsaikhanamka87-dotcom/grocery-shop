import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The shop reads the database and the session cookie on most pages, so we
  // use the request-time rendering model instead of Cache Components.
  cacheComponents: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
