"use client";

/**
 * HeroHotspotLayer — interactive overlays on the final hero frame
 *
 * Rendered only after heroDone=true (scroll animation complete).
 * Each hotspot is an absolutely-positioned transparent div traced to
 * the floating 3D object in the final WebP frame.
 *
 * Coordinate system: viewport percentages (left, top, width, height).
 * The frame is center-cropped to fill the viewport on desktop, so
 * percentage positions map 1:1 from the 1928×1072 source frame.
 *
 * Objects and destinations:
 *   Saxophone      → /#maker       (AudioEngineer section)
 *   Treble clef    → /#maker       (AudioEngineer section)
 *   Pen/quill      → Substack      (external)
 *   Film reel      → /#social      (SocialArchitect section)
 *   Basketball     → /#social      (SocialArchitect section)
 *   Curly braces   → GitHub        (external)
 *   Laptop         → /#systems     (SystemsArchitect section)
 *   Microphone     → AI sidebar    (dispatches nate:search)
 */

import { useState } from "react";
import { motion, AnimatePresence, type Easing } from "framer-motion";
import Link from "next/link";

// ── Hotspot types ──────────────────────────────────────────────────────────

type HotspotBase = {
  id: string;
  label: string;
  /** left, top, width, height as viewport percentages */
  bounds: { l: number; t: number; w: number; h: number };
};

type NavHotspot = HotspotBase & {
  kind: "nav";
  href: string;
};

type ExternalHotspot = HotspotBase & {
  kind: "external";
  href: string;
};

type AgentHotspot = HotspotBase & {
  kind: "agent";
  tooltip: string;
};

type Hotspot = NavHotspot | ExternalHotspot | AgentHotspot;

// ── Hotspot definitions ────────────────────────────────────────────────────
// Positions measured from the final hero frame (frame 12, 1928×1072).
// left/top/width/height are viewport % (0–100).

const HOTSPOTS: Hotspot[] = [
  {
    id: "saxophone",
    label: "Music",
    kind: "nav",
    href: "/#maker",
    bounds: { l: 6, t: 10, w: 17, h: 40 },
  },
  {
    id: "treble-clef",
    label: "Music",
    kind: "nav",
    href: "/#maker",
    bounds: { l: 19, t: 38, w: 18, h: 30 },
  },
  {
    id: "pen",
    label: "Writing",
    kind: "external",
    href: "https://nathankhane.substack.com",
    bounds: { l: 6, t: 42, w: 18, h: 30 },
  },
  {
    id: "film-reel",
    label: "TikTok",
    kind: "nav",
    href: "/#social",
    bounds: { l: 78, t: 5, w: 18, h: 34 },
  },
  {
    id: "basketball",
    label: "Founders Basketball",
    kind: "nav",
    href: "/#social",
    bounds: { l: 55, t: 31, w: 20, h: 31 },
  },
  {
    id: "brackets",
    label: "GitHub",
    kind: "external",
    href: "https://github.com/nathankhane",
    bounds: { l: 73, t: 28, w: 20, h: 38 },
  },
  {
    id: "laptop",
    label: "Business Ventures",
    kind: "nav",
    href: "/#systems",
    bounds: { l: 66, t: 52, w: 26, h: 32 },
  },
  {
    id: "microphone",
    label: "Ask AI Nate",
    kind: "agent",
    tooltip: "psst... ask nate's AI a question about him 💭",
    bounds: { l: 57, t: 2, w: 14, h: 28 },
  },
];

// ── Component ──────────────────────────────────────────────────────────────

export default function HeroHotspotLayer() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  function fireAgent() {
    // Ensure sidebar is visible even if hero-hidden was still on
    document.getElementById("persistent-ui")?.classList.remove("hero-hidden");
    window.dispatchEvent(
      new CustomEvent("nate:search", { detail: { query: "" } })
    );
  }

  return (
    <div
      className="absolute inset-0 z-20 pointer-events-none"
      aria-label="Hero interactive elements"
    >
      {HOTSPOTS.map((spot, i) => (
        <HotspotItem
          key={spot.id}
          spot={spot}
          index={i}
          hovered={hoveredId === spot.id}
          onHover={(id) => setHoveredId(id)}
          onFireAgent={fireAgent}
        />
      ))}
    </div>
  );
}

