# Design System Reference — nathankhane.com

_Last updated: April 1, 2026_

> Extracted from live site audit (March 2026). Use this as the authoritative source for all styling decisions when building new pages/components.

---

## Tech Stack

- **Next.js** (App Router) — `app/` directory structure, React Server Components
- **Tailwind CSS v4.1.8** — utility-first, custom theme in CSS `@layer theme`
- **Vercel** deployment
- **8 custom fonts** loaded via `next/font` (see Fonts section)

---

## Color Tokens

All defined as CSS custom properties in `@layer theme`:

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-ink` | `#0a0e17` | Page background, deep backgrounds |
| `--color-cream` | `#f5f0eb` | Primary text color |
| `--color-gold` | `#d4a853` | Accent, highlights, CTAs, active states |
| `--color-gold-muted` | `#a07830` | Secondary gold |
| `--color-surface` | `#131929` | Card backgrounds |
| `--color-surface-elevated` | `#1c2333` | Elevated card backgrounds |
| `--color-google-blue` | `#4285f4` | Google brand blue |
| `--color-google-red` | `#ea4335` | Google brand red |
| `--color-google-yellow` | `#fbbc05` | Google brand yellow |
| `--color-google-green` | `#34a853` | Google brand green |

### Opacity Patterns

These are the most commonly used opacity combinations across the site:

**Text:**
- `text-cream` — headings, primary
- `text-cream/90` — strong body
- `text-cream/80` — secondary heading in timeline
- `text-cream/75` — body paragraphs
- `text-cream/70` — metadata, descriptions
- `text-cream/60` — tertiary, placeholders, dates
- `text-cream/50` — footer, very subtle text
- `text-gold` — active nav, CTA text
- `text-gold/60` — section labels (uppercase monospace)
- `text-gold/70` — secondary gold labels
- `text-google-blue/60` — Google team labels
- `text-google-blue/70` — Google tech pills
- `text-google-green/60` — Google team labels (alt)

**Borders:**
- `border-white/10` — standard card borders
- `border-white/5` — subtle row dividers
- `border-white/[0.06]` — list item dividers
- `border-gold/40` — featured card borders
- `border-gold/20` — gold accent borders
- `border-gold/30` — hover state borders
- `border-l-gold/50` — left accent border (featured cards)
- `border-l-cream/20` — left accent border (secondary cards)
- `border-l-google-blue/30` — left accent border (Google-themed)

**Backgrounds:**
- `bg-ink` — page-level
- `bg-ink/60` — card backgrounds (semi-transparent)
- `bg-surface` — card backgrounds (opaque)
- `bg-surface-elevated` — elevated cards
- `bg-surface/80` — backdrop-blur cards
- `bg-white/[0.04]` — active list item highlight
- `bg-white/[0.02]` — hover state for list items
- `bg-gold/5` — gold pill background
- `bg-google-blue/5` — blue pill background
- `bg-google-green/5` — green pill background
- `bg-cream/5` — subtle icon backgrounds

---

## Font Families

| CSS Variable | Font | Tailwind Class | Usage |
|---|---|---|---|
| `--font-outfit` | Outfit | `font-sans`, `font-display` | Primary display + body |
| `--font-google-sans-code` | Google Sans Code | `font-mono` | Monospace labels, metadata, code |
| `--font-instrument-serif` | Instrument Serif | (custom class) | Hero section italic |
| `--font-fraunces` | Fraunces | (custom class) | Spark section headings |
| `--font-space-grotesk` | Space Grotesk | (custom class) | Systems section headings |
| `--font-syne` | Syne | (custom class) | Audio section headings |
| `--font-cormorant` | Cormorant | (custom class) | Timeline section |
| `--font-dm-serif-display` | DM Serif Display | (custom class) | Curator section headings |

### Font display classes (from CSS)

```css
.font-display {
  font-family: var(--font-outfit), "Outfit", system-ui, sans-serif;
  letter-spacing: -0.02em;
  font-weight: 700;
}

.font-mono {
  font-family: var(--font-google-sans-code), "Google Sans Code", "Courier New", monospace;
  font-weight: 400;
}
```

---

## Typography Patterns (copy these exactly)

### Section Label
```html
<span class="text-xs font-mono text-gold/60 tracking-[0.2em] uppercase">Section Name</span>
```

### Section Heading
```html
<h2 class="mt-4 text-3xl sm:text-4xl md:text-5xl font-display text-cream leading-tight text-balance">
  Heading Text
</h2>
```

### Body Paragraph
```html
<p class="text-cream/75 leading-relaxed text-sm">Body text here.</p>
```

### Monospace Metadata (tiny)
```html
<p class="text-[10px] font-mono text-cream/70">Metadata text</p>
```

