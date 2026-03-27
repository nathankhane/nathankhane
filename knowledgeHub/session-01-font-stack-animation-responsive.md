# Session 01 — Font Stack, Hero Animation Upscale, Responsive Pass, Parallax Tuning

## What Was Built

- **Sitewide font stack replacement**: Instrument Serif + DM Sans → Outfit (base/display), Instrument Serif (hero italic only), Google Sans Code (mono)
- **Font comparison experiment**: 7 fonts loaded simultaneously across sections (Fraunces, Space Grotesk, Syne, Cormorant Garamond, DM Serif Display, Outfit) so user could compare visually. Outfit was chosen. All others bookmarked as CSS classes.
- **Hero animation upscale**: 193 JPG frames (1280×712, 24fps) → 383 WebP frames (1928×1072, 48fps via minterpolate optical flow interpolation)
- **SpaceBackground parallax**: Dramatically increased mouse movement range, spring responsiveness, and added scroll-linked vertical drift
- **Responsive/touch audit**: Fixed AudioPlayer touch targets, AgentCTA footer link sizing, SocialArchitect TikTok embed overflow
- **Two new skills created**: `/uniformity` (sitewide attribute propagation) at `~/.claude/skills/uniformity/SKILL.md`; updated `/scroll-animation` and `/animate` with frame optimization sections

---

## Critical Architecture Decisions

### Font Loading Strategy — next/font/google only, no CSS @import
Google Fonts must be loaded via `next/font/google` declarations in `app/layout.tsx`, NOT via `@import url(...)` in `globals.css`. CSS `@import` must be the first rule in a CSS file — placing it after any `@theme` or other rule causes a build error. The `<link>` tag approach (in `<head>`) works as a fallback for fonts not yet in the next/font/google registry (e.g. Google Sans Flex, opened Nov 2025).

### Google Sans Flex — not yet in next/font/google registry
Google Sans Flex was open-sourced in Nov 2025 and is not yet in Next.js's font metrics database. `adjustFontFallback: false` is required on `Google_Sans_Code` to suppress the metrics warning. Google Sans Flex is bookmarked as commented-out `<link>` tags in `layout.tsx` for when it becomes available.

### Font propagation — update @theme token, not individual components
The correct pattern for sitewide font changes is:
1. Declare the font in `layout.tsx` with `next/font/google`
2. Update `--font-sans` / `--font-display` / `--font-mono` in the `@theme` block in `globals.css`
3. Update the `.font-display` utility class in `globals.css`
4. Update `body { font-family: ... }` in `globals.css`
Never touch individual component files unless the component has a hardcoded `font-[family-name:var(--font-xxx)]` override.

### Hero animation frame count — constants must match actual frame files
`HeroScrollCanvas.tsx` has 5 constants that all derive from the frame count. If frame count changes, update ALL of them:
- `TOTAL_FRAMES` — total number of frame files
- `FRAME_END_IDX` — last frame index (0-based = TOTAL_FRAMES - 1)
- `FRAME_START_IDX` — first usable frame (skip fully-dark opening frames)
- `EFFECTIVE_FRAMES` — `FRAME_END_IDX - FRAME_START_IDX`
- `FRAME_PATH` — file extension must match actual files (`.webp` vs `.jpg`)

### Framer Motion value combining — use useTransform array form
To combine two MotionValues (e.g. mouse spring + scroll drift), you cannot add them directly. Use:
```typescript
const combined = useTransform([valueA, valueB], ([a, b]: number[]) => a + b);
```
Single-input `useTransform(value, [0, 1], [0, -60])` cannot be directly added to a spring value.

### ffmpeg on this machine — no libwebp encoder
ffmpeg 8.1 (Homebrew) on this machine is NOT compiled with libwebp support. The two-step workaround:
1. Extract with `mjpeg` encoder: `ffmpeg -i input.mp4 -vf "minterpolate=..." -c:v mjpeg -q:v 2 frame-%03d.jpg`
2. Batch convert with `cwebp`: `ls /tmp/frames/*.jpg | xargs -P 8 -I{} sh -c 'cwebp -q 88 "$1" -o "${1%.jpg}.webp"' _ {}`
Then move WebP files to `public/hero-frames/`.

---

## Project Structure (session-relevant files)

