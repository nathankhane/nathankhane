/**
 * AudioEngineer — Act 2, Section 4
 *
 * Music and sound engineering chapter. Audio opt-in (never autoplays).
 * Waveform visualization reacts to play state from AudioPlayer context.
 * Context: studio sessions with Mike McNeil (Travis Scott, Don Toliver).
 */
"use client";

import AnimatedSection from "@/components/AnimatedSection";

// Static waveform bars — animates when music is playing
function WaveformVisual({ isPlaying = false }: { isPlaying?: boolean }) {
  const bars = Array.from({ length: 48 }, (_, i) => {
    const heights = [0.3, 0.5, 0.8, 1, 0.7, 0.4, 0.9, 0.6, 0.3, 0.7, 1, 0.5, 0.8, 0.4, 0.6, 0.9,
                     0.3, 0.7, 0.5, 1, 0.6, 0.4, 0.8, 0.3, 0.9, 0.5, 0.7, 1, 0.4, 0.6, 0.3, 0.8,
                     0.5, 0.9, 0.7, 0.4, 1, 0.3, 0.6, 0.8, 0.5, 0.4, 0.9, 0.7, 0.3, 0.6, 1, 0.5];
    return heights[i % heights.length];
  });

  return (
    <div
      className="flex items-end gap-0.5 h-16 w-full"
      aria-hidden="true"
      aria-label="Waveform visualization"
    >
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-full transition-all duration-300"
          style={{
            height: `${h * 100}%`,
            backgroundColor: isPlaying ? `rgba(212,168,83,${0.4 + h * 0.6})` : `rgba(245,240,235,${h * 0.15})`,
            animation: isPlaying ? `waveform-pulse ${0.6 + (i % 5) * 0.15}s ease-in-out ${(i % 7) * 0.08}s infinite alternate` : "none",
          }}
        />
      ))}
    </div>
  );
}

export default function AudioEngineer() {
  return (
    <section
      id="maker"
      className="relative py-24 md:py-36 bg-ink overflow-hidden"
      aria-label="Audio Engineer — Act 2"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left — copy */}
          <div>
            <AnimatedSection direction="fade">
              <span className="text-xs font-mono text-gold/60 tracking-[0.2em] uppercase">
                Act II — The Maker
              </span>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="mt-4 text-3xl sm:text-4xl font-display text-cream leading-tight">
                Engineering sound taught me to engineer systems.
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="mt-6 space-y-4 text-cream/60 leading-relaxed text-sm">
                <p>
                  In 2022, I sat in a studio with Mike McNeil — producer for Travis Scott
                  and Don Toliver — and learned something no MBA teaches: every great
                  record is a system. Arrangement, tension, release. Architecture dressed
                  as emotion.
                </p>
                <p>
                  A beat is a product roadmap. A verse is a pitch deck. The discipline of
                  making music and the discipline of building companies are the same
                  impulse — compress complexity into something that lands.
                </p>
                <p className="text-gold/70 italic font-display">
                  &ldquo;Business Is Poetry&rdquo; is a lived philosophy, not a tagline.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="mt-8 flex items-center gap-3 text-xs font-mono text-cream/30">
                <span className="w-1 h-1 rounded-full bg-gold/60" />
                <span>Recorded with Mike McNeil, Houston TX, 2022</span>
              </div>
            </AnimatedSection>
          </div>

          {/* Right — waveform + play CTA */}
          <AnimatedSection direction="left" delay={0.15}>
            <div className="rounded-2xl border border-white/10 bg-surface p-6 space-y-5">
              <WaveformVisual isPlaying={false} />

              {/* Track info */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-display text-cream">Valentine / Signal</p>
                  <p className="text-xs text-cream/40 mt-0.5">Produced by Nathan Khane Morales</p>
                </div>
                <div className="text-xs font-mono text-cream/25">3:30</div>
              </div>

              {/* Play CTA — points to AudioPlayer at bottom */}
              <p className="text-xs text-cream/30 font-mono text-center border-t border-white/5 pt-4">
                ↓ Use the player below to listen
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
