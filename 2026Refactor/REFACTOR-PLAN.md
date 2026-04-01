# REFACTOR PLAN: nathankhane.com → "Business Is Poetry"

_Last updated: April 1, 2026_

**For:** Google Creative Fellowship Application (Deadline: March 23, 2026 5PM PST)
**Strategy:** Full site replacement. The fellowship narrative experience IS nathankhane.com.
**Source docs:** `2026Refactor/googleCreativeFellowshipSiteBlueprint.md`, `2026Refactor/CODEBASE-AUDIT.md`, `fontImplementationGuide.md`

---

## CONTEXT

Nathan's current site (`nathankhane.com`) is a service portfolio with a retro "vintage" aesthetic. The new site replaces it entirely with an immersive scroll-driven narrative — telling Nathan's life story in parallel with Google's evolution — serving as the centerpiece of his Google Creative Fellowship application. The site demonstrates all three fellowship-relevant skills simultaneously: writing craft, AI technical fluency, and social-native creative work. The site itself is the portfolio piece.

**Critical constraint:** Deadline is March 23, 2026. 12 days. Ship a polished MVP over a broken ambitious version.

---

## STEP 0 — ARCHIVE FIRST (Non-Negotiable)

Before a single file is touched, the entire current codebase must be preserved.

**Archive command:**
```bash
mkdir -p archive/v1
# Copy all source files (exclude node_modules, .next, .git)
rsync -av --exclude='node_modules' --exclude='.next' --exclude='.git' --exclude='archive' . archive/v1/
```

**Archive includes:**
- `app/` — all routes and pages
- `components/` — all 26 components
- `lib/` — utils.ts, retro-animations.ts
- `public/` — fonts, images, media (including `fonts/NewsPlantin-Regular.otf`)
- `Fonts/` — Calistoga, Catamaran, Corben, Montserrat, Shrikhand, SMG directories
- `PRD/` — all PRD documents
- `fontImplementationGuide.md` — V1 font implementation record
- `nathankhane.com Foundation and rules.md` — V1 brand rules
- `CLAUDEOG.md` — old CLAUDE.md
- `CODEBASE-AUDIT.md` — audit results
- `next.config.ts`, `package.json`, `tsconfig.json`, all config files
- `components.json` — V1 shadcn config

**Post-archive:** `archive/v1/` is never modified. It is the time capsule.

---

## FILE MAP

### 🗑️ DELETE (21 files — after archive)

| File | Reason |
|------|--------|
| `app/portfolio/page.tsx` | No portfolio route in fellowship site |
| `app/about/page.tsx` | No standalone about route |
| `app/about/layout.tsx` | No standalone about route |
| `app/work-with-me/page.tsx` | No services section |
| `app/contact/page.tsx` | No separate contact page |
| `app/blog/page.tsx` | No standalone blog route |
| `app/quotes/page.tsx` | No quotes section |
| `app/quotes/layout.tsx` | No quotes section |
| `components/cinematic-hero.tsx` | Replaced by TitleCard |
| `components/credibility-bar.tsx` | Replaced by ParallelTimeline |
| `components/VisionCTA.tsx` | No services CTA |
| `components/CaseStudyCard.tsx` | Absorbed into SystemsArchitect section |
| `components/ServiceCard.tsx` | No services section |
| `components/CalendlyWidget.tsx` | Duplicate — remove one; fellowship site may not need booking |
| `components/CalWidget.tsx` | If no booking needed, remove both; else keep one |
| `components/ContentCreationSection.tsx` | Absorbed into SocialArchitect section |
| `components/LogoStrip.tsx` | Placeholder logos, not needed |
| `components/VintageBadge.tsx` | Retro aesthetic gone |
| `components/VintageIcons.tsx` | Retro aesthetic gone |
| `components/RetroTexture.tsx` | Retro aesthetic gone |
| `components/Icon.tsx` | Rebuild with new icon set |
| `components/ServiceIcon.tsx` | No services section |
| `components/RotatingTagline.tsx` | Pattern absorbed into TitleCard |
| `components/TikTokSection.tsx` | Rebuilt inside SocialArchitect |
| `lib/retro-animations.ts` | Replaced by `lib/animations.ts` |

### ✏️ MODIFY (6 files)

