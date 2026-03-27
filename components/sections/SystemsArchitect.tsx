/**
 * SystemsArchitect — Act 2, Section 6
 *
 * Bridge + Morális showcase. Fortune 500 UX background → founder.
 * Screenshots of app.bridgenow.ai, leads.bridgenow.ai, brand.bridgenow.ai.
 * Stack/system thinking evidence.
 *
 * SYS1: Browser chrome traffic-light dots animate in (red→yellow→green) on entry.
 *
 * SYS2: Stack badges stagger in from below, each with a slight scale entrance.
 *
 * SYS3: Bridge product rows reveal sequentially left→right with short delay.
 *
 * SYS5: Morális card scales in from 0.97 with a gold ambient flash on arrival.
 */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import GoogleableWord from "@/components/GoogleableWord";

const BRIDGE_PRODUCTS = [
  { url: "app.bridgenow.ai", label: "Core Platform", desc: "AI Business Intelligence" },
  { url: "leads.bridgenow.ai", label: "Lead Intelligence", desc: "Automated lead scoring" },
  { url: "brand.bridgenow.ai", label: "Brand Studio", desc: "AI-powered brand tooling" },
];

/* SYS1 — macOS traffic-light colors */
const CHROME_DOTS = [
  { color: "#FF5F57", delay: 0.30 }, // red
  { color: "#FFBD2E", delay: 0.42 }, // yellow
  { color: "#28CA41", delay: 0.54 }, // green
];

// Color-coded by category: language, framework, infra, AI
const STACK: { name: string; category: "language" | "framework" | "infra" | "ai" }[] = [
  { name: "TypeScript", category: "language" },
  { name: "Next.js",    category: "framework" },
  { name: "Tailwind",   category: "framework" },
  { name: "Supabase",   category: "infra" },
  { name: "Vercel",     category: "infra" },
  { name: "Anthropic API", category: "ai" },
];

const STACK_STYLES: Record<string, string> = {
  language:  "text-cream/60 border-cream/20 bg-cream/5",
  framework: "text-google-blue/70 border-google-blue/20 bg-google-blue/5",
  infra:     "text-google-green/70 border-google-green/20 bg-google-green/5",
  ai:        "text-gold/80 border-gold/30 bg-gold/5",
};

export default function SystemsArchitect() {
  return (
    <section
      id="systems"
      className="relative py-24 md:py-36 overflow-hidden"
      aria-label="Systems Architect — Act 2"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16">
          <AnimatedSection direction="fade">
            <span className="text-xs font-mono text-gold/60 tracking-[0.2em] uppercase">
              Systems Architect
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-display text-cream leading-tight max-w-2xl text-balance">
              From UX consultant to AI platform founder.
            </h2>
          </AnimatedSection>
        </div>

        {/* Bridge showcase */}
        <div className="grid md:grid-cols-2 gap-16 items-start mb-20">
          {/* Left — copy */}
          <div>
            <AnimatedSection delay={0.1}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shadow-gold-glow-md ring-1 ring-gold/20">
                  <span className="text-gold font-mono text-xs font-bold">B</span>
                </div>
                <div>
                  <div className="text-sm font-display text-cream">Bridge</div>
                  <div className="text-xs font-mono text-cream/70">bridgenow.ai · Founded 2023</div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <p className="text-cream/75 leading-relaxed text-sm mb-6">
                <GoogleableWord>AI Business Intelligence</GoogleableWord> platform for founders and operators. Bridge turns
                fragmented business data into decision-ready insight: the kind of clarity
                I spent years helping Fortune 500 companies find at <GoogleableWord>Capgemini</GoogleableWord>, now
                available to founders building on a budget.
              </p>
            </AnimatedSection>

            {/* SYS3 — Bridge product rows sequential reveal */}
            <div className="space-y-0 mb-8">
              {BRIDGE_PRODUCTS.map((p, i) => (
                <motion.div
                  key={p.url}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-between py-3 border-b border-white/5"
                >
                  <div>
                    <div className="text-xs font-mono text-cream/70">{p.url}</div>
                    <div className="text-xs text-cream/70 mt-0.5">{p.desc}</div>
                  </div>
                  <div className="text-xs font-mono text-gold/70">{p.label}</div>
                </motion.div>
              ))}
            </div>

            <AnimatedSection delay={0.25}>
              <div>
                <div className="text-xs font-mono text-cream/70 mb-3 tracking-widest uppercase">Stack</div>
                {/* SYS2 — badges stagger in */}
                <div className="flex flex-wrap gap-2">
                  {STACK.map((tech, i) => (
                    <motion.span
                      key={tech.name}
                      initial={{ opacity: 0, y: 6, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: 0.1 + i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className={`text-xs font-mono border rounded-full px-3 py-1 ${STACK_STYLES[tech.category]}`}
                    >
                      {tech.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right — screenshot */}
          <AnimatedSection direction="left" delay={0.1}>
            <div
              className="rounded-2xl border border-white/10 bg-surface overflow-hidden shadow-navy-lg"
              style={{ boxShadow: "0 8px 32px rgba(10,14,23,0.6), inset 0 1px 0 rgba(255,255,255,0.05)" }}
            >
              {/* SYS1 — Browser chrome with animated traffic-light dots */}
              <div className="flex items-center gap-2 px-4 py-3.5 border-b border-white/10 bg-surface-elevated">
                <div className="flex gap-1.5">
                  {CHROME_DOTS.map(({ color, delay }, i) => (
                    <motion.div
                      key={i}
                      className="w-2.5 h-2.5 rounded-full"
                      initial={{ backgroundColor: "rgba(255,255,255,0.1)", scale: 0.7 }}
                      whileInView={{ backgroundColor: color, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    />
                  ))}
                </div>
                <div className="flex-1 mx-3 bg-ink rounded-md px-3 py-1 text-xs font-mono text-cream/60">
                  app.bridgenow.ai
                </div>
              </div>
              {/* Screenshot */}
              <div className="aspect-video bg-ink relative overflow-hidden">
                <Image
                  src="/images/bridge-screenshot.png"
                  alt="Bridge platform screenshot — app.bridgenow.ai"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* SYS5 — Morális card scales in with gold flash */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-white/10 bg-surface-elevated p-8 grid md:grid-cols-2 gap-8 items-center relative overflow-hidden"
        >
          {/* Gold ambient flash on arrival */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0, 0.12, 0] }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.9, ease: "easeOut" }}
            style={{ background: "rgba(212,168,83,0.18)" }}
            aria-hidden="true"
          />

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-cream/5 border border-white/10 flex items-center justify-center">
                <span className="text-cream/60 font-mono text-xs font-bold">M</span>
              </div>
              <div>
                <div className="text-sm font-display text-cream">Morális</div>
                <div className="text-xs font-mono text-cream/60">moralis.studio · Founded 2024</div>
              </div>
            </div>
            <p className="text-cream/70 text-sm leading-relaxed">
              AI automation for brick-and-mortar businesses. Where Bridge is intelligence,
              Morális is execution: automating the operational layer so small business owners
              can focus on what makes them irreplaceable.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 md:justify-end">
            {["AI Automation", "Small Business", "Operations", "Applied AI"].map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-cream/60 border border-white/10 rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
