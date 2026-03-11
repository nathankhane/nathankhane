# CODEBASE AUDIT
**Project:** nathankhane.com
**Audited:** 2026-03-11
**Purpose:** Pre-refactor analysis — replacing current portfolio with Google Creative Fellowship narrative site ("Business Is Poetry")
**Scope:** Full replacement of nathankhane.com in this repo. Fellowship site becomes the new site.

---

## 1. ROUTE MAP

| Route | File | Component Type | Purpose |
|-------|------|----------------|---------|
| `/` | `app/page.tsx` | **Client** (`"use client"`) | Landing page — hero, services, case studies, blog posts, newsletter |
| `/portfolio` | `app/portfolio/page.tsx` | Server | Grid of case study cards + TikTok content section |
| `/about` | `app/about/page.tsx` | **Client** | Animated bio with Framer Motion paragraph reveals |
| `/work-with-me` | `app/work-with-me/page.tsx` | Server | Service tiers (3) + Calendly booking embed |
| `/contact` | `app/contact/page.tsx` | Server | Simple Calendly widget page |
| `/blog` | `app/blog/page.tsx` | Server (async) | Substack RSS feed — fetches latest 10 posts via rss-parser |
| `/quotes` | `app/quotes/page.tsx` | **Client** | 9 hard-coded philosophical quotes in animated grid |
| `/api/rss` | `app/api/rss/route.ts` | API Route | RSS proxy — fetches nathankhane.substack.com/feed, returns JSON |
| `404` | `app/not-found.tsx` | Server | Custom not-found: "Lost in the poetry. Page not found." |

### Layouts
| Layout | File | Notes |
|--------|------|-------|
| Root | `app/layout.tsx` | Server — ThemeProvider, global nav (desktop + mobile), footer, metadata |
| About | `app/about/layout.tsx` | Server — wraps about page |
| Quotes | `app/quotes/layout.tsx` | Server — wraps quotes page |

---

## 2. COMPONENT INVENTORY

### Animation & Layout

| Component | File | Type | REUSE / REPLACE |
|-----------|------|------|-----------------|
| AnimatedSection | `components/AnimatedSection.tsx` | Client | ✅ **REUSE** — viewport animation wrapper, Framer Motion, 6 direction variants, stagger support |

### Hero & Landing

| Component | File | Type | REUSE / REPLACE |
|-----------|------|------|-----------------|
| CinematicHero | `components/cinematic-hero.tsx` | Client | 🔄 **REPLACE** — typewriter hero replaced by TitleCard scroll narrative |
| CredibilityBar | `components/credibility-bar.tsx` | Client | 🔄 **REPLACE** — scrolling company logos replaced by ParallelTimeline |
| VisionCTA | `components/VisionCTA.tsx` | Client | 🔄 **REPLACE** — services CTA, no equivalent in fellowship site |

### Content Cards

| Component | File | Type | REUSE / REPLACE |
|-----------|------|------|-----------------|
| CaseStudyCard | `components/CaseStudyCard.tsx` | Client | 🔄 **REPLACE** — SystemsArchitect section covers Bridge with new design |
| ServiceCard | `components/ServiceCard.tsx` | Server | 🔄 **REPLACE** — no services section in fellowship site |

### Widgets & Forms

| Component | File | Type | REUSE / REPLACE |
|-----------|------|------|-----------------|
| CalWidget | `components/CalWidget.tsx` | Client | 🔄 **CONSOLIDATE** — duplicate of CalendlyWidget; pick one |
| CalendlyWidget | `components/CalendlyWidget.tsx` | Client | 🔄 **CONSOLIDATE** — custom iframe Calendly; pick one or drop both |
| SubstackForm | `components/SubstackForm.tsx` | Client | ✅ **REUSE** — useful in CuratorOfTaste section |
| LatestPosts | `components/LatestPosts.tsx` | Client | ✅ **REUSE** (pattern) — Substack posts display in CuratorOfTaste |

### Media Embeds

| Component | File | Type | REUSE / REPLACE |
|-----------|------|------|-----------------|
| TikTokEmbed | `components/TikTokEmbed.tsx` | Client | ✅ **REUSE** — needed for SocialArchitect section |
| TikTokSection | `components/TikTokSection.tsx` | Client | 🔄 **REPLACE** — wrapper rebuilt inside SocialArchitect |
| ContentCreationSection | `components/ContentCreationSection.tsx` | Client | 🔄 **REPLACE** — patterns absorbed into SocialArchitect |
| LogoStrip | `components/LogoStrip.tsx` | Client | 🔄 **REPLACE** — placeholder logos, not needed in fellowship site |

