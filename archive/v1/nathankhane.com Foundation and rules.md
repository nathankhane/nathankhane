# nathankhane.com Foundation and Rules

## 🚀 Deployment Workflow

### GitHub → Vercel Auto-Deployment
- **Repository**: https://github.com/nathankhane/nathankhane.git
- **Vercel Project**: Connected to GitHub repo for auto-deployment
- **Workflow**: 
  1. Push changes to `main` branch
  2. Vercel automatically detects changes and deploys
  3. No manual `vercel --prod` commands needed
- **Production URL**: https://nathankhane-fow5lx8up-nathan-khanes-projects.vercel.app

### Development Commands
```bash
npm run dev          # Local development server
npm run build        # Test production build
npm run lint         # Check for ESLint errors
git add . && git commit -m "message" && git push  # Deploy to production
```

---

## 🎨 Brand Foundation

### Design System
- **Primary Colors**:
  - Ink Black: `#0F0F0F` (dark theme background)
  - Parchment White: `#FAF9F7` (light theme background) 
  - Electric Cyan: `#4F8DFD` (accent/CTA color)
- **Typography**:
  - Headlines: Playfair Display (serif, bold)
  - Body: Inter (sans-serif)
  - Code/Mono: IBM Plex Mono
- **Motion**: Framer-motion animations, subtle fades and parallax

### Brand Voice
- **Theme**: "Business ≡ Poetry — every venture is a verse, every metric a rhyme"
- **Tone**: Confident, candid, forward-thinking; merges analytical clarity with lyrical flair
- **Key Messages**: "Turning narrative into revenue for founders & creators"

---

## 📁 Site Architecture

### Pages Implemented
- **`/`** - Homepage with cinematic hero + value props + case studies + newsletter
- **`/work-with-me`** - Service offerings with pricing ($2.5K audit, $1.5K/mo coaching, $5K sprints)
- **`/portfolio`** - Filterable case studies with interactive KPI cards
- **`/blog`** - "Business ≡ Poetry" blog (placeholder for Substack integration)
- **`/about`** - Personal story (placeholder for Birkman-informed content)
- **`/contact`** - Contact form and Calendly embed (placeholder)
- **`/not-found`** - Custom 404 with brand voice: "Lost in the poetry"

### Components Built
1. **`CinematicHero`** - Animated sequence: "Founder → Storyteller → Artist → Business ≡ Poetry"
2. **`CaseStudyCard`** - Interactive cards with hover KPI overlays
3. **`CredibilityBar`** - Auto-scrolling press/podcast logos
4. **`ThemeToggle`** - Dark/light mode switcher
5. **Enhanced Layout** - Navigation with backdrop blur + comprehensive footer

---

## 🎯 Target Audiences & CTAs

| Audience | Primary Need | Main CTA |
|----------|-------------|----------|
| SaaS founders & execs | Narrative-driven growth, PR firepower | "Book a Growth Story Audit" |
| Musicians & creators | Brand/release strategy coaching | "Apply for Creative Coaching" |
| Recruiters & partners | Quick credibility snapshot | "Download Media Kit" |
| Fans & community | Music, essays, behind-the-scenes | "Join Business ≡ Poetry Newsletter" |

---

## 🛠 Technical Foundation

### Framework & Tools
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** with custom design tokens
- **Framer Motion** for animations
- **shadcn/ui** component library
- **next-themes** for dark/light mode

### Key Dependencies
```json
{
  "next": "15.3.3",
  "react": "19.x",
  "framer-motion": "latest",
  "next-themes": "latest",
  "@shadcn/ui": "latest",
  "lucide-react": "latest",
  "tailwindcss": "latest"
}
```

### File Structure
```
nathankhane/
├── app/
│   ├── globals.css         # Brand colors & typography
│   ├── layout.tsx          # Root layout with nav & footer
│   ├── page.tsx            # Homepage
│   ├── not-found.tsx       # Custom 404
│   ├── about/page.tsx
│   ├── work-with-me/page.tsx
│   ├── portfolio/page.tsx
│   ├── blog/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── cinematic-hero.tsx
│   ├── case-study-card.tsx
│   ├── credibility-bar.tsx
│   ├── theme-toggle.tsx
│   └── ui/                 # shadcn components
├── PRD/
│   └── website-requirements.md
└── nathankhane.com Foundation and rules.md
```

---

## 📊 Success Metrics (PRD Targets)

| Metric | Target | Current Status |
|--------|--------|---------------|
| Discovery-call bookings | ≥ 10/month | ✅ CTAs implemented |
| Newsletter sign-ups | 200 in Q1 | ✅ Signup forms added |
| Avg. session duration | > 2 minutes | ✅ Engaging content |
| Portfolio card clicks | ≥ 25% of visitors | ✅ Interactive cards |

---

## 🚦 Development Rules

### Code Quality
1. **ESLint**: Fix all errors before deploying (especially apostrophes - use `&apos;`)
2. **Images**: Use Next.js `<Image>` component, not `<img>` tags
3. **Links**: Use Next.js `<Link>` for internal navigation
4. **TypeScript**: Maintain strict typing throughout

### Brand Consistency
1. **Colors**: Only use brand colors (ink-black, parchment-white, electric cyan)
2. **Typography**: Headlines = Playfair Display, Body = Inter, Code = IBM Plex Mono
3. **Voice**: Maintain "Business ≡ Poetry" theme in all copy
4. **CTAs**: Use established patterns ("Book a Discovery Call", "Start a Project")

### Animation Guidelines
1. **Subtle**: Use fade, scale, and parallax - no jarring transitions
2. **Performance**: Limit to essential animations only
3. **Accessibility**: Respect user motion preferences

---

## 🔮 Future Enhancements

### Immediate Priorities
- [ ] Calendly integration on contact page
- [ ] Media kit download functionality
- [ ] Newsletter signup backend integration
- [ ] Substack RSS feed for blog

### Advanced Features
- [ ] Lead magnet modal ("3-Minute Storytelling Canvas")
- [ ] Music/video hub with inline players
- [ ] Portfolio filtering functionality
- [ ] Analytics tracking setup
- [ ] SEO optimization
- [ ] Mobile menu for navigation

### Content Strategy
- [ ] Birkman-informed About page content
- [ ] Real case study details for portfolio
- [ ] Blog content migration from Substack
- [ ] Music integration (Spotify embeds)

---

## 📞 Key Contact Integration Points

### Service Offerings
1. **Growth Story Audit** - $2,500 one-time
2. **Creative Coaching** - $1,500/month (most popular)
3. **Go-To-Market Sprints** - $5,000 per sprint

### Social Links (Footer)
- TikTok: https://www.tiktok.com/@nathankhane
- YouTube: https://www.youtube.com/@nathankhane
- Spotify: https://open.spotify.com/artist/nathankhane
- LinkedIn: https://www.linkedin.com/in/nathankhane

---

*Last Updated: December 2024*
*Status: Foundation Complete - Ready for Content & Advanced Features* 