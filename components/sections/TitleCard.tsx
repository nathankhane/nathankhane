/**
 * TitleCard — Act 1, Section 1
 *
 * Full-screen opening sequence: "This is Nate." → birth date → Google milestone.
 * Easter Egg #1: blinking cursor at exactly 530ms (Google's search bar blink rate).
 * Deep immersive dark with slow cinematic fade-in.
 */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINES = [
  "This is Nate.",
  "Nate was born on Valentine's Day, 2000.",
  "The year Google became the world's most-used search engine.",
];

export default function TitleCard() {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    if (visibleLines >= LINES.length) return;
    const t = setTimeout(() => {
      setVisibleLines((v) => v + 1);
    }, visibleLines === 0 ? 1200 : 2000);
    return () => clearTimeout(t);
  }, [visibleLines]);

  return (
    <section
      id="origin"
      className="relative min-h-[100dvh] flex flex-col justify-center bg-ink overflow-hidden"
      aria-label="Title Card — Act 1"
    >
      {/* Radial glow — left-offset to match text position */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 25% 55%, rgba(212,168,83,0.10) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-2xl px-8 md:px-16 lg:px-24">
        {LINES.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={visibleLines > i ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={`leading-tight text-balance ${
              i === 0
                ? "text-4xl sm:text-5xl md:text-6xl font-display text-cream mb-6"
                : i === 1
                ? "text-xl sm:text-2xl font-display text-cream/70 mb-4"
                : "text-base sm:text-lg font-mono text-gold/80 tracking-wide"
            }`}
          >
            {line}
            {i === visibleLines - 1 && visibleLines <= LINES.length && (
              <span
                className="inline-block w-0.5 h-[1em] bg-gold ml-1 align-middle cursor-blink"
                aria-hidden="true"
                data-easter-egg="cursor-blink-530ms"
              />
            )}
          </motion.p>
        ))}

        {/* Google favicon dots — appear after all lines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visibleLines >= LINES.length ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex items-center gap-2 font-mono text-xs text-cream/25"
          aria-hidden="true"
        >
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-google-blue opacity-60" />
            <span className="w-2 h-2 rounded-full bg-google-red opacity-60" />
            <span className="w-2 h-2 rounded-full bg-google-yellow opacity-60" />
            <span className="w-2 h-2 rounded-full bg-google-green opacity-60" />
          </div>
          <span>search begins here</span>
          <span className="w-px h-3 bg-cream/30 cursor-blink" aria-hidden="true" />
        </motion.div>
      </div>

      {/* Scroll cue — left-aligned, no text label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={visibleLines >= LINES.length ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-10 left-8 md:left-16 lg:left-24 flex flex-col gap-2"
        aria-hidden="true"
      >
        <span className="text-[10px] font-mono text-cream/20 tracking-[0.25em]">01</span>
        <motion.div
          animate={{ opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-cream/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
