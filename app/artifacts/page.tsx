"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArtifactBrainFull from "@/components/ArtifactBrainFull";
import AudioArtifact from "@/components/AudioArtifact";

const BOOT_LINES = [
  "Initializing nathankhane artifacts...",
  "Loading AI Brain — Gemini 2.5 Flash",
  "Mounting audio artifact: The_Business_Is_Poetry_Thesis.m4a",
  "Connecting frequency visualizer...",
  "System ready.",
];

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= BOOT_LINES.length) {
        clearInterval(interval);
        setTimeout(onComplete, 400);
      }
    }, 320);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-[#09090F] flex items-center justify-center z-50"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="font-mono text-xs space-y-1.5 max-w-sm w-full px-6">
        {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={i === visibleLines - 1 ? "text-google-blue/80" : "text-[#F5F0EB]/25"}
          >
            <span className="text-google-blue/40 mr-2">›</span>
            {line}
            {i === visibleLines - 1 && (
              <span className="ml-1 inline-block w-1.5 h-3 bg-google-blue/60 align-middle animate-pulse" />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function ArtifactsPage() {
  const [booted, setBooted] = useState(false);
  const handleBootComplete = useCallback(() => setBooted(true), []);

  return (
    <div className="min-h-screen bg-[#09090F] text-[#F5F0EB] flex flex-col">
      <AnimatePresence>
        {!booted && <BootSequence key="boot" onComplete={handleBootComplete} />}
      </AnimatePresence>

      {booted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col flex-1 min-h-screen"
        >
          {/* Top bar */}
          <header className="shrink-0 px-6 py-4 border-b border-white/[0.06] flex items-center justify-center relative">
            <div className="flex items-center gap-3">
              <span className="text-base leading-none select-none" aria-hidden="true">🔮</span>
              <span className="text-[10px] font-mono text-[#F5F0EB]/40 tracking-[0.25em] uppercase">
                Artifacts · Nathan Khane Morales
              </span>
              <a
                href="https://nathankhane.com"
                className="text-[10px] font-mono text-[#F5F0EB]/30 hover:text-[#4285F4] transition-colors tracking-wide"
              >
                nathankhane.com ↗
              </a>
            </div>
          </header>

          {/* Main split layout */}
          <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Section A — AI Brain (60%) */}
            <section
              className="flex flex-col lg:w-[60%] p-6 lg:overflow-hidden border-b lg:border-b-0 lg:border-r border-white/[0.06] min-h-[60vh] lg:min-h-0 lg:h-[calc(100vh-57px)]"
              aria-label="AI Brain"
            >
              <ArtifactBrainFull />
            </section>

            {/* Section B — The Khane Protocol (40%) */}
            <section
              className="flex flex-col lg:w-[40%] p-6 min-h-[50vh] lg:min-h-0 lg:h-[calc(100vh-57px)]"
              aria-label="The Khane Protocol"
            >
              <AudioArtifact />
            </section>
          </main>
        </motion.div>
      )}
    </div>
  );
}
