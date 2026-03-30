# PRD: `/resume` Page — nathankhane.com

## Overview

Add a dedicated `/resume` route to nathankhane.com that presents Nathan Khane Morales's professional credentials as a visually rich, interactive page native to the site's existing design language. This page serves as the structured credential layer complementing the narrative portfolio on the homepage.

**Target audience:** Google Creative Fellowship 2026 reviewers evaluating Nate for **Producer (Brand Studio, SF/NYC/LA)** and **Video Storyteller — AI Focus (YouTube Creative Studio, NYC)**.

**Core principle:** This is NOT a PDF bolted onto a portfolio. It's a resume designed like a creative piece — minimal, typographic, with subtle animation — that proves "maker-first" identity through how it's built, not just what it says.

---

## Technical Context (from site audit)

### Stack
- **Framework:** Next.js (App Router) — confirmed via `app/page.tsx`, `app/layout.tsx` routing, RSC payload
- **Styling:** Tailwind CSS v4.1.8 (utility-first, custom theme tokens)
- **Deployment:** Vercel
- **Fonts:** 8 font families loaded via `next/font`:
  - `--font-outfit` / `font-sans` / `font-display` — Outfit (primary display + body)
  - `--font-google-sans-code` / `font-mono` — Google Sans Code (monospace/labels)
  - `--font-instrument-serif` — Instrument Serif (hero italic)
  - `--font-fraunces` — Fraunces (spark section)
  - `--font-space-grotesk` — Space Grotesk (systems section)
  - `--font-syne` — Syne (audio section)
  - `--font-cormorant` — Cormorant (timeline)
  - `--font-dm-serif-display` — DM Serif Display (curator section)

### Color Palette (custom Tailwind theme tokens)
```
--color-ink:              #0a0e17    (page background)
--color-cream:            #f5f0eb    (primary text)
--color-gold:             #d4a853    (accent, highlights, active states)
--color-gold-muted:       #a07830    (secondary gold)
--color-surface:          #131929    (card backgrounds)
--color-surface-elevated: #1c2333    (elevated card backgrounds)
--color-google-blue:      #4285f4    (Google brand blue)
--color-google-red:       #ea4335    (Google brand red)
--color-google-yellow:    #fbbc05    (Google brand yellow)
--color-google-green:     #34a853    (Google brand green)
```

### Common opacity patterns used across the site
- `cream/70` — body text
- `cream/60` — secondary text, placeholders
- `cream/50` — tertiary text
- `gold/60` — section labels
- `white/10` — borders
- `white/5` — subtle borders, dividers
- `white/[0.04]` — active list item backgrounds

### Typography patterns (from HTML audit)
- **Section labels:** `text-xs font-mono text-gold/60 tracking-[0.2em] uppercase`
- **Section headings:** `text-3xl sm:text-4xl md:text-5xl font-display text-cream leading-tight`
- **Body text:** `text-sm text-cream/75 leading-relaxed`
- **Small monospace labels:** `text-[10px] font-mono text-cream/70`
- **Card titles:** `text-sm font-display text-cream`
- **Dates/metadata:** `text-xs font-mono text-cream/60`

### Layout patterns
- **Max width:** `max-w-6xl mx-auto px-6` (main sections)
- **Section padding:** `py-24 md:py-36`
- **Card style:** `rounded-2xl border border-white/10 bg-surface-elevated p-6` or `bg-ink/60`
- **Border accent (left):** `border-l-2 border-l-gold/50` (featured items)
- **Dividers between items:** `border-b border-white/5`

### Animation patterns
- Scroll-triggered fade-in: `style="opacity:0; transform:translateY(28px)"` (animated on intersection)
- Staggered reveals for lists
- Scale-in for cards: `translateY(20px) scale(0.97)`
- Line draws: `transform-origin:left; transform:scaleX(0)` (animated to `scaleX(1)`)

### Component architecture (from RSC payload)
The homepage (`app/page.tsx`) imports section components:
```
@/components/sections/ParallelTimeline
@/components/sections/TheSpark
@/components/sections/AudioEngineer
@/components/sections/SocialArchitect
@/components/sections/SystemsArchitect
@/components/sections/CuratorOfTaste
@/components/sections/WhyGoogle
```
Plus shared components:
- `ActDivider` (ACT II / ACT III dividers with line animation)
- Persistent UI layer (`#persistent-ui`) with chat button + nav dots
- Background layers (space-bg.png, radial gradients)
- Side navigation dots (right rail, desktop only)

### Existing backgrounds
- Fixed space background: `/images/space-bg.png` (full bleed, z-index: -2)
- Radial gradient overlays that animate per section (warm red, cool blue)

---

## Page Design Specification

### Route
`/resume` — standalone page (NOT a section in the single-page scroll)

### File location
`app/resume/page.tsx`

### Page title
`"The Record — Nathan Khane Morales"` (for browser tab)

