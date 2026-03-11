/**
 * ParallelTimeline — Act 1, Section 2
 *
 * Split-screen: Nate's life milestones (left) alongside Google milestones (right).
 * Uses Timeline component + timeline-data.ts. Both tracks advance in sync as user scrolls.
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
  }));

const googleTrack: TimelineItem[] = timelineData
  .filter((e: TimelineEvent) => e.google)
  .map((e: TimelineEvent) => ({
    year: e.year,
    text: e.google!,
    detail: e.googleDetail,
    highlight: e.highlight,
  }));

export default function ParallelTimeline() {
  return (
    <section
      id="parallel"
      className="relative py-24 md:py-32 bg-ink overflow-hidden"
      aria-label="Parallel Timeline — Act 1"
    >
      {/* Section label */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <span className="text-xs font-mono text-gold/60 tracking-[0.2em] uppercase">
            Two timelines. One story.
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-display text-cream">
            Born at the inflection point.
          </h2>
          <p className="mt-4 text-cream/50 max-w-lg mx-auto text-sm leading-relaxed">
            Valentine&apos;s Day, 2000. The year Google became the world&apos;s search engine.
            CliftonStrength #4: Connectedness. This writes itself.
          </p>
        </motion.div>
      </div>

      {/* Split-screen timelines */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-0 relative">
          {/* Center divider */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"
            aria-hidden="true"
          />

          {/* Left — Nate's life */}
          <div className="pr-0 md:pr-12">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 md:text-right"
            >
              <span className="text-xs font-mono text-cream/40 tracking-widest uppercase">
                Nate
              </span>
            </motion.div>
            <Timeline items={nateTrack} side="left" />
          </div>

          {/* Right — Google milestones */}
          <div className="pl-0 md:pl-12 mt-16 md:mt-0">
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
