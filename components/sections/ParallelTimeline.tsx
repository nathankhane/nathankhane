/**
 * ParallelTimeline — Act 1, Section 2
 *
 * Unified year-row grid: each row renders Nate (left) and Google (right)
 * for the same year, so matching years always align visually.
 * Years with only one side show empty space on the other.
 *
 * TL2: Center divider has an animated gold shimmer that crawls downward every ~11s.
 * TL3: Warm red-amber background tint is handled globally by SpaceBackground (G4).
 */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { timelineData, type TimelineEvent } from "@/lib/timeline-data";

// Build lookup maps
const nateByYear = new Map<number, TimelineEvent>(
  timelineData.filter((e) => e.nate).map((e) => [e.year, e])
);
const googleByYear = new Map<number, TimelineEvent>(
  timelineData.filter((e) => e.google).map((e) => [e.year, e])
);
const allYears = Array.from(
  new Set(timelineData.map((e) => e.year))
).sort((a, b) => a - b);

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const fadeUpHighlight = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function ParallelTimeline() {
  const [activeYear, setActiveYear] = useState<number | null>(null);

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
          <p className="font-display font-bold text-base tracking-[0.15em] uppercase">
            <span style={{ color: "#E53935", textShadow: "0 0 8px rgba(229,57,53,0.9), 0 0 20px rgba(229,57,53,0.6), 0 0 40px rgba(229,57,53,0.3)" }}>Two</span>
            {" "}
            <span style={{ color: "#4285F4", textShadow: "0 0 8px rgba(66,133,244,0.9), 0 0 20px rgba(66,133,244,0.6), 0 0 40px rgba(66,133,244,0.3)" }}>Timelines.</span>
            {"  "}
            <span style={{ color: "#9B59D0", textShadow: "0 0 8px rgba(155,89,208,0.9), 0 0 20px rgba(155,89,208,0.6), 0 0 40px rgba(155,89,208,0.3)" }}>One Story.</span>
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-display text-cream text-balance">
            Born at the inflection point.
          </h2>
          <p className="mt-4 text-cream/70 max-w-lg text-sm leading-relaxed">
            Valentine&apos;s Day, 2000. The year Google became the world&apos;s search engine.
          </p>
        </motion.div>
      </div>

      {/* Unified year-row grid */}
      <div className="max-w-6xl mx-auto px-6">

        {/* Column headers */}
        <div className="grid grid-cols-[1fr_1px_1fr] gap-0 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-right pr-8"
          >
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#E53935", textShadow: "0 0 8px rgba(229,57,53,0.8), 0 0 20px rgba(229,57,53,0.5), 0 0 40px rgba(229,57,53,0.25)" }}>Nate</span>
          </motion.div>
          <div />
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="pl-8"
          >
            <span className="text-xs font-mono text-google-blue/60 tracking-widest uppercase">Google</span>
          </motion.div>
        </div>

        {/* Center divider with animated shimmer */}
        <div className="relative">
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 overflow-hidden pointer-events-none"
            aria-hidden="true"
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, rgba(245,240,235,0.15) 10%, rgba(245,240,235,0.15) 90%, transparent 100%)",
              }}
            />
            <motion.div
              className="absolute w-full"
              style={{
                height: "120px",
                background:
                  "linear-gradient(to bottom, transparent 0%, rgba(212,168,83,0.35) 50%, transparent 100%)",
                top: 0,
              }}
              animate={{ y: ["-120px", "100%"] }}
              transition={{ duration: 7, ease: "linear", repeat: Infinity, repeatDelay: 4 }}
            />
          </div>

          {/* Year rows */}
          <div className="space-y-10 md:space-y-12">
            {allYears.map((year, i) => {
              const nate = nateByYear.get(year);
              const google = googleByYear.get(year);
              const isHighlight = nate?.highlight || google?.highlight;
              const hasGoogleFact = !!(nate?.googleFact || google?.googleFact);
              const googleFact = nate?.googleFact || google?.googleFact;

              return (
                <motion.div
                  key={year}
                  variants={isHighlight ? fadeUpHighlight : fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.03 }}
                  className="grid grid-cols-[1fr_24px_1fr] gap-0 items-start"
                >
                  {/* Left — Nate */}
                  <div className="pr-6 text-right">
                    {nate ? (
                      <div>
                        <span
                          className="text-xs font-mono tracking-wider"
                          style={isHighlight
                            ? { color: "#E53935", textShadow: "0 0 6px rgba(229,57,53,0.8), 0 0 16px rgba(229,57,53,0.4)" }
                            : { color: "rgba(245,240,235,0.5)" }
                          }
                        >
                          {year}
                        </span>
                        <p className={cn(
                          "mt-1 font-display leading-snug",
                          isHighlight ? "text-cream font-medium" : "text-cream/85 text-sm"
                        )}>
                          {nate.nate}
                        </p>
                        {nate.nateDetail && (
                          <p className="mt-1.5 text-xs text-cream/50 leading-relaxed">
                            {nate.nateDetail}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="h-1" /> // empty placeholder keeps row height stable
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="flex justify-center pt-1.5">
                    <button
                      className={cn(
                        "rounded-full transition-all duration-300 focus-visible:outline-none",
                        isHighlight ? "w-3 h-3" : "w-2 h-2 bg-cream/25",
                        hasGoogleFact ? "cursor-pointer hover:scale-125" : "cursor-default"
                      )}
                      style={isHighlight ? {
                        backgroundColor: "#9B59D0",
                        boxShadow: "0 0 8px rgba(155,89,208,0.9), 0 0 20px rgba(155,89,208,0.5), 0 0 40px rgba(155,89,208,0.25)",
                      } : undefined}
                      onClick={() =>
                        hasGoogleFact && setActiveYear(activeYear === year ? null : year)
                      }
                      aria-label={hasGoogleFact ? `${year} Google fact` : undefined}
                    />
                  </div>

                  {/* Right — Google */}
                  <div className="pl-6 text-left">
                    {google ? (
                      <div>
                        <span className={cn(
                          "text-xs font-mono tracking-wider",
                          isHighlight ? "text-google-blue" : "text-cream/50"
                        )}>
                          {year}
                        </span>
                        <p className={cn(
                          "mt-1 font-display leading-snug",
                          isHighlight ? "text-cream font-medium" : "text-cream/85 text-sm"
                        )}>
                          {google.google}
                        </p>
                        {google.googleDetail && (
                          <p className="mt-1.5 text-xs text-cream/50 leading-relaxed">
                            {google.googleDetail}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="h-1" />
                    )}
                  </div>

                  {/* Google fact SERP snippet — spans full row */}
                  <AnimatePresence>
                    {activeYear === year && googleFact && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="col-span-3 overflow-hidden"
                      >
                        <div className="mt-3 mx-auto max-w-sm bg-surface-elevated border border-google-blue/20 rounded-xl px-4 py-3 shadow-navy-md">
                          <div className="flex items-center gap-1.5 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-google-blue" />
                            <span className="w-1.5 h-1.5 rounded-full bg-google-red" />
                            <span className="w-1.5 h-1.5 rounded-full bg-google-yellow" />
                            <span className="w-1.5 h-1.5 rounded-full bg-google-green" />
                            <span className="text-[10px] font-mono text-cream/40 ml-1 tracking-wide">google fact</span>
                          </div>
                          <p className="text-xs text-cream/80 leading-relaxed">{googleFact}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile separator (when stacking) */}
        <div className="md:hidden flex items-center gap-3 mt-12">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[10px] font-mono text-cream/40 tracking-widest uppercase">timeline</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>
      </div>
    </section>
  );
}
