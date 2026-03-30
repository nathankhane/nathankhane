"use client";

/**
 * InspirationsCanvasClient — SSR-bypass wrapper
 *
 * ssr: false must live in a Client Component in Next.js App Router.
 * This thin wrapper matches the pattern used by HeroScrollCanvasClient.tsx.
 */
import dynamic from "next/dynamic";

const InspirationsCanvas = dynamic(
  () => import("@/components/inspirations/InspirationsCanvas"),
  { ssr: false }
);

export default InspirationsCanvas;
