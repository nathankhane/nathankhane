/**
 * SocialArchitect — Act 2, Section 5
 *
 * TikTok portfolio showcase. Curated best-of grid with metrics.
 * Easter Egg #3: section transition mimics TikTok swipe-up native UX.
 * Lazy-loads TikTok embed script only when section enters viewport.
 */
"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { TIKTOK_PROFILE_URL, TIKTOK_HANDLE } from "@/lib/social-links";

const TIKTOK_VIDEOS = [
  { id: "7528959342104694029", caption: "thinking out loud" },
  { id: "7534547380851445005", caption: "who else feels like life is on 2x speed rn?" },
  { id: "7530832917510098190", caption: "when do you feel most creative?" },
  { id: "7541877082519817486", caption: "Day In The Bay Vol. 3: Work + Dog + @RUSS" },
];

export default function SocialArchitect() {
  // Load TikTok embed script after component mounts so it processes blockquotes
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
      id="social"
      className="relative py-24 md:py-36 overflow-hidden"
      aria-label="Social Architect — Act 2"
      data-easter-egg="tiktok-swipe-up-transition"
    >
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
              <span
                className="animate-blue-glow-text"
                style={{
                  color: "rgba(66,133,244,1)",
                  textShadow: "0 0 20px rgba(66,133,244,0.6), 0 0 40px rgba(66,133,244,0.3)",
                }}
              >
                I create it.
              </span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="mt-4 text-cream/30 italic font-mono text-xs tracking-wide">
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
              <div className="tiktok-video-wrap w-full" style={{ maxWidth: "325px" }}>
                <blockquote
                  className="tiktok-embed"
                  cite={`https://www.tiktok.com/@nathankmorales/video/${video.id}`}
                  data-video-id={video.id}
                  style={{ maxWidth: "325px", minWidth: "280px" }}
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