### Meta
```tsx
export const metadata = {
  title: "The Record — Nathan Khane Morales",
  description: "Producer. Video storyteller. Creative technologist. The structured credentials behind nathankhane.com.",
  openGraph: {
    title: "The Record — Nathan Khane Morales",
    description: "Producer. Video storyteller. Creative technologist.",
    url: "https://nathankhane.com/resume",
  },
};
```

---

## Content Sections (top to bottom)

### 1. Header

**Layout:** Centered, clean, no traditional "resume header" energy.

```
NATHAN KHANE MORALES
San Francisco, CA · (832) 306-6685 · nathankmorales@gmail.com
linkedin.com/in/nathan-khane-morales · nathankhane.com · Khane School of Thought (Substack)
```

- Name: `text-4xl sm:text-5xl font-display text-cream` centered
- Contact: `text-xs font-mono text-cream/60` centered, links are `text-gold/70 hover:text-gold`
- Below the links, a subtle gold divider line that draws on load (matching the ACT divider pattern)

### 2. Summary

**Not a paragraph.** A single bold statement + brief supporting line.

```
Multidisciplinary creative and storyteller — 4+ years blending brand strategy,
production management, music, and emerging technology to bring bold ideas to life.
```

- Statement: `text-lg sm:text-xl font-display text-cream/90 leading-relaxed text-center max-w-3xl mx-auto`
- Below it, a row of subtle "role target" pills:

```
[Producer · Brand Studio]  [Video Storyteller · YouTube Creative Studio]
```

- Pills styled like the existing tech stack pills: `text-xs font-mono border rounded-full px-3 py-1`
- First pill: `text-google-green/70 border-google-green/20 bg-google-green/5`
- Second pill: `text-google-blue/70 border-google-blue/20 bg-google-blue/5`

### 3. Experience

**Layout:** Vertical stack of experience cards. Each card is a left-bordered card (matching the Curator of Taste sidebar cards pattern), with company/role/dates and expandable bullets.

**Order (critical — this is the narrative hierarchy):**

#### Card 1: Khane Creative (LEAD)
```
Company:  Khane Creative
Role:     Founder & Creative Strategist
Location: Los Angeles, CA · Austin, TX · Houston, TX · San Francisco, CA  
Dates:    Aug 2023 — Present
Border:   border-l-2 border-l-gold/50 (gold = primary, featured)
```

Bullets:
- Developed brand positioning, visual identity systems, and marketing strategies for 5 independent artists, translating each artist's story into cohesive creative direction across LA, Austin, and Houston.
- Produced and directed cross-functional campaigns spanning content creation, social media, live event production, and venue partnerships — expanding collective market reach by 75%.
- Designed and executed content and partnership activation strategies that grew combined social audiences from 0 to 65K through culturally resonant storytelling.
- Conceptualized original branded content including a lifestyle UGC reel concept for Bose ("One Pair, All Day"), blending product storytelling with creator-driven narratives.
- Authored reflective essays and creative nonfiction on Substack (Khane School of Thought), exploring themes of time, presence, identity, and creative process.

#### Card 2: Bridge
```
Company:  Bridge
Role:     Founder & CEO
Location: San Francisco, CA
Dates:    June 2025 — Present
Border:   border-l-2 border-l-gold/50 (gold = primary)
```

Bullets:
- Founded and built a B2B marketplace platform from concept to launch, leading all aspects of brand development, product storytelling, demo narrative design, and go-to-market creative.
- Conducted 300+ hours of user research and 100+ interviews, translating qualitative insights into UI flows, demo storylines, and product narratives — driving 4+ major pivots and improving user satisfaction by 85%.
- Managed end-to-end production of client deliverables, stakeholder communications, and multi-channel campaigns, coordinating timelines, budgets, and cross-functional execution.
- Produced investor and partnership pitch materials, professional services agreements, and brand collateral across formal and informal contexts.

#### Card 3: Capgemini
```
Company:  Capgemini
Role:     UX & Technology Consultant
Location: San Francisco, CA
Dates:    June 2023 — Feb 2025
Border:   border-l-2 border-l-cream/20 (secondary)
```

Bullets:
- Coordinated communications and production workflows for a $10B software client's hyperscaler division — managing dashboards, status tracking, stakeholder feedback, and cross-team execution.
- Organized and produced 20+ professional and educational events in Capgemini's SF office, managing logistics, partner relations, content programming, and post-event follow-through at a 95% satisfaction rate.

#### Card 4: Nexus Veterinary Specialists
```
Company:  Nexus Veterinary Specialists
Role:     Business Development & Marketing
Location: Houston, TX
Dates:    May 2021 — June 2022
Border:   border-l-2 border-l-cream/20 (secondary)
```

Bullets:
- Built field marketing playbooks and launch campaigns for 3 new hospital openings, coordinating operations, vendor onboarding, and content production to support >$1M in combined launch revenue.

### 4. Creative Practice

**Layout:** 2x2 grid of cards (collapses to single column on mobile). Each card has an icon/emoji area, title, and 2-3 lines of description.

