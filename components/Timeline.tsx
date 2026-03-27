/**
 * Timeline — reusable vertical timeline component
 *
 * Used by ParallelTimeline for both Nate's life track (left) and
 * Google milestones track (right). Each track is a separate Timeline instance.
 *
 * TL1: The vertical connector line draws itself from top to bottom via
 *      scaleY 0→1, transformOrigin: top. 2s duration so it unfolds as
 *      the user reads through the years — the story literally writes itself.
 *
 * TL4: Highlight items (highlight: true) scale in from 0.97 + fadeUp
 *      instead of plain fadeUp, giving them a weightier arrival.
 *
 * Easter Egg #16: clicking a year with googleFact shows a SERP-styled snippet.
 */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/animations";
import type { Variants } from "framer-motion";

export interface TimelineItem {
  year: number;
  text: string;
  detail?: string;
  highlight?: boolean;
  googleFact?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  side?: "left" | "right";
  className?: string;
}

/** TL4 — highlight items get a scale entrance on top of the fadeUp */
const fadeUpHighlight: Variants = {
  hidden:  { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Timeline({ items, side = "left", className }: TimelineProps) {
  const [activeYear, setActiveYear] = useState<number | null>(null);

  return (
    <div className={cn("relative", className)}>
      {/* TL1 — Vertical line draws from top to bottom on viewport entry */}
      <motion.div
        className={cn(
          "absolute top-0 bottom-0 w-px bg-cream/10",
          side === "left" ? "right-0" : "left-0"
        )}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "top" }}
      />

      <div className="space-y-10">
        {items.map((item, i) => (
          <motion.div
            key={item.year}
            /* TL4: highlight items use the weightier scale variant */
            variants={item.highlight ? fadeUpHighlight : fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.04 }}
            className={cn(
              "relative",
              side === "left" ? "pr-8 text-right" : "pl-8 text-left"
            )}
          >
            {/* Dot on the timeline */}
            <motion.div
              className={cn(
                "absolute top-1.5 rounded-full transition-all duration-300",
                item.highlight
                  ? "bg-gold w-3 h-3 top-1"
                  : "bg-cream/30 w-2 h-2",
                side === "left" ? "-right-1.5" : "-left-1.5"
              )}
              style={
                item.highlight
                  ? {
                      boxShadow:
                        "0 0 8px rgba(212,168,83,0.5), 0 0 16px rgba(212,168,83,0.25)",
                    }
                  : undefined
              }
              /* Highlight dots pulse gently after appearing */
              animate={
                item.highlight
                  ? {
                      boxShadow: [
                        "0 0 8px rgba(212,168,83,0.5), 0 0 16px rgba(212,168,83,0.25)",
                        "0 0 14px rgba(212,168,83,0.8), 0 0 28px rgba(212,168,83,0.4)",
                        "0 0 8px rgba(212,168,83,0.5), 0 0 16px rgba(212,168,83,0.25)",
                      ],
                    }
                  : {}
              }
              transition={
                item.highlight
                  ? { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
                  : {}
              }
            />

            {/* Year — clickable if googleFact exists */}
            <p
              className={cn(
                "font-mono text-xs mb-1 transition-colors duration-300",
                item.highlight ? "text-gold" : "text-cream/60",
                item.googleFact && "cursor-pointer hover:text-google-blue/80"
              )}
              onClick={() =>
                item.googleFact &&
                setActiveYear(activeYear === item.year ? null : item.year)
              }
              title={item.googleFact ? "Click for a Google fact" : undefined}
            >
              {item.year}
              {item.googleFact && (
                <span className="ml-1 text-google-blue/40 text-[9px]">●</span>
              )}
            </p>

            {/* Main text */}
            <p
              className={cn(
                "text-sm leading-snug",
                "font-sans",
                item.highlight ? "text-cream font-semibold" : "text-cream/80"
              )}
            >
              {item.text}
            </p>

            {/* Detail */}
            {item.detail && (
              <p className="text-xs text-cream/70 mt-1 leading-relaxed hidden md:block group-hover:block">
                {item.detail}
              </p>
            )}

            {/* Easter Egg #16 — SERP snippet popover */}
            <AnimatePresence>
              {item.googleFact && activeYear === item.year && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "mt-3 bg-white rounded-xl p-3 shadow-lg z-10 max-w-[260px]",
                    side === "left" ? "ml-auto" : "mr-auto"
                  )}
                >
                  {/* Google search bar mini */}
                  <div className="flex items-center gap-1.5 mb-2.5 pb-2 border-b border-gray-100">
                    <div className="flex items-center gap-[2px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-google-blue" />
                      <span className="w-1.5 h-1.5 rounded-full bg-google-red" />
                      <span className="w-1.5 h-1.5 rounded-full bg-google-yellow" />
                      <span className="w-1.5 h-1.5 rounded-full bg-google-green" />
                    </div>
                    <span className="text-[10px] font-mono text-[#5f6368]">
                      Google {item.year}
                    </span>
                  </div>
                  {/* SERP snippet */}
                  <p className="text-[11px] text-[#1a0dab] font-sans font-medium leading-snug mb-1">
                    What happened at Google in {item.year}
                  </p>
                  <p className="text-[10px] text-[#006621] font-mono mb-1.5">
                    google.com/history/{item.year}
                  </p>
                  <p className="text-[11px] text-[#545454] leading-relaxed">
                    {item.googleFact}
                  </p>
                  <button
                    onClick={() => setActiveYear(null)}
                    className="mt-2 text-[9px] text-[#9aa0a6] hover:text-[#5f6368] font-mono transition-colors"
                  >
                    close ×
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
