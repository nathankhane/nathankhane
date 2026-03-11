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
| TikTok video IDs in `SocialArchitect.tsx` | Manual — needs real content |
| Audio MP3 files in `/public/audio/` | Manual — session recordings |
| `/public/resume.pdf` | Manual — upload PDF |
| `/public/og-image.jpg` | Manual — create OG image |
| Supabase conversation logging (Phase 3) | Not yet wired in `/api/chat` |
| GOOGLE_AI_API_KEY confirmed in Vercel | Nathan to verify |
| Remove old ANTHROPIC_API_KEY from Vercel | Nathan to remove |
