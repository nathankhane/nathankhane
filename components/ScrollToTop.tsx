"use client";

import { useEffect } from "react";

/**
 * ScrollToTop — forces the page to load at the top on fresh loads only.
 *
 * scrollRestoration is left as "auto" so the browser's bfcache can restore
 * scroll position when the user switches tabs or uses the back button.
 * window.scrollTo(0, 0) only fires on genuine fresh loads (pageshow persisted=false).
 */
export default function ScrollToTop() {
  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      // persisted=true means restored from bfcache (tab switch / back button)
      // — let the browser keep the scroll position intact.
      // persisted=false means a real navigation/fresh load — reset to top.
      if (!e.persisted) {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  return null;
}
