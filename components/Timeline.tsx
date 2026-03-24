/**
 * Timeline — reusable vertical timeline component
 *
 * Used by ParallelTimeline for both Nate's life track (left) and
 * Google milestones track (right). Each track is a separate Timeline instance.
 *
 * Highlighted years get larger typography and gold accent treatment.
 * AnimatedSection wrapper triggers reveals as user scrolls.
 */
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/animations";

export interface TimelineItem {
  year: number;
  text: string;
  detail?: string;
  highlight?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
  side?: "left" | "right";
  className?: string;
}

export default function Timeline({ items, side = "left", className }: TimelineProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Vertical line */}
      <div
        className={cn(
          "absolute top-0 bottom-0 w-px bg-cream/10",
          side === "left" ? "right-0" : "left-0"
        )}
      />

      <div className="space-y-10">
        {items.map((item, i) => (
          <motion.div
            key={item.year}
            variants={fadeUp}
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
            <div
              className={cn(
                "absolute top-1.5 w-2 h-2 rounded-full transition-all duration-300",
                item.highlight
                  ? "bg-gold w-3 h-3 top-1"
                  : "bg-cream/30",
                side === "left" ? "-right-1.5" : "-left-1.5"
              )}
              style={item.highlight ? { boxShadow: "0 0 8px rgba(212,168,83,0.5), 0 0 16px rgba(212,168,83,0.25)" } : undefined}
            />

            {/* Year */}
            <p
              className={cn(
                "font-mono text-xs mb-1 transition-colors duration-300",
                item.highlight ? "text-gold" : "text-cream/40"
              )}
            >
              {item.year}
            </p>

            {/* Main text */}
            <p
              className={cn(
                "text-sm leading-snug",
                "font-[family-name:var(--font-playfair)]",
                item.highlight ? "text-cream font-semibold" : "text-cream/80"
              )}
            >
              {item.text}
            </p>

            {/* Detail (hover reveal on desktop, always visible on mobile) */}
            {item.detail && (
              <p className="text-xs text-cream/50 mt-1 leading-relaxed hidden md:block group-hover:block">
                {item.detail}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
