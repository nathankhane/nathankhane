/**
 * ResumeContent — /resume page client component
 *
 * "The Record" — structured credential layer for nathankhane.com
 * Designed for Google Creative Fellowship 2026 reviewers.
 *
 * Animations: framer-motion (matching the rest of the site's editorial system)
 * Background: inherited from layout.tsx (SpaceBackground is global)
 */
"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import { type ReactNode } from "react";

const editorialEase = [0.16, 1, 0.3, 1] as const;

// ── Count-up hook ──────────────────────────────────────────────────────────

function useCountUp(target: number, duration: number, isActive: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isActive) return;
    let raf: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      // cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isActive, target, duration]);
  return count;
}

// ── Stat Card ──────────────────────────────────────────────────────────────

function StatCard({
  value,
  prefix = "",
  suffix = "",
  label,
  delay = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const count = useCountUp(value, 1.4, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: editorialEase }}
      className="flex flex-col items-center text-center px-4 py-5 rounded-2xl bg-surface-elevated border border-white/[0.06]"
    >
      <div className="text-3xl sm:text-4xl font-display text-gold leading-none tabular-nums">
        {prefix}{count}{suffix}
      </div>
      <div className="mt-2 text-[10px] font-mono text-cream/50 leading-snug max-w-[80px]">
        {label}
      </div>
    </motion.div>
  );
}

// ── Section Label ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <AnimatedSection direction="fade" className="mb-4">
      <div className="flex items-center gap-2.5">
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: editorialEase }}
          style={{ transformOrigin: "left" }}
          className="inline-block w-5 h-px bg-gold/50 shrink-0"
        />
        <span className="text-xs font-mono text-gold/60 tracking-[0.2em] uppercase">
          {children}
        </span>
      </div>
    </AnimatedSection>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────

const STATS = [
  { value: 4,   prefix: "",  suffix: "+",  label: "years creative leadership" },
  { value: 65,  prefix: "",  suffix: "K",  label: "social audience built" },
  { value: 325, prefix: "$", suffix: "K",  label: "raised across events" },
  { value: 300, prefix: "",  suffix: "+",  label: "research hours" },
  { value: 50,  prefix: "$", suffix: "K",  label: "angel investment" },
  { value: 40,  prefix: "",  suffix: "+",  label: "events produced" },
];

const EXPERIENCE = [
  {
    company: "Khane Creative",
    role: "Founder & Creative Strategist",
    location: "Los Angeles, CA · Austin, TX · Houston, TX · San Francisco, CA",
    dates: "Aug 2023 — Present",
    border: "border-l-gold/50",
    featured: true,
    bullets: [
      "Developed brand positioning, visual identity systems, and marketing strategies for 5 independent artists, translating each artist's story into cohesive creative direction across LA, Austin, and Houston.",
      "Produced and directed cross-functional campaigns spanning content creation, social media, live event production, and venue partnerships — expanding collective market reach by 75%.",
      "Designed and executed content and partnership activation strategies that grew combined social audiences from 0 to 65K through culturally resonant storytelling.",
      "Authored reflective essays and creative nonfiction on Substack (Khane School of Thought), exploring themes of time, presence, identity, and creative process.",
    ],
  },
  {
    company: "Bridge",
    role: "Founder & CEO",
    location: "San Francisco, CA",
    dates: "June 2025 — Present",
    border: "border-l-gold/50",
    featured: true,
    bullets: [
      "Founded and built an AI business intelligence platform from concept to launch, leading all aspects of brand development, product storytelling, demo narrative design, and go-to-market creative.",
      "Generated $60K ARR in 3 months through multi-channel go-to-market programs, driving early pipeline and brand visibility.",
      "Conducted 300+ hours of user research and 100+ interviews, translating qualitative insights into UI flows, demo storylines, and product narratives — driving 4+ major pivots and improving user satisfaction by 85%.",
      "Raised $50K in angel investment to fuel AI partnerships, optimize product development, and increase user acquisition 5X.",
      "Managed end-to-end production of client deliverables, stakeholder communications, and multi-channel campaigns, coordinating timelines, budgets, and cross-functional execution.",
    ],
  },
  {
    company: "Capgemini",
    role: "UX & SAP S/4HANA Consultant",
    location: "San Francisco, CA",
    dates: "June 2023 — Feb 2025",
    border: "border-l-cream/20",
    featured: false,
    bullets: [
      "Led program management of the hyperscalers division for a $10B software client, coordinating communications and deal-tracking for account executives to facilitate over $5M in partner deals.",
      "Developed analytics workflows for 4+ sales assessments, cutting project data redundancy by 60% and improving stakeholder onboarding experience by 72%.",
      "Organized and produced 20+ professional and educational events in Capgemini's SF office, managing logistics, partner relations, content programming, and post-event follow-through at a 95% satisfaction rate.",
    ],
  },
  {
    company: "Nexus Veterinary Specialists",
    role: "Business Development & Marketing",
    location: "Houston, TX",
    dates: "May 2021 — June 2022",
    border: "border-l-cream/20",
    featured: false,
    bullets: [
      "Built field marketing playbooks and launch campaigns for 3 new hospital openings, coordinating operations, vendor onboarding, and content production to support >$1M in combined launch revenue.",
      "Formulated marketing KPIs based on 100+ hours of industry research, enabling commercial teams to secure $100K in early pipeline and optimize commercial growth by 30%.",
    ],
  },
];

