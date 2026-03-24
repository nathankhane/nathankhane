# Post-Refactor Updates
**Last updated:** March 11, 2026
**Branch:** main · Site: nathankhane.com

This file logs all changes made after the initial V2 refactor was shipped.
Changes are organized chronologically by session.

---

## Session 1 — Content, Infrastructure, Bug Fixes

### Real Content Wiring
- `components/sections/SystemsArchitect.tsx` — replaced placeholder div with real Bridge screenshot using `next/image` (`/public/images/bridge-screenshot.png`)
- Created `/public/audio/` directory with `.gitkeep` for future audio file placement
- Created `/public/resume.pdf` placeholder path (file needs to be added manually)

### Environment & Config
- Created `.env.local` with all required keys:
  - `GOOGLE_AI_API_KEY` (Gemini — aistudio.google.com)
  - `NEXT_PUBLIC_SITE_URL`
  - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- Created `.env.local.example` with placeholder values for repo documentation
- Fixed OG image path in `app/layout.tsx`: `/og-image.png` → `/og-image.jpg`

### Mobile Responsiveness
- `components/sections/SocialArchitect.tsx` — metrics row: `flex gap-8` → `flex flex-wrap gap-8`
- `components/sections/TheSpark.tsx` — CliftonStrengths descriptions: always visible on mobile via `sm:opacity-0 sm:group-hover:opacity-100`

### Documentation
- Created `CODEBASE-SNAPSHOT.md` at project root — full contents of all critical files for quick context loading

---

## Session 2 — LLM Switch (Anthropic → Gemini)

### `app/api/chat/route.ts` — Full rewrite
- Replaced `@anthropic-ai/sdk` with `@google/generative-ai`
- Model: `gemini-2.0-flash` with `systemInstruction` parameter
- Gemini uses `role: "model"` (not `"assistant"`) — mapped on input
- SSE output format kept identical so `ChatInterface.tsx` required zero changes
- Rationale: Gemini aligns with Google Creative Fellowship application narrative

### `.env.local.example`
- Changed `ANTHROPIC_API_KEY` → `GOOGLE_AI_API_KEY`
- Updated comment URL to `https://aistudio.google.com/apikey`

---

## Session 3 — Name Correction: Mike McNeil → Matt O'Neill

**Critical correction:** The audio engineer's name is **Matt O'Neill** (producer for Travis Scott, Don Toliver). All prior references to "Mike McNeil" were incorrect.

### Files corrected:
| File | Change |
|------|--------|
| `lib/agent-prompt.ts` | Line 33: `"Mike McNeil"` → `"Matt O'Neill"` |
| `lib/music-tracks.ts` | Comment, track title, and credits updated |
| `components/sections/AudioEngineer.tsx` | File comment, body copy, footer updated |

### AudioEngineer date/city corrections:
- Body: `"In 2022, I sat in a studio with Mike McNeil"` → `"In late 2023, I sat in a studio with Matt O'Neill"`
- Footer: `"Recorded with Mike McNeil, Houston TX, 2022"` → `"Recorded with Matt O'Neill, San Francisco, 2023"`
- First session was 2023 in San Francisco (not 2022 in Houston)

---

## Session 4 — Timeline Correction (Full Replacement)

`lib/timeline-data.ts` was fully replaced with Nathan's verified, corrected life data.

### Key changes vs previous data:
| Year | Before | After |
|------|--------|-------|
| 2003 | — | Added: Moved to Daytona Beach, Florida |
| 2005 | — | Added: Started writing — music, poetry, screenplays |
| 2006 | — | Added: Began acting — alone in the mirror |
| 2013 | — | Added: Built my first PC by hand |
| 2018 | "University of Florida" (fabricated) | "University of Houston — Entrepreneurship & MIS" |
| 2020 | Generic | "Wolff Center for Entrepreneurship. Broke fundraising records ($325K, +35%)." |
| 2021 | — | Added: Nexus Veterinary Specialists — BD & Marketing |
| 2022 | "Studio session with Mike McNeil" | "Graduated UH. Wolff Center. The foundation is set." |
| 2023 | — | Added: Moved to SF. Capgemini. Khane Creative. First recordings with Matt O'Neill. |
| 2024 | — | Added: Co-producing. 4 tracks with Matt O'Neill. Managing a band in LA. |
| 2025 | — | Added: Founded Bridge. Left Capgemini. (June 3rd — same date as SF move, 2 years earlier) |
| 2026 | — | Added: Founders Basketball SF Chapter Lead. Building toward NYC. Convergence. |

Removed fabricated Nate entries for 2008, 2012, 2015, 2017.

---

## Session 5 — Browser Scroll Fix

**Problem:** Page occasionally loaded scrolled to bottom (browser native scroll restoration on reload/back-nav).

**Solution:** Created `components/ScrollToTop.tsx`
```tsx
"use client";
import { useEffect } from "react";
export default function ScrollToTop() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);
  return null;
}
```
- Added as first child of `<body>` in `app/layout.tsx`

---

## Session 6 — Body Font: Space Grotesk → DM Sans

