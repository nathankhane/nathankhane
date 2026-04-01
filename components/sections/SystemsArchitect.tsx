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
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-gold/10 border border-gold/20 shadow-gold-glow-md ring-1 ring-gold/20 flex items-center justify-center">
                  <Image src="/images/bridgette-nobg.png" alt="Bridgette" width={32} height={32} className="object-contain w-full h-full" />
                </div>
                <div>
                  <div className="text-sm font-display text-cream">Bridge</div>
                  <div className="text-xs font-mono text-cream/70">bridgenow.ai · Founded 2025</div>
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
                <motion.a
                  key={p.url}
                  href={`https://${p.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-between py-3 border-b border-white/5 hover:border-gold/20 hover:bg-gold/[0.03] transition-colors duration-200 cursor-pointer rounded-sm px-1 -mx-1"
                >
                  <div>
                    <div className="text-xs font-mono text-cream/70 group-hover:text-cream transition-colors">{p.url}</div>
                    <div className="text-xs text-cream/70 mt-0.5">{p.desc}</div>
                  </div>
                  <div className="text-xs font-mono text-gold/70">{p.label}</div>
                </motion.a>
              ))}
            </div>

            {/* Bridge CTA */}
            <AnimatedSection delay={0.22}>
              <motion.a
                href="https://bridgenow.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-google-blue/50 text-google-blue text-xs font-mono hover:bg-google-blue/10 hover:border-google-blue transition-all duration-200 mb-6"
                style={{ boxShadow: "0 0 0px rgba(66,133,244,0)" }}
                whileHover={{ boxShadow: "0 0 16px rgba(66,133,244,0.2)" }}
                whileTap={{ scale: 0.97 }}
              >
                Visit Bridge →
              </motion.a>
            </AnimatedSection>

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
              {/* Screenshot — clickable */}
              <a
                href="https://bridgenow.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="block aspect-video bg-ink relative overflow-hidden group"
              >
                <Image
                  src="/images/bridge-screenshot.png"
                  alt="Bridge platform screenshot — app.bridgenow.ai"
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-google-blue/0 group-hover:bg-google-blue/5 transition-colors duration-300" />
              </a>
            </div>
          </AnimatedSection>
        </div>

        {/* SYS5 — Morális Studio card, matches Bridge 2-col format */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-cream/5 border border-white/10 flex items-center justify-center">
                <span className="text-cream/60 font-mono text-xs font-bold">M</span>
              </div>
              <div>
                <div className="text-sm font-display text-cream">Morális Studio</div>
                <div className="text-xs font-mono text-cream/60">moralis.studio · Founded 2024</div>
              </div>
            </div>
            <p className="text-cream/75 leading-relaxed text-sm mb-8">
              AI automation for brick-and-mortar businesses. Where Bridge is intelligence,
              Morális is execution: automating the operational layer so small business owners
              can focus on what makes them irreplaceable.
            </p>
            <div className="flex flex-wrap gap-2">
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

          {/* Right — screenshot (placeholder until moralis-screenshot.png is added) */}
          <AnimatedSection direction="left" delay={0.1}>
            <div
              className="rounded-2xl border border-white/10 bg-surface overflow-hidden shadow-navy-lg"
              style={{ boxShadow: "0 8px 32px rgba(10,14,23,0.6), inset 0 1px 0 rgba(255,255,255,0.05)" }}
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3.5 border-b border-white/10 bg-surface-elevated">
                <div className="flex gap-1.5">
                  {CHROME_DOTS.map(({ color, delay }, i) => (
                    <motion.div
                      key={i}
                      className="w-2.5 h-2.5 rounded-full"
                      initial={{ backgroundColor: "rgba(255,255,255,0.1)", scale: 0.7 }}
                      whileInView={{ backgroundColor: color, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: delay + 0.2, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    />
                  ))}
                </div>
                <div className="flex-1 mx-3 bg-ink rounded-md px-3 py-1 text-xs font-mono text-cream/60">
                  moralis.studio
                </div>
              </div>
              {/* Screenshot — drop public/images/moralis-screenshot.png to activate */}
              <a
                href="https://moralis.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="block aspect-video bg-ink relative overflow-hidden group"
              >
                {/* Placeholder behind image — shows until screenshot file is dropped in */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface-elevated">
                  <span className="text-2xl font-display text-cream/40">Morális Studio</span>
                  <span className="text-xs font-mono text-cream/30">moralis.studio</span>
                </div>
                {/* Image on top — covers placeholder once loaded */}
                <Image
                  src="/images/moralis-screenshot.png"
                  alt="Morális Studio landing page — moralis.studio"
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-cream/0 group-hover:bg-cream/[0.02] transition-colors duration-300" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