### Navigation & UI

| Component | File | Type | REUSE / REPLACE |
|-----------|------|------|-----------------|
| MobileNav | `components/MobileNav.tsx` | Client | ✅ **REUSE** (pattern) — Portal architecture worth keeping; rebuild UI for new design |
| ThemeToggle | `components/theme-toggle.tsx` | Client | 🔄 **EVALUATE** — fellowship site may be dark-only |
| SocialLinks | `components/SocialLinks.tsx` | Server | ✅ **REUSE** — footer social links still needed |
| ui/switch | `components/ui/switch.tsx` | Client | 🔄 **REPLACE** — upgrade shadcn/ui, regenerate |

### Icons, Badges & Visual

| Component | File | Type | REUSE / REPLACE |
|-----------|------|------|-----------------|
| VintageBadge | `components/VintageBadge.tsx` | Client | 🔄 **REPLACE** — retro aesthetic replaced by Editorial Futurism |
| VintageIcons | `components/VintageIcons.tsx` | Client | 🔄 **REPLACE** — custom SVGs no longer needed |
| RetroTexture | `components/RetroTexture.tsx` | Client | 🔄 **REPLACE** — retro textures replaced by clean editorial design |
| Icon | `components/Icon.tsx` | Server | 🔄 **REPLACE** — lucide icons remain but wrapper rewritten |
| ServiceIcon | `components/ServiceIcon.tsx` | Server | 🔄 **REPLACE** — no services section |

### Utility

| Component | File | Type | REUSE / REPLACE |
|-----------|------|------|-----------------|
| RotatingTagline | `components/RotatingTagline.tsx` | Client | 🔄 **REPLACE** — patterns absorbed into TitleCard/narrative sections |

---

## 3. LIB UTILITIES

| File | Purpose | REUSE / REPLACE |
|------|---------|-----------------|
| `lib/utils.ts` | `cn()` utility — clsx + tailwind-merge | ✅ **REUSE** — universal, used everywhere |
| `lib/retro-animations.ts` | Framer Motion animation variant library (vintagePop, retroSlide, etc.) | 🔄 **REPLACE** — rewrite as `lib/animations.ts` with editorial motion system |

---

## 4. TECH STACK

| Layer | Package | Version | Status | Action |
|-------|---------|---------|--------|--------|
| Framework | next | 15.5.7 | ✅ Current | Keep |
| Runtime | react / react-dom | 19.0.0 | ✅ Current | Keep |
| Language | typescript | 5.x | ✅ Strict mode on | Keep |
| Styling | tailwindcss | 4.x | ✅ Current (new engine) | Keep |
| Animations | framer-motion | 12.15.0 | ✅ Current | Keep |
| Themes | next-themes | 0.4.6 | ✅ Good | Keep (or drop if dark-only) |
| Icons | lucide-react | 0.511.0 | ✅ Current | Keep |
| UI Primitives | @radix-ui/react-switch | 1.2.5 | ✅ Good | Keep (upgrade via shadcn) |
| Component Library | @shadcn/ui | **0.0.4** | ⚠️ Very outdated | **Upgrade to 2.x** |
| Calendar embed | @calcom/embed-react | 1.5.3 | ✅ Works | Keep or drop (fellowship site may not need booking) |
| RSS parsing | rss-parser | 3.13.0 | ✅ Works | Keep |
| Class utils | clsx + tailwind-merge | current | ✅ Good | Keep |
| Unused | contentlayer | 0.3.4 | ❌ Not configured | **Remove** |
| Build | turbopack (via next dev) | — | ✅ Fast | Keep |
| Deployment | Vercel | — | ✅ Connected | Keep |

### New Dependencies Required (Fellowship Site)
| Package | Purpose | Priority |
|---------|---------|----------|
| `howler` or `tone` | Background music playback + audio player | High |
| `@anthropic-ai/sdk` | AI agent (Claude) for Act 3, Section 9 | High |
| `@supabase/supabase-js` | Conversation logging, analytics | Medium |
| Google Fonts or self-hosted | Playfair Display / Instrument Serif + Söhne / Satoshi | High |

