/**
 * AudioEngineer — Act 2, Section 4
 *
 * Interactive music player section. Select a track to read lyrics and
 * load it into the persistent AudioPlayer at the bottom.
 * Fact: all tracks produced/engineered in Logic Pro.
 */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

interface Track {
  index: number;          // matches tracks[] order in music-tracks.ts
  title: string;
  credits: string;
  duration: string;
  lyrics: string;
}

const TRACKS: Track[] = [
  {
    index: 0,
    title: "Cruise Freestyle",
    credits: "Performed and Co-produced by Nathan Khane Morales",
    duration: "3:00",
    lyrics: `[Lyrics — Nate to add]`,
  },
  {
    index: 1,
    title: "wastin' time with u",
    credits: "Written, Recorded, and Engineered by Nathan Khane Morales",
    duration: "3:30",
    lyrics: `[Lyrics — Nate to add]`,
  },
  {
    index: 2,
    title: "Love Songs 4 U",
    credits: "Written, Performed, and co-composed by Nathan Khane Morales",
    duration: "4:00",
    lyrics: `[Lyrics — Nate to add]`,
  },
];

function WaveformVisual({ active }: { active: boolean }) {
  const heights = [0.3,0.5,0.8,1,0.7,0.4,0.9,0.6,0.3,0.7,1,0.5,0.8,0.4,0.6,0.9,
                   0.3,0.7,0.5,1,0.6,0.4,0.8,0.3,0.9,0.5,0.7,1,0.4,0.6,0.3,0.8];
  return (
    <div className="flex items-end gap-px h-8 w-full" aria-hidden="true">
      {heights.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-full transition-all duration-300"
          style={{
            height: `${h * 100}%`,
            backgroundColor: active
              ? `rgba(212,168,83,${0.4 + h * 0.6})`
              : `rgba(245,240,235,${h * 0.12})`,
            animation: active
              ? `waveform-pulse ${0.6 + (i % 5) * 0.15}s ease-in-out ${(i % 7) * 0.08}s infinite alternate`
              : "none",
          }}
        />
      ))}
    </div>
  );
}

export default function AudioEngineer() {
  const [selected, setSelected] = useState<number>(0);
  const [showLyrics, setShowLyrics] = useState(false);

  const track = TRACKS[selected];

  const loadInPlayer = (idx: number) => {
    window.dispatchEvent(
      new CustomEvent("audioTrackSelect", { detail: { index: idx, autoPlay: true } })
    );
  };

  return (
    <section
      id="maker"
      className="relative py-24 md:py-36 overflow-hidden"
      aria-label="Audio Engineer — Act 2"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_1fr] gap-16 items-start">

          {/* Left — copy */}
          <div>
            <AnimatedSection direction="fade">
              <span className="text-xs font-mono text-gold/60 tracking-[0.2em] uppercase">
                Act II: The Maker
              </span>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="mt-4 text-3xl sm:text-4xl font-display text-cream leading-tight text-balance">
                Engineering sound taught me to engineer systems.
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="mt-6 space-y-4 text-cream/60 leading-relaxed text-sm">
                <p>
                  In late 2023, I sat in a studio with Matt O&apos;Neill, producer for Travis Scott
                  and Don Toliver, and learned something no MBA teaches.
                </p>
                <p className="text-cream/30 italic font-mono text-xs tracking-wide">
                  [Placeholder — Nate to rewrite]
                </p>
                <p className="text-gold/70 italic font-display text-base">
                  &ldquo;Business Is Poetry&rdquo; is a lived philosophy, not a tagline.
                </p>
              </div>
            </AnimatedSection>

            {/* Logic Pro badge */}
            <AnimatedSection delay={0.3}>
              <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-surface px-4 py-3">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <rect width="32" height="32" rx="7" fill="#E8E8E8" fillOpacity="0.08"/>
                  <path d="M8 22V10l8 6-8 6z" fill="#D4A853" fillOpacity="0.9"/>
                  <path d="M16 22V10l8 6-8 6z" fill="#D4A853" fillOpacity="0.5"/>
                </svg>
                <div>
                  <p className="text-xs font-mono text-cream/70 leading-none">Produced in Logic Pro</p>
                  <p className="text-[10px] font-mono text-cream/30 mt-0.5">All 3 tracks written, recorded &amp; engineered by Nate</p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right — track selector + lyrics */}
          <AnimatedSection direction="left" delay={0.15}>
            <div
              className="rounded-2xl border border-white/10 bg-surface overflow-hidden"
              style={{ boxShadow: "0 0 40px rgba(212,168,83,0.07), inset 0 1px 0 rgba(255,255,255,0.05)" }}
            >
              {/* Track list */}
              <div className="divide-y divide-white/[0.06]">
                {TRACKS.map((t) => {
                  const isActive = selected === t.index;
                  return (
                    <button
                      key={t.index}
                      onClick={() => {
                        setSelected(t.index);
                        setShowLyrics(false);
                      }}
                      className={`w-full text-left px-5 py-4 flex items-center gap-4 transition-colors ${
                        isActive ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
                      }`}
                    >
                      {/* Track number / play indicator */}
                      <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                        {isActive ? (
                          <WaveformVisual active={true} />
                        ) : (
                          <span className="text-[10px] font-mono text-cream/30">{t.index + 1}</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-display leading-tight truncate transition-colors ${isActive ? "text-cream" : "text-cream/60"}`}>
                          {t.title}
                        </p>
                        <p className="text-[10px] font-mono text-cream/30 mt-0.5 truncate">{t.credits}</p>
                      </div>

                      <span className="text-[10px] font-mono text-cream/25 shrink-0">{t.duration}</span>
                    </button>
                  );
                })}
              </div>

              {/* Actions for selected track */}
              <div className="px-5 py-4 border-t border-white/[0.06] flex items-center gap-3">
                <button
                  onClick={() => loadInPlayer(selected)}
                  className="flex items-center gap-2 text-xs font-mono text-cream/70 hover:text-cream border border-white/10 hover:border-gold/40 rounded-full px-4 py-2 transition-all"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                    <path d="M2 1l7 4-7 4V1z"/>
                  </svg>
                  Play in player
                </button>

                <button
                  onClick={() => setShowLyrics((v) => !v)}
                  className={`flex items-center gap-2 text-xs font-mono border rounded-full px-4 py-2 transition-all ${
                    showLyrics
                      ? "text-gold border-gold/40 bg-gold/5"
                      : "text-cream/40 border-white/10 hover:text-cream/70 hover:border-white/20"
                  }`}
                >
                  {showLyrics ? "Hide lyrics" : "Read lyrics"}
                </button>
              </div>

              {/* Lyrics panel */}
              <AnimatePresence>
                {showLyrics && (
                  <motion.div
                    key={selected}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 py-5 border-t border-white/[0.06]">
                      <p className="text-[10px] font-mono text-gold/50 tracking-[0.2em] uppercase mb-3">
                        {track.title}
                      </p>
                      <pre className="font-display text-sm text-cream/70 leading-relaxed whitespace-pre-wrap">
                        {track.lyrics}
                      </pre>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
