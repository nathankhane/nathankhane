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
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  // One-cycle pulse: mark done after ~1.5s
  useEffect(() => {
    const t = setTimeout(() => setPulseDone(true), 1500);
    return () => clearTimeout(t);
  }, []);

  // Easter Egg #13 — listen for Cmd+K search overlay submissions
  useEffect(() => {
    const handler = (e: Event) => {
      const { query } = (e as CustomEvent<{ query: string }>).detail;
      // Ensure the sidebar is visible even if the hero animation hasn't completed
      document.getElementById("persistent-ui")?.classList.remove("hero-hidden");
      setSearchQuery(query);
      setOpen(true);
    };
    window.addEventListener("nate:search", handler);
    return () => window.removeEventListener("nate:search", handler);
  }, []);

  // Hero CTA — "click me to speak to Nate!"
  useEffect(() => {
    const handler = () => {
      document.getElementById("persistent-ui")?.classList.remove("hero-hidden");
      setOpen(true);
    };
    window.addEventListener("nate:open-agent", handler);
    return () => window.removeEventListener("nate:open-agent", handler);
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
        className="fixed bottom-[104px] right-6 z-50 h-11 px-4 rounded-full bg-transparent border border-google-blue/50 text-cream/70 flex items-center gap-2.5 hover:text-cream hover:border-google-blue/80 transition-colors focus-visible:outline-none animate-blue-glow"
        animate={pulseDone ? {} : { scale: [1, 1.06, 1] }}
        transition={pulseDone ? {} : { duration: 1.2, ease: "easeInOut", times: [0, 0.5, 1] }}
      >
        <span
          className="text-sm leading-none select-none shrink-0"
          style={{ filter: "drop-shadow(0 0 4px rgba(236,72,153,0.9)) drop-shadow(0 0 10px rgba(236,72,153,0.5))" }}
          aria-hidden="true"
        >
          🧠
        </span>
        <span className="font-mono text-[11px] tracking-wide whitespace-nowrap">
          Ask AI Nate something...
        </span>
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
              /* Desktop: slide from right. Mobile: slide up from bottom as sheet */
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open:   { x: 0, y: 0 },
                closed: {
                  x: typeof window !== "undefined" && window.innerWidth < 640 ? 0 : "100%",
                  y: typeof window !== "undefined" && window.innerWidth < 640 ? "100%" : 0,
                },
              }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed z-50 flex flex-col
                         top-0 right-0 bottom-0 w-full max-w-md
                         bg-surface/60 backdrop-blur-xl
                         border-l border-white/[0.08]
                         shadow-[inset_1px_0_0_rgba(255,255,255,0.04),-24px_0_48px_rgba(0,0,0,0.5)]
                         sm:w-[420px]
                         max-sm:top-auto max-sm:left-0 max-sm:right-0 max-sm:bottom-0 max-sm:w-full max-sm:max-w-none max-sm:rounded-t-2xl max-sm:border-l-0 max-sm:border-t max-sm:border-white/10 max-sm:max-h-[82vh]"
              /* Override slide direction on mobile via CSS — keeps JS simple */
            >
              {/* Inset top highlight — same depth cue as AudioPlayer */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent shrink-0" aria-hidden="true" />

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07] shrink-0">
                <div>
                  <p className="text-xs font-mono text-google-blue/60 tracking-[0.15em] uppercase">Just Ask</p>
                  <p className="text-sm font-display text-cream mt-0.5">Nate&apos;s AI Brain</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="w-8 h-8 flex items-center justify-center rounded-full text-cream/60 hover:text-cream hover:bg-white/5 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Chat area */}
              <div className="flex-1 overflow-y-auto min-h-0">
                <div className="px-4 py-4 h-full">
                  <ChatInterface
                    initialQuery={searchQuery}
                    onInitialQueryConsumed={() => setSearchQuery(null)}
                  />
                </div>
              </div>

              {/* Brain icon — dead space between chat and footer */}
              <div className="shrink-0 flex items-center justify-center py-3 border-t border-white/[0.04]">
                <span
                  className="text-2xl select-none leading-none"
                  style={{ filter: "drop-shadow(0 0 6px rgba(236,72,153,0.9)) drop-shadow(0 0 16px rgba(236,72,153,0.5))" }}
                  aria-hidden="true"
                >
                  🧠
                </span>
              </div>

              {/* Footer links */}
              <div className="px-5 py-4 border-t border-white/[0.07] shrink-0">
                <p className="text-[10px] font-mono text-cream/70 tracking-widest uppercase mb-3 text-center">
                  Find Nate
                </p>
                <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5">
                  {sidebarLinks.map(({ label, href }, idx) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-cream/60 hover:text-google-blue transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.04 }}
                      whileHover={{ x: 2 }}
                    >
                      {label}
                    </motion.a>
                  ))}
                  <motion.a
                    href="/resume"
                    className="text-xs font-mono text-cream/60 hover:text-google-blue transition-colors"
                    whileHover={{ x: 2 }}
                  >
                    Resume ↓
                  </motion.a>
                  <motion.a
                    href="mailto:nathan@nathankhane.com"
                    className="text-xs font-mono text-cream/60 hover:text-google-blue transition-colors"
                    whileHover={{ x: 2 }}
                  >
                    Email
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
