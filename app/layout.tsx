/**
 * Root Layout — Business Is Poetry (V2)
 *
 * Architecture:
 * - Dark-only editorial design (no theme switching)
 * - Font loading via next/font/google — font-display: swap (V1 principle preserved)
 *     Instrument Serif  → --font-instrument-serif → .font-display  (display/headlines)
 *     DM Sans           → --font-dm-sans           → font-sans       (body copy)
 *     JetBrains Mono    → --font-jetbrains-mono   → .font-mono      (search bar motif)
 * - AudioPlayer persistent at viewport bottom (never autoplays)
 * - Minimal shell — no nav bar; scroll-driven sections handle their own context
 *
 * Typography reference: fontImplementationGuide.md
 *   - News Plantin (V1) preserved at /public/fonts/ and /archive/v1/
 *   - V2 editorial pairing chosen per googleCreativeFellowshipSiteBlueprint.md
 */
import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AudioPlayer from "@/components/AudioPlayer";
import AgentSidebar from "@/components/AgentSidebar";
import ScrollToTop from "@/components/ScrollToTop";
import { Analytics } from "@vercel/analytics/next";

// ── Fonts ──────────────────────────────────────────────────────────────
// Display: Instrument Serif — literary editorial serif.
// Italic variant used for emphasis throughout the narrative.
// font-display: swap — V1 principle from fontImplementationGuide.md
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

// Body: DM Sans — geometric, approachable, pairs well with Instrument Serif.
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

// Mono: JetBrains Mono — for Google search bar motif elements in
// TitleCard, TheSpark, and WhyGoogle sections.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// ── Metadata ────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Business Is Poetry — Nathan Khane Morales",
  description:
    "Systems architect. Audio engineer. Social architect. Curator of unique taste. Born February 14, 2000 — the year Google became the world's most-used search engine.",
  keywords: [
    "Nathan Khane Morales",
    "Google Creative Fellowship",
    "Business Is Poetry",
    "Bridge AI",
    "creative technology",
    "audio engineer",
    "systems architect",
    "storytelling",
  ],
  authors: [{ name: "Nathan Khane Morales" }],
  creator: "Nathan Khane Morales",
  metadataBase: new URL("https://nathankhane.com"),
  openGraph: {
    title: "Business Is Poetry — Nathan Khane Morales",
    description: "Born the year Google changed the world. Building parallel to it ever since.",
    url: "https://nathankhane.com",
    siteName: "Business Is Poetry",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Business Is Poetry" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Is Poetry",
    description: "Born the year Google changed the world. Building parallel to it ever since.",
    creator: "@nathankmo",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

// ── Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preload" href="https://www.tiktok.com/embed.js" as="script" />
        {/* Easter Egg #10: visible in HTML source — "View Source" reward */}
        {/* If you're reading this, you're exactly who this site was built for. — Nathan Khane Morales | nathankhane.com */}
      </head>
      <body className="bg-ink text-cream antialiased min-h-screen font-sans">
        <ScrollToTop />
        {children}
        {/* Persistent audio mini-player — NEVER autoplays */}
        <AudioPlayer />
        {/* Floating AI agent sidebar — bottom-right FAB */}
        <AgentSidebar />
        <Analytics />
      </body>
    </html>
  );
}