```
app/
  layout.tsx            ← All next/font/google declarations; font CSS variables injected here
  globals.css           ← @theme block with --font-sans/display/mono tokens; .font-display utility; section-specific font bookmarks
  page.tsx              ← 9-section scroll narrative (unchanged this session)

components/
  SpaceBackground.tsx   ← Mouse parallax + scroll drift combined; dramatically increased range
  AudioPlayer.tsx       ← Touch targets bumped to 44px+ (WCAG compliance)
  sections/
    HeroScrollCanvas.tsx  ← Frame constants updated for 383 WebP frames at 48fps
    AgentCTA.tsx          ← Footer links got py-2 px-1 touch padding
    SocialArchitect.tsx   ← TikTok embed: maxWidth uses min(), minWidth: "0" for narrow viewports

public/
  hero-frames/          ← 383 WebP frames, 1928×1072, 48fps interpolated (frame-001.webp → frame-383.webp)

heroAnimation/
  freepik_starting-from-the-clean-portrait-of-the-man-agains_kling_1080p_16-9_24fps_14389.mp4
                        ← Source video (24fps, 1928×1072). Keep this; it's the remaster source.

~/.claude/skills/
  uniformity/SKILL.md   ← New global skill: sitewide design attribute propagation
  scroll-animation/SKILL.md  ← Updated: STEP 0 frame extraction + optimization
  animate/SKILL.md      ← Updated: Animation Asset & Resolution Optimization section
```

---

## Key Patterns with Code Examples

### Font Declaration in layout.tsx
```typescript
import { Outfit, Google_Sans_Code, Instrument_Serif } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-outfit",
  display: "swap",
});

const googleSansCode = Google_Sans_Code({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-google-sans-code",
  display: "swap",
  adjustFontFallback: false, // suppress metrics warning — font too new for Next.js DB
});

// In <html> className:
className={[outfit.variable, googleSansCode.variable, instrumentSerif.variable].join(" ")}
```

### @theme token update in globals.css
```css
@theme {
  --font-sans:    var(--font-outfit), "Outfit", system-ui, sans-serif;
  --font-display: var(--font-outfit), "Outfit", system-ui, sans-serif;
  --font-mono:    var(--font-google-sans-code), "Google Sans Code", "Courier New", monospace;
}

body {
  font-family: var(--font-outfit), "Outfit", system-ui, sans-serif;
}

/* Base display utility */
.font-display {
  font-family: var(--font-outfit), "Outfit", system-ui, sans-serif;
  font-weight: 700;
  font-style: normal;
  letter-spacing: -0.02em;
}

/* Section-specific bookmarks — NOT active, just preserved for future A/B */
.font-display-hero     { font-family: var(--font-instrument-serif), Georgia, serif; font-weight: 400; font-style: italic; }
.font-display-spark    { font-family: var(--font-fraunces), Georgia, serif; font-weight: 600; }
.font-display-systems  { font-family: var(--font-space-grotesk), system-ui, sans-serif; font-weight: 700; }
/* ... etc */
```

### HeroScrollCanvas frame constants
```typescript
const TOTAL_FRAMES = 383;
const FRAME_PATH = (n: number) =>
  `/hero-frames/frame-${String(n).padStart(3, "0")}.webp`;
const FRAME_END_IDX   = 382; // frame 383 = normal Nate (start of scroll) — fully lit
const FRAME_START_IDX = 11;  // frame 12 = first fully-glowing frame (end of scroll)
const EFFECTIVE_FRAMES = FRAME_END_IDX - FRAME_START_IDX; // 371
```

### SpaceBackground — combined mouse + scroll parallax
```typescript
// Mouse spring
const bgX = useSpring(mouseX, { damping: 38, stiffness: 90, mass: 2.2 });
const bgY = useSpring(mouseY, { damping: 38, stiffness: 90, mass: 2.2 });

// Scroll vertical drift
const { scrollYProgress } = useScroll();
const scrollDriftY = useTransform(scrollYProgress, [0, 1], [0, -60]);

// Combine — cannot add MotionValues directly
const combinedY = useTransform([bgY, scrollDriftY], ([a, b]: number[]) => a + b);

// Background image — 12% overflow on all edges to cover movement
<motion.div style={{ x: bgX, y: combinedY, inset: "-12%" }} />

// Mouse handler — ±35px x, ±22px y range
const handleMouseMove = (e: MouseEvent) => {
  const xRatio = (e.clientX / window.innerWidth - 0.5) * 2;
  const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;
  mouseX.set(xRatio * -70); // ±35px effective
  mouseY.set(yRatio * -44); // ±22px effective
};
```

### Touch target compliance (WCAG 44×44px minimum)
```tsx
// AudioPlayer play button
<button className="w-11 h-11 ...">  {/* 44px × 44px */}

// AudioPlayer prev/next/volume
<button className="p-2.5 ...">  {/* ~40px touch area */}

// AgentCTA footer links
<a className="... py-2 px-1">  {/* 8px vertical padding = adequate touch height */}
```

