import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";

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
          <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 transition-all duration-300">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
              <Link
                href="/"
                className="text-2xl font-bold hover:scale-105 transition-all duration-300 hover:text-primary"
              >
                Khane<span className="text-primary">.</span>
              </Link>

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
                  href="/work-with-me"
                  className="relative hover:text-primary transition-colors duration-300 group"
                >
                  Work With Me
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </nav>

              <div className="flex items-center space-x-4">
                <div className="hover:scale-110 transition-transform duration-200">
                  <ThemeToggle />
                </div>
                {/* Mobile menu button could go here */}
              </div>
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