### Card Title
```html
<div class="text-sm font-display text-cream">Card Title</div>
```

### Date/Time Labels
```html
<div class="text-xs font-mono text-cream/60">June 2025 — Present</div>
```

### Gold Accent Label
```html
<div class="text-xs font-mono text-gold/70">Label Text</div>
```

---

## Layout Patterns

### Page Container
```html
<div class="max-w-6xl mx-auto px-6">
```

### Narrower Content Container (for resume readability)
```html
<div class="max-w-4xl mx-auto px-6">
```

### Section Padding
```html
<section class="relative py-24 md:py-36 overflow-hidden">
```

### Card (standard)
```html
<div class="rounded-2xl border border-white/10 bg-ink/60 p-6">
```

### Card (elevated)
```html
<div class="rounded-2xl border border-white/10 bg-surface-elevated p-6">
```

### Card (with left accent — featured)
```html
<div class="rounded-2xl border border-white/10 bg-ink/60 p-6 border-l-2 border-l-gold/50">
```

### Card (with left accent — secondary)
```html
<div class="rounded-2xl border border-white/10 bg-ink/60 p-6 border-l-2 border-l-cream/20">
```

### Row Divider
```html
<div class="border-b border-white/5">
```

### Tech/Skill Pill (neutral)
```html
<span class="text-xs font-mono border rounded-full px-3 py-1 text-cream/60 border-cream/20 bg-cream/5">
  Skill Name
</span>
```

### Tech/Skill Pill (Google Blue)
```html
<span class="text-xs font-mono border rounded-full px-3 py-1 text-google-blue/70 border-google-blue/20 bg-google-blue/5">
  Skill Name
</span>
```

### Tech/Skill Pill (Google Green)
```html
<span class="text-xs font-mono border rounded-full px-3 py-1 text-google-green/70 border-google-green/20 bg-google-green/5">
  Skill Name
</span>
```

### Tech/Skill Pill (Gold)
```html
<span class="text-xs font-mono border rounded-full px-3 py-1 text-gold/80 border-gold/30 bg-gold/5">
  Skill Name
</span>
```

---

## Animation Patterns

### Scroll-triggered fade-up (default)
```tsx
// Initial state (set inline or via ref)
style={{ opacity: 0, transform: 'translateY(28px)' }}

// Animated state (add via Intersection Observer)
style={{ opacity: 1, transform: 'translateY(0)', transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
```

### Scroll-triggered scale-in (cards)
```tsx
// Initial
style={{ opacity: 0, transform: 'translateY(20px) scale(0.97)' }}

// Animated
style={{ opacity: 1, transform: 'translateY(0) scale(1)' }}
```

### Staggered pill reveal
```tsx
// Each pill gets increasing delay
style={{ opacity: 0, transform: 'translateY(6px) scale(0.95)', transitionDelay: `${index * 50}ms` }}
```

### Line draw (gold divider)
```tsx
// Initial
style={{ transformOrigin: 'left', transform: 'scaleX(0)' }}

// Animated
style={{ transform: 'scaleX(1)', transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
```

---

## Shadows (custom)

```css
.shadow-navy-sm  { box-shadow: 0 2px 8px rgba(10, 14, 23, 0.6); }
.shadow-navy-md  { box-shadow: 0 4px 16px rgba(10, 14, 23, 0.7); }
.shadow-navy-lg  { box-shadow: 0 8px 32px rgba(10, 14, 23, 0.7); }
.shadow-gold-glow { box-shadow: 0 0 40px rgba(212, 168, 83, 0.08); }
.shadow-gold-glow-md { box-shadow: 0 0 24px rgba(212, 168, 83, 0.12); }
```

---

## Background Setup (for new pages)

Every page needs the same fixed background as the homepage:

```tsx
{/* Fixed space background */}
<div
  aria-hidden="true"
  className="fixed"
  style={{
    top: '-12%', left: '-12%', right: '-12%', bottom: '-12%',
    backgroundImage: "url('/images/space-bg.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: -2,
    willChange: 'transform',
    pointerEvents: 'none',
  }}
/>
```

The `<body>` already has `className="text-cream antialiased min-h-screen font-sans"` from the layout, so child pages inherit these.

---

## Scrollbar Styling

```css
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #0a0e17; }
::-webkit-scrollbar-thumb { background: #d4a853; border-radius: 2px; }
```

## Focus Styling

```css
:focus-visible {
  outline: 2px solid #d4a853;
  outline-offset: 2px;
}
```

## Custom Cursor

The site hides the system cursor on fine pointer devices:
```css
@media (pointer: fine) { * { cursor: none !important; } }
```
This is handled globally — new pages inherit it automatically.
