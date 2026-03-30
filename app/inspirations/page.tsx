/**
 * app/inspirations/page.tsx — Inspirations infinite canvas
 *
 * A pannable, zoomable 2D canvas of creative influences, philosophical
 * fragments, poetry, and intellectual touchstones that shape Nathan's work.
 *
 * The canvas manages all interaction (pan, zoom, click) — this page has
 * no default scroll. overflow: hidden is set on the canvas container.
 */
import type { Metadata } from "next";
// ssr: false must live in a Client Component (Next.js App Router rule).
// InspirationsCanvasClient is a thin "use client" wrapper — same pattern
// as HeroScrollCanvasClient.tsx in this codebase.
import InspirationsCanvas from "@/components/inspirations/InspirationsCanvasClient";

export const metadata: Metadata = {
  title: "Inspirations — Nathan Khane Morales",
  description:
    "A 2D infinite canvas of creative influences: the philosophy, poetry, captions, and intellectual touchstones that shape how Nathan Khane Morales builds and thinks.",
  openGraph: {
    title: "Inspirations — Nathan Khane Morales",
    description:
      "Wander through the creative inputs that produce the outputs. Philosophy, poetry, personal writing, and Stoic principles — the connective tissue behind Business Is Poetry.",
    url: "https://nathankhane.com/inspirations",
    siteName: "Business Is Poetry",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Inspirations — an infinite canvas of creative influences",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inspirations — Nathan Khane Morales",
    description:
      "Wander through the creative inputs that produce the outputs.",
    creator: "@nathankmo",
    images: ["/og-image.jpg"],
  },
};

export default function InspirationsPage() {
  return (
    // overflow-hidden: the canvas library manages all panning/scrolling.
    // Do NOT add overflow-scroll or overflow-auto here.
    <main className="w-screen h-screen overflow-hidden bg-ink">
      <InspirationsCanvas />
    </main>
  );
}