**Decision:** DM Sans is geometric and approachable, pairs better with Instrument Serif's editorial tone.

### Files changed:
| File | Change |
|------|--------|
| `app/layout.tsx` | Import: `Space_Grotesk` → `DM_Sans`; variable: `--font-dm-sans` |
| `app/globals.css` | `@theme` token, `body {}`, `.font-body {}`, header comment |

Font still loaded via `next/font/google` with `display: "swap"`.

---

## Session 7 — AgentSidebar Refactor

**Change:** Moved the AI agent from a full-page scroll section (`AgentCTA`) to a floating action button + slide-in panel accessible from anywhere on the page.

### New: `components/AgentSidebar.tsx`
- Fixed 56px gold circle button, bottom-right, z-index 50 (above content, below modals)
- Positioned `bottom-24` to sit above the AudioPlayer bar
- One-cycle pulse animation on first load (Framer Motion `scale: [1, 1.18, 1]`), then static
- On click: opens a slide-in panel from the right (desktop) or bottom sheet (mobile via responsive classes)
- Panel contains full `<ChatInterface />` component
- Backdrop overlay with blur — click to dismiss; Escape key also closes
- Body scroll locked while panel is open
- Footer links (Find Nate: TikTok, LinkedIn, Substack, YouTube, Resume, Email) moved into panel footer

### `app/page.tsx`
- Removed `AgentCTA` import and section (was Act 3, Section 9)
- `WhyGoogle` is now the final scroll section

### `components/sections/WhyGoogle.tsx`
- Added minimal site footer at bottom: `Business Is Poetry · nathankhane.com · 2026`

### `app/layout.tsx`
- Added `<AgentSidebar />` import and placement alongside `<AudioPlayer />`
- Fixed lingering "Space Grotesk" reference in file comment

### Result
- Homepage bundle reduced: 25.9 kB → 23.6 kB (AgentCTA section removed from main bundle)
- Agent accessible from every scroll position, not just after reaching Act 3
- Cleaner narrative ending: WhyGoogle is the final word

---

## Pending / Still Needed

| Item | Status |
|------|--------|
| TikTok video IDs in `SocialArchitect.tsx` | ✅ Done — 4 real IDs wired in (Session 8) |
| Audio MP3 files in `/public/audio/` | ✅ Done — 3 tracks added (Session 8) |
| `/public/resume.pdf` | Manual — upload PDF |
| `/public/og-image.jpg` | Manual — create OG image |
| Supabase conversation logging (Phase 3) | Not yet wired in `/api/chat` |
| GOOGLE_AI_API_KEY confirmed in Vercel | Nathan to verify |
| Remove old ANTHROPIC_API_KEY from Vercel | Nathan to remove |
| Lyrics for 3 tracks in `AudioEngineer.tsx` | Fill `TRACKS[].lyrics` strings |
| Placeholder body copy | TheSpark, WhyGoogle, SocialArchitect — marked `[Placeholder — Nate to rewrite]` |
| `/public/resume.pdf` | Downloadable resume link in AgentSidebar footer |
| `/public/images/bridge/` | Bridge platform screenshots |
| Easter egg QA | All 10 items in `lib/easter-eggs.ts` |

---

## Session 8 — March 24, 2026 (Hero Animation, UI Polish, Mobile, Audio)

### New Components

**`components/CustomCursor.tsx`**
- Animated cursor for mouse devices only (`pointer: fine` media query — touch unaffected)
- Small cream dot with spring physics (`damping: 28, stiffness: 600`)
- On hover over interactive elements: dot hides, Google blue ring (36px) expands with glow
- On click: ring scales to 0.85 briefly
- `cursor: none !important` via `globals.css @media (pointer: fine)`

**`components/ScrollProgress.tsx`**
- Fixed right-side vertical section indicator, desktop only
- 8 section dots with labels: Intro · Timeline · The Spark · Audio · Social · Systems · Taste · Why Google
- Active section: gold dot + label slides in; hover shows any label
- Watches `#persistent-ui.hero-hidden` via `MutationObserver` — hides during hero
- Click to smooth-scroll to section

**`components/sections/HeroScrollCanvas.tsx`** (replaces TitleCard)
- 193 JPEG frames at 24fps, GSAP ScrollTrigger pin (`end: "+=220%"`, `scrub: 0.3`)
- Staggered text reveals: T1=0.68 / T2=0.76 / T3=0.84 / T4=0.91 / T_DONE=0.995
- Bidirectional persistent UI: `onLeave` shows player+sidebar, `onEnterBack` hides them
- Canvas draw: cover-fit on desktop, 1.5× zoom-from-contain on mobile portrait
- Mobile gradient fade overlays: bottom `h-40`, sides `w-12` — hides letterbox seams
- Mobile text layout: top block (28% height) + bottom block (26% height), both centered
- Desktop text: right-aligned, unchanged
- Scroll CTA: scroll wheel housing + gold bobbing dot + "Scroll slowwwly"

