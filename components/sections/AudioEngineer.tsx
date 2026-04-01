/**
 * AudioEngineer — Act 2, Section 4
 *
 * Interactive music player section. Select a track to read lyrics and
 * load it into the persistent AudioPlayer at the bottom.
 * Fact: all tracks produced/engineered in Logic Pro.
 *
 * AE1: Full-width ambient waveform backdrop at top of section — atmospheric,
 *      always gently pulsing, signals "we're in the sound world now."
 *
 * AE3: Track buttons slide right 4px on hover — directional pull toward play.
 *
 * AE4: Waveform indicator restarts on track change via key prop re-mount.
 *
 * AE5: Lyrics panel blurs in from 6px to 0 on open — lyrics materialize.
 */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

interface Track {
  index: number;
  title: string;
  credits: string;
  duration: string;
  lyrics: string;
}

const TRACKS: Track[] = [
  {
    index: 0,
    title: "Love Songs 4 U",
    credits: "Written, Performed, and co-composed by Nathan Khane Morales",
    duration: "4:00",
    lyrics: `Take you on a trip
Ship to different ship (Ship, ship, ship)
Lil bahama shawty, you know imma get you split
Vietnamese lil baby, you don't even speak english
(Oh no no, no, oh, ohhh)

Rollin' marijuana, you know I be getting commas
You know I be hitting drama on the low (low)

Don't take me for granted
I just do this sh*t for granny
And I'm really ballin' like I'm twenty fo' (Kob)

Don't sit there and lie to me
You know that ima try to be
Everything to you and some mo'

Never gonna rush you
Take yo' time
But just know you fallin' in line
(Lii-iii-ine)`,
  },
  {
    index: 1,
    title: "wastin' time with u",
    credits: "Written, Recorded, and Engineered by Nathan Khane Morales",
    duration: "3:30",
    lyrics: `(Pacific)

C'mon!

California sunrise baby, I'm still layin' in bed with your dog
Can't seem to wake up on time lately
Maybe it's the weed cause my brain-fog

Again, I'm here with you, again
Time spent don't pay rent (Time Spent)
But you keep me around

And when I'm next to you
I feel like I'm on cloud nine now
And when I'm next to you (next to you)
I could give a damn bout the crowd

I just can stop wastin', wastin'
I just can't stop wastin' time with u

I just can stop wastin', wastin'
I just can't stop wastin' time with u`,
  },
  {
    index: 2,
    title: "Cruise Freestyle",
    credits: "Performed and Co-produced by Nathan Khane Morales",
    duration: "3:00",
    lyrics: `Took her to the beach, she say she never been there
I said don't speak
I looked at her in her eyes and I'm gettin weak
Cus when I remember all the times, all the times – I was
Outta my mind, outta my mind, outta my mind – I been
On my grind, on my grind, on my grind – Baby
Won't you find some time, to
Link with me (yeah)

Twenty Twenty Fo', that's the vision
Twenty Twenty Five, that's the mission (miiission)
Got you in yo vibes, got you in yo feelings
Look to your right, it's a... it's a...

Bright spot in your life, you ain't ever had no shit like this (SHPEW SHPEW)
So don't give me that look

When I was comin up
Everybody showed me loooove
Don't think I forget about those times, those times
Nowadays I'm just focused on these rhymes, these rhymes

I'm on a booze cruise, she's feeling me...
I'm on a booze cruise, she's feeling the weed...

Outta my mind, outta my mind, outta my mind – I been
On my grind, on my grind, on my grind – Baby
Won't you find some time, to link with me

I'm on a booze cruise, she's feeling me
I'm on a booze cruise, she's feeling me (Yeah)
(Feeling me, yeah)`,
  },
];

/** AE1 — ambient waveform backdrop heights */
const AMBIENT_HEIGHTS = [
  0.3, 0.5, 0.7, 0.9, 1, 0.8, 0.6, 0.4, 0.7, 1, 0.5, 0.8, 0.3, 0.9, 0.6,
  0.4, 0.8, 1, 0.5, 0.7, 0.3, 0.9, 0.6, 0.8, 0.4, 1, 0.7, 0.5, 0.3, 0.9,
  0.6, 0.8, 0.4, 0.7, 1, 0.5, 0.3, 0.9, 0.6, 0.8,
];

function AmbientWaveform() {
  return (
    <div
      className="absolute top-0 left-0 right-0 h-12 flex items-end gap-px px-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {AMBIENT_HEIGHTS.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-full"
          style={{
            height: `${h * 100}%`,
            backgroundColor: `rgba(212,168,83,${h * 0.07})`,
            animation: `waveform-ambient ${0.8 + (i % 6) * 0.18}s ease-in-out ${(i % 9) * 0.09}s infinite alternate`,
            transformOrigin: "bottom",
          }}
        />
      ))}
    </div>
  );
}

