"use client";

/**
 * InspirationModal — tile detail overlay
 *
 * Overlays the full viewport including the canvas.
 * Backdrop click + Escape key close the modal.
 * Focus is trapped inside for accessibility.
 *
 * Content varies by tile type:
 *   instagram_caption → full caption + date + optional source link
 *   quote             → quote + attribution + Nathan's context
 *   poetry            → full poem with preserved line breaks + author
 *   writing_short     → full text
 *   writing_long      → parsed title + excerpt + Substack button
 *   stoic             → maxim + attribution + Nathan's interpretation
 */

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type {
  InspirationTile,
  InspirationContentType,
} from "@/types/inspirations";

// ── Props ──────────────────────────────────────────────────────────────────

interface InspirationModalProps {
  tile: InspirationTile;
  onClose: () => void;
}

// ── Date formatting ────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

// ── Type labels (for modal header) ────────────────────────────────────────

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

// ── Component ──────────────────────────────────────────────────────────────

export default function InspirationModal({ tile, onClose }: InspirationModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus close button on mount
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  // Escape key closes modal
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Trap focus within modal
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    function handleTabKey(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const focusable = modal!.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, []);

  // Typography for modal body text (matches tile typography)
  const bodyFont =
    tile.type === "writing_short" || tile.type === "writing_long"
      ? "font-sans"
      : tile.type === "stoic"
      ? "font-mono"
      : tile.type === "poetry"
      ? "font-display-timeline italic"
      : "font-display-timeline";

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[300] bg-ink/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal card */}
      <motion.div
        key="modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${TYPE_LABELS[tile.type]} detail`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
        className={cn(
          "fixed z-[301] inset-x-4 bottom-0 sm:inset-auto sm:top-1/2 sm:left-1/2",
          "sm:-translate-x-1/2 sm:-translate-y-1/2",
          "w-auto sm:w-full sm:max-w-[480px]",
          "bg-surface-elevated rounded-t-2xl sm:rounded-2xl",
          "border border-white/10 shadow-navy-lg",
          "p-7 pb-safe",
          "max-h-[85vh] overflow-y-auto",
        )}
        // Prevent backdrop click from firing when clicking inside modal
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header row: type label + close button */}
        <div className="flex items-center justify-between mb-5">
          <span className="font-mono text-[11px] uppercase tracking-widest text-cream/30">
            {TYPE_LABELS[tile.type]}
          </span>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close"
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
              "text-cream/40 hover:text-cream/80",
              "hover:bg-white/5 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
            )}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className={bodyFont}>
          <ModalBody tile={tile} />
        </div>

        {/* Date */}
        {tile.content.date && (
          <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-cream/25">
            {formatDate(tile.content.date)}
          </p>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// ── Body renderers per type ────────────────────────────────────────────────

function ModalBody({ tile }: { tile: InspirationTile }) {
  switch (tile.type) {
    case "instagram_caption":
      return (
        <>
          <p className="text-[18px] leading-[1.75] text-cream/90">
            {tile.content.text}
          </p>
          {tile.content.context && (
            <p className="mt-5 text-[14px] leading-[1.65] font-sans text-cream/50">
              {tile.content.context}
            </p>
          )}
          {tile.content.url && (
            <a
              href={tile.content.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block font-mono text-[12px] uppercase tracking-widest text-gold/70 hover:text-gold transition-colors"
            >
              View on Instagram ↗
            </a>
          )}
        </>
      );

    case "quote":
      return (
        <>
          <p className="text-[20px] leading-[1.65] text-cream/90">
            &ldquo;{tile.content.text}&rdquo;
          </p>
          {tile.content.attribution && (
            <p className="mt-4 font-sans text-[12px] uppercase tracking-widest text-cream/40">
              — {tile.content.attribution}
            </p>
          )}
          {tile.content.context && (
            <p className="mt-6 font-sans text-[14px] leading-[1.65] text-cream/50">
              {tile.content.context}
            </p>
          )}
        </>
      );

    case "poetry":
      return (
        <>
          <p className="text-[17px] leading-[1.9] text-cream/90 whitespace-pre-line text-center">
            {tile.content.text}
          </p>
          {tile.content.attribution && (
            <p className="mt-5 font-sans text-[12px] uppercase tracking-widest text-cream/40 text-center">
              — {tile.content.attribution}
            </p>
          )}
          {tile.content.context && (
            <p className="mt-6 font-sans text-[14px] leading-[1.65] text-cream/50 text-left">
              {tile.content.context}
            </p>
          )}
        </>
      );

    case "stoic":
      return (
        <>
          {tile.content.attribution && (
            <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-gold/60">
              {tile.content.attribution}
            </p>
          )}
          <p className="text-[16px] leading-[1.7] text-cream/90">
            {tile.content.text}
          </p>
          {tile.content.context && (
            <p className="mt-6 font-sans text-[14px] leading-[1.65] text-cream/50">
              {tile.content.context}
            </p>
          )}
        </>
      );

    case "writing_short":
      return (
        <p className="text-[15px] leading-[1.7] text-cream/85">
          {tile.content.text}
        </p>
      );

    case "writing_long": {
      const title = tile.content.context.split(" — ")[0].trim();
      const contextNote = tile.content.context.split(" — ").slice(1).join(" — ").trim();
      return (
        <>
          <p className="text-[20px] font-semibold leading-snug text-cream/90 mb-3">
            {title}
          </p>
          <p className="text-[15px] leading-[1.7] text-cream/70">
            {tile.content.text}
          </p>
          {contextNote && (
            <p className="mt-4 text-[13px] leading-[1.6] text-cream/40">
              {contextNote}
            </p>
          )}
          {tile.content.url && (
            <a
              href={tile.content.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "mt-6 inline-flex items-center gap-2",
                "px-4 py-2.5 rounded-lg",
                "bg-gold/10 border border-gold/20",
                "font-mono text-[12px] uppercase tracking-widest text-gold/80 hover:text-gold hover:bg-gold/15",
                "transition-colors",
              )}
            >
              Read on Substack ↗
            </a>
          )}
        </>
      );
    }

    default:
      return (
        <p className="text-[15px] leading-[1.7] text-cream/85">
          {tile.content.text}
        </p>
      );
  }
}
