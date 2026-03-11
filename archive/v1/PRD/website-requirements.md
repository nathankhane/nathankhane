# Personal Brand Website — Product Requirements Document (PRD)
*(for Cursor reference — stripped of CLI / tooling steps)*

## 1. Vision & Objectives

**Flagship hub** for the Khane brand that unifies consulting, creative work, music, and thought-leadership.

**Deal-flow engine** that converts visitors into discovery-call bookings or newsletter subscribers.

**Proof of mastery** through dynamic case studies rather than static project lists.

**Audience magnet** with binge-worthy essays, videos, and music that earn organic traffic and deepen community.

## 2. Core Audiences & Jobs-To-Be-Done

| Segment | What they're looking for | Primary Call-to-Action |
|---------|-------------------------|------------------------|
| SaaS founders & execs | Narrative-driven growth, PR firepower | "Book a Growth Story Audit" |
| Musicians & creators | Brand / release strategy coaching | "Apply for Creative Coaching" |
| Recruiters & partners | Quick credibility snapshot | "Download Media Kit" |
| Fans & community | Music, essays, behind-the-scenes | "Join Business ≡ Poetry Newsletter" |

## 3. Brand Narrative

**Theme:** Business ≡ Poetry — every venture is a verse, every metric a rhyme.

**Voice:** Confident, candid, forward-thinking; merges analytical clarity with lyrical flair.

**Visual Motifs:**
- Dark "ink-black" canvas contrasted by "parchment-white" surfaces.
- Electric-cyan accent for interactive states and calls-to-action.
- Subtle motion (fade, parallax) to evoke creative "flow."

## 4. Information Architecture

### Primary Navigation
- **Home** — cinematic hero + core value props
- **Work With Me** (services)
- **Portfolio** — filterable case studies (Music, Client Campaigns, Startups, Reels)
- **Business ≡ Poetry** (blog / essays)
- **About** — Birkman-informed founder story
- **Contact** — Calendly embed, media-kit download

### Cross-page Elements
- Persistent Theme Toggle (dark / light / system).
- Start a Project CTA visible on every page.
- Footer with social links (TikTok, YouTube, Spotify, LinkedIn).

## 5. Key Features

| Feature | Brief Description |
|---------|------------------|
| Cinematic Hero | Animated headline cycling through "Founder. Storyteller. Artist." culminating in "Business ≡ Poetry." |
| Interactive Case-Study Cards | Hover reveals KPI overlay (e.g., "TrustedApp: 300% email-list growth"). |
| Blog Feed | Auto-pulls latest Substack posts; supports MDX for rich media. |
| Music / Video Hub | Inline audio player plus embedded YouTube shorts & TikTok reels. |
| Credibility Bar | Auto-scrolling strip of press / podcast logos. |
| Lead Magnet | Pop-up offering "3-Minute Storytelling Canvas" PDF for email capture. |
| Custom 404 | On-brand "Lost in the poetry" not-found page. |

## 6. Design System

| Token | Value / Guidance |
|-------|-----------------|
| Neutrals | Slate palette for base grays (cool undertone). |
| Accent | #4F8DFD trusting blue. |
| Dark BG | #0F0F0F ink-black. |
| Light BG | #FAF9F7 parchment-white. |
| Typography | Oversized modern serif for headlines; monospaced or clean sans for body. |
| Motion | Framer-motion fades, subtle parallax; no intrusive animations. |

**Accessibility target:** WCAG AA contrast on both light and dark themes.

## 7. Content Strategy

| Pillar | Examples |
|--------|----------|
| Strategic Storytelling | Case studies, teardown posts on narrative-driven growth. |
| Creator Empathy | Studio diaries, music release breakdowns. |
| Operator Credibility | Essays on SaaS ops, consulting wins, Birkman insights for teams. |
| Faith & Vision | Occasional reflective poetry tying mission to spirituality. |

*Each post internally links to a relevant service or portfolio item to drive conversion.*

## 8. Success Metrics (KPIs)

| Metric | Initial Target |
|--------|---------------|
| Discovery-call bookings | ≥ 10 per month |
| Newsletter sign-ups | 200 in first quarter |
| Avg. session duration | > 2 minutes |
| Portfolio card clicks | ≥ 25% of visitors |

## Deliverable Summary for Cursor

**Pages to scaffold:** `/` `work-with-me` `portfolio` `blog` `about` `contact` plus custom 404.

**Theme tokens & colors:** as specified in Design System section.

**Components to include:** theme toggle, cinematic hero, interactive case-study card, newsletter modal, credibility bar, audio/video embeds.

**Global CTAs:** "Start a Project" button, newsletter signup, discovery-call links.

*This document supplies the thematic direction, architecture, and feature set Cursor needs to generate the initial codebase and component stubs.* 