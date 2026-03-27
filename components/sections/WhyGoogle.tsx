/**
 * WhyGoogle — Act 3, Section 8
 *
 * Direct address to the fellowship reviewers. No pretense.
 * Easter Egg #5: Google brand DNA colors (#4285F4, #EA4335, #FBBC05, #34A853)
 *   pulse subtly in the background gradient — the DNA without the logo.
 * Easter Egg #6: "Dear Sophie" reference embedded in copy.
 *
 * WG1: Google DNA background fades in from opacity 0 → 0.5 as section enters —
 *      colors emerge rather than being static, making it feel earned.
 *
 * WG2: Role card top accent lines draw left→right (scaleX 0→1) on viewport entry.
 *
 * WG3: Google campaigns list rows stagger in sequentially from the left.
 *
 * WG5: The closing quote declaration enters with a dramatic scale + rise —
 *      the whole thesis made physical.
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
      {/* WG1 — Easter Egg #5: Google DNA colors emerge from 0 on section entry */}
      <motion.div
        className="absolute inset-0 google-dna-bg"
        aria-hidden="true"
        data-easter-egg="google-dna-colors"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
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
            <p className="mt-6 text-cream/60 italic font-mono text-xs tracking-wide">
              [Placeholder — Nate to rewrite]
              {/* Easter Egg #6: reference to "Dear Sophie" should live here */}
            </p>
          </AnimatedSection>
        </div>

        {/* Fellowship roles — WG2: accent lines draw on entry */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {ROLES.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-2xl border border-white/10 bg-surface/80 backdrop-blur-sm p-6 overflow-hidden relative ${
                i === 0 ? "shadow-gold-glow" : ""
              }`}
            >
              {/* WG2 — top accent line draws left→right */}
              <motion.div
                className={`absolute top-0 left-0 right-0 h-px ${
                  i === 0 ? "bg-google-blue/50" : "bg-google-green/50"
                }`}
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "left" }}
              />
              <div className={`text-xs font-mono mb-1 ${i === 0 ? "text-google-blue/60" : "text-google-green/60"}`}>
                {role.org}
              </div>
              <div className="text-lg font-display text-cream mb-4">{role.title}</div>
              <p className="text-sm text-cream/75 leading-relaxed">{role.why}</p>
            </motion.div>
          ))}
        </div>

        {/* WG3 — campaigns stagger in from left */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-mono text-cream/70 tracking-widest uppercase mb-6"
          >
            Google creative I&apos;ve studied obsessively
          </motion.div>
          <div className="space-y-0">
            {GOOGLE_CAMPAIGNS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start justify-between py-4 border-b border-white/5"
              >
                <div>
                  <div className="text-sm font-display text-cream/80">{c.name}</div>
                  <div className="text-xs text-cream/70 mt-1">{c.desc}</div>
                </div>
                <div className="text-xs font-mono text-cream/70 shrink-0 ml-4">{c.year}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* WG5 — closing quote enters dramatically: scale + rise */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 max-w-2xl"
        >
          <p className="text-2xl md:text-3xl font-display text-cream/80 leading-relaxed italic text-balance">
            <span className="text-gold not-italic">&ldquo;</span>The site you&apos;re reading right now is the portfolio piece.
            I didn&apos;t submit a PDF. I built my case for a position in the Google Creative Fellowship from the ground up, since I was a curious infant.&rdquo;
          </p>
          <p className="mt-4 text-sm font-mono text-cream/70">
            — Nathan Khane Morales, March 2026
          </p>
        </motion.div>

        {/* Site footer */}
        <AnimatedSection delay={0.4}>
          <div className="mt-20 pt-10 border-t border-white/10 text-center">
            <p className="text-xs font-mono text-cream/50 tracking-widest">
              Business Is Poetry · nathankhane.com · 2026
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
