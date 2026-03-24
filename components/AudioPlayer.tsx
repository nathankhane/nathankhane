/**
 * AudioPlayer — persistent Spotify-style mini-player
 *
 * Lives at viewport bottom. Howler.js for audio playback.
 * CRITICAL: NEVER autoplays. User must click Play explicitly.
 * Handles missing audio files gracefully — no errors if tracks not yet added.
 *
 * @see lib/music-tracks.ts for track metadata
 */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tracks, type MusicTrack } from "@/lib/music-tracks";

// Howler is loaded dynamically to prevent SSR issues
type HowlInstance = {
  play: () => void;
  pause: () => void;
  stop: () => void;
  seek: (pos?: number) => number;
  duration: () => number;
  playing: () => boolean;
  volume: (vol?: number) => number | HowlInstance;
  on: (event: string, cb: () => void) => HowlInstance;
  off: (event: string) => HowlInstance;
  unload: () => void;
};

type HowlConstructor = new (opts: {
  src: string[];
  html5: boolean;
  preload: boolean;
  onload?: () => void;
  onloaderror?: (id: number, err: unknown) => void;
  onplay?: () => void;
  onend?: () => void;
}) => HowlInstance;

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AudioPlayer() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [showVolume, setShowVolume] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const howlRef = useRef<HowlInstance | null>(null);
  const progressRafRef = useRef<number>(0);
  const HowlRef = useRef<HowlConstructor | null>(null);

  const currentTrack: MusicTrack = tracks[currentTrackIdx];

  // Show player after a short delay — give page time to settle
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  // Load Howler dynamically (SSR-safe)
  useEffect(() => {
    import("howler").then((mod) => {
      HowlRef.current = mod.Howl as unknown as HowlConstructor;
    });
  }, []);

  const stopProgressLoop = useCallback(() => {
    if (progressRafRef.current) {
      cancelAnimationFrame(progressRafRef.current);
      progressRafRef.current = 0;
    }
  }, []);

  const startProgressLoop = useCallback(() => {
    const tick = () => {
      if (howlRef.current?.playing()) {
        const seek = howlRef.current.seek();
        setProgress(typeof seek === "number" ? seek : 0);
        progressRafRef.current = requestAnimationFrame(tick);
      }
    };
    progressRafRef.current = requestAnimationFrame(tick);
  }, []);

  const loadTrack = useCallback((track: MusicTrack) => {
    if (!HowlRef.current) return;

    // Unload previous
    if (howlRef.current) {
      howlRef.current.stop();
      howlRef.current.unload();
      howlRef.current = null;
    }
    stopProgressLoop();
    setProgress(0);
    setDuration(0);
    setHasError(false);
    setIsLoading(true);
    setIsPlaying(false);

    howlRef.current = new HowlRef.current({
      src: [track.src],
      html5: true,
      preload: true,
      onload: () => {
        setIsLoading(false);
        if (howlRef.current) {
          setDuration(howlRef.current.duration());
          if (track.startAt) {
            howlRef.current.seek(track.startAt);
            setProgress(track.startAt);
          }
          if (autoPlayOnLoadRef.current) {
            autoPlayOnLoadRef.current = false;
            howlRef.current.play();
            setIsPlaying(true);
            // progress loop starts via onplay callback below
          }
        }
      },
      // onplay fires after Howler confirms playback started — safe place to begin RAF loop
      onplay: () => {
        startProgressLoop();
      },
      onloaderror: () => {
        setIsLoading(false);
        setHasError(true);
      },
      onend: () => {
        setIsPlaying(false);
        stopProgressLoop();
        setProgress(0);
        // Advance to next track
        setCurrentTrackIdx((idx) => (idx + 1) % tracks.length);
      },
    });

    howlRef.current.volume(volume);
  }, [volume, stopProgressLoop]);

  // Reload when track changes
  useEffect(() => {
    loadTrack(currentTrack);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackIdx]);

  // Listen for track-select events from other sections (e.g. AudioEngineer)
  // Payload: { index: number, autoPlay?: boolean }
  const autoPlayOnLoadRef = useRef(false);
  useEffect(() => {
    const handler = (e: Event) => {
      const { index, autoPlay } = (e as CustomEvent<{ index: number; autoPlay?: boolean }>).detail;
      if (typeof index === "number" && index >= 0 && index < tracks.length) {
        autoPlayOnLoadRef.current = autoPlay ?? false;
        setCurrentTrackIdx(index);
      }
    };
    window.addEventListener("audioTrackSelect", handler);
    return () => window.removeEventListener("audioTrackSelect", handler);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopProgressLoop();
      howlRef.current?.unload();
    };
  }, [stopProgressLoop]);

  const handlePlayPause = () => {
    if (!howlRef.current) {
      loadTrack(currentTrack);
      return;
    }
    if (isPlaying) {
      howlRef.current.pause();
      setIsPlaying(false);
      stopProgressLoop();
    } else {
      howlRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (howlRef.current) {
      howlRef.current.seek(val);
      setProgress(val);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    howlRef.current?.volume(val);
  };

  const handlePrev = () => {
    setCurrentTrackIdx((idx) => (idx - 1 + tracks.length) % tracks.length);
  };

  const handleNext = () => {
    setCurrentTrackIdx((idx) => (idx + 1) % tracks.length);
  };

  const progressPct = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 select-none"
          role="region"
          aria-label="Music player"
        >
          <div className="bg-surface/40 backdrop-blur-xl border-t border-white/10">
            {/* Expanded seek row */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 pt-3 overflow-hidden"
                >
                  <div className="flex items-center gap-3 text-xs font-mono text-cream/50">
                    <span className="w-8 text-right">{formatTime(progress)}</span>
                    <input
                      type="range"
                      min={0}
                      max={duration || currentTrack.duration}
                      step={0.1}
                      value={progress}
                      onChange={handleSeek}
                      className="flex-1 h-1 accent-gold cursor-pointer"
                      aria-label="Track progress"
                    />
                    <span className="w-8">{formatTime(duration || currentTrack.duration)}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main player row */}
            <div className="flex items-center gap-4 px-4 py-4 max-w-screen-lg mx-auto">
              {/* Track info */}
              <button
                onClick={() => setIsExpanded((v) => !v)}
                className="flex-1 min-w-0 text-left"
                aria-expanded={isExpanded}
                aria-label="Toggle player details"
              >
                <div className="flex items-center gap-3">
                  {/* Waveform indicator */}
                  <div className="flex items-end gap-0.5 h-5 w-5 shrink-0">
                    {[0.4, 1, 0.6, 0.9, 0.5].map((h, i) => (
                      <span
                        key={i}
                        className="w-0.5 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: isPlaying ? "#D4A853" : "rgba(245,240,235,0.3)",
                          height: `${h * 100}%`,
                          animation: isPlaying ? `waveform-pulse 0.8s ease-in-out ${i * 0.1}s infinite alternate` : "none",
                        }}
                      />
                    ))}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-display text-cream truncate leading-tight">
                      {currentTrack.title}
                    </p>
                    <p className="text-xs text-cream/40 truncate">
                      {hasError ? "Audio not yet available" : currentTrack.credits ?? currentTrack.description}
                    </p>
                  </div>
                </div>
              </button>

              {/* Controls */}
              <div className="flex items-center gap-2 shrink-0">
                {/* Prev */}
                <button
                  onClick={handlePrev}
                  className="p-1.5 text-cream/50 hover:text-cream transition-colors"
                  aria-label="Previous track"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                    <path d="M1 2h1.5v10H1zm2 5l9.5-5.5v11L3 7z" />
                  </svg>
                </button>

                {/* Play/Pause — primary CTA */}
                <button
                  onClick={handlePlayPause}
                  disabled={isLoading}
                  className="w-9 h-9 rounded-full bg-transparent border-2 border-google-blue/70 flex items-center justify-center hover:border-google-blue transition-colors disabled:opacity-50 animate-blue-glow"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isLoading ? (
                    <span className="w-3 h-3 border border-google-blue/60 border-t-transparent rounded-full animate-spin" />
                  ) : isPlaying ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="rgba(245,240,235,0.9)">
                      <rect x="2" y="1" width="3" height="10" />
                      <rect x="7" y="1" width="3" height="10" />
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="rgba(245,240,235,0.9)">
                      <path d="M2 1l9 5-9 5V1z" />
                    </svg>
                  )}
                </button>

                {/* Next */}
                <button
                  onClick={handleNext}
                  className="p-1.5 text-cream/50 hover:text-cream transition-colors"
                  aria-label="Next track"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                    <path d="M11.5 2H13v10h-1.5zm-1 5L1 1.5v11L10.5 7z" />
                  </svg>
                </button>

                {/* Volume */}
                <div className="relative">
                  <button
                    onClick={() => setShowVolume((v) => !v)}
                    className="p-1.5 text-cream/50 hover:text-cream transition-colors"
                    aria-label="Volume"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                      {volume === 0 ? (
                        <path d="M1 4h3l4-3v12l-4-3H1V4zm9 0l2 3-2 3" />
                      ) : (
                        <path d="M1 4h3l4-3v12l-4-3H1V4zm9.5 0a4 4 0 010 6M8.5 2a7 7 0 010 10" />
                      )}
                    </svg>
                  </button>
                  <AnimatePresence>
                    {showVolume && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute bottom-10 right-0 bg-surface-elevated border border-white/10 rounded-lg p-3 shadow-xl"
                      >
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.05}
                          value={volume}
                          onChange={handleVolume}
                          className="h-20 accent-gold cursor-pointer"
                          style={{ writingMode: "vertical-lr", direction: "rtl" }}
                          aria-label="Volume level"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Act indicator */}
                <span className="hidden sm:block text-xs font-mono text-cream/30 ml-1">
                  ACT {currentTrack.act}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