// ── Individual hotspot ─────────────────────────────────────────────────────

function HotspotItem({
  spot,
  index,
  hovered,
  onHover,
  onFireAgent,
}: {
  spot: Hotspot;
  index: number;
  hovered: boolean;
  onHover: (id: string | null) => void;
  onFireAgent: () => void;
}) {
  const { bounds } = spot;

  const style: React.CSSProperties = {
    position: "absolute",
    left: `${bounds.l}%`,
    top: `${bounds.t}%`,
    width: `${bounds.w}%`,
    height: `${bounds.h}%`,
    pointerEvents: "auto",
  };

  const ease: Easing = "easeOut";
  const sharedMotion = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5, delay: 0.1 + index * 0.08, ease },
  };

  // Hover ring: blue glow outline (interactive signal)
  const ringStyle: React.CSSProperties = hovered
    ? {
        boxShadow:
          "0 0 0 2px rgba(66,133,244,0.7), 0 0 20px rgba(66,133,244,0.3)",
        borderRadius: "12px",
      }
    : { borderRadius: "12px" };

  const interactiveClasses =
    "absolute inset-0 pointer-events-auto rounded-[12px] transition-all duration-200";

  // ── Agent (microphone) — special tooltip behavior ──
  if (spot.kind === "agent") {
    return (
      <motion.div style={style} {...sharedMotion}>
        {/* Tooltip above */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute bottom-[105%] left-1/2 -translate-x-1/2 pointer-events-none z-30 whitespace-nowrap"
            >
              <div className="bg-surface-elevated border border-google-blue/30 rounded-full px-4 py-2 shadow-navy-md">
                <p className="font-mono text-[11px] text-cream/80 tracking-wide">
                  {spot.tooltip}
                </p>
              </div>
              {/* Small downward triangle */}
              <div
                className="w-2 h-2 bg-surface-elevated border-r border-b border-google-blue/30 rotate-45 mx-auto -mt-1"
                style={{ marginTop: "-5px" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          className={interactiveClasses}
          style={ringStyle}
          aria-label="Ask AI Nate a question"
          onMouseEnter={() => onHover(spot.id)}
          onMouseLeave={() => onHover(null)}
          onClick={onFireAgent}
        />
      </motion.div>
    );
  }

  // ── External link ──
  if (spot.kind === "external") {
    return (
      <motion.div style={style} {...sharedMotion}>
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute bottom-[105%] left-1/2 -translate-x-1/2 pointer-events-none z-30 whitespace-nowrap"
            >
              <div className="bg-surface-elevated border border-cream/20 rounded-full px-3 py-1.5 shadow-navy-md">
                <p className="font-mono text-[11px] text-cream/80 tracking-wide">{spot.label}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <a
          href={spot.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={spot.label}
          className={interactiveClasses}
          style={ringStyle}
          onMouseEnter={() => onHover(spot.id)}
          onMouseLeave={() => onHover(null)}
        />
      </motion.div>
    );
  }

  // ── Internal nav link ──
  return (
    <motion.div style={style} {...sharedMotion}>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute bottom-[105%] left-1/2 -translate-x-1/2 pointer-events-none z-30 whitespace-nowrap"
          >
            <div className="bg-surface-elevated border border-cream/20 rounded-full px-3 py-1.5 shadow-navy-md">
              <p className="font-mono text-[11px] text-cream/80 tracking-wide">{spot.label}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Link
        href={spot.href}
        aria-label={spot.label}
        className={interactiveClasses}
        style={ringStyle}
        onMouseEnter={() => onHover(spot.id)}
        onMouseLeave={() => onHover(null)}
      />
    </motion.div>
  );
}
