/**
 * CustomCursor — Animated cursor for mouse devices only
 *
 * - Small cream dot that follows the cursor tightly (spring physics)
 * - On hover over interactive elements: dot hides, blue ring appears
 * - On click: ring briefly scales down
 * - Only renders on pointer: fine devices (never on touch/mobile)
 * - cursor: none applied via globals.css @media (pointer: fine)
 */
"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE =
  "button, a, input, textarea, select, label, [role='button'], [tabindex='0']";

export default function CustomCursor() {
  const [isFine, setIsFine] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 600, mass: 0.4 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only activate on mouse-pointer devices
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setIsFine(true);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as Element;
      setIsPointer(!!target.closest(INTERACTIVE));
    };

    const onDown = () => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 150);
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isFine) return null;

  return (
    <>
      {/* Dot — tight follower, hidden when over interactive */}
      <motion.div
        aria-hidden="true"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: isVisible && !isPointer ? 1 : 0,
          scale: isClicked ? 0.5 : 1,
        }}
        transition={{ opacity: { duration: 0.15 }, scale: { duration: 0.1 } }}
        className="fixed top-0 left-0 z-[1000001] w-2 h-2 rounded-full bg-cream/80 pointer-events-none"
      />

      {/* Ring — appears on interactive hover */}
      <motion.div
        aria-hidden="true"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicked ? 0.85 : 1,
          width: isPointer ? 36 : 20,
          height: isPointer ? 36 : 20,
          borderColor: isPointer
            ? "rgba(66, 133, 244, 0.75)"
            : "rgba(245, 240, 235, 0.2)",
        }}
        transition={{
          opacity: { duration: 0.15 },
          scale: { duration: 0.1 },
          width: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
          height: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
          borderColor: { duration: 0.2 },
        }}
        className="fixed top-0 left-0 z-[1000000] rounded-full border pointer-events-none"
      />
    </>
  );
}
