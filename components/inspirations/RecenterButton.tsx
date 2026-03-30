"use client";

/**
 * RecenterButton — floating canvas control
 *
 * Fixed bottom-right, outside TransformWrapper so it's always at the
 * same viewport position regardless of pan/zoom state.
 * Smoothly resets the canvas to the initial centered view on click.
 */

import { motion } from "framer-motion";

interface RecenterButtonProps {
  onRecenter: () => void;
}

export default function RecenterButton({ onRecenter }: RecenterButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={onRecenter}
      aria-label="Return to center"
      title="Return to center"
      className={[
        // Position: bottom-right, above AudioPlayer (which is ~60px from bottom)
        "fixed bottom-24 right-4 z-40",
        // Sizing: minimum 44×44 touch target
        "w-11 h-11 rounded-full",
        // Appearance
        "bg-surface-elevated border border-white/10",
        "flex items-center justify-center",
        // Focus
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
        // Shadow
        "shadow-navy-md",
      ].join(" ")}
      style={{
        // Safe area: account for iOS home bar
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {/* Crosshair / recenter icon */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="text-cream/60"
      >
        {/* Horizontal crosshair */}
        <line x1="1" y1="8" x2="6" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="10" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        {/* Vertical crosshair */}
        <line x1="8" y1="1" x2="8" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8" y1="10" x2="8" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        {/* Center dot */}
        <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      </svg>
    </motion.button>
  );
}
