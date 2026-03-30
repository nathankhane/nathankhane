"use client";

/**
 * InspirationTile — individual canvas tile
 *
 * Absolutely positioned within the 4000×3000 canvas container.
 * Position (0,0) in tile data = canvas center (canvasOrigin).
 *
 * Typography map:
 *   instagram_caption / quote  → Cormorant Garamond (.font-display-timeline)
 *   poetry                     → Cormorant Garamond italic
 *   writing_short / long       → Outfit (font-sans)
 *   stoic                      → Google Sans Code (font-mono)
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type {
  InspirationTile as InspirationTileData,
  TileSize,
  InspirationContentType,
} from "@/types/inspirations";

// ── Constants ──────────────────────────────────────────────────────────────

const TILE_WIDTHS: Record<TileSize, number> = {
  small: 160,
  medium: 240,
  large: 340,
};

const TILE_PADDING: Record<TileSize, string> = {
  small: "p-4",
  medium: "p-5",
  large: "p-6",
};

const TYPE_LABELS: Record<InspirationContentType, string> = {
  instagram_caption: "instagram caption",
  tweet: "tweet",
  pinterest: "pinterest",
  quote: "philosophy",
  poetry: "poetry",
  writing_short: "writing",
  writing_long: "essay",
  stoic: "stoic maxim",
};

// ── Props ──────────────────────────────────────────────────────────────────

interface InspirationTileProps {
  tile: InspirationTileData;
  /** Framer Motion entry delay in seconds (stagger from center outward) */
  staggerDelay: number;
  /** CSS pixel coordinates of the canvas center in the inner container */
  canvasOrigin: { x: number; y: number };
  onSelect: (tile: InspirationTileData) => void;
}

// ── Component ──────────────────────────────────────────────────────────────

export default function InspirationTile({
  tile,
  staggerDelay,
  canvasOrigin,
  onSelect,
}: InspirationTileProps) {
  const [hovered, setHovered] = useState(false);

  const width = TILE_WIDTHS[tile.display.size];
  const padding = TILE_PADDING[tile.display.size];

  // Typography: serif for editorial types, sans for writing, mono for stoic
  const fontClass =
    tile.type === "writing_short" || tile.type === "writing_long"
      ? "font-sans"
      : tile.type === "stoic"
      ? "font-mono"
      : tile.type === "poetry"
      ? "font-display-timeline italic"
      : "font-display-timeline"; // quote, instagram_caption → Cormorant Garamond

  // Base card background
  const bgClass =
    tile.type === "stoic" ? "bg-surface" : "bg-surface-elevated";

  // instagram_caption: truncate at 140 chars (PRD §3.2.2)
  const displayText =
    tile.type === "instagram_caption" && tile.content.text.length > 140
      ? tile.content.text.slice(0, 140).trimEnd() + "…"
      : tile.content.text;

  // Shadow values match .shadow-navy-sm / .shadow-navy-lg from globals.css
  const shadow = hovered
    ? "0 8px 32px rgba(10, 14, 23, 0.7)" // shadow-navy-lg
    : "0 2px 8px rgba(10, 14, 23, 0.6)"; // shadow-navy-sm

  return (
    <motion.article
      role="button"
      tabIndex={0}
      aria-label={`${TYPE_LABELS[tile.type]}: ${tile.content.text.slice(0, 60)}`}
      // Entry animation: stagger from center outward
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: staggerDelay }}
      // Hover lift — Framer Motion handles scale, CSS handles shadow
      whileHover={{ scale: 1.03 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(tile);
        }
      }}
      onClick={() => onSelect(tile)}
      style={{
        position: "absolute",
        left: canvasOrigin.x + tile.display.position.x,
        top: canvasOrigin.y + tile.display.position.y,
        width,
        rotate: tile.display.rotation, // Framer Motion combines this with whileHover scale
        transformOrigin: "center center",
        boxShadow: shadow,
        // CSS transition for shadow only; Framer Motion owns scale
        transition: "box-shadow 200ms cubic-bezier(0.2, 0, 0, 1)",
      }}
      className={cn(
        "relative rounded-xl overflow-hidden select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
        padding,
        bgClass,
        // Stoic left-border accent — gold stripe
        tile.type === "stoic" && "border-l-2 border-gold",
      )}
    >
      {/* ── Warm amber tint overlay (instagram_caption) ── */}
      {tile.type === "instagram_caption" && (
        <div
          className="absolute inset-0 rounded-xl bg-gold pointer-events-none"
          style={{ opacity: 0.07 }}
          aria-hidden="true"
        />
      )}

      {/* ── Cool blue tint overlay (quote) ── */}
      {tile.type === "quote" && (
        <div
          className="absolute inset-0 rounded-xl bg-google-blue pointer-events-none"
          style={{ opacity: 0.06 }}
          aria-hidden="true"
        />
      )}

      {/* ── Content ── */}
      <div className={cn("relative z-10 pb-5", fontClass)}>
        <TileContent tile={tile} displayText={displayText} />
      </div>

      {/* ── Hover: content type label slides in from bottom ── */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute bottom-2 left-3 text-[11px] font-mono text-cream/30 uppercase tracking-widest pointer-events-none z-20"
            aria-hidden="true"
          >
            {TYPE_LABELS[tile.type]}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

// ── Content renderers per type ─────────────────────────────────────────────

function TileContent({
  tile,
  displayText,
}: {
  tile: InspirationTileData;
  displayText: string;
}) {
  switch (tile.type) {
    case "instagram_caption":
      return (
        <p className="text-[17px] leading-[1.7] text-cream/90">{displayText}</p>
      );

    case "quote":
      return (
        <>
          <p className="text-base leading-[1.65] text-cream/90">
            &ldquo;{displayText}&rdquo;
          </p>
          {tile.content.attribution && (
            <p className="mt-3 text-[11px] font-sans uppercase tracking-widest text-cream/40">
              — {tile.content.attribution}
            </p>
          )}
        </>
      );

    case "poetry":
      return (
        <p className="text-[15px] leading-[1.85] text-center text-cream/85 whitespace-pre-line">
          {displayText}
        </p>
      );

    case "stoic":
      return (
        <>
          <p className="text-[13px] leading-[1.65] text-cream/85">{displayText}</p>
          {tile.content.attribution && (
            <p className="mt-2 text-[10px] font-mono uppercase tracking-widest text-cream/40">
              — {tile.content.attribution}
            </p>
          )}
        </>
      );

    case "writing_short":
      return (
        <p className="text-[14px] leading-[1.6] text-cream/80 line-clamp-5">
          {displayText}
        </p>
      );

    case "writing_long": {
      // Title is the first segment of context before " — "
      const title = tile.content.context.split(" — ")[0].trim();
      return (
        <>
          <p className="text-base font-semibold leading-snug text-cream/90 mb-2">
            {title}
          </p>
          <p className="text-[13px] leading-[1.55] text-cream/55 line-clamp-3">
            {displayText}
          </p>
          <p className="mt-3 text-[11px] font-mono text-gold/60 uppercase tracking-widest">
            Read on Substack ↗
          </p>
        </>
      );
    }

    default:
      return <p className="text-sm text-cream/70">{displayText}</p>;
  }
}
