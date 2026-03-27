/**
 * GoogleableWord — Easter Egg #14
 *
 * Wraps a word or phrase with a hover tooltip "Google it →" and a subtle
 * Google-blue underline. Clicking opens google.com/search?q=[word] in a new tab.
 *
 * Intentionally minimal — don't overuse. Sprinkle on 3-5 key terms site-wide.
 */
"use client";

import { useState } from "react";

interface Props {
  children: string;
  className?: string;
}

export default function GoogleableWord({ children, className = "" }: Props) {
  const [hover, setHover] = useState(false);

  const handleClick = () => {
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(children)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <span className={`relative inline-block ${className}`}>
      <span
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleClick}
        role="link"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
        aria-label={`Google search: ${children}`}
        className="cursor-pointer transition-all duration-200"
        style={{
          borderBottom: `1px solid ${hover ? "rgba(66,133,244,0.7)" : "rgba(66,133,244,0)"}`,
          transition: "border-color 0.2s ease",
        }}
      >
        {children}
      </span>

      {hover && (
        <span
          aria-hidden="true"
          className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono bg-surface-elevated border border-white/10 text-cream/70 px-2 py-1 rounded-lg z-20 pointer-events-none shadow-lg"
        >
          Google it →
        </span>
      )}
    </span>
  );
}