interface CreativeCard {
  title: string;
  desc: string;
  icon: ReactNode;
}

const CREATIVE_PRACTICE: CreativeCard[] = [
  {
    title: "Music Production & Songwriting",
    desc: "Writer, producer, and recording artist. Home studio: Logic Pro X, Focusrite Scarlett 2i2, Shure SM7B, Waves Ultimate. Original music blending introspective lyricism with experimental production.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path d="M9 18V5l12-2v13M9 18c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-2c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "AI-Augmented Creative Workflows",
    desc: "Actively experimenting with AI tools (LangChain, Claude, Cursor) as creative instruments for prototyping, content generation, and narrative design. Building automated systems that blend human storytelling instinct with machine intelligence.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 3l1.912 5.813a2 2 0 001.272 1.272L21 12l-5.816 1.916a2 2 0 00-1.272 1.272L12 21l-1.912-5.812a2 2 0 00-1.272-1.272L3 12l5.816-1.915a2 2 0 001.272-1.272L12 3z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Content & Publishing",
    desc: "Creator of nathankhane.com. Author of Khane School of Thought on Substack — reflective essays on creativity, time, and identity.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Video & Visual Storytelling",
    desc: "Concept development, production planning, and post-production for social-first video content. Proficient in Final Cut Pro with a focus on brand narrative and creator-driven formats.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <rect x="2" y="6" width="15" height="12" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 10l5-2v8l-5-2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const SKILLS = [
  {
    label: "Creative & Strategy",
    pills: ["Brand Positioning", "Campaign Concepting", "Product Storytelling", "Social Strategy", "Content Development", "UGC", "ICP Discovery"],
    variant: "neutral" as const,
  },
  {
    label: "Production",
    pills: ["Project & Production Management", "Event Production", "Cross-Functional Coordination", "Budgets & Timelines", "Stakeholder Management"],
    variant: "neutral" as const,
  },
  {
    label: "Music & Audio",
    pills: ["Logic Pro X", "Songwriting", "Music Production", "Mixing (Waves Ultimate)", "Shure SM7B / Focusrite 2i2"],
    variant: "gold" as const,
  },
  {
    label: "Video & Design",
    pills: ["Final Cut Pro", "Figma", "Visual Identity", "Social Content Production"],
    variant: "neutral" as const,
  },
  {
    label: "Technology & AI",
    pills: ["AI/LLM Prompt Engineering", "LangChain", "Python", "Cursor", "Notion", "Salesforce", "Jira", "Google Suite"],
    variant: "neutral" as const,
  },
  {
    label: "Ops & Automation",
    pills: ["Workflow Automation", "Demo Environment Configuration", "AI/LLM Context Engineering"],
    variant: "neutral" as const,
  },
  {
    label: "Data & Analytics",
    pills: ["PL/SQL", "Power BI", "Excel", "Quantitative Analysis"],
    variant: "neutral" as const,
  },
  {
    label: "Technical Exposure",
    pills: ["SAP S/4HANA", "API Integrations", "Java", "HTML", "Data Pipelines"],
    variant: "neutral" as const,
  },
  {
    label: "Languages",
    pills: ["English (native)", "Spanish"],
    variant: "neutral" as const,
  },
];

// ── Component ──────────────────────────────────────────────────────────────

export default function ResumeContent() {
  return (
    <main className="relative min-h-screen">
      {/* Back navigation — right side so it doesn't clash with MobileNav (top-left) */}
      <Link
        href="/"
        className="fixed top-6 right-6 z-40 text-xs font-mono text-cream/50 hover:text-cream transition-colors"
      >
        ← nathankhane.com
      </Link>

      <div className="max-w-4xl mx-auto px-6 pt-24 pb-24">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <header className="text-center mb-16">
          <motion.h1
            className="text-4xl sm:text-5xl font-display text-cream mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: editorialEase }}
          >
            Nathan Khane Morales
          </motion.h1>

          <motion.div
            className="text-xs font-mono text-cream/60 space-y-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: editorialEase }}
          >
            <p>
              San Francisco, CA · (832) 306-6685 ·{" "}
              <a
                href="mailto:nathankmorales@gmail.com"
                className="text-gold/70 hover:text-gold transition-colors"
              >
                nathankmorales@gmail.com
              </a>
            </p>
            <p className="flex flex-wrap justify-center gap-x-3 gap-y-1">
              <a
                href="https://linkedin.com/in/nathan-khane-morales"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/70 hover:text-gold transition-colors"
              >
                linkedin.com/in/nathan-khane-morales
              </a>
              <span className="text-cream/30">·</span>
              <a href="https://nathankhane.com" className="text-gold/70 hover:text-gold transition-colors">
                nathankhane.com
              </a>
              <span className="text-cream/30">·</span>
              <a
                href="https://substack.com/@nathankhane"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/70 hover:text-gold transition-colors"
              >
                Khane School of Thought
              </a>
            </p>
          </motion.div>

          {/* Gold divider — draws left-to-right on load */}
          <motion.div
            className="mt-8 mx-auto h-px bg-gold/40 max-w-xs"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: editorialEase }}
            style={{ transformOrigin: "left" }}
          />
        </header>

        {/* ── Summary ─────────────────────────────────────────────────── */}
        <section className="mb-12 text-center" aria-label="Summary">
          <AnimatedSection direction="up" delay={0.05}>
            <p className="text-lg sm:text-xl font-display text-cream/90 leading-relaxed max-w-3xl mx-auto">
              4+ years of creative leadership — brand strategy, music production,
              live events, and AI-augmented workflows. I make things happen and I make them mean something.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <span className="text-xs font-mono border rounded-full px-3 py-1 text-google-blue/70 border-google-blue/20 bg-google-blue/5">
                Producer · Brand Studio
              </span>
              <span className="text-xs font-mono border rounded-full px-3 py-1 text-google-red/70 border-google-red/20 bg-google-red/5">
                Video Storyteller · YouTube Creative Studio
              </span>
            </div>
          </AnimatedSection>
        </section>

        {/* ── Impact Stats Strip ──────────────────────────────────────── */}
        <section className="mb-16" aria-label="Impact at a glance">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {STATS.map((stat, i) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                label={stat.label}
                delay={i * 0.07}
              />
            ))}
          </div>
        </section>

        {/* ── Experience ──────────────────────────────────────────────── */}
        <SectionLabel>Experience</SectionLabel>
        <section className="mb-16 space-y-4" aria-label="Experience">
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: i % 2 === 0 ? -12 : 12, y: 12, scale: 0.98 }}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              whileHover={{
                y: -2,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: editorialEase }}
              className={`rounded-2xl border border-white/10 bg-ink/60 p-6 border-l-2 ${exp.border} transition-shadow ${
                exp.featured ? "hover:shadow-[0_0_24px_rgba(212,168,83,0.08)]" : ""
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                <div className="text-base font-display text-cream">{exp.company}</div>
                <div className="text-xs font-mono text-cream/60 shrink-0">{exp.dates}</div>
              </div>
              <div className="text-sm italic font-mono text-cream/70 mb-0.5">{exp.role}</div>
              <div className="text-xs font-mono text-cream/50 mb-4">{exp.location}</div>
              <ul className="space-y-2">
                {exp.bullets.map((bullet, j) => (
                  <li key={j} className="flex gap-2 text-sm text-cream/75 leading-relaxed">
                    <span className="text-gold/60 mt-[5px] shrink-0">·</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </section>

        {/* ── Creative Practice ───────────────────────────────────────── */}
        <SectionLabel>Creative Practice</SectionLabel>
        <section className="mb-16 grid md:grid-cols-2 gap-5" aria-label="Creative Practice">
          {CREATIVE_PRACTICE.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{
                y: -4,
                transition: { type: "spring", stiffness: 280, damping: 18 },
              }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: editorialEase }}
              className="rounded-2xl border border-white/10 bg-surface-elevated p-6 cursor-default"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-gold/60">{item.icon}</div>
                <div className="text-sm font-display text-cream">{item.title}</div>
              </div>
              <p className="text-sm text-cream/75 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* ── Education ───────────────────────────────────────────────── */}
        <SectionLabel>Education</SectionLabel>
        <section className="mb-16" aria-label="Education">
          <AnimatedSection delay={0.1}>
            <div className="rounded-2xl border border-white/10 bg-ink/60 p-6">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="text-base font-display text-cream">University of Houston</div>
                <div className="text-xs font-mono text-cream/60">Dec 2022</div>
              </div>
              <div className="text-sm text-cream/75 mt-1">
                Bachelor of Business Administration — Entrepreneurship &amp; Management Information Systems
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* ── Leadership & Community ──────────────────────────────────── */}
        <SectionLabel>Leadership &amp; Community</SectionLabel>
        <section className="mb-16 space-y-4" aria-label="Leadership and Community">
          {/* Wolff Center */}
          <motion.div
            initial={{ opacity: 0, x: -12, y: 12, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            whileHover={{
              y: -2,
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: editorialEase }}
            className="rounded-2xl border border-white/10 bg-ink/60 p-6 border-l-2 border-l-gold/50 hover:shadow-[0_0_24px_rgba(212,168,83,0.08)] transition-shadow"
          >
            <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
              <div className="text-base font-display text-cream">Wolff Center for Entrepreneurship</div>
              <div className="text-xs font-mono text-cream/60 shrink-0">Dec 2020 — June 2022</div>
            </div>
            <div className="text-xs font-mono text-gold/70 italic mb-1">
              Ranked #1 in the Nation by The Princeton Review
            </div>
            <div className="text-sm italic font-mono text-cream/70 mb-3">
              Fundraising Events Lead &amp; Engagement Manager | Houston, TX
            </div>
            <ul className="space-y-2">
              <li className="flex gap-2 text-sm text-cream/75 leading-relaxed">
                <span className="text-gold/60 mt-[5px] shrink-0">·</span>
                <span>
                  Produced and managed 40+ live events across Houston, breaking the program&apos;s fundraising
                  record by 35% and generating $325,000 — including a 3-day food festival for 45,000
                  attendees and the inaugural entrepreneur&apos;s gala for 500+ guests.
                </span>
              </li>
              <li className="flex gap-2 text-sm text-cream/75 leading-relaxed">
                <span className="text-gold/60 mt-[5px] shrink-0">·</span>
                <span>
                  Led end-to-end event production: venue sourcing, partner relations, content programming,
                  logistics coordination, and on-site management.
                </span>
              </li>
              <li className="flex gap-2 text-sm text-cream/75 leading-relaxed">
                <span className="text-gold/60 mt-[5px] shrink-0">·</span>
                <span>
                  Developed 1-year and 5-year strategic plans to grow and enhance the alumni association of
                  1,500+ members, designing quarterly engagement programming and annual event series.
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Founders Basketball */}
          <AnimatedSection delay={0.1}>
            <div className="rounded-2xl border border-white/10 bg-ink/60 p-6">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div className="text-base font-display text-cream">Founders Basketball</div>
                <div className="text-xs font-mono text-cream/60">SF Chapter Lead | San Francisco, CA</div>
              </div>
              <p className="text-sm text-cream/75 leading-relaxed">
                Organizing community events connecting founders, creatives, and operators across the Bay Area
                startup ecosystem.
              </p>
            </div>
          </AnimatedSection>
        </section>

        {/* ── Skills ──────────────────────────────────────────────────── */}
        <SectionLabel>Skills</SectionLabel>
        <section className="mb-16 space-y-5" aria-label="Skills">
          {SKILLS.map((group, gi) => (
            <AnimatedSection key={group.label} delay={gi * 0.04}>
              <div>
                <div className="text-xs font-mono text-cream/60 uppercase tracking-widest mb-2.5">
                  {group.label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.pills.map((pill, pi) => (
                    <motion.span
                      key={pill}
                      initial={{ opacity: 0, y: 6, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: pi * 0.04,
                        duration: 0.4,
                        ease: editorialEase,
                      }}
                      className={
                        group.variant === "gold"
                          ? "text-xs font-mono border rounded-full px-3 py-1 cursor-default text-gold/80 border-gold/30 bg-gold/5 hover:border-gold/60 hover:bg-gold/10 hover:shadow-[0_0_12px_rgba(212,168,83,0.18)] transition-all"
                          : "text-xs font-mono border rounded-full px-3 py-1 cursor-default text-cream/60 border-cream/20 bg-cream/5 hover:border-cream/40 hover:text-cream/80 transition-colors"
                      }
                    >
                      {pill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </section>

        {/* ── Footer CTA ──────────────────────────────────────────────── */}
        <AnimatedSection delay={0.1}>
          <div className="text-center pt-10 border-t border-white/10">
            <p className="text-sm font-mono text-cream/50 mb-3">
              The credentials. The full story is somewhere in the scroll above —
              or go find it at nathankhane.com.
            </p>
            <Link
              href="/"
              className="text-sm font-mono text-gold hover:text-gold/70 transition-colors"
            >
              → nathankhane.com
            </Link>
            <div className="mt-16 pt-8 border-t border-white/[0.06]">
              <p className="text-xs font-mono text-cream/[0.35] tracking-widest">
                Business Is Poetry · nathankhane.com · 2026
              </p>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </main>
  );
}
