# V2 Changelog — Business Is Poetry
**Refactor:** nathankhane.com → Google Creative Fellowship Application Site
**Date:** March 11, 2026
**Deadline:** March 23, 2026 5PM PST

---

## What Changed

### Full Site Replacement
V1 was a service portfolio (retro "vintage" aesthetic). V2 is an immersive scroll-driven narrative experience — Nathan's life story in parallel with Google's evolution. The site IS the fellowship application artifact.

### Archived
- All V1 code preserved at `archive/v1/` — never modified, time capsule

---

## New Files

### App Layer
- `app/page.tsx` — 9-section scroll narrative orchestrator, dynamic imports for performance
- `app/api/chat/route.ts` — Anthropic Claude streaming endpoint for AI agent
- `app/not-found.tsx` — Updated 404 for fellowship era brand voice
- `app/layout.tsx` — Dark-only shell, 3-font stack, Analytics, AudioPlayer
- `app/globals.css` — Tailwind 4 @theme design tokens, editorial animations

### Lib Layer
- `lib/animations.ts` — Editorial motion system (replaces retro-animations.ts)
- `lib/timeline-data.ts` — Parallel timeline: Nate's life + Google milestones (2000–2025)
- `lib/music-tracks.ts` — Audio track metadata (3 tracks, act-mapped)
- `lib/agent-prompt.ts` — Nate's AI agent system prompt
- `lib/easter-eggs.ts` — All 10 Easter eggs registered and documented

### Shared Components
- `components/AudioPlayer.tsx` — Howler.js mini-player, NEVER autoplays
- `components/ChatInterface.tsx` — Streaming AI chat UI with suggested prompts
- `components/MobileNav.tsx` — Portal architecture, dark minimal drawer
- `components/AnimatedSection.tsx` — Updated easing to editorial [0.16, 1, 0.3, 1]
- `components/EasterEgg.tsx` — Reusable wrapper (hover/hidden/inline modes)
- `components/SearchBar.tsx` — Google search bar motif component
- `components/Timeline.tsx` — Reusable vertical timeline

### Section Components (9 acts)
- `components/sections/TitleCard.tsx` — "This is Nate." fade sequence, 530ms cursor (EE#1)
- `components/sections/ParallelTimeline.tsx` — Split-screen Nate/Google parallel timeline
- `components/sections/TheSpark.tsx` — Builder origin story, "I'm Feeling Lucky" (EE#2)
- `components/sections/AudioEngineer.tsx` — Waveform, Mike McNeil context, audio opt-in
- `components/sections/SocialArchitect.tsx` — TikTok portfolio, swipe-up (EE#3)
- `components/sections/SystemsArchitect.tsx` — Bridge + Morális showcase
- `components/sections/CuratorOfTaste.tsx` — Substack, poetry, Founders Basketball, (EE#4)
- `components/sections/WhyGoogle.tsx` — Google DNA bg gradient (EE#5), Dear Sophie (EE#6)
- `components/sections/AgentCTA.tsx` — 10 blue links (EE#7), "Just Ask" (EE#8), social links

---

## Modified Files

| File | Change |
|------|--------|
| `package.json` | v2.0.0, added Anthropic SDK + Howler + Vercel Analytics, removed contentlayer |
| `app/globals.css` | Full rewrite — Editorial Futurism design tokens, new animations |
| `app/layout.tsx` | Full rewrite — dark-only, 3-font stack (Instrument Serif/Space Grotesk/JetBrains Mono) |
| `next.config.ts` | Security headers, image remote patterns |
| `tsconfig.json` | Added archive/ to exclude list |
| `eslint.config.mjs` | Added `_`-prefix ignore pattern for unused vars |

---

## Deleted Files (25)

All V1-specific routes, components, and utilities replaced by fellowship narrative structure:
- 8 app routes (portfolio, about, work-with-me, contact, blog, quotes)
- 17 components (cinematic-hero, credibility-bar, VisionCTA, CaseStudyCard, etc.)

---

## Design System

### V1 → V2

| Layer | V1 | V2 |
|-------|----|----|
| Concept | "Business ≡ Poetry" service portfolio | Scroll-driven Google fellowship narrative |
| Aesthetic | Retro vintage | Editorial Futurism |
| Colors | Ink Black / Parchment White / Electric Cyan | Deep Navy #0A0E17 / Off-White #F5F0EB / Gold #D4A853 |
| Font (display) | News Plantin | Instrument Serif |
| Font (body) | System stack | Space Grotesk |
| Font (mono) | IBM Plex Mono | JetBrains Mono |
| Theme | Dark + Light toggle | Dark only |

---

## Easter Eggs (10 registered)

| # | Description | Location |
|---|-------------|----------|
| 1 | Cursor blink at 530ms (Google's rate) | TitleCard |
| 2 | "I'm Feeling Lucky" on hover | TheSpark |
| 3 | TikTok swipe-up transition | SocialArchitect |
| 4 | Hidden search query | CuratorOfTaste |
| 5 | Google DNA color gradient | WhyGoogle |
| 6 | "Dear Sophie" reference | WhyGoogle copy |
| 7 | 10 blue links dissolving into AI | AgentCTA |
| 8 | "Just Ask" callback to Ted ad | AgentCTA |
| 9 | Valentine's Day / Connectedness DNA | Throughout |
| 10 | HTML source comment | layout.tsx head |

---

## Build Status

```
✓ Compiled successfully
✓ Linting clean (zero errors)
✓ TypeScript strict (zero errors)
✓ Static pages generated (6/6)

Route (app)            Size    First Load JS
/                     20.8 kB      75 kB
/_not-found            125 B      13.8 kB
/api/chat              125 B      13.8 kB
/api/rss               125 B      13.8 kB
```

---

## Pending (Content + Phase 2)

- [ ] Add real audio files to `/public/audio/` (3 tracks from Mike McNeil sessions)
- [ ] Replace TikTok video placeholder IDs with real `@nathankhane` videos
- [ ] Add Bridge screenshots to `/public/images/bridge/`
- [ ] Add `/public/resume.pdf`
- [ ] Configure `ANTHROPIC_API_KEY` in Vercel environment variables
- [ ] Add Supabase for conversation logging (Phase 3)
- [ ] Mobile responsiveness pass
- [ ] Easter egg QA (all 10)
- [ ] Lighthouse audit (target ≥ 90)
- [ ] businessispoetry.com domain decision

