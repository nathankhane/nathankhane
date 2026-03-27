/**
 * ScrollProgress — Vertical section indicator
 *
 * Fixed on the right side. Shows all section names as dots + labels.
 * Active section is highlighted; clicking a dot scrolls to that section.
 * Hidden during hero scroll (before persistent-ui is shown).
 * Hidden on small screens (mobile).
 */
"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero",     label: "Intro" },
  { id: "parallel", label: "Timeline" },
  { id: "spark",    label: "The Spark" },
  { id: "maker",    label: "Audio" },
  { id: "social",   label: "Social" },
  { id: "systems",  label: "Systems" },
  { id: "curator",  label: "Taste" },
  { id: "google",   label: "Why Google" },
];

export default function ScrollProgress() {
  const [active, setActive] = useState("hero");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Watch persistent-ui visibility to know when hero is done
    const persistentUI = document.getElementById("persistent-ui");
    if (!persistentUI) return;

    const observer = new MutationObserver(() => {
      const isHidden = persistentUI.classList.contains("hero-hidden");
      setVisible(!isHidden);
    });
    observer.observe(persistentUI, { attributes: true, attributeFilter: ["class"] });

    // Initial state
    setVisible(!persistentUI.classList.contains("hero-hidden"));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sectionEls = SECTIONS.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the section most in view
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { threshold: [0.2, 0.5], rootMargin: "-10% 0px -10% 0px" }
    );

    sectionEls.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3 items-end transition-opacity duration-700 ${
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Section navigation"
      role="navigation"
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            aria-label={`Go to ${label}`}
            className="flex items-center gap-2 group"
          >
            {/* Label — slides in on active or hover */}
            <span
              className={`font-mono text-[10px] tracking-widest uppercase transition-all duration-300 ${
                isActive
                  ? "opacity-70 text-gold translate-x-0"
                  : "opacity-0 text-cream/70 translate-x-1 group-hover:opacity-60 group-hover:translate-x-0"
              }`}
            >
              {label}
            </span>

            {/* Dot */}
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? "w-2 h-2 bg-gold"
                  : "w-1.5 h-1.5 bg-cream/25 group-hover:bg-cream/50"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