### Audio Player Changes (`components/AudioPlayer.tsx`)
- Top progress bar removed
- Row padding: `py-3` → `py-4` (taller player)
- Font sizes bumped: title `text-xs` → `text-sm`, credits `text-[10px]` → `text-xs`
- Play/pause button: gold → Google blue + `animate-blue-glow`
- **Progress freeze bug fixed**: `startProgressLoop()` moved to Howl `onplay` callback — fires after HTML5 audio confirms playback started (not immediately after `.play()` call which is async)
- **Cross-section track control**: `audioTrackSelect` custom event `{ index, autoPlay }` — AudioEngineer fires it to switch + autoplay without scrolling
- **`startAt` support**: seeks to `track.startAt` on load (`Love Songs 4 U` starts at 0:35)
- `bg-surface/40 backdrop-blur-xl` — semi-transparent player

### Audio Tracks (`lib/music-tracks.ts`)
- `startAt?: number` added to `MusicTrack` interface
- Track 1: `Booze Cruise Freestyle.mp3` → "Cruise Freestyle" — Performed and Co-produced by Nathan Khane Morales
- Track 2: `wastin' time with u DEMO (Master).mp3` → "wastin' time with u" — Written, Recorded, and Engineered by Nathan Khane Morales
- Track 3: `Love Songs 4 U.mp3` → "Love Songs 4 U" — Written, Performed, and co-composed by Nathan Khane Morales — `startAt: 35`

### AgentSidebar (`components/AgentSidebar.tsx`)
- FAB: gold circle → transparent pill with Google blue animated border + "Ask AI Nate something..." text
- Panel: `bg-surface/70` → `bg-ink/10 backdrop-blur-sm` (stars visible through panel)
- FAB offset: `bottom-[88px]` → `bottom-[104px]` (clears taller player)
- Mobile: `max-h-[82vh]` cap + y-axis slide animation eliminates dead space at top

### ChatInterface (`components/ChatInterface.tsx`)
- "Powered by Gemini 2.5" bar added (Google G SVG + mono label, 25% opacity)
- Widget: `bg-surface` → `bg-white/[0.03]` (glass effect)
- Mobile height: `max-h-[55vh]`

### AudioEngineer (`components/sections/AudioEngineer.tsx`) — full rewrite
- Interactive track selector — 3 cards, click to select
- Active track shows animated waveform bars
- **"Play in player"** button: fires `audioTrackSelect` with `autoPlay: true` — page stays in place
- **"Read lyrics"** button: animated expand/collapse lyrics panel per track
- Logic Pro badge: "Produced in Logic Pro / All 3 tracks written, recorded & engineered by Nate"

### Copy Changes
- **SocialArchitect**: "I didn't just consume culture. I made it." → "I don't just consume culture. **I create it.**" (Google blue + text-shadow glow)
- **WhyGoogle quote**: "I built the argument." → "I built my case for a position in the Google Creative Fellowship from the ground up, since I was a curious infant."
- **TheSpark headline**: "I didn't ask Google questions. I built the answers." → "I ask Google the right questions... **then I build the answers.**"
- **ParallelTimeline**: Google column offset `mt-0` → `mt-20` — entries stagger/interleave with Nate's

### Layout (`app/layout.tsx`)
- Added `<CustomCursor />` and `<ScrollProgress />` to layout

### Page (`app/page.tsx`)
- `TitleCard` → `HeroScrollCanvas`
- Subliminal watermark footer: "Site built using Google's AI Suite" at `text-cream/[0.06]`

### Globals (`app/globals.css`)
- `@media (pointer: fine) { * { cursor: none !important; } }`
- `@keyframes blue-glow-pulse` + `.animate-blue-glow`
- `#persistent-ui.hero-hidden` transition styles
- `body` space background + `background-attachment: fixed`
- TikTok embed override styles

### New Assets
| Asset | Description |
|-------|-------------|
| `public/hero-frames/frame-001…193.jpg` | 193 frames extracted via ffmpeg at 24fps |
| `public/images/space-bg.png` | Full-site fixed background |
| `public/audio/Booze Cruise Freestyle.mp3` | Track 1 |
| `public/audio/wastin' time with u DEMO (Master).mp3` | Track 2 |
| `public/audio/Love Songs 4 U.mp3` | Track 3 (starts at 0:35) |

### Bug Fixes
| Bug | Root Cause | Fix |
|-----|------------|-----|
| Progress bar freezing | `startProgressLoop` fired before HTML5 async play confirmed | Moved to Howl `onplay` callback |
| "Play in player" scrolled page | `scrollIntoView` call in handler | Removed; `autoPlay: true` in event payload |
| TikToks showing as text | `<link rel="preload">` is a hint, not execution | `useEffect` dynamic `<script>` injection |
| Mobile hero too zoomed | Cover-fit on portrait = 26% of image width | 1.5× zoom-from-contain shows ~65% of width |
| Canvas/bg edge seam on mobile | Letterbox boundary visible | Gradient fade overlays (bottom + sides) |
| AI sidebar dead space on mobile | Full-screen height forced by flex-1 | `max-h-[82vh]` + bottom-sheet animation |
| Ask AI button overlap with player | Player grew with `py-4` padding | `bottom-[104px]` offset |
