/**
 * Root Layout — Business Is Poetry (V2)
 *
 * Architecture:
 * - Dark-only editorial design (no theme switching)
 * - Font loading strategy:
 *     Google Sans Flex  → CSS API (open-sourced Nov 2025; not yet in next/font/google)
 *     Google Sans Code  → next/font/google — monospace / search-bar motif
 *     Instrument Serif  → next/font/google — hero "this is Nate." (poetic serif)
 *     Fraunces          → next/font/google — TheSpark (quirky optical serif)
 *     Space Grotesk     → next/font/google — SystemsArchitect (technical geometric)
 *     Syne              → next/font/google — AudioEngineer (design-forward)
 *     Cormorant Garamond → next/font/google — ParallelTimeline (luxury editorial)
 *     DM Serif Display  → next/font/google — CuratorOfTaste (clean editorial)
 *     Outfit            → next/font/google — SocialArchitect (contemporary)
 * - AudioPlayer persistent at viewport bottom (never autoplays)
 * - Minimal shell — no nav bar; scroll-driven sections handle their own context
 */
import type { Metadata } from "next";
import {
  Google_Sans_Code,
  Instrument_Serif,
  Fraunces,
  Space_Grotesk,
  Syne,
  Cormorant_Garamond,
  DM_Serif_Display,
  Outfit,
} from "next/font/google";
import "./globals.css";
import PersistentUI from "@/components/PersistentUI";
import ScrollToTop from "@/components/ScrollToTop";
import CustomCursor from "@/components/CustomCursor";
import SearchOverlay from "@/components/SearchOverlay";
import PageSearch from "@/components/PageSearch";
import { Analytics } from "@vercel/analytics/next";
import SpaceBackground from "@/components/SpaceBackground";
import MobileNav from "@/components/MobileNav";

// ── Fonts ──────────────────────────────────────────────────────────────
const googleSansCode = Google_Sans_Code({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-google-sans-code",
  display: "swap",
  adjustFontFallback: false, // suppress warning — font too new for Next.js metrics db
});

// Hero — poetic serif, italic variant for "this is Nate."
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

// TheSpark — quirky optical serif with soul
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-fraunces",
  display: "swap",
});

// SystemsArchitect — technical geometric sans
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-space-grotesk",
  display: "swap",
});

// AudioEngineer — design-forward, expressive
const syne = Syne({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-syne",
  display: "swap",
});

// ParallelTimeline — luxury editorial, historical weight
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

// CuratorOfTaste — clean editorial authority
const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif-display",
  display: "swap",
});

// SocialArchitect — contemporary, social-native
const outfit = Outfit({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-outfit",
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
      className={[
        googleSansCode.variable,
        instrumentSerif.variable,
        fraunces.variable,
        spaceGrotesk.variable,
        syne.variable,
        cormorant.variable,
        dmSerifDisplay.variable,
        outfit.variable,
      ].join(" ")}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        {/* Easter Egg #10: visible in HTML source — "View Source" reward */}
        {/* If you're reading this, you're exactly who this site was built for. — Nathan Khane Morales | nathankhane.com */}
        {/* Google Sans Flex — bookmarked, not active. Restore by adding back here + updating globals.css base fonts */}
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" /> */}
        {/* <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /> */}
        {/* <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:ital,wght@0,300..700;1,300..700&display=swap" rel="stylesheet" /> */}
      </head>
      <body className="text-cream antialiased min-h-screen font-sans">
        {/* Fixed parallax space background — mouse-responsive camera pan */}
        <SpaceBackground />
        <CustomCursor />
        {/* Navigation — fixed top-right, outside #persistent-ui so it's
            unaffected by the hero canvas opacity animation */}
        <div className="fixed top-4 left-4 z-[100]">
          <MobileNav />
        </div>
        <ScrollToTop />
        {/* Easter Eggs #13 + #17 — global keyboard overlays */}
        <SearchOverlay />
        <PageSearch />
        {children}
        {/* Persistent UI — hidden on /artifacts, hidden by hero canvas elsewhere */}
        <PersistentUI />
        <Analytics />
      </body>
    </html>
  );
}
