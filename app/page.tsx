/**
 * app/page.tsx — Main scroll experience
 *
 * Orchestrates all 9 narrative sections in sequence.
 * Dynamic imports for below-fold sections to minimize initial bundle.
 */
import dynamic from "next/dynamic";
import TitleCard from "@/components/sections/TitleCard";

// Dynamic imports for performance — above-fold TitleCard loads eagerly
const ParallelTimeline = dynamic(() => import("@/components/sections/ParallelTimeline"));
const TheSpark        = dynamic(() => import("@/components/sections/TheSpark"));
const AudioEngineer   = dynamic(() => import("@/components/sections/AudioEngineer"));
const SocialArchitect = dynamic(() => import("@/components/sections/SocialArchitect"));
const SystemsArchitect = dynamic(() => import("@/components/sections/SystemsArchitect"));
const CuratorOfTaste  = dynamic(() => import("@/components/sections/CuratorOfTaste"));
const WhyGoogle       = dynamic(() => import("@/components/sections/WhyGoogle"));

export default function Home() {
  return (
    <main>
      {/* Act 1 — Origin */}
      <TitleCard />
      <ParallelTimeline />
      <TheSpark />

      {/* Act 2 — The Maker */}
      <AudioEngineer />
      <SocialArchitect />
      <SystemsArchitect />
      <CuratorOfTaste />

      {/* Act 3 — The Future */}
      <WhyGoogle />
    </main>
  );
}
