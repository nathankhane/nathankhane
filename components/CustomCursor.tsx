/**
 * CustomCursor — Animated cursor for mouse devices only
 *
 * - Small cream dot that follows the cursor tightly (fast spring physics)
 * - Ring tracks the dot via rAF lerp loop (direct DOM, zero React re-renders)
 * - On hover over interactive elements: dot hides, ring expands + turns blue
 * - On click: both elements briefly scale down
 * - Only renders on pointer: fine devices (never on touch/mobile)
 * - cursor: none applied via globals.css @media (pointer: fine)
 *
 * Performance notes:
 * - Dot uses useSpring with high stiffness (900) for fast, near-instant tracking
 * - Ring uses rAF lerp (factor 0.12) writing directly to DOM — no Framer overhead
 * - Both elements use will-change: transform for GPU compositor promotion
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE =
  "button, a, input, textarea, select, label, [role='button'], [tabindex='0']";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function CustomCursor() {
  const [isFine, setIsFine] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Dot — tight spring follower
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const dotSpring = { damping: 30, stiffness: 900, mass: 0.2 };
  const dotX = useSpring(mouseX, dotSpring);
  const dotY = useSpring(mouseY, dotSpring);

  // Ring — rAF lerp (direct DOM, no React)
  const ringRef = useRef<HTMLDivElement>(null);
  const ringPos = useRef({ x: -100, y: -100 });
  const targetPos = useRef({ x: -100, y: -100 });
  const isPointerRef = useRef(false);
  const isVisibleRef = useRef(false);
  const isClickedRef = useRef(false);
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setIsFine(true);

    const onMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      mouseX.set(x);
      mouseY.set(y);
      targetPos.current = { x, y };

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      const hit = !!(e.target as Element).closest(INTERACTIVE);
      if (hit !== isPointerRef.current) {
        isPointerRef.current = hit;
        setIsPointer(hit);
      }
    };

    const onDown = () => {
      isClickedRef.current = true;
      setIsClicked(true);
      setTimeout(() => {
        isClickedRef.current = false;
        setIsClicked(false);
      }, 150);
    };

    const onLeave = () => { isVisibleRef.current = false; setIsVisible(false); };
    const onEnter = () => { isVisibleRef.current = true; setIsVisible(true); };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    // Ring rAF loop — writes directly to DOM, zero React re-renders
    const tick = () => {
      const ring = ringRef.current;
      if (ring) {
        const lf = 0.12; // lerp factor: 0 = instant, 1 = static
        ringPos.current.x = lerp(ringPos.current.x, targetPos.current.x, lf);
        ringPos.current.y = lerp(ringPos.current.y, targetPos.current.y, lf);

        const { x, y } = ringPos.current;
        const size = isPointerRef.current ? 36 : 20;
        const opacity = isVisibleRef.current ? 1 : 0;
        const scale = isClickedRef.current ? 0.85 : 1;
        const borderColor = isPointerRef.current
          ? "rgba(66,133,244,0.75)"
          : "rgba(245,240,235,0.2)";

        ring.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0) scale(${scale})`;
        ring.style.width = `${size}px`;
        ring.style.height = `${size}px`;
        ring.style.opacity = String(opacity);
        ring.style.borderColor = borderColor;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafId.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isFine) return null;

  return (
    <>
      {/* Dot — spring follower via Framer Motion */}
      <motion.div
        aria-hidden="true"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
        animate={{
          opacity: isVisible && !isPointer ? 1 : 0,
          scale: isClicked ? 0.5 : 1,
        }}
        transition={{ opacity: { duration: 0.15 }, scale: { duration: 0.1 } }}
        className="fixed top-0 left-0 z-[1000001] w-2 h-2 rounded-full bg-cream/80 pointer-events-none"
      />

      {/* Ring — rAF lerp, direct DOM updates */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[1000000] rounded-full border pointer-events-none"
        style={{
          willChange: "transform",
          contain: "layout style",
          transition: "width 0.18s cubic-bezier(0.16,1,0.3,1), height 0.18s cubic-bezier(0.16,1,0.3,1), border-color 0.18s ease, opacity 0.15s ease",
          transform: "translate3d(-100px,-100px,0)",
          width: "20px",
          height: "20px",
          opacity: 0,
          borderColor: "rgba(245,240,235,0.2)",
        }}
      />
    </>
  );
}
