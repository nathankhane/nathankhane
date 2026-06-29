/**
 * lib/easter-eggs.ts — Easter egg registry
 *
 * Documents all 10 easter eggs hidden throughout the site.
 * Each egg is a deliberate nod to Google's creative history and DNA.
 * This file serves as QA checklist + cultural commentary.
 *
 * Reference: googleCreativeFellowshipSiteBlueprint.md — Easter Eggs section
 */

export interface EasterEgg {
  id: number;
  name: string;
  location: string;         // component/section where it lives
  description: string;      // what it does
  type: "timing" | "hover" | "transition" | "hidden" | "color" | "source" | "text";
  implemented: boolean;
  googleReference: string;  // the Google thing being referenced
}

export const easterEggs: EasterEgg[] = [
  {
    id: 1,
    name: "530ms Cursor",
    location: "TitleCard.tsx",
    description: "The blinking cursor after the title card text blinks at exactly 530ms — the same rate as Google's search bar cursor.",
    type: "timing",
    implemented: true,
    googleReference: "Google Search bar cursor blink rate",
  },
  {
    id: 2,
    name: "I'm Feeling Lucky",
    location: "TheSpark.tsx",
    description: "Hovering over the phrase 'I was a builder' reveals a tooltip: 'I'm Feeling Lucky' — Google's original secondary button text.",
    type: "hover",
    implemented: true,
    googleReference: "Google's 'I'm Feeling Lucky' button",
  },
  {
    id: 3,
    name: "TikTok Swipe-Up",
    location: "SocialArchitect.tsx",
    description: "The transition between SocialArchitect and the next section uses a 'swipe up' animation that mimics TikTok's native scroll UX.",
    type: "transition",
    implemented: true,
    googleReference: "TikTok native UX (referenced for social-native storytelling competency)",
  },
  {
    id: 4,
    name: "Hidden Search Query",
    location: "CuratorOfTaste.tsx",
    description: "A hidden element (visible on hover or keyboard nav) contains the search query: 'how to DJ a birthday party in pacific heights'",
    type: "hidden",
    implemented: true,
    googleReference: "Google Search as autobiography",
  },
  {
    id: 5,
    name: "Google DNA Colors",
    location: "WhyGoogle.tsx",
    description: "The section background uses Google's exact brand colors (#4285F4 blue, #EA4335 red, #FBBC05 yellow, #34A853 green) as a subtle animated gradient.",
    type: "color",
    implemented: true,
    googleReference: "Google brand identity — exact hex values",
  },
  {
    id: 6,
    name: "Dear Sophie",
    location: "WhyGoogle.tsx",
    description: "A subtle reference to the iconic 'Dear Sophie' Google Chrome ad — an AI agent preserving human memory.",
    type: "text",
    implemented: true,
    googleReference: "'Dear Sophie' Chrome ad (2011) — the benchmark for Google emotional storytelling",
  },
  {
    id: 7,
    name: "10 Blue Links",
    location: "WhyGoogle.tsx",
    description: "A brief moment in the WhyGoogle section where traditional search result links appear, then dissolve into the AI agent — showing the evolution from search to intelligence.",
    type: "transition",
    implemented: true,
    googleReference: "Google's original 10 blue links → evolution to AI-native search",
  },
  {
    id: 8,
    name: "Just Ask",
    location: "AgentSidebar.tsx",
    description: "The agent CTA uses 'Just Ask' — a direct callback to Google's 'Just Ask Google' Ted ad campaign that inspired the parallel narrative structure.",
    type: "text",
    implemented: true,
    googleReference: "'Just Ask Google' — the Ted ad (2014) that Nathan's site inverts",
  },
  {
    id: 9,
    name: "Valentine's Day × Connectedness",
    location: "TitleCard.tsx + ParallelTimeline.tsx",
    description: "The site's entire structure is built on the connection between Nathan's Valentine's Day birth and Google's 2000 inflection point. Every section transition is a connection.",
    type: "text",
    implemented: true,
    googleReference: "The meta-easter-egg: the entire site is a love letter",
  },
  {
    id: 10,
    name: "Page Source Comment",
    location: "app/layout.tsx",
    description: "A JavaScript comment in the <head> of every page: 'If you're reading this, you're exactly who this site was built for.'",
    type: "source",
    implemented: true,
    googleReference: "Google's own tradition of hiding messages in source code",
  },
];
