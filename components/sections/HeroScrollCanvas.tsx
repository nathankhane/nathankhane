/**
 * HeroScrollCanvas — Act 1, Section 1
 *
 * Reversed scroll animation: starts on normal Nate (frame 383), brain opens
 * and elements emerge as user scrolls to frame 12 (full glow).
 *
 * Frame assets: 383 WebP frames at 1928×1072, motion-interpolated to 48fps
 * from the original 24fps source. 2× smoother scrubbing, full native resolution.
 *
 * Text is visible immediately on load, drifts apart as user scrolls.
 * Frame 383 is priority-loaded so the canvas shows Nate right away.
 */
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroHotspotLayer from "./HeroHotspotLayer";

const TOTAL_FRAMES = 383;
const FRAME_PATH = (n: number) =>
  `/hero-frames/frame-${String(n).padStart(3, "0")}.webp`;

// Reversed playback: scroll starts on normal Nate (frame 383), ends on full glow (frame 12).
// Frames 1–11 (indices 0–10) are pre-glow/dull — never rendered.
// At 48fps, original frame 6 (index 5) ≈ new frame 12 (index 11).
const FRAME_END_IDX   = 382; // 0-indexed = frame 383 = normal Nate (start of scroll)
const FRAME_START_IDX = 11;  // 0-indexed = frame 12 = first fully-glowing frame (end of scroll)
const EFFECTIVE_FRAMES = FRAME_END_IDX - FRAME_START_IDX; // 371

const T_DONE = 0.995;    // unlock persistent UI (AudioPlayer, AgentSidebar)
const T_HOTSPOT_SHOW = 0.62; // items emerge from brain — show hotspot layer
const T_HOTSPOT_HIDE = 0.52; // hysteresis: hide hotspots only when scrolled well back

// Linear interpolation for scroll-exit animations
// Returns `from` when p <= start, `to` when p >= end, linear in between
const exitVal = (p: number, start: number, end: number, from: number, to: number) =>
  p <= start ? from : p >= end ? to : from + (to - from) * ((p - start) / (end - start));

