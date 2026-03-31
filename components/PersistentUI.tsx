"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AudioPlayer from "@/components/AudioPlayer";
import AgentSidebar from "@/components/AgentSidebar";
import ScrollProgress from "@/components/ScrollProgress";

export default function PersistentUI() {
  const pathname = usePathname();
  const [isArtifacts, setIsArtifacts] = useState(false);

  useEffect(() => {
    // usePathname() returns "/" on the artifacts subdomain because the
    // middleware rewrite is server-side only — the browser URL stays as
    // artifacts.nathankhane.com/. Check hostname as the source of truth.
    setIsArtifacts(
      window.location.hostname.startsWith("artifacts.") ||
      pathname.startsWith("/artifacts")
    );
  }, [pathname]);

  if (isArtifacts) return null;

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
