/**
 * SocialArchitect — Act 2, Section 5
 *
 * TikTok portfolio showcase. Curated best-of grid with metrics.
 * Easter Egg #3: section transition mimics TikTok swipe-up native UX.
 * Lazy-loads TikTok embed script only when section enters viewport.
 *
 * SA1: TikTok swipe-up overlay appears when section enters viewport —
 *      progress bar + bouncing arrow, auto-dismisses after 1.4s.
 *
 * SA3: "I create it." headline glow animates from 0 → full on entrance.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { TIKTOK_PROFILE_URL, TIKTOK_HANDLE } from "@/lib/social-links";

const TIKTOK_VIDEOS = [
  { id: "7528959342104694029", caption: "thinking out loud" },
  { id: "7534547380851445005", caption: "who else feels like life is on 2x speed rn?" },
  { id: "7530832917510098190", caption: "when do you feel most creative?" },
  { id: "7541877082519817486", caption: "Day In The Bay Vol. 3: Work + Dog + @RUSS" },
];

export default function SocialArchitect() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-20%" });
  const [overlayVisible, setOverlayVisible] = useState(false);
  const hasShown = useRef(false);

  /* SA1 — fire once when section crosses viewport */
  useEffect(() => {
    if (inView && !hasShown.current) {
      hasShown.current = true;
      setOverlayVisible(true);
      const t = setTimeout(() => setOverlayVisible(false), 1400);
      return () => clearTimeout(t);
    }
  }, [inView]);

  /* Load TikTok embed script after mount */
  useEffect(() => {
    const SCRIPT_SRC = "https://www.tiktok.com/embed.js";
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="social"
      className="relative py-24 md:py-36 overflow-hidden"
      aria-label="Social Architect — Act 2"
      data-easter-egg="tiktok-swipe-up-transition"
    >
      {/* SA1 — Easter Egg #3: TikTok swipe-up overlay */}
      <AnimatePresence>
        {overlayVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-end pb-16"
            aria-hidden="true"
            data-easter-egg="tiktok-swipe-up"
          >
            {/* TikTok progress bar — thin top bar filling left→right */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/15 overflow-hidden">
              <div
                className="h-full bg-white origin-left"
                style={{ animation: "tiktok-progress 1.4s linear forwards" }}
              />
            </div>
            {/* Swipe-up affordance */}
            <div className="flex flex-col items-center gap-2">
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 0.65, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path
                    d="M11 17V5M5 11l6-6 6 6"
                    stroke="white"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
              <span className="text-white/90 text-[11px] font-mono tracking-[0.2em] uppercase">
                Swipe up
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <AnimatedSection direction="fade">
            <span className="text-xs font-mono text-gold/60 tracking-[0.2em] uppercase">
              Social Architect
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-display text-cream leading-tight text-balance">
              I don&apos;t just consume culture.{" "}
              {/* SA3: glow emerges from 0 on section entrance */}
              <motion.span
                initial={{ textShadow: "0 0 0px rgba(66,133,244,0)" }}
                whileInView={{
                  textShadow:
                    "0 0 20px rgba(66,133,244,0.6), 0 0 40px rgba(66,133,244,0.3)",
                }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ color: "rgba(66,133,244,1)" }}
              >
                I create it.
              </motion.span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="mt-4 text-cream/60 italic font-mono text-xs tracking-wide">
              [Placeholder — Nate to rewrite]
            </p>
          </AnimatedSection>
        </div>

        {/* TikTok embed grid — 2 columns so videos breathe */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TIKTOK_VIDEOS.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center"
            >
              {/* tiktok-video-wrap crops the "Watch more" footer chrome */}
              <div className="tiktok-video-wrap w-full" style={{ maxWidth: "min(325px, 100%)" }}>
                <blockquote
                  className="tiktok-embed"
                  cite={`https://www.tiktok.com/@nathankmorales/video/${video.id}`}
                  data-video-id={video.id}
                  style={{ maxWidth: "min(325px, 100%)", minWidth: "0" }}
                >
                  <section>
                    <a
                      target="_blank"
                      title="@nathankmorales"
                      href="https://www.tiktok.com/@nathankmorales?refer=embed"
                    >
                      @nathankmorales
                    </a>{" "}
                    {video.caption}
                  </section>
                </blockquote>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.4}>
          <div className="mt-10 flex items-center gap-4">
            <a
              href={TIKTOK_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-mono text-gold hover:text-cream transition-colors border-b border-gold/30 hover:border-cream/30 pb-0.5"
            >
              {TIKTOK_HANDLE} on TikTok
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