export default function HeroScrollCanvas() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(FRAME_END_IDX);
  const heroDoneRef = useRef(false);
  const [heroDone, setHeroDone] = useState(false); // mirrors heroDoneRef for React render
  const [heartVisible, setHeartVisible] = useState(false);

  const loadedCountRef = useRef(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false); // hides black screen
  const [allLoaded, setAllLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0); // 0–1, drives text exit
  const [scrollLocked, setScrollLocked] = useState(true);
  const failsafeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Draw a single frame to canvas ──────────────────────────────────────────
  const drawFrame = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.width / dpr;   // logical width
    const ch = canvas.height / dpr;  // logical height

    ctx.clearRect(0, 0, cw, ch);

    const isMobilePortrait = ch > cw;

    if (isMobilePortrait) {
      const zoomFactor = 1.5;
      const scale = (cw / img.naturalWidth) * zoomFactor;
      const drawW = img.naturalWidth * scale;
      const drawH = img.naturalHeight * scale;
      const dx = (cw - drawW) / 2;
      const dy = (ch - drawH) / 2;
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, dx, dy, drawW, drawH);
    } else {
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = cw / ch;
      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
      if (imgAspect > canvasAspect) {
        sw = img.naturalHeight * canvasAspect;
        sx = (img.naturalWidth - sw) / 2;
      } else {
        sh = img.naturalWidth / canvasAspect;
        sy = (img.naturalHeight - sh) / 2;
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
    }
  }, []);

  // ── Resize canvas (HiDPI-aware) ─────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const logicalW = window.innerWidth;
      const logicalH = window.innerHeight;
      canvas.width  = logicalW * dpr;
      canvas.height = logicalH * dpr;
      canvas.style.width  = logicalW + "px";
      canvas.style.height = logicalH + "px";
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const img = imagesRef.current[currentFrameRef.current];
      if (img) drawFrame(img);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [drawFrame]);

  // ── Priority-load frame 193 first, then load remaining 192 frames ──────────
  // Frame 193 (FRAME_END_IDX) is the starting frame (normal Nate portrait).
  // Drawing it immediately eliminates the black screen on first load.
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES) as HTMLImageElement[];

    // Priority: load the starting frame first
    const startImg = new Image();
    startImg.src = FRAME_PATH(FRAME_END_IDX + 1); // frame 193
    startImg.onload = () => {
      images[FRAME_END_IDX] = startImg;
      imagesRef.current = images;
      currentFrameRef.current = FRAME_END_IDX;
      drawFrame(startImg);
      setFirstFrameLoaded(true);
    };
    images[FRAME_END_IDX] = startImg;

    // Load remaining frames in batches of 20 to avoid saturating the connection pool
    const BATCH_SIZE = 20;
    const remaining = Array.from({ length: TOTAL_FRAMES }, (_, k) => k + 1)
      .filter(i => i !== FRAME_END_IDX + 1);
    let queueIdx = 0;

    function loadNextBatch() {
      const batch = remaining.slice(queueIdx, queueIdx + BATCH_SIZE);
      queueIdx += BATCH_SIZE;
      let batchDone = 0;
      batch.forEach((frameNum) => {
        const img = new Image();
        img.src = FRAME_PATH(frameNum);
        img.onload = () => {
          images[frameNum - 1] = img;
          loadedCountRef.current += 1;
          const n = loadedCountRef.current;
          if (n % 10 === 0 || n === TOTAL_FRAMES - 1) {
            setLoadProgress(Math.round((n / (TOTAL_FRAMES - 1)) * 100));
          }
          if (n === TOTAL_FRAMES - 1) setAllLoaded(true);
          if (++batchDone === batch.length && queueIdx < remaining.length) loadNextBatch();
        };
        images[frameNum - 1] = img;
      });
    }
    loadNextBatch();
    imagesRef.current = images;
  }, [drawFrame]);

  // ── Scroll lock — prevent scrolling until all frames are loaded ────────────
  // Failsafe at 15s ensures the user is never permanently trapped.
  useEffect(() => {
    document.body.style.overflow = "hidden";

    failsafeRef.current = setTimeout(() => {
      document.body.style.overflow = "";
      setScrollLocked(false);
    }, 15000);

    return () => {
      document.body.style.overflow = "";
      if (failsafeRef.current) clearTimeout(failsafeRef.current);
    };
  }, []);

  useEffect(() => {
    if (!allLoaded) return;
    if (failsafeRef.current) clearTimeout(failsafeRef.current);
    document.body.style.overflow = "";
    setScrollLocked(false);
  }, [allLoaded]);

  // ── Show/hide persistent UI ─────────────────────────────────────────────────
  useEffect(() => {
    const el = document.getElementById("persistent-ui");
    el?.classList.add("hero-hidden");
    return () => el?.classList.remove("hero-hidden");
  }, []);

  // ── GSAP ScrollTrigger ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!allLoaded) return;

    gsap.registerPlugin(ScrollTrigger);
    drawFrame(imagesRef.current[FRAME_END_IDX]);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=220%",
        pin: true,
        scrub: 0.3,
        onUpdate: (self) => {
          const p = self.progress;
          // Reversed: p=0 → frame 193 (normal Nate), p=1 → frame 6 (full glow)
          const idx = FRAME_END_IDX - Math.floor(p * EFFECTIVE_FRAMES);
          if (idx !== currentFrameRef.current) {
            currentFrameRef.current = idx;
            drawFrame(imagesRef.current[idx]);
          }

          setScrollProgress(p);

          // Show hotspot layer when items emerge from brain
          if (p >= T_HOTSPOT_SHOW && !heroDoneRef.current) {
            heroDoneRef.current = true;
            setHeroDone(true);
          }
          // Hide hotspot layer only when scrolled well back past emergence point
          if (p < T_HOTSPOT_HIDE && heroDoneRef.current) {
            heroDoneRef.current = false;
            setHeroDone(false);
          }

          // Persistent UI (AudioPlayer, AgentSidebar) unlocks at near-end
          if (p >= T_DONE) {
            document.getElementById("persistent-ui")?.classList.remove("hero-hidden");
          }
        },
        onLeave: () => {
          heroDoneRef.current = true;
          setHeroDone(true);
          document.getElementById("persistent-ui")?.classList.remove("hero-hidden");
        },
        onEnterBack: () => {
          // Re-hide persistent UI as user scrolls back through hero
          // Hotspot visibility is handled by onUpdate thresholds above
          document.getElementById("persistent-ui")?.classList.add("hero-hidden");
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [allLoaded, drawFrame]);

  // Instant transition for scroll-linked animations (no spring lag)
  const scrollTransition = { duration: 0.05, ease: "linear" as const };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-[100dvh] overflow-hidden"
      aria-label="Hero — Scroll to reveal"
    >
      {/* Canvas — frame renderer. pointer-events-none so hotspot layer above receives clicks. */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          maskImage:
            "radial-gradient(ellipse 85% 80% at 50% 50%, black 35%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 80% at 50% 50%, black 35%, transparent 100%)",
        }}
      />

      {/* Mobile-only fade overlays */}
      <div aria-hidden="true" className="sm:hidden absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10" style={{ background: "linear-gradient(to top, #0A0E17 0%, transparent 100%)" }} />
      <div aria-hidden="true" className="sm:hidden absolute top-0 left-0 bottom-0 w-12 pointer-events-none z-10" style={{ background: "linear-gradient(to right, #0A0E17 0%, transparent 100%)" }} />
      <div aria-hidden="true" className="sm:hidden absolute top-0 right-0 bottom-0 w-12 pointer-events-none z-10" style={{ background: "linear-gradient(to left, #0A0E17 0%, transparent 100%)" }} />

      {/* Loading bar — before first frame draws */}
      {!firstFrameLoaded && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-30">
          <div className="w-32 h-px bg-cream/10 overflow-hidden rounded-full">
            <div className="h-full bg-google-blue/40 transition-all duration-150" style={{ width: `${loadProgress}%` }} />
          </div>
        </div>
      )}

      {/* Loading indicator — visible once face draws, until all frames loaded */}
      {scrollLocked && firstFrameLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-30"
        >
          <div className="w-40 h-px bg-cream/10 overflow-hidden rounded-full">
            <div
              className="h-full bg-google-blue/60 rounded-full transition-all duration-300"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p className="font-mono text-[9px] text-cream/30 tracking-[0.25em] uppercase">
            Loading experience — {loadProgress}%
          </p>
        </motion.div>
      )}

      {/* ── DESKTOP text overlay — right-aligned, visible from load, exits on scroll ── */}
      <div className="hidden sm:flex absolute right-8 md:right-14 lg:right-20 top-1/2 -translate-y-1/2 z-20 pointer-events-none flex-col items-end gap-4 md:gap-5">
        <motion.p
          animate={{
            opacity: firstFrameLoaded ? exitVal(scrollProgress, 0.05, 0.22, 1, 0) : 0,
            y: exitVal(scrollProgress, 0.05, 0.22, 0, -30),
            x: exitVal(scrollProgress, 0.05, 0.22, 0, 20),
          }}
          transition={scrollTransition}
          className="font-display-hero text-5xl md:text-6xl text-cream leading-none text-right"
        >
          this is Nate.
        </motion.p>
        <div
          className="relative pointer-events-auto"
          onMouseEnter={() => setHeartVisible(true)}
          onMouseLeave={() => setHeartVisible(false)}
        >
          <motion.p
            animate={{
              opacity: firstFrameLoaded ? exitVal(scrollProgress, 0.12, 0.30, 1, 0) : 0,
              y: exitVal(scrollProgress, 0.12, 0.30, 0, -24),
              x: exitVal(scrollProgress, 0.12, 0.30, 0, -16),
            }}
            transition={scrollTransition}
            className="text-2xl font-display-hero text-cream/80 text-right leading-snug"
          >
            Nate was born on Valentine&apos;s Day, 2000.
          </motion.p>
          <AnimatePresence>
            {heartVisible && (
              <motion.span
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 1, 1, 0], y: -28 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -top-2 right-0 pointer-events-none select-none text-lg"
                aria-hidden="true"
              >
                ❤
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <motion.p
          animate={{
            opacity: firstFrameLoaded ? exitVal(scrollProgress, 0.20, 0.38, 1, 0) : 0,
            y: exitVal(scrollProgress, 0.20, 0.38, 0, 20),
            x: exitVal(scrollProgress, 0.20, 0.38, 0, 24),
          }}
          transition={scrollTransition}
          className="text-base font-mono tracking-wide text-right max-w-sm"
          style={{ color: "rgba(155,89,208,0.9)", textShadow: "0 0 8px rgba(155,89,208,0.8), 0 0 20px rgba(155,89,208,0.5), 0 0 40px rgba(155,89,208,0.25)" }}
        >
          The year Google became the world&apos;s most-used search engine.
        </motion.p>
        <motion.div
          animate={{
            opacity: firstFrameLoaded ? exitVal(scrollProgress, 0.28, 0.45, 1, 0) : 0,
            y: exitVal(scrollProgress, 0.28, 0.45, 0, 16),
          }}
          transition={scrollTransition}
          className="flex items-center gap-2 font-mono text-xs text-cream/70 pointer-events-auto cursor-pointer hover:text-cream/90 transition-colors"
          onClick={() => window.dispatchEvent(new CustomEvent("nate:open-search"))}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && window.dispatchEvent(new CustomEvent("nate:open-search"))}
          aria-label="Open search"
        >
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-google-blue opacity-60" />
            <span className="w-2 h-2 rounded-full bg-google-red opacity-60" />
            <span className="w-2 h-2 rounded-full bg-google-yellow opacity-60" />
            <span className="w-2 h-2 rounded-full bg-google-green opacity-60" />
          </div>
          <span>search begins here</span>
          <span className="cursor-blink" data-easter-egg="cursor-blink-530ms" aria-hidden="true" />
        </motion.div>
        <motion.button
          animate={{
            opacity: firstFrameLoaded ? exitVal(scrollProgress, 0.32, 0.48, 1, 0) : 0,
            y: exitVal(scrollProgress, 0.32, 0.48, 0, 12),
          }}
          transition={scrollTransition}
          className="font-mono text-xs text-cream/40 hover:text-gold/70 transition-colors text-right tracking-wide cursor-pointer"
          onClick={() => window.dispatchEvent(new CustomEvent("nate:open-agent"))}
          aria-label="Open chat with Nate"
        >
          ↗ click me to speak to Nate!
        </motion.button>
      </div>

      {/* ── MOBILE top text ── */}
      <div className="sm:hidden absolute top-0 left-0 right-0 z-20 pointer-events-none flex flex-col items-center justify-center text-center px-8 gap-3" style={{ height: "28%" }}>
        <motion.p
          animate={{
            opacity: firstFrameLoaded ? exitVal(scrollProgress, 0.05, 0.22, 1, 0) : 0,
            y: exitVal(scrollProgress, 0.05, 0.22, 0, -20),
          }}
          transition={scrollTransition}
          className="font-display-hero text-4xl text-cream leading-tight"
        >
          this is Nate.
        </motion.p>
        <motion.p
          animate={{
            opacity: firstFrameLoaded ? exitVal(scrollProgress, 0.12, 0.30, 1, 0) : 0,
            y: exitVal(scrollProgress, 0.12, 0.30, 0, -16),
          }}
          transition={scrollTransition}
          className="font-display-hero text-lg text-cream/80 leading-snug"
        >
          Nate was born on Valentine&apos;s Day, 2000.
        </motion.p>
      </div>

      {/* ── MOBILE bottom text ── */}
      <div className="sm:hidden absolute bottom-0 left-0 right-0 z-20 pointer-events-none flex flex-col items-center justify-center text-center px-8 gap-3" style={{ height: "26%", paddingBottom: "5rem" }}>
        <motion.p
          animate={{
            opacity: firstFrameLoaded ? exitVal(scrollProgress, 0.20, 0.38, 1, 0) : 0,
            y: exitVal(scrollProgress, 0.20, 0.38, 0, 16),
          }}
          transition={scrollTransition}
          className="font-mono text-sm tracking-wide"
          style={{ color: "rgba(155,89,208,0.9)", textShadow: "0 0 8px rgba(155,89,208,0.8), 0 0 20px rgba(155,89,208,0.5), 0 0 40px rgba(155,89,208,0.25)" }}
        >
          The year Google became the world&apos;s most-used search engine.
        </motion.p>
        <motion.div
          animate={{
            opacity: firstFrameLoaded ? exitVal(scrollProgress, 0.28, 0.45, 1, 0) : 0,
            y: exitVal(scrollProgress, 0.28, 0.45, 0, 12),
          }}
          transition={scrollTransition}
          className="flex items-center gap-2 font-mono text-xs text-cream/70 pointer-events-auto cursor-pointer hover:text-cream/90 transition-colors"
          onClick={() => window.dispatchEvent(new CustomEvent("nate:open-search"))}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && window.dispatchEvent(new CustomEvent("nate:open-search"))}
          aria-label="Open search"
        >
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-google-blue opacity-60" />
            <span className="w-2 h-2 rounded-full bg-google-red opacity-60" />
            <span className="w-2 h-2 rounded-full bg-google-yellow opacity-60" />
            <span className="w-2 h-2 rounded-full bg-google-green opacity-60" />
          </div>
          <span>search begins here</span>
        </motion.div>
        <motion.button
          animate={{
            opacity: firstFrameLoaded ? exitVal(scrollProgress, 0.32, 0.48, 1, 0) : 0,
            y: exitVal(scrollProgress, 0.32, 0.48, 0, 8),
          }}
          transition={scrollTransition}
          className="font-mono text-xs text-cream/40 hover:text-gold/70 transition-colors tracking-wide cursor-pointer"
          onClick={() => window.dispatchEvent(new CustomEvent("nate:open-agent"))}
          aria-label="Open chat with Nate"
        >
          ↗ click me to speak to Nate!
        </motion.button>
      </div>

      {/* ── Scroll CTA — glowing blue arrow, left side, vertically centered ── */}
      <motion.div
        animate={{
          opacity: firstFrameLoaded && !scrollLocked && scrollProgress < 0.06 ? 1 : 0,
          y: firstFrameLoaded && !scrollLocked && scrollProgress < 0.06 ? 0 : 8,
        }}
        transition={{
          duration: 0.9,
          delay: firstFrameLoaded && !scrollLocked && scrollProgress < 0.01 ? 1.2 : 0,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 flex flex-row items-center gap-3 z-10 pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="font-mono text-sm font-bold tracking-[0.3em] text-cream/80 uppercase select-none"
          style={{ textShadow: "0 0 20px rgba(245,240,235,0.3)" }}
        >
          Scroll Slowwwly
        </span>

        {/* Glowing blue down arrow — bounces softly */}
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
        >
          <svg width="26" height="32" viewBox="0 0 18 22" fill="none" aria-hidden="true">
            <path
              d="M9 2v14M2 11l7 9 7-9"
              stroke="rgba(66,133,244,1)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                filter:
                  "drop-shadow(0 0 6px rgba(66,133,244,0.9)) drop-shadow(0 0 14px rgba(66,133,244,0.5))",
              }}
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* ── Interactive hotspot layer — appears after hero animation completes ── */}
      {heroDone && <HeroHotspotLayer />}
    </section>
  );
}