| File | Changes |
|------|---------|
| `app/layout.tsx` | Full rewrite — minimal shell, AudioPlayer slot at bottom, new metadata (Business Is Poetry, nathankhane.com), no old nav, `<!-- If you're reading this... -->` HTML comment easter egg |
| `app/globals.css` | Full rewrite — new design tokens (navy/gold/off-white), new `@font-face` declarations (Instrument Serif + Satoshi + JetBrains Mono), remove all retro/vintage tokens |
| `app/not-found.tsx` | Update copy — keep brand voice but update to fellowship era |
| `next.config.ts` | Add: image domains, security headers (`X-Content-Type-Options`, `X-Frame-Options`), remote patterns for TikTok/YouTube |
| `package.json` | Remove: `contentlayer`, `@emnapi/*`, `@napi-rs/wasm-runtime`, `@tybys/wasm-util`, `@shadcn/ui@0.0.4`. Add: `howler`, `@anthropic-ai/sdk`, `@supabase/supabase-js`, `@vercel/analytics`, `@types/howler` |
| `components/AnimatedSection.tsx` | Keep logic, update default easing to match editorial motion system |

### ✅ KEEP AS-IS (6 files)

| File | Why |
|------|-----|
| `lib/utils.ts` | `cn()` is universal — keep exactly |
| `components/TikTokEmbed.tsx` | Used in SocialArchitect section |
| `components/SocialLinks.tsx` | Footer social links still needed |
| `app/api/rss/route.ts` | Substack integration for CuratorOfTaste |
| `tsconfig.json` | Strict mode + path aliases, no changes needed |
| `eslint.config.mjs` | Modern flat config, keep |

### 🆕 NET-NEW (27 files)

#### App Layer
| File | Purpose |
|------|---------|
| `app/page.tsx` | Complete rewrite — orchestrates all 9 sections in scroll sequence |
| `app/api/chat/route.ts` | Anthropic streaming endpoint for AI agent |

