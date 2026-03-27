/**
 * app/not-found.tsx — Custom 404
 *
 * Fellowship era brand voice. Keeps the "lost in the poetry" spirit
 * but updated for V2 editorial aesthetic.
 */
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-ink flex flex-col items-center justify-center px-6 text-center">
      <p className="text-xs font-mono text-gold/50 tracking-[0.3em] uppercase mb-6">404</p>
      <h1 className="text-4xl sm:text-5xl font-display text-cream leading-tight mb-4">
        Lost in the poetry.
      </h1>
      <p className="text-cream/70 text-sm leading-relaxed max-w-sm mb-10">
        This page doesn&apos;t exist — but that&apos;s okay. The best ideas
        often come from wandering somewhere unexpected.
      </p>
      <Link
        href="/"
        className="text-sm font-mono text-gold hover:text-cream transition-colors border-b border-gold/30 hover:border-cream/30 pb-0.5"
      >
        Back to the beginning →
      </Link>
    </main>
  );
}
