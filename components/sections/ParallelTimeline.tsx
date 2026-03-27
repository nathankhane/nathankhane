/**
 * ParallelTimeline — Act 1, Section 2
 *
 * Split-screen: Nate's life milestones (left) alongside Google milestones (right).
 * Uses Timeline component + timeline-data.ts. Both tracks advance in sync as user scrolls.
 *
 * TL2: Center divider has an animated gold shimmer that crawls downward every ~11s,
 *      signalling "the two timelines are alive and running in parallel."
 * TL3: Warm red-amber background tint is handled globally by SpaceBackground (G4).
 */
"use client";

import { motion } from "framer-motion";
import Timeline from "@/components/Timeline";
import { timelineData, type TimelineEvent } from "@/lib/timeline-data";
import type { TimelineItem } from "@/components/Timeline";

// Split events into two parallel tracks
const nateTrack: TimelineItem[] = timelineData
  .filter((e: TimelineEvent) => e.nate)
  .map((e: TimelineEvent) => ({
    year: e.year,
    text: e.nate!,
    detail: e.nateDetail,
    highlight: e.highlight,
    googleFact: e.googleFact,
  }));

const googleTrack: TimelineItem[] = timelineData
  .filter((e: TimelineEvent) => e.google)
  .map((e: TimelineEvent) => ({
    year: e.year,
    text: e.google!,
    detail: e.googleDetail,
    highlight: e.highlight,
    googleFact: e.googleFact,
  }));

export default function ParallelTimeline() {
  return (
    <section
      id="parallel"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-label="Parallel Timeline — Act 1"
    >
      {/* Section label */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-mono text-gold/60 tracking-[0.2em] uppercase">
            Two timelines. One story.
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-display text-cream text-balance">
            Born at the inflection point.
          </h2>
          <p className="mt-4 text-cream/70 max-w-lg text-sm leading-relaxed">
            Valentine&apos;s Day, 2000. The year Google became the world&apos;s search engine.
            CliftonStrength #4: Connectedness. This writes itself.
          </p>
        </motion.div>
      </div>

      {/* Split-screen timelines */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-0 relative">

          {/* TL2 — Center divider with animated gold shimmer */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 overflow-hidden"
            aria-hidden="true"
          >
            {/* Base line */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, rgba(245,240,235,0.15) 10%, rgba(245,240,235,0.15) 90%, transparent 100%)",
              }}
            />
            {/* Gold shimmer — crawls down the divider every ~11s */}
            <motion.div
              className="absolute w-full"
              style={{
                height: "120px",
                background:
                  "linear-gradient(to bottom, transparent 0%, rgba(212,168,83,0.35) 50%, transparent 100%)",
                top: 0,
              }}
              animate={{ y: ["-120px", "100%"] }}
              transition={{
                duration: 7,
                ease: "linear",
                repeat: Infinity,
                repeatDelay: 4,
              }}
            />
          </div>

          {/* Left — Nate's life */}
          <div className="pr-0 md:pr-12">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 md:text-right"
            >
              <span className="text-xs font-mono text-cream/70 tracking-widest uppercase">
                Nate
              </span>
            </motion.div>
            <Timeline items={nateTrack} side="left" />
          </div>

          {/* Right — Google milestones — staggered: starts lower so entries interleave */}
          <div className="pl-0 md:pl-12 mt-10 md:mt-20">
            {/* Mobile separator */}
            <div className="md:hidden flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] font-mono text-cream/60 tracking-widest uppercase">Google</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <span className="text-xs font-mono text-google-blue/60 tracking-widest uppercase">
                Google
              </span>
            </motion.div>
            <Timeline items={googleTrack} side="right" />
          </div>
        </div>
      </div>
    </section>
  );
}
