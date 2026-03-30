"use client";

/**
 * FirstVisitHint — one-time onboarding pill
 *
 * Shows "Drag to explore. Scroll to zoom." on first visit.
 * Auto-dismisses after 3 seconds.
 * Persisted in localStorage — never shows again after dismissal.
 * Dismissed immediately on any canvas interaction (handled by parent
 * calling onDismiss on the first pan/zoom/click event).
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "inspirations-hint-dismissed";

interface FirstVisitHintProps {
  /** Parent can call this to force-dismiss on first canvas interaction */
  onMountDismiss?: (dismiss: () => void) => void;
}

export default function FirstVisitHint({ onMountDismiss }: FirstVisitHintProps) {
  const [visible, setVisible] = useState(false);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // localStorage may be unavailable in some contexts — fail silently
    }
  }

  useEffect(() => {
    // Only show if not previously dismissed
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }

    setVisible(true);

    // Expose dismiss to parent for interaction-triggered dismissal
    onMountDismiss?.(dismiss);

    // Auto-dismiss after 3 seconds
    const timer = setTimeout(dismiss, 3000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-36 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
          aria-live="polite"
          role="status"
        >
          <div className="bg-surface-elevated border border-white/10 rounded-full px-5 py-2.5 shadow-navy-md">
            <p className="font-mono text-[12px] text-cream/50 uppercase tracking-widest whitespace-nowrap">
              Drag to explore &nbsp;·&nbsp; Scroll to zoom
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
