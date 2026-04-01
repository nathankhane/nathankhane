# Session 04 — Timeline Rebuild, Hotspot Fix, Visual Polish, Copy Updates

**Date:** March 31, 2026
**Branch:** main (changes swept into commit `901b682` by parallel agent + uncommitted: MobileNav, ScrollProgress)

---

## What Was Built

### Timeline — Full Rebuild (`ParallelTimeline.tsx`)
- Replaced two independent `Timeline` component instances with a **unified year-row grid** (`grid-cols-[1fr_24px_1fr]`)
- Each year is one row: Nate left, center dot, Google right — matching years are now visually aligned
- Removed 5 Google-only entries to balance both sides at 13 entries each: 2008 (Chrome), 2010 (Android), 2012 (Knowledge Graph), 2015 (Alphabet), 2017 (Google Home/Waymo)
- "TWO TIMELINES. ONE STORY." label rebuilt as bold colored display text:
  - "Two" = glowy red (`#E53935`)
  - "Timelines." = glowy blue (`#4285F4`)
  - "One Story." = glowy purple (`#9B59D0`)
- **"NATE" column header**: glowy red (`#E53935`) with three-layer `textShadow`
- **Center dot (highlight rows)**: glowy purple (`#9B59D0`) — red + blue = purple, intentional metaphor
- **Nate's highlight year numbers**: glowy red inline style (not Tailwind class)
- Google fact SERP snippet: centered (`mx-auto`) under the full row, not offset to the right
- Removed "CliftonStrength #4: Connectedness. This writes itself." from subtitle
- SERP snippet triggered by clicking the center dot (previously clicked year text)

### Timeline Data (`lib/timeline-data.ts`)
- 2026 Nate entry text: `"The next chapter in my creative story."`
- Removed years: 2008, 2010, 2012, 2015, 2017 (Google-only, weak narrative connection)

### Hero Hotspot Layer (`components/sections/HeroHotspotLayer.tsx`)
- Added `pointerEvents: 'auto'` directly to each `motion.div` wrapper style (previously only the inner Link/button had it — inherited `pointer-events: none` from container could cause hit-test misses in some browsers)
- Added hover tooltip labels (pill shape, `font-mono text-[11px]`) to ALL hotspots, not just the microphone
- Tooltip style: `bg-surface-elevated border border-cream/20 rounded-full px-3 py-1.5`

### Hero Hotspot Timing (`components/sections/HeroScrollCanvas.tsx`)
- **Before:** hotspots only appeared at `p >= 0.995` (last 0.5% of scroll)
- **After:** three new constants:
  ```ts
  const T_DONE = 0.995;        // persistent UI (AudioPlayer, AgentSidebar)
  const T_HOTSPOT_SHOW = 0.62; // items emerge from brain → show hotspots
  const T_HOTSPOT_HIDE = 0.52; // hysteresis: hide only when scrolled well back
  ```
- `onUpdate` now handles show/hide with hysteresis — no more flickering at threshold
- `onEnterBack` no longer sets `heroDone=false` directly; `onUpdate` manages it via thresholds
- `persistent-ui` still only unlocks at `T_DONE` (0.995) so AudioPlayer/AgentSidebar stay locked until animation fully completes

### Copy Updates
- `WhyGoogle.tsx`: heading `"Why Google."` → `"Why Google?"`, placeholder body → `"One could say I was born for it..."` (display font, italic, `text-cream/70 text-lg`)
- `WhyGoogle.tsx`: Ted ad description → `"My favorite Google Ad of all time... I used to watch it weekly before there was a marketing error that pulled it from Youtube."`
- `AudioEngineer.tsx`: removed `"Business Is Poetry" is a lived philosophy, not a tagline.` paragraph
- `ScrollProgress.tsx`: fixed section order — Social now before The Spark, matching `app/page.tsx` render order

---

## Critical Architecture Decisions