### TikTok embed — prevent narrow viewport overflow
```tsx
<div style={{ maxWidth: "min(325px, 100%)" }}>
  <blockquote style={{ maxWidth: "min(325px, 100%)", minWidth: "0" }} />
</div>
```

---

## Environment Variables

No new env vars introduced this session.

Existing required vars:
- `ANTHROPIC_API_KEY` — needed for `/api/chat` route (AI agent). Set in Vercel dashboard.

---

## Common Gotchas

1. **Never put `@import` after any rule in globals.css** — CSS spec requires @import first. Use `<link>` in `<head>` instead, or the next/font/google variable approach.

2. **Clearing .next cache after font changes** — Stale build cache causes `ENOENT: .next/required-server-files.json`. Fix: `rm -rf .next` then restart dev server.

3. **ffmpeg on this machine has no libwebp** — Always use the two-step mjpeg → cwebp approach. Do NOT attempt `-c:v libwebp` with the Homebrew ffmpeg 8.1 install.

4. **HeroScrollCanvas: scroll direction is inverted** — Scrolling DOWN shows the animation going FROM glowing face TO normal face. `FRAME_END_IDX` is the "start of scroll" (fully glowing = frame 383), `FRAME_START_IDX` is the "end of scroll" (normal Nate = frame 12). If you add frames, re-identify these by manually inspecting frame images.

5. **`adjustFontFallback: false` is required for Google Sans Code** — Without it, Next.js logs a non-fatal warning every build. It's harmless but noisy. Always add this for fonts not in the Next.js metrics DB.

6. **Font CSS classes vs Tailwind utilities** — `font-display` is a custom CSS class (not a Tailwind utility). `font-sans`, `font-mono` ARE Tailwind utilities (driven by `--font-sans`/`--font-mono` in @theme). Don't confuse them when adding new font utilities.

7. **next/font/google `variable` field must be a CSS custom property name** — e.g. `"--font-outfit"`, not `"outfit"`. The variable becomes available globally on `<html>`.

8. **npm installs require `--legacy-peer-deps`** — @anthropic-ai/sdk has peer dep conflicts. Always: `npm install --legacy-peer-deps`.

---

## What's NOT Built Yet

| Feature | Notes |
|---|---|
| `/public/audio/` MP3 tracks | 3 Mike McNeil session recordings needed |
| `/public/images/bridge/` | Bridge platform screenshots |
| `/public/resume.pdf` | Downloadable resume |
| Real TikTok video IDs | Currently placeholder IDs in `SocialArchitect.tsx` |
| `ANTHROPIC_API_KEY` in Vercel | Set in dashboard before launch |
| Medium-severity responsive issues | AgentSidebar keyboard overflow, TitleCard sm padding, TheSpark text breakpoints |
| Easter egg QA pass | All 10 in `lib/easter-eggs.ts` need verification |
| Google Sans Flex | Not yet in next/font/google — check monthly |

---

## Build Verification

```bash
# TypeScript — must be zero errors
cd "path/to/nathankhane"
npx tsc --noEmit

# Dev server
npm run dev
# Visit localhost:3000
# - Hero scroll animation should scrub smoothly (383 frames)
# - Space background parallax should move dramatically on mouse
# - AudioPlayer transport buttons should have large tap areas on mobile

# Confirm frame files
ls public/hero-frames/ | wc -l  # should output 383
ls public/hero-frames/frame-001.webp  # should exist (WebP, not JPG)
ls public/hero-frames/frame-383.webp  # should exist

# Production build (uses Vercel Node 18/20 — no --ignore-scripts needed)
npm run build
```

---

## UI Theme Decisions This Session

| Token | Before | After |
|---|---|---|
| `--font-sans` | DM Sans | Outfit |
| `--font-display` | Instrument Serif | Outfit (hero gets `.font-display-hero` override) |
| `--font-mono` | JetBrains Mono | Google Sans Code |
| Hero section h1 | `font-display` (Instrument Serif) | `.font-display-hero` (Instrument Serif italic) — same visual result |
| All other section h2 | Various per-section fonts | `font-display` (Outfit 700, `letter-spacing: -0.02em`) |
| SpaceBackground mouse range | ±15px x, ±10px y | ±35px x, ±22px y |
| SpaceBackground spring | damping 55, stiffness 75, mass 1.8 | damping 38, stiffness 90, mass 2.2 |
| Hero frames | 193 JPG, 1280×712, 24fps | 383 WebP, 1928×1072, 48fps |
