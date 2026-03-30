/**
 * TitleCard — Act 1, Section 1
 *
 * Full-screen opening sequence: "This is Nate." → birth date → Google milestone.
 * Easter Egg #1: blinking cursor at exactly 530ms (Google's search bar blink rate).
 * Deep immersive dark with slow cinematic fade-in.
 *
 * T1: The radial gold glow blob breathes slowly (scale + opacity pulse).
 * T2: Google-color dots stagger-pop in Google logo order (B→R→Y→G) after lines appear.
 */
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  "This is Nate.",
  "Nate was born on Valentine's Day, 2000.",
  "The year Google became the world's most-used search engine.",
];

const GOOGLE_DOTS = [
  { color: "bg-google-blue",   label: "blue"   },
  { color: "bg-google-red",    label: "red"    },
  { color: "bg-google-yellow", label: "yellow" },
  { color: "bg-google-green",  label: "green"  },
];

export default function TitleCard() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [heartVisible, setHeartVisible] = useState(false);

  useEffect(() => {
    if (visibleLines >= LINES.length) return;
    const t = setTimeout(
      () => setVisibleLines((v) => v + 1),
      visibleLines === 0 ? 1200 : 2000
    );
    return () => clearTimeout(t);
  }, [visibleLines]);

  const allLinesVisible = visibleLines >= LINES.length;

  return (
    <section
      id="origin"
      className="relative min-h-[100dvh] flex flex-col justify-center bg-ink overflow-hidden"
      aria-label="Title Card — Act 1"
    >
      {/* T1 — Breathing gold ambient blob */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 25% 55%, rgba(212,168,83,0.10) 0%, transparent 65%)",
        }}
        animate={{
          scale:   [1, 1.07, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-2xl px-8 md:px-16 lg:px-24">
        {LINES.map((line, i) => (
          <div key={i} className={i === 1 ? "relative inline-block" : ""}>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={visibleLines > i ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className={`leading-tight text-balance ${
                i === 0
                  ? "text-4xl sm:text-5xl md:text-6xl font-display text-cream mb-6"
                  : i === 1
                  ? "text-xl sm:text-2xl font-display text-cream/70 mb-4 cursor-default"
                  : "text-base sm:text-lg font-mono text-gold/80 tracking-wide"
              }`}
              onMouseEnter={i === 1 ? () => setHeartVisible(true) : undefined}
              onMouseLeave={i === 1 ? () => setHeartVisible(false) : undefined}
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
            {/* Easter Egg #17 — Valentine's Day heart float */}
            {i === 1 && (
              <AnimatePresence>
                {heartVisible && (
                  <motion.span
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: [0, 1, 1, 0], y: -28 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute -top-2 left-1/2 -translate-x-1/2 text-lg pointer-events-none select-none"
                    aria-hidden="true"
                  >
                    ❤
                  </motion.span>
                )}
              </AnimatePresence>
            )}
          </div>
        ))}

        {/* T2 — Google-color dots + clickable search CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={allLinesVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => window.dispatchEvent(new CustomEvent("nate:open-search"))}
          className="mt-12 flex items-center gap-2 font-mono text-xs cursor-pointer group focus-visible:outline-none"
          aria-label="Open search"
        >
          <div className="flex gap-1">
            {GOOGLE_DOTS.map(({ color, label }, i) => (
              <motion.span
                key={label}
                className={`w-2 h-2 rounded-full ${color} transition-opacity duration-300 group-hover:opacity-90`}
                initial={{ scale: 0.2, opacity: 0 }}
                animate={
                  allLinesVisible
                    ? { scale: 1, opacity: 0.6 }
                    : { scale: 0.2, opacity: 0 }
                }
                transition={{
                  delay: 0.5 + i * 0.09,
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            ))}
          </div>
          {/* Shimmer text */}
          <span
            className="text-cream/30 group-hover:text-cream/60 transition-colors duration-300"
            style={{
              backgroundImage: "linear-gradient(90deg, transparent 0%, rgba(245,240,235,0.5) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              animation: "search-shimmer 3s ease-in-out 2s infinite",
            }}
          >
            search begins here
          </span>
          <span className="w-px h-3 bg-cream/30 cursor-blink" aria-hidden="true" />
          {/* ⌘K hint — pulses softly to invite click */}
          <motion.span
            animate={{ opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="ml-1 text-[9px] tracking-widest text-cream/20 group-hover:text-cream/50 transition-colors duration-300 hidden sm:inline"
            aria-hidden="true"
          >
            ⌘K
          </motion.span>
        </motion.button>
      </div>

      {/* Scroll cue — animated line crawl */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={allLinesVisible ? { opacity: 1 } : { opacity: 0 }}
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