Cards:
1. **Music Production & Songwriting**
   - "Writer, producer, and recording artist. Home studio: Logic Pro X, Focusrite Scarlett 2i2, Shure SM7B, Waves Ultimate. Original music blending introspective lyricism with experimental production."
   - Icon: waveform visual (reuse the waveform-ambient animation from the Audio section)

2. **AI-Augmented Creative Workflows**
   - "Actively experimenting with AI tools (LangChain, Claude, Cursor) as creative instruments for prototyping, content generation, and narrative design. Building automated systems that blend human storytelling instinct with machine intelligence."
   - Icon: ✦ or circuit-like SVG

3. **Content & Publishing**
   - "Creator of nathankhane.com. Author of Khane School of Thought on Substack — reflective essays on creativity, time, and identity."
   - Icon: pen/document SVG

4. **Video & Visual Storytelling**
   - "Concept development, production planning, and post-production for social-first video content. Proficient in Final Cut Pro with a focus on brand narrative and creator-driven formats."
   - Icon: film/camera SVG

### 5. Education

**Layout:** Simple, clean, one line.

```
University of Houston                                          Dec 2022
Bachelor of Business Administration — Entrepreneurship & Management Information Systems
```

### 6. Leadership & Community

Two items:

**Wolff Center for Entrepreneurship** (Dec 2020 — June 2022)
_Ranked #1 in the Nation by The Princeton Review_
Fundraising Events Lead & Engagement Manager | Houston, TX
- Produced and managed 40+ live events across Houston, breaking the program's fundraising record by 35% and generating $325,000 — including a 3-day food festival for 45,000 attendees and the inaugural entrepreneur's gala for 500+ guests.
- Led end-to-end event production: venue sourcing, partner relations, content programming, logistics coordination, and on-site management.

**Founders Basketball** — SF Chapter Lead | San Francisco, CA
- Organizing community events connecting founders, creatives, and operators across the Bay Area startup ecosystem.

### 7. Skills

**Layout:** Horizontal pill groups (matching the existing tech stack pill pattern).

Groups:
- **Creative & Strategy:** Brand Positioning, Campaign Concepting, Product Storytelling, Social Strategy, Content Development, UGC
- **Production:** Project Management, Event Production, Cross-Functional Coordination, Budgets & Timelines, Stakeholder Management
- **Music & Audio:** Logic Pro X, Songwriting, Music Production, Mixing (Waves), Shure SM7B / Focusrite 2i2
- **Video & Design:** Final Cut Pro, Figma, Visual Identity, Social Content Production
- **Technology & AI:** AI/LLM Prompt Engineering, LangChain, Python, Cursor, Notion, Salesforce
- **Languages:** English (native), Spanish

### 8. Footer CTA

```
"This is the structured version. The full story lives here."
[→ nathankhane.com]
```

- Centered, `text-sm font-mono text-cream/50`
- Link in gold, links back to homepage root
- Below it, the same footer as the main page: `Business Is Poetry · nathankhane.com · 2026`

---

## Animation Specification

All animations should match the existing scroll-triggered pattern on the homepage:

1. **On page load:** Header fades in first (0ms), summary fades up (200ms delay), role pills stagger in (400ms)
2. **On scroll:** Each experience card fades up with `translateY(24px)` → `translateY(0)`, staggered by 100ms per card
3. **Creative Practice cards:** Stagger in from `translateY(20px) scale(0.97)` → normal
4. **Skills pills:** Stagger in from `translateY(6px) scale(0.95)` → normal (matching the existing tech stack pill animation)
5. **The gold divider line** under the header draws from left to right on load (matching the ACT divider pattern: `transform-origin:left; transform:scaleX(0)` → `scaleX(1)`)

Use Intersection Observer (the same approach the homepage uses) for scroll-triggered animations.

---

## Navigation Integration

- Add a subtle link to `/resume` somewhere accessible. Options:
  - A small `font-mono text-[10px]` link in the persistent UI layer, or
  - A "View Resume" link in the WhyGoogle section near the role cards
  - The side dot nav does NOT need a new dot for /resume since it's a separate page

- On the /resume page itself, include a "← Back to full site" link in the top-left corner:
  - `text-xs font-mono text-cream/50 hover:text-cream transition-colors`

---

## Responsive Behavior

- **Desktop (md+):** Full layout as described. Experience cards at `max-w-4xl`. Creative Practice as 2x2 grid.
- **Mobile (<md):** Single column. Cards stack. Creative Practice cards stack vertically. Skills pills wrap naturally.
- The page should feel equally polished on mobile — fellowship reviewers may be on phones.

---

## Background

Reuse the same fixed space background (`/images/space-bg.png`) and ink background as the main site. No additional radial gradient overlays needed — keep it clean and focused on content.

---

## Performance Notes

- This is a new page route, so it gets its own chunk. Keep it lightweight.
- No heavy animations or libraries needed — CSS transitions + Intersection Observer is sufficient.
- Images: none needed on this page (pure typography + layout).
