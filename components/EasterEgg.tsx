/**
 * EasterEgg — reusable easter egg wrapper
 *
 * Supports three reveal patterns:
 *   "hover"  — tooltip content appears on hover over children
 *   "hidden" — visually hidden but in DOM (screen readers + page source)
 *   "inline" — visible gold mono text
 *
 * Easter eggs are registered in lib/easter-eggs.ts for QA tracking.
 */
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface EasterEggProps {
  mode: "hover" | "hidden" | "inline";
  content: string;
  children?: React.ReactNode;
  className?: string;
  "data-easter-egg"?: string;
}

export default function EasterEgg({
  mode,
  content,
  children,
  className,
  "data-easter-egg": eggId,
}: EasterEggProps) {
  const [visible, setVisible] = useState(false);

  if (mode === "hidden") {
    return (
      <span
        className="sr-only"
        data-easter-egg={eggId}
        aria-hidden="true"
      >
        {content}
      </span>
    );
  }

  if (mode === "hover") {
    return (
      <span
        className={cn("relative inline-block", className)}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        data-easter-egg={eggId}
      >
        {children}
        {visible && (
          <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-surface border border-gold/30 text-gold font-mono text-xs px-3 py-1.5 rounded pointer-events-none z-50">
            {content}
          </span>
        )}
      </span>
    );
  }

  // inline
  return (
    <span
      className={cn("text-gold/60 font-mono text-xs", className)}
      data-easter-egg={eggId}
    >
      {content}
    </span>
  );
}
