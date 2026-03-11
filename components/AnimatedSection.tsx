/**
 * AnimatedSection — viewport-triggered animation wrapper
 *
 * Reused from V1 with updated easing curves to match V2 editorial motion system.
 * Usage: wrap any block content that should animate on scroll entry.
 *
 * Easing: ease.editorial ([0.16, 1, 0.3, 1]) — expo ease out, feels considered.
 */
"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale";
  duration?: number;
  stagger?: number;
}

const editorialEase = [0.16, 1, 0.3, 1] as const;

function buildVariants(
  direction: string,
  duration: number,
  delay: number,
  stagger: number
): Variants {
  const transition = {
    duration,
    ease: editorialEase,
    ...(delay > 0 && { delay }),
    ...(stagger > 0 && { staggerChildren: stagger }),
  };

  switch (direction) {
    case "up":
      return {
        hidden:  { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0, transition },
      };
    case "down":
      return {
        hidden:  { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition },
      };
    case "left":
      return {
        hidden:  { opacity: 0, x: -28 },
        visible: { opacity: 1, x: 0, transition },
      };
    case "right":
      return {
        hidden:  { opacity: 0, x: 28 },
        visible: { opacity: 1, x: 0, transition },
      };
    case "scale":
      return {
        hidden:  { opacity: 0, scale: 0.94 },
        visible: { opacity: 1, scale: 1, transition },
      };
    default:
      return {
        hidden:  { opacity: 0 },
        visible: { opacity: 1, transition },
      };
  }
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.7,
  stagger = 0,
}: AnimatedSectionProps) {
  const variants = buildVariants(direction, duration, delay, stagger);

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px", amount: 0.1 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
