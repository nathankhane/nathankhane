/**
 * HeroScrollCanvas — Act 1, Section 1
 *
 * Scroll-driven canvas animation: 193 frames at 24fps.
 * GSAP ScrollTrigger pins the section while frames advance on scroll.
 * Text lines stagger in during the final scroll phase, right-aligned.
 * Persistent UI (AudioPlayer + AgentSidebar) is hidden until hero completes.
 */
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TOTAL_FRAMES = 193;
const FRAME_PATH = (n: number) =>
  `/hero-frames/frame-${String(n).padStart(3, "0")}.jpg`;

// Progress thresholds for staggered text reveals
const T1 = 0.68; // "this is Nate."
const T2 = 0.76; // birth date
const T3 = 0.84; // Google year line
const T4 = 0.91; // Google dots + search begins here
const T_DONE = 0.995; // unlock persistent UI

export default function HeroScrollCanvas() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const heroDoneRef = useRef(false);

  const [loadedCount, setLoadedCount] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);
  const [showLine1, setShowLine1] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const [showLine3, setShowLine3] = useState(false);
  const [showDots, setShowDots] = useState(false);

  // ── Draw a single frame to canvas ──────────────────────────────────────────
  // Desktop (landscape): cover-fit — fills viewport, crops excess height/width
  // Mobile (portrait):   contain-fit — fits full image width, letterboxes vertically
  //                      This shows the full 16:9 frame so creative objects are visible
  const drawFrame = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;

    ctx.clearRect(0, 0, cw, ch);

    const isMobilePortrait = ch > cw;

    if (isMobilePortrait) {
      // Balanced mobile fit: 1.5× from contain — shows creative objects around face
      // while keeping face prominent. Crops a little on sides, letterboxes vertically.
      const zoomFactor = 1.5;
      const scale = (cw / img.naturalWidth) * zoomFactor;
      const drawW = img.naturalWidth * scale;
      const drawH = img.naturalHeight * scale;
      const dx = (cw - drawW) / 2; // negative = slight side crop
      const dy = (ch - drawH) / 2; // center vertically, letterbox if needed
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, dx, dy, drawW, drawH);
    } else {
      // Cover-fit: fill canvas, crop excess dimension, center
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

  // ── Resize canvas to match viewport ────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const img = imagesRef.current[currentFrameRef.current];
      if (img) drawFrame(img);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [drawFrame]);

  // ── Preload all frames ──────────────────────────────────────────────────────
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loaded += 1;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) {
          setAllLoaded(true);
          drawFrame(images[0]);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, [drawFrame]);

  // ── Show/hide persistent UI based on whether hero is in viewport ───────────
  useEffect(() => {
    const el = document.getElementById("persistent-ui");
    el?.classList.add("hero-hidden");
    return () => el?.classList.remove("hero-hidden");
  }, []);

  // ── GSAP ScrollTrigger ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!allLoaded) return;

    gsap.registerPlugin(ScrollTrigger);
    drawFrame(imagesRef.current[0]);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=220%",
        pin: true,
        scrub: 0.3,
        onUpdate: (self) => {
          const p = self.progress;
          const idx = Math.min(
            Math.floor(p * (TOTAL_FRAMES - 1)),
            TOTAL_FRAMES - 1
          );
          if (idx !== currentFrameRef.current) {
            currentFrameRef.current = idx;
            drawFrame(imagesRef.current[idx]);
          }

          setShowLine1(p >= T1);
          setShowLine2(p >= T2);
          setShowLine3(p >= T3);
          setShowDots(p >= T4);

          if (p >= T_DONE && !heroDoneRef.current) {
            heroDoneRef.current = true;
            document
              .getElementById("persistent-ui")
              ?.classList.remove("hero-hidden");
          }
        },
        onLeave: () => {
          heroDoneRef.current = true;
          document.getElementById("persistent-ui")?.classList.remove("hero-hidden");
        },
        // Re-hide when user scrolls back up into the hero
        onEnterBack: () => {
          heroDoneRef.current = false;
          document.getElementById("persistent-ui")?.classList.add("hero-hidden");
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [allLoaded, drawFrame]);

  const loadPercent = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-[100dvh] overflow-hidden"
      aria-label="Hero — Scroll to reveal"
    >
      {/* Canvas — frame renderer */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
        style={{
          maskImage:
            "radial-gradient(ellipse 85% 80% at 50% 50%, black 35%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 80% at 50% 50%, black 35%, transparent 100%)",
        }}
      />

      {/* Mobile-only fade overlays — blends letterbox edges into background */}
      {/* Bottom fade: hides the sharp shirt/image bottom edge */}
      <div
        aria-hidden="true"
        className="sm:hidden absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, #0A0E17 0%, transparent 100%)" }}
      />
      {/* Side fades: hides left/right letterbox seams */}
      <div
        aria-hidden="true"
        className="sm:hidden absolute top-0 left-0 bottom-0 w-12 pointer-events-none z-10"
        style={{ background: "linear-gradient(to right, #0A0E17 0%, transparent 100%)" }}
      />
      <div
        aria-hidden="true"
        className="sm:hidden absolute top-0 right-0 bottom-0 w-12 pointer-events-none z-10"
        style={{ background: "linear-gradient(to left, #0A0E17 0%, transparent 100%)" }}
      />

      {/* Loading overlay */}
      {!allLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
          <span className="font-mono text-xs text-cream/40 tracking-[0.25em]">
            {loadPercent}%
          </span>
          <div className="mt-3 w-32 h-px bg-cream/10 overflow-hidden rounded-full">
            <div
              className="h-full bg-gold/60 transition-all duration-150"
              style={{ width: `${loadPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* ── DESKTOP text overlay — right-aligned, hidden on mobile ── */}
      <div className="hidden sm:flex absolute right-8 md:right-14 lg:right-20 top-1/2 -translate-y-1/2 z-20 pointer-events-none flex-col items-end gap-4 md:gap-5">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: showLine1 ? 1 : 0, y: showLine1 ? 0 : 18 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl md:text-6xl text-cream leading-none text-right"
        >
          this is Nate.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: showLine2 ? 1 : 0, y: showLine2 ? 0 : 14 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl font-display text-cream/70 text-right leading-snug"
        >
          Nate was born on Valentine&apos;s Day, 2000.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: showLine3 ? 1 : 0, y: showLine3 ? 0 : 12 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-base font-mono text-gold/80 tracking-wide text-right max-w-sm"
        >
          The year Google became the world&apos;s most-used search engine.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: showDots ? 1 : 0, y: showDots ? 0 : 10 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 font-mono text-xs text-cream/25"
          aria-hidden="true"
        >
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-google-blue opacity-60" />
            <span className="w-2 h-2 rounded-full bg-google-red opacity-60" />
            <span className="w-2 h-2 rounded-full bg-google-yellow opacity-60" />
            <span className="w-2 h-2 rounded-full bg-google-green opacity-60" />
          </div>
          <span>search begins here</span>
          {showDots && <span className="cursor-blink" data-easter-egg="cursor-blink-530ms" aria-hidden="true" />}
        </motion.div>
      </div>

      {/* ── MOBILE top text — fills top letterbox, vertically + horizontally centered ── */}
      <div className="sm:hidden absolute top-0 left-0 right-0 z-20 pointer-events-none flex flex-col items-center justify-center text-center px-8 gap-3" style={{ height: "28%" }}>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: showLine1 ? 1 : 0, y: showLine1 ? 0 : 14 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl text-cream leading-tight"
        >
          this is Nate.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: showLine2 ? 1 : 0, y: showLine2 ? 0 : 10 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-lg text-cream/70 leading-snug"
        >
          Nate was born on Valentine&apos;s Day, 2000.
        </motion.p>
      </div>

      {/* ── MOBILE bottom text — fills bottom letterbox, vertically + horizontally centered ── */}
      <div className="sm:hidden absolute bottom-0 left-0 right-0 z-20 pointer-events-none flex flex-col items-center justify-center text-center px-8 gap-3" style={{ height: "26%", paddingBottom: "5rem" }}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: showLine3 ? 1 : 0, y: showLine3 ? 0 : 10 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-sm text-gold/80 tracking-wide"
        >
          The year Google became the world&apos;s most-used search engine.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: showDots ? 1 : 0, y: showDots ? 0 : 8 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 font-mono text-xs text-cream/25"
          aria-hidden="true"
        >
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-google-blue opacity-60" />
            <span className="w-2 h-2 rounded-full bg-google-red opacity-60" />
            <span className="w-2 h-2 rounded-full bg-google-yellow opacity-60" />
            <span className="w-2 h-2 rounded-full bg-google-green opacity-60" />
          </div>
          <span>search begins here</span>
          {showDots && <span className="cursor-blink" data-easter-egg="cursor-blink-530ms" aria-hidden="true" />}
        </motion.div>
      </div>

      {/* ── Scroll CTA — taste-skill: scroll wheel + "Scroll slowwwly" ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: allLoaded && !showLine1 ? 1 : 0, y: allLoaded && !showLine1 ? 0 : 8 }}
        transition={{ duration: 0.9, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 pointer-events-none"
        aria-hidden="true"
      >
        {/* Scroll wheel housing */}
        <div
          className="relative w-8 h-[52px] rounded-full border-2 border-cream/60 flex justify-center pt-[8px] overflow-hidden"
          style={{ boxShadow: "0 0 16px rgba(212,168,83,0.18), inset 0 0 10px rgba(212,168,83,0.08)" }}
        >
          {/* Bobbing dot */}
          <motion.div
            className="w-1 h-3 rounded-full"
            style={{ background: "rgba(212,168,83,1)" }}
            animate={{ y: [0, 20, 0], opacity: [1, 0.25, 1] }}
            transition={{
              duration: 1.9,
              repeat: Infinity,
              ease: [0.45, 0, 0.55, 1],
              times: [0, 0.6, 1],
            }}
          />
        </div>

        {/* Label */}
        <span
          className="font-mono text-xs font-bold tracking-[0.35em] text-cream/80 uppercase select-none"
          style={{ letterSpacing: "0.35em", textShadow: "0 0 20px rgba(245,240,235,0.4)" }}
        >
          Scroll slowwwly
        </span>
      </motion.div>
    </section>
  );
}
