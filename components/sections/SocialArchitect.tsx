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
import { TIKTOK_PROFILE_URL, TIKTOK_HANDLE, SOCIAL_LINKS } from "@/lib/social-links";

const TIKTOK_VIDEOS = [
  { id: "7528959342104694029", caption: "thinking out loud" },
  { id: "7534547380851445005", caption: "who else feels like life is on 2x speed rn?" },
  { id: "7530832917510098190", caption: "when do you feel most creative?" },
  { id: "7541877082519817486", caption: "Day In The Bay Vol. 3: Work + Dog + @RUSS" },
];

function SocialIcon({ label }: { label: string }) {
  switch (label) {
    case "LinkedIn":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "TikTok":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z" />
        </svg>
      );
    case "X":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    case "Substack":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "Spotify":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      );
    default:
      return null;
  }
}

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

  /* Load TikTok embed script after mount — always remove + re-add so it
     re-scans the DOM for blockquote.tiktok-embed elements after hydration. */
  useEffect(() => {
    const SCRIPT_SRC = "https://www.tiktok.com/embed.js";
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (existing) existing.remove();
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
        {/* Header — right-aligned (alternating layout) */}
        <div className="mb-14 max-w-2xl ml-auto text-right">
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
            <p className="mt-4 text-cream/60 italic font-mono text-xs tracking-wide text-right">
              Storytelling is the main ingredient to my madness
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
          <div className="mt-10 flex flex-col items-center gap-6">
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

            {/* Social icons row */}
            <div className="flex items-center justify-center gap-5">
              {SOCIAL_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-cream/40 hover:text-cream transition-colors"
                >
                  <SocialIcon label={link.label} />
                </motion.a>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