### Why unified year-row grid instead of two Timeline components
The old design used two independent `Timeline` instances that filtered `timelineData` separately. They had different item counts and no way to visually align matching years. The new grid maps `timelineData` by year using `Map<number, TimelineEvent>` and renders all unique years as rows, guaranteeing 2026 Nate/Google entries land in the same row.

### Glowy colors via inline `style` not Tailwind
The red/blue/purple glow effects use `textShadow` which Tailwind 4 doesn't expose cleanly. All glow styles are inline:
```tsx
style={{ color: "#E53935", textShadow: "0 0 8px rgba(229,57,53,0.8), 0 0 20px rgba(229,57,53,0.5), 0 0 40px rgba(229,57,53,0.25)" }}
```
Three-layer glow: tight (8px) / mid (20px) / wide (40px) — consistent with how the rest of the site does glows.

### Why `T_HOTSPOT_SHOW = 0.62`
Frame math: at `p=0.62`, `idx = 382 - floor(0.62 × 371) = 382 - 230 = 152`. Frame 152 is roughly the midpoint of the brain-opening animation where objects become clearly visible. The 0.10 hysteresis gap (`SHOW=0.62`, `HIDE=0.52`) prevents on/off flickering when the user pauses at the threshold.

### `pointerEvents: 'auto'` on wrapper divs
CSS `pointer-events: none` is inheritable. The container (`HeroHotspotLayer`) has `pointer-events-none`. Inner Link/button had `pointer-events-auto` which should override, but some browsers/GSAP pin stacking context interactions caused unreliable hit testing. Adding `pointerEvents: 'auto'` to the positioned wrapper `div` puts it explicitly in the hit-test tree. Belt-and-suspenders.

---

## Project Structure (changed files this session)

```
lib/
  timeline-data.ts              ← removed 5 Google entries, updated 2026 Nate text

components/
  ScrollProgress.tsx            ← fixed section order (social before spark)
  sections/
    ParallelTimeline.tsx        ← FULL REWRITE — unified year-row grid
    HeroHotspotLayer.tsx        ← pointerEvents fix + tooltips on all hotspots
    HeroScrollCanvas.tsx        ← T_HOTSPOT_SHOW/HIDE thresholds, onUpdate logic
    WhyGoogle.tsx               ← heading, body copy, Ted ad description
    AudioEngineer.tsx           ← removed "Business Is Poetry" line
```

---

## Key Patterns

### Unified year-row timeline grid
```tsx
const nateByYear = new Map<number, TimelineEvent>(
  timelineData.filter((e) => e.nate).map((e) => [e.year, e])
);
const allYears = Array.from(new Set(timelineData.map((e) => e.year))).sort((a,b) => a - b);

// In JSX:
{allYears.map((year) => {
  const nate = nateByYear.get(year);
  const google = googleByYear.get(year);
  return (
    <div key={year} className="grid grid-cols-[1fr_24px_1fr] gap-0 items-start">
      <div className="pr-6 text-right">{nate ? <NateEntry /> : <div className="h-1" />}</div>
      <div className="flex justify-center pt-1.5"><CenterDot /></div>
      <div className="pl-6 text-left">{google ? <GoogleEntry /> : <div className="h-1" />}</div>
    </div>
  );
})}
```

### Hotspot timing thresholds
```ts
// In onUpdate:
if (p >= T_HOTSPOT_SHOW && !heroDoneRef.current) {
  heroDoneRef.current = true;
  setHeroDone(true);
}
if (p < T_HOTSPOT_HIDE && heroDoneRef.current) {
  heroDoneRef.current = false;
  setHeroDone(false);
}
if (p >= T_DONE) {
  document.getElementById("persistent-ui")?.classList.remove("hero-hidden");
}
// onEnterBack: only manages persistent-ui, NOT heroDone
```

