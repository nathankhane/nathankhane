import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Khane – Business ≡ Poetry",
  description: "Flagship hub for the Khane brand. Turning narrative into revenue for founders & creators.",
  keywords: ["storytelling", "business strategy", "creative coaching", "growth marketing", "founder"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Navigation Header */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
              <Link href="/" className="text-2xl font-bold">
                Khane<span className="text-primary">.</span>
              </Link>

              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/work-with-me" className="hover:text-primary transition-colors">
                  Work With Me
                </Link>
                <Link href="/portfolio" className="hover:text-primary transition-colors">
                  Portfolio
                </Link>
                <Link href="/blog" className="hover:text-primary transition-colors">
                  Business ≡ Poetry
                </Link>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-semibold hover:scale-105 transition-all duration-300"
                >
                  Start a Project
                </Link>
              </nav>

              <div className="flex items-center space-x-4">
                <ThemeToggle />
                {/* Mobile menu button could go here */}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="pt-20">{children}</main>

          {/* Footer */}
          <footer className="border-t border-border/50 bg-muted/30">
            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand */}
                <div className="space-y-4">
                  <Link href="/" className="text-2xl font-bold block">
                    Khane<span className="text-primary">.</span>
                  </Link>
                  <p className="text-muted-foreground max-w-sm">
                    Turning narrative into revenue for founders & creators. Every venture is a verse, every metric a rhyme.
                  </p>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Explore</h3>
                  <nav className="flex flex-col space-y-2">
                    <Link href="/work-with-me" className="text-muted-foreground hover:text-primary transition-colors">
                      Work With Me
                    </Link>
                    <Link href="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">
                      Portfolio
                    </Link>
                    <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                      Business ≡ Poetry
                    </Link>
                    <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                      About
                    </Link>
                  </nav>
                </div>

                {/* Social & Contact */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Connect</h3>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://www.tiktok.com/@nathankhane"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      TikTok
                    </a>
                    <a
                      href="https://www.youtube.com/@nathankhane"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      YouTube
                    </a>
                    <a
                      href="https://open.spotify.com/artist/nathankhane"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Spotify
                    </a>
                    <a
                      href="https://www.linkedin.com/in/nathankhane"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  </div>
                  <div className="pt-4">
                    <Link
                      href="/contact"
                      className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold hover:scale-105 transition-all duration-300"
                    >
                      Start a Project
                    </Link>
                  </div>
                </div>
              </div>

              <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground">
                <p>© 2024 Khane. All rights reserved. Business ≡ Poetry.</p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