#### Section Components (`components/sections/`)
| File | Act | Content |
|------|-----|---------|
| `components/sections/TitleCard.tsx` | 1-1 | "This is Nate." fade-in sequence, cursor blink at 530ms (Easter Egg #1) |
| `components/sections/ParallelTimeline.tsx` | 1-2 | Split-screen: Nate's life LEFT, Google milestones RIGHT, scroll-synced |
| `components/sections/TheSpark.tsx` | 1-3 | Builder origin story, "I'm Feeling Lucky" hover easter egg (#2) |
| `components/sections/AudioEngineer.tsx` | 2-4 | Auto-play opt-in, waveform visual, music context copy |
| `components/sections/SocialArchitect.tsx` | 2-5 | TikTok grid, swipe-up transition animation (Easter Egg #3) |
| `components/sections/SystemsArchitect.tsx` | 2-6 | Bridge screenshots, Morális mention, systems thinking copy |
| `components/sections/CuratorOfTaste.tsx` | 2-7 | Substack excerpts, poetry sample, Founders Basketball, hidden search query (Easter Egg #4) |
| `components/sections/WhyGoogle.tsx` | 3-8 | Direct address, Google brand DNA colors in background (Easter Egg #5), fellowship role callouts |
| `components/sections/AgentCTA.tsx` | 3-9 | ChatInterface embed, "Just Ask" prompt (Easter Egg #8), social links footer |

#### Shared UI Components
| File | Purpose |
|------|---------|
| `components/AudioPlayer.tsx` | Persistent Spotify-style mini-player, bottom bar, Howler.js, NEVER autoplay |
| `components/SearchBar.tsx` | Google search bar motif, reused across sections |
| `components/ChatInterface.tsx` | AI agent conversation UI, streaming responses |
| `components/Timeline.tsx` | Reusable timeline component for ParallelTimeline |
| `components/EasterEgg.tsx` | Reusable wrapper — tooltip, hover reveal, hidden text patterns |
| `components/MobileNav.tsx` | REBUILD: keep Portal architecture, new minimal dark UI |
| `components/ui/` | REINIT: shadcn/ui 2.x components via `npx shadcn@latest init` |

#### Data / Logic Layer
| File | Purpose |
|------|---------|
| `lib/animations.ts` | Editorial animation system — replaces retro-animations.ts. Exports: `fadeUp`, `fadeIn`, `staggerChildren`, `parallaxY`, `textReveal`, `pageTransition` |
| `lib/agent-prompt.ts` | Full system prompt for Nate's AI agent (see blueprint draft) |
| `lib/timeline-data.ts` | Typed arrays: Nate's life milestones + Google milestones, keyed by year |
| `lib/music-tracks.ts` | Audio track metadata: title, file path, duration, act mapping |
| `lib/easter-eggs.ts` | Easter egg configurations: trigger type, content, location |

#### Public Assets (content-dependent, not code)
| Path | Purpose |
|------|---------|
| `public/audio/` | Music files (MP3, mastered) |
| `public/resume.pdf` | Downloadable resume |
| `public/images/bridge/` | Bridge platform screenshots |
| `public/images/portfolio/` | General portfolio images |

---

## TYPOGRAPHY SYSTEM

### V1 → V2 Transition
| Layer | V1 (Current) | V2 (Fellowship) |
|-------|-------------|-----------------|
| Display/Headlines | News Plantin (serif) | **Instrument Serif** (Google Fonts, variable) |
| Body | System stack / News Plantin fallback | **Satoshi** (self-hosted from `Fonts/` dir — verify availability) |
| Mono | IBM Plex Mono | **JetBrains Mono** (for search bar motif moments) |
| Fallbacks | Playfair Display, Crimson Text | Georgia, serif (display) / system-ui (body) |

### Font Sourcing Strategy
1. **Instrument Serif** — load via `next/font/google` (variable, free, instant)
2. **Satoshi** — check `Fonts/` directory for existing files; if not present, download from Fontshare (free)
3. **JetBrains Mono** — `next/font/google` (free)
4. **News Plantin** — preserved at `public/fonts/NewsPlantin-Regular.otf` in archive AND kept in `public/fonts/` (do not delete); available as fallback if needed for Act 3 Google typography contrast moments

### Implementation in `app/globals.css`
```css
/* Instrument Serif — display headlines */
/* Satoshi — body copy */
/* JetBrains Mono — code/search elements */

/* Utility classes */
.font-display { font-family: var(--font-instrument-serif), Georgia, serif; }
.font-body    { font-family: var(--font-satoshi), system-ui, sans-serif; }
.font-mono    { font-family: var(--font-jetbrains-mono), monospace; }
```

### fontImplementationGuide.md Principles Carried Forward
- `font-display: swap` on ALL `@font-face` declarations (V1 principle, keep)
- Custom utility classes (`.font-display`, `.font-body`, `.font-mono`) — same pattern as V1's `.font-hero`, `.font-headline`, `.font-display`, `.font-body`
- Fallback chain maintained for cross-browser reliability
- Root `font-family` set in `html` selector, not just `body`

---

## DESIGN SYSTEM TOKENS

```css
/* app/globals.css — new CSS variables */
:root {
  --background:    #0A0E17;  /* Deep navy */
  --foreground:    #F5F0EB;  /* Off-white */
  --accent:        #D4A853;  /* Warm gold */
  --accent-muted:  #A07830;  /* Gold darker */
  --surface:       #131929;  /* Card/section surface */
  --border:        rgba(245,240,235,0.1);

  /* Google DNA — used ONLY in WhyGoogle section (Act 3, Sec 8) */
  --google-blue:   #4285F4;
  --google-red:    #EA4335;
  --google-yellow: #FBBC05;
  --google-green:  #34A853;
}
```

---

## ENVIRONMENT VARIABLES

| Variable | Required | Purpose | Where to Get |
|----------|----------|---------|--------------|
| `ANTHROPIC_API_KEY` | 🔴 Required | Claude AI agent for Act 3 | console.anthropic.com |
| `NEXT_PUBLIC_SUPABASE_URL` | 🟡 Phase 3 | Conversation logging | supabase.com → project settings |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 🟡 Phase 3 | Supabase client auth | supabase.com → API settings |
| `SUPABASE_SERVICE_ROLE_KEY` | 🟡 Phase 3 | Server-side Supabase ops | supabase.com → API settings (secret) |
| `NEXT_PUBLIC_SITE_URL` | 🟢 Optional | OG tags, canonical URLs | `https://nathankhane.com` |

Add to `.env.local` (gitignored). Add to Vercel project environment variables for production.

---

## BUILD ORDER (Migration Sequence)

Execute strictly in this order to avoid broken states:

### Phase 0 — Preservation (Day 1 morning)
1. `rsync` archive to `archive/v1/`
2. Verify archive is complete
3. `git add archive/v1/ && git commit -m "Archive V1 — pre-refactor snapshot"`

### Phase 1 — Foundation (Day 1-2)
4. Dependency cleanup: `npm uninstall contentlayer @emnapi/core @emnapi/runtime @emnapi/wasi-threads @napi-rs/wasm-runtime @tybys/wasm-util`
5. New deps: `npm install howler @anthropic-ai/sdk @supabase/supabase-js @vercel/analytics @types/howler`
6. `npx shadcn@latest init` — reinitialize shadcn/ui 2.x
7. Delete the 21 condemned files (listed above)
8. Rewrite `app/globals.css` — new tokens, font faces, base styles
9. Rewrite `app/layout.tsx` — minimal shell (no old nav, AudioPlayer slot, new metadata)
10. Update `next.config.ts` — image domains, headers
11. Create `lib/animations.ts` — editorial animation system
12. Create `lib/timeline-data.ts` — data layer (no UI yet)
13. Create `lib/music-tracks.ts` — audio metadata
14. Create `lib/agent-prompt.ts` — write system prompt
15. Create `lib/easter-eggs.ts` — easter egg config

**Checkpoint:** `npm run build` should pass with minimal app/page.tsx placeholder

### Phase 2 — Shared Components (Day 2-3)
16. `components/AnimatedSection.tsx` — update easing
17. `components/EasterEgg.tsx` — reusable wrapper
18. `components/SearchBar.tsx` — Google search bar motif
19. `components/Timeline.tsx` — reusable timeline
20. `components/MobileNav.tsx` — rebuild with Portal, new dark UI
21. `components/AudioPlayer.tsx` — Howler.js integration, NEVER autoplay, "Play" CTA

**Checkpoint:** AudioPlayer renders, SearchBar visible, no TypeScript errors

### Phase 3 — Section Components (Day 3-6)
Build in narrative order so `app/page.tsx` can be assembled incrementally:

22. `components/sections/TitleCard.tsx` — cursor blink easter egg
23. `components/sections/ParallelTimeline.tsx` — split-screen, Timeline component
24. `components/sections/TheSpark.tsx` — "I'm Feeling Lucky" easter egg
25. `components/sections/AudioEngineer.tsx` — waveform, audio integration
26. `components/sections/SocialArchitect.tsx` — TikTokEmbed, swipe-up transition
27. `components/sections/SystemsArchitect.tsx` — Bridge screenshots
28. `components/sections/CuratorOfTaste.tsx` — Substack RSS, poetry, hidden query
29. `components/sections/WhyGoogle.tsx` — Google DNA colors
30. `components/sections/AgentCTA.tsx` — ChatInterface embed, social links

**Checkpoint:** Each section renders with placeholder content, scroll works

### Phase 4 — AI Agent (Day 7-9)
31. `app/api/chat/route.ts` — Anthropic streaming endpoint
32. `components/ChatInterface.tsx` — streaming chat UI
33. Add `.env.local` with `ANTHROPIC_API_KEY`
34. Test 10-15 conversations, refine agent-prompt.ts
35. Add rate limiting to `/api/chat`

**Checkpoint:** Agent responds in Nate's voice, stays on-brand

### Phase 5 — Content + Polish (Day 9-11)
36. Replace ALL placeholder content with real content
37. Supabase integration (conversation logging)
38. Mobile responsiveness pass — every section
39. Easter egg QA pass (all 10 items from blueprint)
40. Performance pass — Lighthouse audit, lazy loading, bundle size
41. Cross-browser test
42. `<!-- If you're reading this... -->` comment in layout.tsx

### Phase 6 — Launch (Day 12)
43. Add env vars to Vercel dashboard
44. `git push origin main` → triggers auto-deploy
45. Verify production at nathankhane.com
46. businessispoetry.com Cloudflare redirect decision

---

## CRITICAL RISKS & MITIGATIONS

| Risk | Mitigation |
|------|-----------|
| Audio autoplay blocked by browsers | NEVER autoplay. Always show explicit "Play" CTA. AudioPlayer starts muted. |
| AI agent downtime on review day | Fallback UI: graceful "Agent temporarily unavailable" message, never breaks page |
| Supabase rate limits | Log async, never block user interaction on DB write |
| TikTok embeds slow | Lazy-load TikTok script only when SocialArchitect section is in viewport |
| Mobile layout breaks | Build mobile-first. Test on iPhone at end of each phase, not just at end. |
| Over-engineering | Cut the agent before you cut the narrative. Ship polished MVP. |
| Deadline pressure | Archive V1 is the safety net. Always have a working site at `main`. |

---

## VERIFICATION

1. `npm run build` passes with zero TypeScript errors
2. `npm run lint` passes with zero ESLint errors
3. All 9 scroll sections render on desktop and mobile
4. AudioPlayer plays/pauses correctly, never autoplays
5. AI agent responds with correct voice (run 10 test prompts)
6. All 10 easter eggs functional (checklist in `lib/easter-eggs.ts`)
7. Lighthouse score ≥ 90 on Performance
8. `archive/v1/` is intact and complete
9. HTML source contains `<!-- If you're reading this, you're exactly who this site was built for. -->`
10. Production deploy at nathankhane.com loads correctly
