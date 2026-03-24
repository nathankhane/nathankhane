/**
 * lib/animations.ts — Editorial animation system (V2)
 *
 * Replaces retro-animations.ts (V1, archived in /archive/v1/lib/).
 * Design principle: motion that feels cinematic, not decorative.
 * Slow, deliberate reveals — editorial magazine energy.
 */
import { type Variants } from "framer-motion";

// ── Easing curves ────────────────────────────────────────────────────────
export const ease = {
  smooth:    [0.25, 0.46, 0.45, 0.94] as const,
  editorial: [0.16, 1, 0.3, 1] as const,   // expo ease out — feels considered
  spring:    [0.34, 1.56, 0.64, 1] as const,
  slow:      [0.43, 0.13, 0.23, 0.96] as const,
} as const;

// ── Core variants ────────────────────────────────────────────────────────

/** Simple opacity fade */
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: ease.smooth } },
};

/** Fade up — primary reveal for section content */
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.editorial } },
};

/** Fade down — for elements entering from above */
export const fadeDown: Variants = {
  hidden:  { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.smooth } },
};

/** Scale in — for cards and callouts */
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: ease.editorial } },
};

/** Slide in from left */
export const slideLeft: Variants = {
  hidden:  { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: ease.editorial } },
};

/** Slide in from right */
export const slideRight: Variants = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: ease.editorial } },
};

/**
 * Stagger children — wrap a parent element, children animate sequentially.
 * Usage: <motion.div variants={staggerChildren}> <motion.p variants={fadeUp}>
 */
export const staggerChildren: Variants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

/** Stagger with longer delay — for section entrances */
export const staggerSlow: Variants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
};

/** Text line reveal — word/line stagger for hero text */
export const textReveal: Variants = {
  hidden:  { opacity: 0, y: 20, skewY: 1 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.8, ease: ease.editorial },
  },
};

/** Page-level transition — used between acts */
export const pageTransition: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease: ease.slow } },
  exit:    { opacity: 0, transition: { duration: 0.6, ease: ease.slow } },
};

/** Parallax helper — returns style object for scroll-linked transforms */
export function parallaxStyle(y: number | string) {
  return { y };
}

/**
 * Spring card hover — use with Framer Motion whileHover.
 * Replaces CSS transition-all with spring physics (taste-skill).
 * Usage: <motion.div whileHover={springHover}>
 */
export const springHover = {
  scale: 1.015,
  transition: { type: "spring" as const, stiffness: 400, damping: 25 },
};

/**
 * Spring dot pulse — for timeline highlighted dots entering viewport.
 * Usage: <motion.div variants={dotPulse} initial="hidden" whileInView="visible">
 */
export const dotPulse: Variants = {
  hidden:  { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 18 },
  },
};
