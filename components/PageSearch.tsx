/**
 * PageSearch — Easter Egg #17
 *
 * Intercepts Cmd+F / Ctrl+F and replaces the browser's native find bar with
 * a Google-styled search widget. Uses window.find() (Chromium-native) to
 * scroll to matches and counts occurrences via bodyText regex.
 *
 * Appears as a floating card in the top-right corner. Escape closes it.
 */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "f") {
        e.preventDefault();
        setOpen(true);
        setQuery("");
        setCount(0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  const doFind = useCallback((term: string, backwards = false) => {
    if (!term) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).find(term, false, backwards, true, false, true, false);
    // window.find() moves browser focus to the matched text — steal it back
    // setTimeout defers until after window.find()'s native focus event fires
    setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    if (!open || !query) { setCount(0); return; }
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const matches = (document.body.innerText || "").match(new RegExp(escaped, "gi"));
    setCount(matches ? matches.length : 0);
    doFind(query);
  }, [query, open, doFind]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-4 right-4 z-[200] w-72"
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Search bar */}
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 border-b border-gray-100">
              <div className="flex items-center gap-[2px] shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-google-blue" />
                <span className="w-1.5 h-1.5 rounded-full bg-google-red" />
                <span className="w-1.5 h-1.5 rounded-full bg-google-yellow" />
                <span className="w-1.5 h-1.5 rounded-full bg-google-green" />
              </div>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find on page…"
                className="flex-1 text-sm text-[#1a1a1a] placeholder-[#9aa0a6] outline-none bg-transparent font-sans min-w-0"
              />
              {query && (
                <span className="text-[11px] text-[#9aa0a6] font-mono shrink-0">
                  {count}
                </span>
              )}
            </div>

            {/* Controls row */}
            <div className="flex items-center justify-between px-3.5 py-1.5 bg-gray-50">
              <span className="text-[11px] text-[#5f6368] font-mono">
                {query
                  ? count > 0
                    ? `${count} result${count !== 1 ? "s" : ""}`
                    : "no results"
                  : "Search this page"}
              </span>
              <div className="flex items-center gap-0.5">
                <button
                  onClick={() => doFind(query, true)}
                  aria-label="Previous result"
                  className="p-1 rounded hover:bg-gray-200 text-[#5f6368] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 14l5-5 5 5H7z" />
                  </svg>
                </button>
                <button
                  onClick={() => doFind(query)}
                  aria-label="Next result"
                  className="p-1 rounded hover:bg-gray-200 text-[#5f6368] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                </button>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="p-1 rounded hover:bg-gray-200 text-[#5f6368] transition-colors ml-1"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
