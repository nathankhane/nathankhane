/**
 * app/page.tsx — Main scroll experience
 *
 * Orchestrates all 9 narrative sections in sequence.
 * Dynamic imports for below-fold sections to minimize initial bundle.
 * ActTransition components mark the cinematic act breaks.
 */
import dynamic from "next/dynamic";
import HeroScrollCanvas from "@/components/sections/HeroScrollCanvasClient";
import ActTransition from "@/components/ActTransition";

// Dynamic imports for performance — below-fold sections loaded on demand
const ParallelTimeline  = dynamic(() => import("@/components/sections/ParallelTimeline"));
const TheSpark          = dynamic(() => import("@/components/sections/TheSpark"));
const AudioEngineer     = dynamic(() => import("@/components/sections/AudioEngineer"));
const SocialArchitect   = dynamic(() => import("@/components/sections/SocialArchitect"));
const SystemsArchitect  = dynamic(() => import("@/components/sections/SystemsArchitect"));
const CuratorOfTaste    = dynamic(() => import("@/components/sections/CuratorOfTaste"));
const WhyGoogle         = dynamic(() => import("@/components/sections/WhyGoogle"));

export default function Home() {
  return (
    <main>
      {/* ── Act 1: Origin ───────────────────────────────────────────────── */}
      <HeroScrollCanvas />
      <ParallelTimeline />
      <TheSpark />

      {/* ── Act Break: I → II ───────────────────────────────────────────── */}
      <ActTransition act="ACT II" subtitle="The Maker" color="gold" />

      {/* ── Act 2: The Maker ────────────────────────────────────────────── */}
      <AudioEngineer />
      <SocialArchitect />
      <SystemsArchitect />
      <CuratorOfTaste />

      {/* ── Act Break: II → III ─────────────────────────────────────────── */}
      <ActTransition act="ACT III" subtitle="The Future" color="blue" />

      {/* ── Act 3: The Future ───────────────────────────────────────────── */}
      <WhyGoogle />

      {/* Subliminal watermark — visible only if you look */}
      <footer className="py-8 flex justify-center" aria-hidden="true">
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-cream/[0.06] select-none">
          Site built using Google&apos;s AI Suite
        </span>
      </footer>
    </main>
  );
}
