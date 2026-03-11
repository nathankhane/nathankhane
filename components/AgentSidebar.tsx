/**
 * AgentSidebar — Floating AI agent entry point
 *
 * A 56px gold circle button fixed bottom-right (above AudioPlayer).
 * On click: slides in a panel from the right (desktop) or bottom (mobile).
 * Panel contains the full ChatInterface.
 * Easter Egg #8: "Just Ask" — direct callback to the Ted ad campaign name.
 *
 * Pulse animation fires once on first load, then the button is static.
 */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatInterface from "@/components/ChatInterface";
import { SOCIAL_LINKS } from "@/lib/social-links";

const SIDEBAR_LABELS = ["TikTok", "LinkedIn", "Substack", "YouTube"] as const;
const sidebarLinks = SIDEBAR_LABELS.map((label) =>
  SOCIAL_LINKS.find((l) => l.label === label)
).filter((link): link is (typeof SOCIAL_LINKS)[number] => Boolean(link));

export default function AgentSidebar() {
  const [open, setOpen] = useState(false);
  const [pulseDone, setPulseDone] = useState(false);

  // One-cycle pulse: mark done after ~1.5s
  useEffect(() => {
    const t = setTimeout(() => setPulseDone(true), 1500);
    return () => clearTimeout(t);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Floating Action Button ─────────────────────────────────────── */}
      <motion.button
        onClick={() => setOpen(true)}
        aria-label="Chat with Nate's AI agent"
        data-easter-egg="just-ask"
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-gold text-ink flex items-center justify-center shadow-lg shadow-gold/20 hover:bg-gold/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        /* One-cycle pulse on mount */
        animate={pulseDone ? {} : { scale: [1, 1.18, 1] }}
        transition={pulseDone ? {} : { duration: 1.2, ease: "easeInOut", times: [0, 0.5, 1] }}
      >
        {/* Chat bubble icon */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* ── Backdrop ──────────────────────────────────────────────── */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/* ── Panel — desktop: right slide-in / mobile: bottom sheet ─ */}
            <motion.div
              key="panel"
              role="dialog"
              aria-modal="true"
              aria-label="Ask Nate's AI agent"
              /* Desktop: slide from right */
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-surface border-l border-white/10 flex flex-col shadow-2xl
                         sm:w-[420px]
                         max-sm:top-auto max-sm:left-0 max-sm:right-0 max-sm:bottom-0 max-sm:w-full max-sm:max-w-none max-sm:rounded-t-2xl max-sm:border-l-0 max-sm:border-t max-sm:border-white/10"
              style={{ maxHeight: "100dvh" }}
              /* Override slide direction on mobile via CSS — keeps JS simple */
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
                <div>
                  <p className="text-xs font-mono text-gold/60 tracking-[0.15em] uppercase">Just Ask</p>
                  <p className="text-sm font-display text-cream mt-0.5">Nate&apos;s AI agent</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="w-8 h-8 flex items-center justify-center rounded-full text-cream/40 hover:text-cream hover:bg-white/5 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Chat area */}
              <div className="flex-1 overflow-y-auto min-h-0">
                <div className="px-4 py-4 h-full">
                  <ChatInterface />
                </div>
              </div>

              {/* Footer links */}
              <div className="px-5 py-4 border-t border-white/10 shrink-0">
                <p className="text-[10px] font-mono text-cream/20 tracking-widest uppercase mb-3 text-center">
                  Find Nate
                </p>
                <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5">
                  {sidebarLinks.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-cream/35 hover:text-gold transition-colors"
                    >
                      {label}
                    </a>
                  ))}
                  <a
                    href="/resume.pdf"
                    download
                    className="text-xs font-mono text-cream/35 hover:text-gold transition-colors"
                  >
                    Resume ↓
                  </a>
                  <a
                    href="mailto:nathan@nathankhane.com"
                    className="text-xs font-mono text-cream/35 hover:text-gold transition-colors"
                  >
                    Email
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
