/**
 * SpaceBackground — Mouse-parallax space background with scroll-linked color tinting
 *
 * G1: Mouse movement pans the background ±35px x / ±22px y with cinematic
 *     spring damping — "camera drifting in zero gravity" feel.
 *     Background oversized 12% so movement never exposes the void.
 *
 * G2: Scroll-linked vertical drift — background slowly rises as user scrolls,
 *     adding a second axis of depth beyond mouse movement.
 *
 * G4: Scroll-linked color overlays:
 *     - Warm red tint builds through ParallelTimeline zone (~15–55% page)
 *     - Google blue ambient emerges at WhyGoogle zone (~75–100% page)
 *
 * Mobile: Falls back to static background (no mouse events on touch devices).
 *
 * Performance: only GPU-accelerated transform/opacity properties are animated.
 */
"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";

export default function SpaceBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Cinematic spring — responsive but weighted, not jittery
  // Reduced damping (45→38) + slightly higher stiffness = more alive, still smooth
  const bgX = useSpring(mouseX, { damping: 38, stiffness: 90, mass: 2.2 });
  const bgY = useSpring(mouseY, { damping: 38, stiffness: 90, mass: 2.2 });

  // Page scroll progress (0 = top, 1 = bottom)
  const { scrollYProgress } = useScroll();

  // Scroll-linked vertical drift: background slowly rises as user scrolls down.
  // Adds depth — like the stars are receding as you move through the narrative.
  const scrollDriftY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  // Combine mouse spring + scroll drift into single y motion value
  const combinedY = useTransform([bgY, scrollDriftY], ([a, b]: number[]) => a + b);

  // Warm red-amber tint: builds through the timeline/spark narrative zone
  const warmTintOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.30, 0.48, 0.62],
    [0,  0,    0.10, 0.10,  0]
  );

  // Google blue ambient: emerges as WhyGoogle section approaches
  const blueTintOpacity = useTransform(
    scrollYProgress,
    [0.68, 0.80, 1.0],
    [0,    0.07, 0.12]
  );

  useEffect(() => {
    // Only activate on pointer:fine devices — skip on mobile/touch
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      // Invert mapping: cursor right → background shifts left (camera pan feel)
      // ±35px x, ±22px y — dramatic but never disorienting
      const x = ((e.clientX / window.innerWidth) - 0.5) * -70;
      const y = ((e.clientY / window.innerHeight) - 0.5) * -44;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* ── Main space background — parallax layer ─────────────────────── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          // Extend 12% beyond every edge — covers the larger ±35px mouse movement
          // plus the 60px scroll drift without ever exposing the void
          top: "-12%",
          left: "-12%",
          right: "-12%",
          bottom: "-12%",
          backgroundImage: "url('/images/space-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -2,
          x: bgX,
          y: combinedY,
          willChange: "transform",
          pointerEvents: "none",
        }}
      />

      {/* ── Warm red-amber tint — peaks through Act 1 timeline zone ──── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          // Radial: warm glow rises from lower-center (narrative warmth)
          background:
            "radial-gradient(ellipse 100% 70% at 50% 80%, rgba(180,55,30,1) 0%, rgba(160,60,20,0.6) 30%, transparent 70%)",
          opacity: warmTintOpacity,
          pointerEvents: "none",
        }}
      />

      {/* ── Google blue ambient — emerges as Act 3 approaches ──────────── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          // Radial: blue glow descends from top-center (Google's arrival)
          background:
            "radial-gradient(ellipse 90% 55% at 50% 0%, rgba(66,133,244,1) 0%, rgba(66,133,244,0.4) 40%, transparent 70%)",
          opacity: blueTintOpacity,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
