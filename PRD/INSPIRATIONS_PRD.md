# Inspirations: Product Requirements Document

**A 2D Infinite Canvas of Creative Influences**
`nathankhane.com/inspirations`

| Field   | Value                                              |
| ------- | -------------------------------------------------- |
| Author  | Nathan Khane Morales                               |
| Date    | March 29, 2026                                     |
| Version | 1.1                                                |
| Status  | Draft                                              |
| Site    | nathankhane.com (Next.js / TypeScript / Tailwind)  |
| Design ref | [godly.website](https://godly.website) — tile presence, hover microinteractions, dark-first aesthetic |

---

## 1. Overview

Inspirations is a new page on nathankhane.com that serves as a 2D infinite canvas: a pannable, zoomable, explorable space where visitors can wander through the creative influences, philosophical fragments, poetry, social media moments, and intellectual touchstones that shape Nathan's work and worldview.

The page is not a list. It is not a feed. It is a landscape you explore, the way you'd explore someone's mind if they let you walk around inside it. Every tile is a window into a thought, a reference, or a moment of inspiration.

### 1.1 Why This Exists

- nathankhane.com is a portfolio site built as a case for the Google Creative Fellowship. The site already demonstrates systems thinking (Bridge), creative production (music), and cultural engagement (social, DJ, Founders Basketball).
- What's missing is the connective tissue: the inputs that produce those outputs. The books, the tweets, the philosophy, the poetry, the late-night captions. Inspirations fills that gap.
- For recruiters and collaborators, it answers the question: "How does this person think?" in a way no resume or project list can.

### 1.2 User Story

> As a **recruiter, collaborator, or curious visitor** to Nathan's portfolio, I want to **explore his creative influences in an immersive, nonlinear way** so I can **understand how he thinks, what drives his work, and whether our creative sensibilities align.**

---

## 2. Interaction Model: 2D Infinite Canvas

The Inspirations page is a pannable 2D canvas. Tiles float in space at varied positions, sizes, and slight rotations. The visitor navigates by dragging (desktop) or touch-panning (mobile), with pinch-to-zoom and scroll-to-zoom supported.

### 2.1 Canvas Behavior

| Behavior      | Specification                                                                                                                                              |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pan           | Click-drag (desktop), touch-drag (mobile). Momentum/inertia on release for natural feel.                                                                  |
| Zoom          | Scroll wheel (desktop), pinch (mobile). Range: 0.3x to 2.0x. Zoom targets cursor position.                                                               |
| Initial View  | Camera centers on a curated cluster of 5–7 high-impact tiles. Remaining tiles visible in periphery, inviting exploration.                                  |
| Boundaries    | Soft boundaries with elastic snap-back. Canvas extends ~2x beyond outermost tiles to prevent feeling boxed in.                                             |
| Tile Density  | Tiles are clustered organically, not grid-aligned. Slight rotation (± 1–3°) and varied spacing create a mood-board feel.                                   |

### 2.2 Tile Interaction

| Action              | Result                                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Hover               | Tile lifts with subtle scale (`1.03`), shadow deepens (`0 8px 30px rgba(0,0,0,0.12)`), and a content type label slides in from the bottom of the tile (e.g., "instagram caption", "poetry", "tweet"). Transition uses `cubic-bezier(0.2, 0, 0, 1)` over 200ms for the snappy-but-smooth feel seen on [godly.website](https://godly.website). |
| Click               | Behavior depends on content type (see Section 3). Either opens a modal, expands inline, or navigates to source.                 |
| Long press (mobile) | Same as hover: shows content type label.                                                                                        |

### 2.3 Mobile Fallback

On viewports under 768px, the 2D canvas remains the primary experience but with adjusted behavior: larger minimum tile sizes for touch targets (minimum 120px width), reduced zoom range (0.5x to 1.5x), and a "recenter" button fixed in the bottom-right corner to return to the starting cluster.

If performance testing reveals the canvas is too heavy on low-end mobile devices, fall back to a vertical masonry grid that preserves the tile aesthetics but uses standard vertical scroll.

---

## 3. Content Types and Tile Treatments

Each tile on the canvas represents one piece of inspiration. Tiles are visually differentiated by content type, but share a consistent design language: rounded corners, consistent padding, and a unified color palette derived from the site's existing design system.

### 3.1 Content Type Matrix

| Type                    | Tile Display                                                          | Click Action                                                  | Source              | Embed?        |
| ----------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------- | ------------- |
| Instagram Caption       | Text-only tile. Caption text styled as pull quote. No image.          | Modal with full caption + date + link to original post        | Instagram API / manual | No (text only) |
| Tweet                   | Live Twitter/X embed card                                             | Expand embed or open in new tab                               | Twitter embed API   | Yes (live)    |
| Pinterest Pin           | Live Pinterest embed widget                                           | Open pin in new tab                                           | Pinterest embed     | Yes (live)    |
| Quote / Philosophy      | Text tile with serif font. Attribution below.                         | Modal with context: who said it, why it matters               | Manual curation     | No            |
| Poetry                  | Text tile, centered, with line breaks preserved. Serif or handwriting font. | Modal with full poem + author                           | Manual curation     | No            |
| Personal Writing (short)| Text tile, excerpt (2–3 lines)                                        | Modal with full text                                          | Manual / Substack   | No            |
| Personal Writing (long) | Text tile, title + one-line excerpt                                   | Navigate to Substack or dedicated reading view                | Substack RSS / manual | No          |
| Stoic Principle         | Text tile with a subtle background tint. Short maxim.                 | Modal with principle name, source text, Nathan's interpretation | Manual curation   | No            |

### 3.2 Instagram Caption Ingestion

A core differentiator of this page is that Instagram captions are treated as first-class creative content. Nathan's captions span poetry, philosophical one-liners, reflective commentary, and calm intellectual observations. They are displayed as text-only tiles (no images) to foreground the writing itself.

#### 3.2.1 Ingestion Pipeline

- **Phase 1 (v1 launch):** Manual export. Use Instagram's "Download Your Data" feature to export post data as JSON. Parse captions, timestamps, and post URLs. Curate the best 15–30 captions for launch.
- **Phase 2 (post-launch):** Build an admin tool that connects to the Instagram Basic Display API (or Graph API with appropriate permissions) to pull captions automatically. Include a review/approve step so Nathan can curate before publishing.
- **Phase 3 (stretch):** AI-assisted curation. Run captions through a classification prompt (via Anthropic API) to auto-tag content type (poetry, philosophy, reflection, one-liner) and suggest which captions are strongest for the Inspirations page.

#### 3.2.2 Caption Display Rules

- Maximum display length on tile: 140 characters. Longer captions truncate with an ellipsis and expand on click.
- Typography: 16–18px, serif font (to distinguish from UI text), with generous line-height (1.6–1.8).
- No hashtags displayed. Strip hashtags during ingestion; they add noise without value on this page.
- Date displayed as relative time ("2 years ago") or month/year, not exact timestamps.

---

## 4. Visual Design

### 4.1 Design Reference: godly.website

The visual tone of the Inspirations page is informed by [godly.website](https://godly.website), a curated design gallery known for high-resolution card presentations, restrained hover microinteractions, and a dark-first aesthetic that lets content dominate. The specific patterns borrowed from Godly:

- **Card presence:** Tiles should feel substantial and grounded, not thin or wispy. Generous padding, subtle shadows, and rounded corners (12–16px radius) give each tile the physical weight of a card pinned to a mood board. Reference Godly's card depth: cards feel like they sit *on* a surface, not *in* it.
- **Hover restraint:** Godly uses minimal hover animations (scale 1.02–1.03x, shadow deepening, smooth ease-out). No bouncing, no color shifts, no dramatic transforms. The hover says "this is interactive" without competing with the content. The Inspirations canvas should match this restraint.
- **Dark-first thinking:** The canvas should look its best in dark mode. A dark background makes text tiles pop like cards on a corkboard, and it creates the immersive, gallery-like atmosphere that Godly achieves. Light mode must work, but dark mode is the intended showcase experience.
- **Typography as hero:** When Godly lacks a visual screenshot, clean typography carries the card. The same principle applies here: Instagram captions, poetry, and quotes don't need images. The words are the visual. Give them enough size, weight contrast, and white space to command attention on their own.

### 4.2 Design Principles

- **Consistent with nathankhane.com:** The Inspirations page inherits the site's existing typography, color palette, and spacing conventions. It should feel like a natural extension, not a separate app.
- **Text as visual:** Instagram captions, quotes, and poetry tiles use typography as the primary visual element. No placeholder images. The words are the design.
- **Organic, not gridded:** Tiles are placed with intentional irregularity. Slight rotations (±1–3°), varied sizes, and clustered groupings create a mood-board aesthetic.
- **Breathing room:** Tiles are not packed edge-to-edge. White space between tiles is generous and intentional. The canvas should feel expansive, not cramped.
- **Dark mode as showcase:** Both light and dark modes must render correctly, but dark mode is the primary design target. The canvas background in dark mode should feel deep and immersive; in light mode, it should feel open and airy.

### 4.3 Tile Card Treatment

Every tile, regardless of content type, shares a consistent card treatment inspired by Godly's gallery cards:

| Property | Specification |
| -------- | ------------- |
| Corner radius | 12–16px (`rounded-xl` in Tailwind). Generous, modern, matching Godly's card aesthetic. |
| Padding | Small tiles: `16px`. Medium: `20px`. Large: `24px`. Content should never feel cramped against edges. |
| Background | Subtle background tint per content type (see 4.5). In dark mode, use slightly elevated surface colors (not pure black) to create card-on-surface depth. Consider a subtle `backdrop-filter: blur(8px)` on tiles to create a frosted-glass separation from the canvas. |
| Shadow (resting) | Light mode: `0 2px 8px rgba(0,0,0,0.06)`. Dark mode: `0 2px 8px rgba(0,0,0,0.3)`. Subtle but present, establishing the card sits above the canvas plane. |
| Shadow (hover) | `0 8px 30px rgba(0,0,0,0.12)` in light mode, `0 8px 30px rgba(0,0,0,0.4)` in dark mode. The shadow deepens on hover to reinforce the lift. |
| Hover transform | `transform: scale(1.03)`. No more, no less. Combined with shadow deepening, this creates the Godly-style "card lifts off the surface" effect. |
| Hover transition | `transition: all 200ms cubic-bezier(0.2, 0, 0, 1)`. This specific easing gives the snappy-but-smooth feel: fast on the way up, gentle settle at the end. |
| Hover metadata | On hover, a content type label (e.g., "instagram caption", "poetry") slides in from the bottom of the tile. Small text (11–12px), muted color, `translateY` animation from 4px below to 0. This reveals metadata without cluttering the resting state. |
| Border | Optional: 1px solid border at 5–8% opacity in light mode, 10–15% opacity in dark mode. Creates subtle card edge definition, especially on tiles with transparent or very light backgrounds. |

### 4.4 Tile Sizing

| Tile Size | Dimensions      | Use Case                                        | Frequency |
| --------- | --------------- | ----------------------------------------------- | --------- |
| Small     | 140–180px wide  | Short quotes, one-liners, tags                  | ~40%      |
| Medium    | 200–280px wide  | Captions, poems, tweet embeds                   | ~40%      |
| Large     | 300–400px wide  | Featured essays, Pinterest embeds, key quotes   | ~20%      |

Height is dynamic based on content. Text tiles grow to fit their content; embed tiles match their embed's natural aspect ratio.

### 4.5 Color and Typography Per Content Type

- **Instagram captions:** Serif font, warm background tint (subtle amber/cream at 5–8% opacity), dark text. In dark mode: warm tint shifts to a low-opacity amber wash over the elevated surface.
- **Tweets:** Native Twitter embed styling (no custom override).
- **Pinterest:** Native Pinterest embed styling.
- **Quotes/Philosophy:** Serif font, cool background tint (subtle blue-gray at 5–8% opacity), attribution in small caps.
- **Poetry:** Serif or display font, centered text, no background tint (transparent card). The absence of tint makes poetry tiles feel lighter and more ethereal against the canvas.
- **Personal writing:** Sans-serif, left-aligned, matches site body text style.
- **Stoic principles:** Monospace or small-caps treatment, subtle left border accent (2px, muted color from the site palette).

---

## 5. Technical Architecture

### 5.1 Stack

| Layer           | Technology                                                                                                                                                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Framework       | Next.js 15 (existing site framework) with TypeScript                                                                                                                                                                           |
| Styling         | Tailwind CSS (existing) + CSS custom properties for tile theming                                                                                                                                                               |
| Canvas Engine   | Option A: `@panzoom/panzoom` (lightweight, ~4KB gzipped) for pan/zoom on a positioned div container. Option B: `react-zoom-pan-pinch` for a React-native approach. Evaluate both; prefer whichever has better mobile touch support. |
| Content Storage | JSON file (`/data/inspirations.json`) for v1. Migrate to headless CMS (Notion API or Sanity) if content exceeds ~100 tiles or Nathan wants non-technical editing.                                                              |
| Embeds          | Twitter: `twitter-widget.js` (official embed script). Pinterest: Pinterest embed SDK. Both loaded async, lazy-initialized as tiles enter viewport.                                                                              |
| Hosting         | Vercel (existing)                                                                                                                                                                                                              |

### 5.2 Data Schema

Each inspiration is stored as a JSON object:

```json
{
  "id": "insp_001",
  "type": "instagram_caption | tweet | pinterest | quote | poetry | writing_short | writing_long | stoic",
  "content": {
    "text": "string (primary display text)",
    "attribution": "string (author / source)",
    "context": "string (Nathan's commentary, shown in modal)",
    "url": "string (source URL for embeds or external links)",
    "date": "ISO date string"
  },
  "display": {
    "size": "small | medium | large",
    "position": { "x": 0, "y": 0 },
    "rotation": 0,
    "cluster": "string (optional grouping ID for related tiles)"
  },
  "meta": {
    "tags": ["stoicism", "creativity", "identity"],
    "addedAt": "ISO date",
    "featured": false
  }
}
```

### 5.3 Performance Requirements

| Metric              | Target                                                                                                                                    |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Initial Load (LCP)  | Under 2.5 seconds. Canvas shell + visible tiles render first; off-screen tiles and embeds load lazily.                                    |
| Pan/Zoom Framerate  | 60fps on modern devices. Use CSS transforms (`translate`, `scale`) for canvas movement, never layout-triggering properties.                |
| Embed Loading       | Twitter and Pinterest embeds initialize only when their tile enters the viewport (Intersection Observer). Placeholder skeleton until load. |
| Tile Count Ceiling  | Up to 75 tiles without virtualization. If exceeding 75, implement viewport-based tile rendering (only render tiles within ~1.5x viewport). |
| Bundle Impact       | Inspirations page code-split from main bundle. Canvas library + page-specific code should add < 20KB gzipped to the route.                |

### 5.4 Tile Placement Algorithm

Tiles are not randomly scattered. The placement algorithm balances organic feel with intentional clustering:

- Start with a center cluster of 5–7 featured tiles (the ones Nathan most wants visitors to see first).
- Radiate outward in concentric rings, with decreasing density. Inner ring: ~15 tiles. Outer ring: remaining tiles.
- Within each ring, tiles are placed with controlled randomness: base positions on a spiral or grid, then jittered by ±20–40px and rotated ±1–3°.
- Tiles of the same content type are loosely clustered (philosophy tiles near each other, captions near each other) but not rigidly grouped. Some cross-pollination is intentional.
- Collision detection ensures no two tiles overlap. Minimum gap: 24px.

---

## 6. Content Management

### 6.1 v1: JSON File

For launch with 30–75 tiles, content lives in a static JSON file committed to the repo. Nathan (or a collaborator) adds new inspirations by editing the JSON and pushing to the repo. Vercel auto-deploys on push.

- **File location:** `/data/inspirations.json`
- **Adding a tile:** Copy an existing entry, update the fields, assign a unique ID (`insp_XXX`), and set position coordinates. A helper script (`scripts/place-tile.ts`) can suggest coordinates based on existing tile positions to avoid overlap.
- **Removing a tile:** Delete the entry from the JSON. The canvas re-renders without it.

### 6.2 v2: Admin Interface (Post-Launch)

Once content exceeds ~75 tiles or Nathan wants faster iteration, build a lightweight admin page (`/admin/inspirations`) with:

- Form to add new tiles: paste text, select type, optionally set size and tags.
- Visual canvas preview showing where the new tile will land.
- Drag-to-reposition tiles on the canvas from the admin view.
- Instagram import tool: paste a caption URL or bulk-import from exported JSON.
- Authentication: simple password gate or tie into existing auth if the site has it.

### 6.3 v3: Automated Social Ingestion (Stretch)

- Instagram Basic Display API integration to pull captions on a scheduled basis (daily or weekly cron via Vercel).
- AI classification layer (Anthropic API) to auto-tag content type and suggest tile sizing.
- Review queue: new captions land in a "pending" state; Nathan approves or dismisses from the admin.
- Twitter/X bookmarks API (if available) to pull bookmarked tweets as candidate tiles.

---

## 7. Navigation and Discovery

### 7.1 Page Entry

- Accessible from the main site navigation as "Inspirations" or "Taste" (aligning with the existing "Curator of Taste" section language).
- On page load, a brief intro animation: tiles fade in from `opacity: 0` and `scale(0.95)` to full visibility, staggered from center outward (40–60ms delay per tile, sorted by distance from origin). No splash screen, no loading gate. The stagger creates a "cards being dealt onto a table" effect that feels organic and intentional.
- A small instructional hint appears for 3 seconds on first visit: "Drag to explore. Scroll to zoom." Persisted in `localStorage` so it only shows once.

### 7.2 Filtering (v2 feature, not v1)

Filtering is ranked last in priority and is excluded from v1. When implemented:

- Pill-based filter bar fixed to the top of the viewport: All, Instagram, Tweets, Philosophy, Poetry, Writing, Stoicism.
- Activating a filter dims non-matching tiles to 20% opacity (they remain in place) and highlights matching tiles. This preserves spatial memory.
- Search field within the filter bar for text search across tile content.

### 7.3 Recenter Control

A small floating button (bottom-right, consistent with the site's existing UI patterns) that smoothly pans the camera back to the center cluster. Always visible. Icon: compass or crosshair.

---

## 8. Phased Rollout

### 8.1 Phase 1: MVP (Weeks 1–3)

- Canvas engine integrated into the site (pan, zoom, mobile touch).
- 30–50 tiles manually curated and placed via JSON.
- Content types supported: Instagram captions (text-only), quotes, poetry, personal writing (short).
- Hover and click interactions functional.
- Modal for text-based tiles.
- Mobile-responsive canvas with recenter button.
- Dark mode support.
- No embeds, no filtering, no admin.

### 8.2 Phase 2: Embeds and Polish (Weeks 4–6)

- Twitter live embeds integrated (lazy-loaded).
- Pinterest live embeds integrated (lazy-loaded).
- Tile count expanded to 50–75.
- Entry animation (staggered fade-in).
- Personal writing (long-form) tiles linking to Substack.
- Performance optimization pass (profiling, lazy rendering if needed).

### 8.3 Phase 3: CMS and Intelligence (Weeks 7–10+)

- Admin interface for content management.
- Instagram API integration with review queue.
- AI-assisted content classification and curation.
- Filtering and search.
- Analytics integration (tile click heatmaps, time-on-page).

---

## 9. Success Metrics

| Metric               | Target                                                    | Measurement                      |
| --------------------- | --------------------------------------------------------- | -------------------------------- |
| Time on Page          | Over 90 seconds average                                   | Vercel Analytics or Amplitude    |
| Tile Interactions     | Over 30% of visitors click at least one tile               | Custom event tracking            |
| Canvas Exploration    | Over 50% of visitors pan beyond the initial viewport       | Viewport position tracking       |
| Recruiter Feedback    | Qualitative: "I understood how he thinks"                  | Direct feedback, interviews      |
| Performance (LCP)     | Under 2.5 seconds on 4G                                   | Lighthouse, Web Vitals           |

---

## 10. Risks and Mitigations

| Risk                                  | Impact                              | Mitigation                                                                                                            |
| ------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Twitter/X embed API instability       | Embeds break or load slowly         | Fallback to static screenshot cards if embed fails. Monitor embed health.                                             |
| Instagram API access restrictions     | Can't automate caption ingestion    | Manual export (Download Your Data) always works as baseline. Phase 1 doesn't depend on API.                           |
| Canvas performance on low-end mobile  | Janky pan/zoom, high battery drain  | Fallback to vertical masonry grid on devices that fail performance threshold. Test on mid-range Android.               |
| Content curation bottleneck           | Page feels stale if not updated     | Phase 3 admin + AI curation reduces friction. Set a quarterly content refresh reminder.                               |
| Tile placement collisions             | Overlapping tiles, unreadable content | Collision detection in placement algorithm. Visual QA step before deploy.                                            |

---

## 11. Open Questions

1. **Navigation label:** Should this page be called "Inspirations", "Taste" (matching existing site language), "Mind", or something else?
2. **Sound/ambient:** Would a subtle ambient audio layer (optional, toggle-able) enhance the exploration experience? Could tie into the music production angle.
3. **Collaboration:** Should visitors be able to suggest inspirations (a "Submit an inspiration" form)? Could be interesting for the fellowship application narrative.
4. **Analytics depth:** Beyond basic metrics, should we track tile-level heatmaps (which tiles get the most engagement) to inform future curation?
5. **Notion integration:** Since Nathan uses Notion heavily, should the CMS layer in Phase 3 pull from a Notion database rather than a custom admin?

---

## 12. Appendix

### 12.1 Canvas Library Comparison

| Library                                    | Size       | Pros                                        | Cons                                   |
| ------------------------------------------ | ---------- | ------------------------------------------- | -------------------------------------- |
| `@panzoom/panzoom`                         | ~4KB gzip  | Tiny, framework-agnostic, great perf        | No built-in momentum, less mobile polish |
| `react-zoom-pan-pinch`                     | ~12KB gzip | React-native, good mobile touch, momentum   | Larger, React-specific                 |
| Custom (CSS transforms + Pointer Events)   | 0KB        | Full control, no dependency                 | More dev time, must handle edge cases  |

### 12.2 Design Reference: godly.website Analysis

[godly.website](https://godly.website) is the primary design inspiration for tile-level aesthetics. Key takeaways from analysis:

| Godly Pattern | How It Applies to Inspirations | What NOT to Borrow |
| ------------- | ------------------------------ | ------------------ |
| High-res, large thumbnail cards with generous padding | Tiles feel substantial and grounded. Text tiles use typography at confident sizes with breathing room. | Video-on-hover previews (irrelevant for text-first tiles) |
| Dark background with light content cards creating depth | Dark mode is the showcase experience. Slightly elevated surface colors on tiles, not flat. | Godly's specific grid/masonry layout (we use a 2D canvas instead) |
| Restrained hover: scale 1.02–1.03x, shadow deepen, smooth ease-out | Exact same hover treatment on our tiles. No bouncing, no color shifts. `cubic-bezier(0.2, 0, 0, 1)` easing. | Aggressive hover zoom or overlay effects |
| Metadata revealed on hover, hidden at rest | Content type labels slide in from bottom on hover. Resting state is clean. | Category pills or tags visible at rest (too cluttered for canvas) |
| Rounded corners (12–16px) on all cards | Consistent `rounded-xl` treatment across all tile types. | Sharp corners or inconsistent radius per content type |
| Minimal chrome: the content dominates, UI gets out of the way | Canvas has almost no UI: just the recenter button and (eventually) filter bar. No sidebar, no header overlay. | Heavy navigation or persistent UI overlays on the canvas |

### 12.3 Reference: Site Technical Context

- **Framework:** Next.js 15 with TypeScript (~90% TS, ~9% CSS, ~1% JS)
- **Styling:** Tailwind CSS
- **Hosting:** Vercel
- **Existing features:** Dual timeline, audio player, TikTok embeds, AI chatbot, dark mode
- **Design language:** Clean, editorial, generous whitespace, accent colors (blue), serif headings for creative sections
- **URL:** nathankhane.com