### Three-layer glow pattern (used everywhere now)
```tsx
// Tight / Mid / Wide — adapt rgba values to the color
textShadow: "0 0 8px rgba(R,G,B,0.8), 0 0 20px rgba(R,G,B,0.5), 0 0 40px rgba(R,G,B,0.25)"
boxShadow:  "0 0 8px rgba(R,G,B,0.9), 0 0 20px rgba(R,G,B,0.5), 0 0 40px rgba(R,G,B,0.25)"

// Color palette for this pattern:
// Red:    #E53935 / rgba(229,57,53,…)
// Blue:   #4285F4 / rgba(66,133,244,…)
// Purple: #9B59D0 / rgba(155,89,208,…)  ← the visual midpoint of red+blue
// Gold:   #D4A853 / rgba(212,168,83,…)
```

---

## Common Gotchas

1. **`pointer-events: none` inheritance in GSAP-pinned sections** — When GSAP sets a section to `position: fixed` during pin, it creates a new stacking context. Always put `pointerEvents: 'auto'` on the wrapper `div` AND the inner interactive element, not just the inner element.

2. **Timeline data symmetry** — The `allYears` array includes years with only one side (e.g. 2003 Nate-only, 2004 Google-only). These render as empty `<div className="h-1" />` on the empty side. Don't remove these years from the data — they're real history. The `h-1` placeholder keeps row heights stable.

3. **SERP fact snippet `col-span-3`** — The Google fact dropdown is inside the year-row `grid-cols-[1fr_24px_1fr]` grid as a `col-span-3` element. It only works because the parent grid renders it as the 4th grid item (after left, center, right). Don't add more sibling divs inside the row without accounting for this.

4. **ScrollProgress section order must match `app/page.tsx`** — The SECTIONS array in `ScrollProgress.tsx` must be in DOM render order, not alphabetical or conceptual order. Current order: hero → parallel → social → spark → maker → systems → curator → google.

5. **`T_DONE` vs `T_HOTSPOT_SHOW` are independent** — Hotspots show at 0.62, persistent UI (AudioPlayer, AgentSidebar) unlocks at 0.995. Don't merge these. `onEnterBack` must NOT touch `heroDone` — let `onUpdate` handle it.

6. **Glowy colors are inline styles, not Tailwind** — Tailwind 4's `@theme` block doesn't support `textShadow`. Any new glow effects must use `style={{ textShadow: "..." }}`. Don't try to add them to `globals.css @theme` — it breaks the build.

---

## Multi-Agent Session Notes (important for future sessions)

This session ran with **multiple Claude Code agent panes open in parallel**. Key behavior observed:
- Changes made in one agent pane are NOT visible to other panes in the same conversation
- The parallel pane committed `HeroScrollCanvas.tsx` (batch loading) at the same time this session modified it (hotspot thresholds) — both changes survived because they touched different lines
- `git status` is the source of truth for what's uncommitted. Always run it before assuming your changes are the only pending ones.
- The `ScrollProgress` and `MobileNav` changes from this session were still uncommitted when the parallel agent committed everything else — they need to be committed separately.

---

## What's NOT Built Yet

| Item | Notes |
|------|-------|
| Hero hotspot coordinate recalibration | Coordinates hardcoded for ~16:9 viewport; objects shift on 4:3 or ultrawide. Visual debug mode not yet built. |
| Timeline mobile layout | Unified year-row grid is desktop-only (hidden divider line on mobile). Mobile stacks columns sequentially — consider a tabbed or accordion mobile layout. |
| WhyGoogle body copy | "One could say I was born for it..." is a teaser line only. Full section body copy still needed. |
| TheSpark placeholder copy | `[Placeholder — Nate to rewrite]` still in `TheSpark.tsx:75` |
| `/agentsync` skill | Discussed but not built — would sync knowledge/context across parallel agent panes |

---

## Build Verification

```bash
# TypeScript clean compile
npx tsc --noEmit

# Dev server
npm run dev

# Check section nav order matches page order
# In ScrollProgress.tsx SECTIONS array, verify order matches app/page.tsx render order:
# hero → parallel → social → spark → maker → systems → curator → google
```
