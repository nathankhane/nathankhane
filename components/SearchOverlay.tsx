/**
 * SearchOverlay — Easter Egg #13
 *
 * Cmd+K (Mac) / Ctrl+K (Windows) opens a Google-styled search bar overlay.
 * Submitting a query closes the overlay and fires a "nate:search" custom event,
 * which AgentSidebar listens for to open and pre-fill the chat.
 */
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchOverlay() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery("");
      }
      if (e.key === "Escape") setOpen(false);
    };
    const openHandler = () => {
      setOpen(true);
      setQuery("");
    };
    document.addEventListener("keydown", handler);
    window.addEventListener("nate:open-search", openHandler);
    return () => {
      document.removeEventListener("keydown", handler);
      window.removeEventListener("nate:open-search", openHandler);
    };
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setOpen(false);
    window.dispatchEvent(new CustomEvent("nate:search", { detail: { query: q } }));
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[200] bg-ink/75 backdrop-blur-sm flex items-start justify-center pt-[18vh]"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl mx-6"
          >
            <form onSubmit={submit}>
              <div className="flex items-center gap-4 bg-white rounded-3xl px-5 py-4 shadow-2xl">
                {/* Google color dots — mini G logo */}
                <div className="flex items-center gap-[2px] shrink-0">
                  <span className="w-2 h-2 rounded-full bg-google-blue" />
                  <span className="w-2 h-2 rounded-full bg-google-red" />
                  <span className="w-2 h-2 rounded-full bg-google-yellow" />
                  <span className="w-2 h-2 rounded-full bg-google-green" />
                </div>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search Nate's Brain…"
                  className="flex-1 text-[#1a1a1a] text-base placeholder-[#9aa0a6] outline-none bg-transparent font-sans"
                />
                {query && (
                  <button
                    type="submit"
                    aria-label="Search"
                    className="shrink-0 text-google-blue"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19 15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    </svg>
                  </button>
                )}
              </div>
            </form>

            <p className="mt-3 text-center text-[11px] font-mono text-cream/40 tracking-wide">
              Routes to AI Nate · <kbd className="text-cream/50 bg-white/5 px-1 py-0.5 rounded text-[10px]">esc</kbd> to close
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
