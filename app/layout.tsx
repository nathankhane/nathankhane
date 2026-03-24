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
import { Instrument_Serif, DM_Sans, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import AudioPlayer from "@/components/AudioPlayer";
import AgentSidebar from "@/components/AgentSidebar";
import ScrollToTop from "@/components/ScrollToTop";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
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

// Timeline: Playfair Display — high-contrast serif for timeline entry text.
// Tested in ParallelTimeline to improve readability against space background.
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-playfair",
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
  title: "Real Eyes Realize",
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
    title: "Real Eyes Realize",
    description: "Born the year Google changed the world. Building parallel to it ever since.",
    url: "https://nathankhane.com",
    siteName: "Business Is Poetry",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hero screen — this is Nate, birth date, and Google year lines",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Eyes Realize",
    description: "Born the year Google changed the world. Building parallel to it ever since.",
    creator: "@nathankmo",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/icon.svg",
  },
};

// ── Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        {/* Easter Egg #10: visible in HTML source — "View Source" reward */}
        {/* If you're reading this, you're exactly who this site was built for. — Nathan Khane Morales | nathankhane.com */}
      </head>
      <body className="bg-ink text-cream antialiased min-h-screen font-sans">
        <CustomCursor />
        <ScrollProgress />
        <ScrollToTop />
        {children}
        {/* Persistent UI — hidden by HeroScrollCanvas until hero scroll completes */}
        <div id="persistent-ui" style={{ transition: "opacity 1s ease" }}>
          {/* Persistent audio mini-player — NEVER autoplays */}
          <AudioPlayer />
          {/* Floating AI agent sidebar — bottom-right FAB */}
          <AgentSidebar />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