---

## 5. CONFIGURATION FILES

| File | Status | Notes |
|------|--------|-------|
| `next.config.ts` | ⚠️ Empty | No image domains, headers, rewrites, or performance config — needs work |
| `tsconfig.json` | ✅ Good | strict mode, bundler resolution, `@/*` path alias |
| `postcss.config.mjs` | ✅ Good | Tailwind v4 plugin |
| `eslint.config.mjs` | ✅ Modern | Flat Config (v9), core-web-vitals + TypeScript rules |
| `components.json` | ⚠️ Outdated | shadcn/ui v0.0.4 schema — needs reinit after upgrade |
| `.vercel/project.json` | ✅ Connected | projectId + orgId present |

---

## 6. TECHNICAL DEBT (Prioritized)

### 🔴 High — Fix Before Refactor Begins

| # | Issue | Location | Action |
|---|-------|----------|--------|
| 1 | **Unused `contentlayer` + WASM artifacts** | `package.json` | Remove `contentlayer`, `@emnapi/*`, `@napi-rs/wasm-runtime`, `@tybys/wasm-util` — bloat with no purpose |
| 2 | **`shadcn/ui v0.0.4`** | `package.json`, `components.json` | Upgrade to 2.x, reinitialize |
| 3 | **Duplicate calendar components** | `CalWidget.tsx`, `CalendlyWidget.tsx` | Consolidate to one (or remove both if fellowship site doesn't need booking) |

### 🟡 Medium — Address During Refactor

| # | Issue | Location | Action |
|---|-------|----------|--------|
| 4 | **Empty `next.config.ts`** | `next.config.ts` | Add image domains, security headers, performance config |
| 5 | **Hard-coded content arrays** | `app/portfolio/page.tsx`, `app/quotes/page.tsx` | Move to `lib/data/` files for maintainability |
| 6 | **`app/page.tsx` is fully Client** | `app/page.tsx` | Split — server shell + client interactive islands |
| 7 | **No analytics** | Everywhere | Add `@vercel/analytics` or equivalent |

### 🟢 Low — Nice to Have

| # | Issue | Location | Action |
|---|-------|----------|--------|
| 8 | `retro-animations.ts` tightly coupled to vintage theme | `lib/retro-animations.ts` | Rewrite as general animation library |
| 9 | No `@next/bundle-analyzer` | `package.json` | Add to devDeps for performance monitoring |
| 10 | `app/page.tsx` imports not code-split | `app/page.tsx` | Use dynamic imports for below-fold sections |

---

## 7. EXTERNAL INTEGRATIONS

| Integration | How | Status | Fellowship Site Plan |
|-------------|-----|--------|---------------------|
| Substack RSS | `/api/rss` proxy + rss-parser | ✅ Working | Keep — CuratorOfTaste section uses Substack excerpts |
| Calendly / Cal.com | @calcom/embed-react + custom iframe | ✅ Working (duplicated) | Evaluate — fellowship site likely drops booking flow |
| TikTok embeds | Script injection + blockquote | ✅ Working | Keep — SocialArchitect section (Act 2, Sec 5) |
| YouTube | iframe embed | ✅ Working | Keep as needed |
| Vercel | `.vercel/project.json` | ✅ Connected | Keep — same deployment |
| Cloudflare | Domains (nathankhane.com) | ✅ Managed | businessispoetry.com → nathankhane.com redirect decision pending |
| Supabase | Not integrated | ❌ Not present | **Add** — AI agent conversation logging |
| Analytics | Not integrated | ❌ Not present | **Add** — Vercel Analytics minimum |
| Anthropic API | Not integrated | ❌ Not present | **Add** — AI agent for Act 3, Section 9 |

---

## 8. NEW ARCHITECTURE — FELLOWSHIP SITE

The refactored site is a **single-page scroll-driven narrative** replacing all current routes.

### New Route Structure
```
/app
  page.tsx                  ← Single scroll experience (9 acts)
  layout.tsx                ← Minimal layout (audio player persistent)
  globals.css               ← New Editorial Futurism design system
  not-found.tsx             ← Keep, update copy
  api/
    rss/route.ts            ← Keep (Substack integration)
    chat/route.ts           ← NEW: Anthropic AI agent endpoint
```

### New Component Structure
```
/components
  sections/
    TitleCard.tsx           ← Act 1, Sec 1: "This is Nate." fade-in + cursor blink (530ms)
    ParallelTimeline.tsx    ← Act 1, Sec 2: Split-screen life vs Google milestones
    TheSpark.tsx            ← Act 1, Sec 3: Builder origin + "I'm Feeling Lucky" easter egg
    AudioEngineer.tsx       ← Act 2, Sec 4: Music + waveform visualization
    SocialArchitect.tsx     ← Act 2, Sec 5: TikTok portfolio + swipe-up transition
    SystemsArchitect.tsx    ← Act 2, Sec 6: Bridge platform showcase
    CuratorOfTaste.tsx      ← Act 2, Sec 7: Substack + poetry + Founders Basketball
    WhyGoogle.tsx           ← Act 3, Sec 8: Direct address + Google brand DNA colors
    AgentCTA.tsx            ← Act 3, Sec 9: AI chat interface
  AudioPlayer.tsx           ← Persistent Spotify-style mini-player (bottom bar)
  SearchBar.tsx             ← Google search bar motif (reused across sections)
  ChatInterface.tsx         ← AI agent conversation UI
  Timeline.tsx              ← Reusable component for ParallelTimeline
  EasterEgg.tsx             ← Reusable easter egg wrapper
  AnimatedSection.tsx       ← KEEP: viewport animation wrapper
  TikTokEmbed.tsx           ← KEEP: used in SocialArchitect
  SocialLinks.tsx           ← KEEP: footer links
  MobileNav.tsx             ← REBUILD: portal architecture kept, new UI
  ui/                       ← UPGRADE: shadcn/ui 2.x components

/lib
  utils.ts                  ← KEEP: cn() function
  animations.ts             ← NEW: editorial animation system (replaces retro-animations.ts)
  agent-prompt.ts           ← NEW: system prompt for Nate's AI representation
  timeline-data.ts          ← NEW: life milestones + Google milestones data
  music-tracks.ts           ← NEW: audio file references + metadata
  easter-eggs.ts            ← NEW: easter egg configurations
```

### Design System Change
| Token | Current | New |
|-------|---------|-----|
| Background | Cream/Parchment `#FEFEFE` | Deep navy `#0A0E17` |
| Primary accent | Electric Cyan `#4F8DFD` | Warm gold `#D4A853` |
| Text | Ink Black `#0F0F0F` | Off-white `#F5F0EB` |
| Display font | System stack / News Plantin | Playfair Display / Instrument Serif |
| Body font | System stack | Söhne / Satoshi (NOT Inter, NOT Roboto) |
| Mono font | IBM Plex Mono | JetBrains Mono / IBM Plex Mono |

---

## 9. RECOMMENDED CLEANUP STEPS (Before Refactor)

Execute in this order:

1. **Remove dead dependencies**
   ```bash
   npm uninstall contentlayer @emnapi/core @emnapi/runtime @emnapi/wasi-threads @napi-rs/wasm-runtime @tybys/wasm-util
   ```

2. **Upgrade shadcn/ui**
   ```bash
   npx shadcn@latest init
   ```

3. **Create `2026Refactor` branch** for all refactor work
   ```bash
   git checkout -b 2026Refactor
   ```

4. **Add new dependencies**
   ```bash
   npm install howler @anthropic-ai/sdk @supabase/supabase-js @vercel/analytics
   npm install --save-dev @types/howler
   ```

5. **Scaffold new section components** (stubs with placeholder content)

6. **Update `next.config.ts`** with image domains, headers, performance config

---

## 10. SUMMARY

| Category | Count | Keep | Replace | New |
|----------|-------|------|---------|-----|
| Routes | 9 | 2 (api/rss, 404) | 7 | 1 (api/chat) |
| Components | 26 | 5 | 21 | 17 |
| Lib files | 2 | 1 (utils.ts) | 1 (retro-animations) | 5 |
| Dependencies | 12 prod | 9 | 3 | 4 |

**Bottom line:** The config foundation (TypeScript, Tailwind, ESLint, Vercel) is solid and stays. The entire UI layer — every page, most components, the design system, and the retro animation library — gets replaced. The core utilities (cn, AnimatedSection, TikTokEmbed, SocialLinks) are worth lifting directly.

---

*Generated from automated codebase exploration — 2026-03-11*
