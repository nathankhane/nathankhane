"use client";

import { useEffect } from "react";

/**
 * ScrollToTop — forces the page to load at the top every time.
 *
 * Browser scroll restoration can land the user mid-page on reload/back-nav.
 * Setting history.scrollRestoration = "manual" disables that, and the
 * window.scrollTo(0, 0) on mount guarantees we always start at TitleCard.
 */
export default function ScrollToTop() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return null;
}
