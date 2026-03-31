"use client";

import { usePathname } from "next/navigation";
import AudioPlayer from "@/components/AudioPlayer";
import AgentSidebar from "@/components/AgentSidebar";
import ScrollProgress from "@/components/ScrollProgress";

export default function PersistentUI() {
  const pathname = usePathname();
  if (pathname.startsWith("/artifacts")) return null;

  return (
    <>
      <ScrollProgress />
      <div id="persistent-ui" style={{ transition: "opacity 1s ease" }}>
        <AudioPlayer />
        <AgentSidebar />
      </div>
    </>
  );
}
