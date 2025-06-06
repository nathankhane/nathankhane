import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
  title: "Khane – Business ≡ Poetry",
  description: "Flagship hub for the Khane brand. Turning narrative into revenue for founders & creators.",
  keywords: ["storytelling", "business strategy", "creative coaching", "growth marketing", "founder"],
  authors: [{ name: "Nathan Khane" }],
  creator: "Nathan Khane",
  metadataBase: new URL("https://nathankhane.com"),
  openGraph: {
    title: "Khane – Business ≡ Poetry",
    description: "Turning narrative into revenue for founders & creators.",
    url: "https://nathankhane.com",
    siteName: "Khane",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nathan Khane - Business ≡ Poetry - Turning narrative into revenue for founders & creators",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khane – Business ≡ Poetry",
    description: "Turning narrative into revenue for founders & creators.",
    creator: "@nathankmo",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preload" href="https://assets.calendly.com/assets/external/widget.js" as="script" />
        <link rel="preload" href="https://www.tiktok.com/embed.js" as="script" />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Navigation Header */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 transition-all duration-300">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
              {/* Left: Logo */}
              <Link
                href="/"
                className="text-2xl font-bold hover:scale-105 transition-all duration-300 hover:text-primary"
              >
                Khane<span className="text-primary">.</span>
              </Link>

              {/* Center: Desktop Nav + Theme Toggle */}
              <div className="flex items-center space-x-8">
                <nav className="hidden md:flex items-center space-x-8">
                  <Link
                    href="/portfolio"
                    className="relative hover:text-primary transition-colors duration-300 group"
                  >
                    Portfolio
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                  <Link
                    href="/about"
                    className="relative hover:text-primary transition-colors duration-300 group"
                  >
                    Who Am I
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                  <Link
                    href="/contact"
                    className="relative hover:text-primary transition-colors duration-300 group"
                  >
                    Work With Me
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </nav>

                {/* Theme Toggle - Always visible, centered on mobile */}
                <div className="hover:scale-110 transition-transform duration-200">
                  <ThemeToggle />
                </div>
              </div>

              {/* Right: Mobile Menu */}
              <MobileNav />
            </div>
          </header>

          {/* Main Content */}
          <main className="pt-20">{children}</main>

          {/* Footer */}
          <footer className="mt-24 py-10 border-t">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-sm opacity-70 hover:opacity-100 transition-opacity duration-300">
                &copy; {new Date().getFullYear()} Nathan Khane
              </p>
              <nav className="flex gap-6 text-sm opacity-80">
                <Link
                  href="/about"
                  className="hover:text-primary hover:opacity-100 transition-all duration-300 hover:scale-105"
                >
                  About
                </Link>
                <Link
                  href="/blog"
                  className="hover:text-primary hover:opacity-100 transition-all duration-300 hover:scale-105"
                >
                  Blog
                </Link>
              </nav>
              <div className="hover:scale-105 transition-transform duration-300">
                <SocialLinks />
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
