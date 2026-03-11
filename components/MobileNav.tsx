/**
 * MobileNav — minimal dark mobile menu
 *
 * Portal architecture (renders in document.body) for z-index isolation.
 * Dark-only, no theme toggle. Minimal nav links for fellowship site.
 * Smooth slide-in/out with Framer Motion.
 */
"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/social-links";

const MOBILE_NAV_SOCIAL_LABELS = ["TikTok", "LinkedIn", "YouTube"] as const;
const mobileNavSocialLinks = MOBILE_NAV_SOCIAL_LABELS.map((label) =>
  SOCIAL_LINKS.find((l) => l.label === label)
).filter(Boolean);

const NAV_LINKS = [
  { href: "#origin",    label: "Origin" },
  { href: "#maker",     label: "The Maker" },
  { href: "#curator",   label: "Taste" },
  { href: "#google",    label: "Why Google" },
  { href: "#agent",     label: "Just Ask" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <div className="w-5 h-4 flex flex-col justify-between">
      <motion.span
        animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        className="block h-px bg-cream origin-left"
        transition={{ duration: 0.25 }}
      />
      <motion.span
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        className="block h-px bg-cream"
        transition={{ duration: 0.15 }}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        className="block h-px bg-cream origin-left"
        transition={{ duration: 0.25 }}
      />
    </div>
  );
}

function MobileNavPortal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-ink/80 backdrop-blur-sm"
            style={{ zIndex: 999998 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-72 bg-surface border-l border-white/10 flex flex-col pt-20 pb-8 px-8"
            style={{ zIndex: 999999 }}
            role="navigation"
            aria-label="Mobile navigation"
          >
            <ul className="space-y-2 flex-1">
              {NAV_LINKS.map(({ href, label }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={href}
                    onClick={onClose}
                    className="block py-3 text-xl font-display text-cream/70 hover:text-cream transition-colors border-b border-white/5"
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Footer in nav */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="space-y-3"
            >
              <p className="text-xs font-mono text-cream/30 uppercase tracking-widest">
                Business Is Poetry
              </p>
              <div className="flex gap-4">
                {mobileNavSocialLinks.map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cream/40 hover:text-gold transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="relative z-50 p-2 rounded-md hover:bg-white/5 transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <MenuIcon open={isOpen} />
      </button>

      {mounted && <MobileNavPortal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  );
}
