PRD – Nathan Khane Morales Personal Brand Site (v2)

(Reference document for Cursor build tasks)

1. Goal & Success Criteria
Objective	KPI	Target
Convert visitors into discovery-call bookings	Calendly bookings / mo	≥ 10
Grow branded audience	Substack sign-ups in 90 days	200
Showcase proven work	Avg. portfolio-card clicks	≥ 25 % of sessions
Maintain instant load feel	Desktop LCP	< 1.5 s

2. Information Architecture
Tier	Route	Purpose	Header?
Primary	/ Home	Hero, rotating taglines, latest essays, logo strip	✅
/portfolio	Case-study grid + TikTok reels	✅
/work-with-me	Service cards + prices + Calendly CTAs	✅
Secondary	/about	Long-form bio (≥600 words)	Footer
/blog	Substack RSS feed	Footer
/404	Custom "Lost in the poetry"	—

Header only shows 3 items; all others reachable via footer or in-page links.

3. Brand & Voice
Theme: Business ≡ Poetry.

Tone: Charismatic, candid, empathy-first.

Visual Identity:

Neutral palette → Slate gray scale.

Accent → #4F8DFD trusting blue.

Dark / Light toggle (class-based).

Typography: Serif (headlines), clean sans (body); 80 ch max width.

Animations: Framer Motion fades & 30 px slide-ups < 300 ms; hero tagline cycles with typewriter effect (4–6 slogans).

4. Feature Requirements
Feature	Notes
Hero Section	H1 + typewriter cycling through inspiration lines list.
Rotating Taglines	Use provided list; random pick on each page load.
CaseStudyCard cmp.	Image, 40-word blurb, KPI grid (2–3 metrics).
Portfolio Items	TrustedApp, WSA, Reseeit, Intro to Modern Moguls (+ existing).
Substack Integration	Home subscribe iframe + /blog RSS list + 3 latest on home.
Calendly Widget	Inline on /work-with-me or dedicated /contact section.
LogoStrip	Real logos (Wolff Center, YC Startup School, podcasts, etc.).
Footer SocialLinks	Instagram, TikTok, Substack icons + minimal about blurb.

5. Content Requirements
5.1 Bio (About page)
Charismatic "social-genius" narrative; weave in empathy, Wolff Center origin, TrustedApp, music, superpower of turning ideas into stories. ≥ 600 words.

5.2 Services (Work-with-me page)
Service	Short Pitch	Price Hint	Calendly UTM
Growth Story Audit	90-min narrative teardown	from $750	growth-audit
Creative Coaching	4-wk mentorship for artists	from $1.2k	coaching
GTM Sprint	2-wk positioning + funnel build	custom	gtm-sprint

5.3 Portfolio new entries
Reseeit — expense-receipt compiler (Wolff Center project).

Intro to Modern Moguls — live panel, produced & marketed.

Add hero images (/images/reseeit.jpg, /images/momo.jpg) and KPIs (users, attendees, etc.).

6. Technical & SEO
Stack: Next.js 14, Tailwind, shadcn/ui, Contentlayer MDX, Plausible.

Performance: Image → next/image with blur placeholder.

Metadata: title, description, OpenGraph/Twitter for every route.

Accessibility: WCAG AA—contrast on both themes, keyboard-focus rings.

Analytics Dimensions: Capture utm_service from Calendly links.

7. Open "To-Do" List for Build
Strip nav to 3 items, move About & Blog to footer.

Implement typewriter rotating tagline component.

Create new CaseStudyCards for Reseeit & MoMo Panel.

Populate About and Services pages with long-form copy (placeholders OK).

Replace dummy logos with real assets.

Ensure each long page ≥ 600 words for SEO.

Verify Lighthouse after deploy (>90 perf, best-practices).

End of PRD – use as canonical reference in Cursor prompts and future iterations.