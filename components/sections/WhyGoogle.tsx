/**
 * WhyGoogle — Act 3, Section 8
 *
 * Direct address to the fellowship reviewers. No pretense.
 * Easter Egg #5: Google brand DNA colors (#4285F4, #EA4335, #FBBC05, #34A853)
 *   pulse subtly in the background gradient — the DNA without the logo.
 * Easter Egg #6: "Dear Sophie" reference embedded in copy.
 */
"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const ROLES = [
  {
    title: "Writer / AI Prompt Artist",
    org: "YouTube Creative Studio",
    why: "[Placeholder — Nate to rewrite]",
  },
  {
    title: "Social Creative / Copywriter",
    org: "Brand Studio",
    why: "[Placeholder — Nate to rewrite]",
  },
];

const GOOGLE_CAMPAIGNS = [
  { name: "Dear Sophie", year: "2011", desc: "Chrome ad. The one that proved technology can be tender." },
  { name: "Year in Search", year: "2013–", desc: "Annual proof that data, told right, makes people cry." },
  { name: "Ted (Just Ask Google)", year: "2012", desc: "Life told through queries. This site tells it through what was built." },
];

export default function WhyGoogle() {
  return (
    <section
      id="google"
      className="relative py-24 md:py-36 overflow-hidden"
      aria-label="Why Google — Act 3"
    >
      {/* Easter Egg #5 — Google DNA color gradient background */}
      <div
        className="absolute inset-0 google-dna-bg opacity-50"
        aria-hidden="true"
        data-easter-egg="google-dna-colors"
      />
      {/* Overlay to keep text readable */}
      <div className="absolute inset-0 bg-ink/80" aria-hidden="true" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <AnimatedSection direction="fade">
            <span className="text-xs font-mono text-google-blue/70 tracking-[0.2em] uppercase">
              Act III: The Future
            </span>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-display text-cream leading-tight text-balance">
              Why Google.
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="mt-6 text-cream/30 italic font-mono text-xs tracking-wide">
              [Placeholder — Nate to rewrite]
              {/* Easter Egg #6: reference to "Dear Sophie" should live here */}
            </p>
          </AnimatedSection>
        </div>

        {/* Fellowship roles */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {ROLES.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-2xl border border-white/10 bg-surface/80 backdrop-blur-sm p-6 overflow-hidden relative ${i === 0 ? "shadow-gold-glow" : ""}`}
            >
              {/* Google color top accent */}
              <div
                className={`absolute top-0 left-0 right-0 h-px ${i === 0 ? "bg-google-blue/50" : "bg-google-green/50"}`}
                aria-hidden="true"
              />
              <div className={`text-xs font-mono mb-1 ${i === 0 ? "text-google-blue/60" : "text-google-green/60"}`}>{role.org}</div>
              <div className="text-lg font-display text-cream mb-4">{role.title}</div>
              <p className="text-sm text-cream/50 leading-relaxed">{role.why}</p>
            </motion.div>
          ))}
        </div>

        {/* Google campaigns I&apos;ve studied */}
        <AnimatedSection delay={0.2}>
          <div>
            <div className="text-xs font-mono text-cream/25 tracking-widest uppercase mb-6">
              Google creative I&apos;ve studied obsessively
            </div>
            <div className="space-y-4">
              {GOOGLE_CAMPAIGNS.map((c) => (
                <div
                  key={c.name}
                  className="flex items-start justify-between py-4 border-b border-white/5"
                >
                  <div>
                    <div className="text-sm font-display text-cream/80">{c.name}</div>
                    <div className="text-xs text-cream/30 mt-1">{c.desc}</div>
                  </div>
                  <div className="text-xs font-mono text-cream/40 shrink-0 ml-4">{c.year}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Direct statement */}
        <AnimatedSection delay={0.3}>
          <div className="mt-14 max-w-2xl">
            <p className="text-2xl md:text-3xl font-display text-cream/80 leading-relaxed italic text-balance">
              <span className="text-gold not-italic">&ldquo;</span>The site you&apos;re reading right now is the portfolio piece.
              I didn&apos;t submit a PDF. I built my case for a position in the Google Creative Fellowship from the ground up, since I was a curious infant.&rdquo;
            </p>
            <p className="mt-4 text-sm font-mono text-cream/30">
              — Nathan Khane Morales, March 2026
            </p>
          </div>
        </AnimatedSection>

        {/* Site footer */}
        <AnimatedSection delay={0.4}>
          <div className="mt-20 pt-10 border-t border-white/10 text-center">
            <p className="text-xs font-mono text-cream/25 tracking-widest">
              Business Is Poetry · nathankhane.com · 2026
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
