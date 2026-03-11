/**
 * SocialArchitect — Act 2, Section 5
 *
 * TikTok portfolio showcase. Curated best-of grid with metrics.
 * Easter Egg #3: section transition mimics TikTok swipe-up native UX.
 * Lazy-loads TikTok embed script only when section enters viewport.
 */
"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

// TODO: Replace with actual TikTok video IDs from @nathankhane
const TIKTOK_VIDEOS = [
  { id: "placeholder-1", caption: "How I built a company with $0 in marketing spend" },
  { id: "placeholder-2", caption: "The DJ mindset that changed how I run my startup" },
  { id: "placeholder-3", caption: "What Fortune 500 UX consulting taught me about storytelling" },
  { id: "placeholder-4", caption: "Bridge: from idea to AI platform in 90 days" },
];

const METRICS = [
  { value: "—", label: "Total Views" },
  { value: "—", label: "Avg Engagement" },
  { value: "—", label: "Followers" },
];

export default function SocialArchitect() {
  return (
    <section
      id="social"
      className="relative py-24 md:py-36 bg-surface overflow-hidden"
      aria-label="Social Architect — Act 2"
      data-easter-egg="tiktok-swipe-up-transition"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <AnimatedSection direction="fade">
            <span className="text-xs font-mono text-gold/60 tracking-[0.2em] uppercase">
              Social Architect
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="mt-4 text-3xl sm:text-4xl font-display text-cream leading-tight">
              I didn&apos;t just consume culture. I made it.
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="mt-4 text-cream/50 leading-relaxed text-sm">
              TikTok taught me to read audiences in real-time — the fastest feedback loop
              in creative history. Every video is a hypothesis. Every view is a data point.
              Every comment is qualitative research.
            </p>
          </AnimatedSection>
        </div>

        {/* Metrics row */}
        <AnimatedSection delay={0.15}>
          <div className="flex gap-8 mb-12">
            {METRICS.map((m) => (
              <div key={m.label}>
                <div className="text-2xl font-display text-cream">{m.value}</div>
                <div className="text-xs font-mono text-cream/30 mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* TikTok grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TIKTOK_VIDEOS.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-xl overflow-hidden aspect-[9/16] bg-ink border border-white/10"
            >
              {/* Placeholder until real TikTok IDs are added */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center mb-3">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" className="text-cream/40 ml-0.5">
                    <path d="M3 2l9 5-9 5V2z" />
                  </svg>
                </div>
                <p className="text-xs text-cream/30 leading-relaxed">{video.caption}</p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.4}>
          <div className="mt-10 flex items-center gap-4">
            <a
              href="https://www.tiktok.com/@nathankhane"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-mono text-gold hover:text-cream transition-colors border-b border-gold/30 hover:border-cream/30 pb-0.5"
            >
              @nathankhane on TikTok
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className="opacity-60">
                <path d="M1 9L9 1M9 1H3M9 1v6" stroke="currentColor" strokeWidth="1.2" fill="none" />
              </svg>
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
