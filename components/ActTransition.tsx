/**
 * ActTransition — Cinematic act break between narrative sections
 *
 * A1: Act I → Act II: gold rule draws left-to-right, "ACT II: THE MAKER" label
 * A2: Act II → Act III: Google-blue rule draws left-to-right, "ACT III: THE FUTURE" label
 *
 * The horizontal rule animates scaleX 0→1 from the left origin.
 * The label fades up after the rule finishes (0.9s delay).
 * A vertical breathing pulse on the center dot adds life after arrival.
 */
"use client";

import { motion } from "framer-motion";

interface ActTransitionProps {
  /** "ACT II" | "ACT III" etc. */
  act: string;
  /** Subtitle shown after the separator dot */
  subtitle: string;
  /** Visual treatment */
  color?: "gold" | "blue";
}

export default function ActTransition({
  act,
  subtitle,
  color = "gold",
}: ActTransitionProps) {
  const isGold = color === "gold";

  const ruleColor = isGold
    ? "rgba(212,168,83,0.35)"
    : "rgba(66,133,244,0.35)";

  const dotClass = isGold ? "bg-gold/50" : "bg-google-blue/50";
  const actClass = isGold ? "text-gold/50" : "text-google-blue/50";
  const subtitleClass = isGold ? "text-gold/70" : "text-google-blue/70";

  return (
    <div
      className="relative flex items-center justify-center py-10 md:py-14 px-6 overflow-hidden"
      aria-hidden="true"
    >
      {/* Rule — draws left to right */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 right-0 h-px"
        style={{ background: ruleColor, transformOrigin: "left" }}
      />

      {/* Label — fades up after rule finishes */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-center gap-3 px-5 act-label-bg"
      >
        <span className={`font-mono text-[9px] tracking-[0.28em] uppercase ${actClass}`}>
          {act}
        </span>

        {/* Center dot — pulses gently after arrival */}
        <motion.div
          className={`w-1 h-1 rounded-full shrink-0 ${dotClass}`}
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
        />

        <span className={`font-mono text-[9px] tracking-[0.28em] uppercase ${subtitleClass}`}>
          {subtitle}
        </span>
      </motion.div>
    </div>
  );
}
