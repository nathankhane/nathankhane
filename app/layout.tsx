import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import dynamic from "next/dynamic";

const SocialLinks = dynamic(() => import("@/components/SocialLinks"), {
  ssr: false,
});

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
          <footer className="mt-24 py-10 border-t">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-sm opacity-70">&copy; 2024 Nathan Khane</p>
              <SocialLinks />
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
