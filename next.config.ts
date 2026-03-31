import type { NextConfig } from "next";

/**
 * Next.js config — Business Is Poetry (V2)
 * Adds image domains, security headers, and remote patterns for embeds.
 */
const nextConfig: NextConfig = {
  experimental: {
    // Only bundle named exports that are actually imported — critical for GSAP (2.4MB) and framer-motion
    optimizePackageImports: ["framer-motion", "gsap", "howler", "@google/generative-ai"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.tiktok.com" },
      { protocol: "https", hostname: "**.ytimg.com" },
      { protocol: "https", hostname: "substack-post-media.s3.amazonaws.com" },
      { protocol: "https", hostname: "substackcdn.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
