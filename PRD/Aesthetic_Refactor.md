Personal Site Aesthetic Pivot – Product Requirements Document

Project Code: NK-POR-REDESIGN-2025Q3
Owner: Nathan Khane (nathankhane.com)
Author: ChatGPT‑o3
Version: 0.1  |  Last Updated: 2025‑06‑25

1  Objective

Pivot the visual identity of nathankhane.com to blend its current modern, animated structure with the calm, editorial feel of cofounders.com while introducing a natural cherry‑red palette. The redesign must preserve existing page routes and core content so links, SEO equity, and user flow remain intact.

2  Background & Rationale

Current state: High‑energy, tech‑marketing aesthetic with bright whites, pure‑black text, and dynamic animations.

Inspiration: cofounders.com—generous whitespace, narrow content column, minimal motion, muted color palette.

Why now: Position the site as both a sales funnel (for freelance/consulting leads) and a creative showcase that feels organic and personal, reflecting Nathan’s brand voice.

3  Scope

In Scope

Out of Scope

🎨 Global color & typography update

Adding/removing pages or routes

🖼 Hero layout & animation tweak

CMS/back‑end changes

🧩 Component restyling (buttons, cards, nav)

Net‑new user flows

⚙️ Tailwind & GSAP config updates

Major copy rewrites

📄 MDX/article template spacing

New integrations/APIs

4  Success Metrics

Bounce‑rate decreases by ≥ 15 % within 30 days of launch.

Avg. time‑on‑page ≥ 90 seconds.

Primary CTA (Book Call) CTR ↑ 30 %.

Qualitative feedback ≥ 4.5 / 5 “visual appeal” score in user survey (n ≥ 15).

5  Personas

Persona

Goal

Key Need

Founder‑Client

Find a charismatic consultant who “gets” storytelling & growth.

Immediate credibility + frictionless booking.

Recruiter / Hiring Mgr

Validate Nathan’s past wins & creative chops.

Clear case studies & easy contact path.

Creative Collab

Assess vibe for a potential music/poetry collab.

Authentic voice & portfolio depth.

6  User Stories (abridged)

As a founder, I want a concise hero statement that hooks me so I scroll deeper.

As a recruiter, I need the Services section to outline offerings in ≤ 30 sec read.

As a creative, I want visual cues (color, type, imagery) that feel warm and human, so I trust the brand.

7  Requirements

7.1  Functional

 ID 

Requirement

Acceptance Criteria

 F‑01

Maintain existing routes (/, /about, /services, /writing, /book)

100 % of prod URLs remain valid post‑launch.

 F‑02

Hero animation switches from typing effect → 3‑word fade‑in (≤ 2 s)

Performance budget ≤ 100 KB JS added.

 F‑03

Primary CTA uses cherry outline → solid on hover

WCAG AA contrast maintained.

7.2  Visual Design

Token

Hex

Usage

primary‑cherry

#8E2D34

Links, filled buttons

primary‑cherry‑dark

#5B1E23

Hover/active

cream‑paper

#FAF7F5

Body bg

stone‑ink

#1E1E1E @90 %

Body text

Typography: Charter (serif) for H1/H2, Inter for body.

7.3  Non‑Functional

Performance: ≥ 95 Lighthouse score mobile.

Accessibility: All interactive elements reachable via keyboard; color contrast AA.

SEO: No drop in indexed pages.

8  Style Guide Snippets

// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'primary-cherry': '#8E2D34',
        'primary-cherry-dark': '#5B1E23',
        'cream-paper': '#FAF7F5',
        'stone-ink': '#1E1E1E'
      },
      fontFamily: {
        serif: ['Charter', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  }
}

// heroAnimation.ts (GSAP)
import { gsap } from 'gsap';
export const heroAnimation = () => {
  gsap.fromTo('[data-fade]', { opacity: 0, y: 20 }, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: 'power1.out'
  });
};

9  Milestones & Timeline (flexible for Cursor sprint)

 Date

Deliverable

T + 0

PRD approved & merged into /docs

T + 3 d

Tailwind + global CSS palette updated (Preview URL)

T + 6 d

Hero component refactored; GSAP in place

T + 10 d

Section spacing + typography audit complete

T + 13 d

Cross‑device QA + accessibility pass

T + 14 d

Deploy to production

10  Risks & Mitigations

Risk

Impact

Mitigation

Color accessibility failure

Legal/UX issues

Use Figma contrast plugin + manual checks.

Perceived regression in “modern” feel

Bounce rate ↑

Keep subtle micro‑interactions (nav underline, card hover).

11  Claude Code × Cursor Tips

Use region blocks to isolate AI‑expandable areas:

//#region CLAUDE: hero‑component‑stub
export default function Hero() {
  // TODO: Claude, flesh out component per PRD F‑02.
}
//#endregion

Prompt hinting – add inline comments like // CC: NEED 3‑WORD FADE‑IN TIMELINE so Claude prioritizes that.

Conversation grounding – keep this PRD at /docs/personal_site_prd.md; reference its slug in Claude prompts to give it context.

One‑shot generation – ask Claude to “generate full Tailwind classes only” to avoid noisy boilerplate.

12  Appendix

Inspiration screenshots: /public/inspo/ (to be added)

Unused ideas backlog: parallax scroll, dark‑mode toggle, newsletter modal.