function WaveformVisual({ active, trackKey }: { active: boolean; trackKey: number }) {
  const heights = [
    0.3, 0.5, 0.8, 1, 0.7, 0.4, 0.9, 0.6, 0.3, 0.7, 1, 0.5, 0.8, 0.4, 0.6,
    0.9, 0.3, 0.7, 0.5, 1, 0.6, 0.4, 0.8, 0.3, 0.9, 0.5, 0.7, 1, 0.4, 0.6,
    0.3, 0.8,
  ];
  return (
    /* AE4: key=trackKey forces re-mount → CSS animations restart on track change */
    <div
      key={`waveform-${trackKey}`}
      className="flex items-end gap-px h-8 w-full"
      aria-hidden="true"
    >
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
      className="relative pt-24 md:pt-36 pb-24 md:pb-36 overflow-hidden"
      aria-label="Audio Engineer — Act 2"
    >
      {/* AE1 — ambient waveform backdrop at top of section */}
      <AmbientWaveform />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_1fr] gap-16 items-start">

          {/* Left — copy (visually right on desktop) */}
          <div className="md:order-2">
            <AnimatedSection direction="fade">
              <span className="text-xs font-mono text-gold/60 tracking-[0.2em] uppercase">
                Act II: The Maker
              </span>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="mt-4 text-3xl sm:text-4xl font-display text-cream leading-tight text-balance">
                A passion for songwriting and engineering systems led to me engineering songs.
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="mt-6 space-y-4 text-cream/75 leading-relaxed text-sm">
                <p>
                  In late 2023, I sat in a studio with Matt O&apos;Neill, producer for Travis Scott
                  and Don Toliver, and UM? — an artist and a brother — and learned something no MBA teaches.
                </p>
                <p className="text-cream/60 italic font-mono text-xs tracking-wide">
                  Yes... all of these songs are really me. Enjoy :)
                </p>

              </div>
            </AnimatedSection>

            {/* Logic Pro badge */}
            <AnimatedSection delay={0.3}>
              <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-surface px-4 py-3">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <rect width="32" height="32" rx="7" fill="#E8E8E8" fillOpacity="0.08" />
                  <path d="M8 22V10l8 6-8 6z" fill="#D4A853" fillOpacity="0.9" />
                  <path d="M16 22V10l8 6-8 6z" fill="#D4A853" fillOpacity="0.5" />
                </svg>
                <div>
                  <p className="text-xs font-mono text-cream/70 leading-none">Produced in Logic Pro</p>
                  <p className="text-[10px] font-mono text-cream/60 mt-0.5">
                    All 3 tracks written, recorded &amp; engineered by Nate
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right — track selector + lyrics (visually left on desktop) */}
          <AnimatedSection className="md:order-1" direction="left" delay={0.15}>
            <div
              className="rounded-2xl border border-white/10 bg-surface overflow-hidden"
              style={{
                boxShadow:
                  "0 0 40px rgba(212,168,83,0.07), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {/* Track list */}
              <div className="divide-y divide-white/[0.06]">
                {TRACKS.map((t) => {
                  const isActive = selected === t.index;
                  return (
                    /* AE3: hover slides button content right 4px */
                    <motion.button
                      key={t.index}
                      onClick={() => {
                        setSelected(t.index);
                        setShowLyrics(false);
                      }}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className={`w-full text-left px-5 py-4 flex items-center gap-4 transition-colors ${
                        isActive ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
                      }`}
                    >
                      {/* Track number / play indicator */}
                      <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                        {isActive ? (
                          /* AE4: key forces re-mount on track change so animation restarts */
                          <WaveformVisual active={true} trackKey={t.index} />
                        ) : (
                          <span className="text-[10px] font-mono text-cream/70">
                            {t.index + 1}
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-display leading-tight truncate transition-colors ${
                            isActive ? "text-cream" : "text-cream/60"
                          }`}
                        >
                          {t.title}
                        </p>
                        <p className="text-[10px] font-mono text-cream/70 mt-0.5 truncate">
                          {t.credits}
                        </p>
                      </div>

                      <span className="text-[10px] font-mono text-cream/60 shrink-0">
                        {t.duration}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Actions for selected track */}
              <div className="px-5 py-4 border-t border-white/[0.06] flex items-center gap-3">
                <motion.button
                  onClick={() => loadInPlayer(selected)}
                  className="flex items-center gap-2 text-xs font-mono text-cream/70 hover:text-cream border border-white/10 hover:border-google-blue/40 rounded-full px-4 py-2 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                    <path d="M2 1l7 4-7 4V1z" />
                  </svg>
                  Play in player
                </motion.button>

                <button
                  onClick={() => setShowLyrics((v) => !v)}
                  className={`flex items-center gap-2 text-xs font-mono border rounded-full px-4 py-2 transition-all ${
                    showLyrics
                      ? "text-gold border-gold/40 bg-gold/5"
                      : "text-cream/70 border-white/10 hover:text-cream hover:border-white/20"
                  }`}
                >
                  {showLyrics ? "Hide lyrics" : "Read lyrics"}
                </button>
              </div>

              {/* AE5: Lyrics panel — blurs in from 6px on open */}
              <AnimatePresence>
                {showLyrics && (
                  <motion.div
                    key={selected}
                    initial={{ height: 0, opacity: 0, filter: "blur(6px)" }}
                    animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                    exit={{ height: 0, opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 py-5 border-t border-white/[0.06]">
                      <p className="text-[10px] font-mono text-gold/70 tracking-[0.2em] uppercase mb-3">
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
