/**
 * SystemsArchitect — Act 2, Section 6
 *
 * Bridge + Morális showcase. Fortune 500 UX background → founder.
 * Screenshots of app.bridgenow.ai, leads.bridgenow.ai, brand.bridgenow.ai.
 * Stack/system thinking evidence.
 */
"use client";

import AnimatedSection from "@/components/AnimatedSection";

const BRIDGE_PRODUCTS = [
  { url: "app.bridgenow.ai", label: "Core Platform", desc: "AI Business Intelligence" },
  { url: "leads.bridgenow.ai", label: "Lead Intelligence", desc: "Automated lead scoring" },
  { url: "brand.bridgenow.ai", label: "Brand Studio", desc: "AI-powered brand tooling" },
];

const STACK = ["Next.js", "Anthropic API", "Supabase", "Vercel", "TypeScript", "Tailwind"];

export default function SystemsArchitect() {
  return (
    <section
      id="systems"
      className="relative py-24 md:py-36 bg-ink overflow-hidden"
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
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-display text-cream leading-tight max-w-2xl">
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
                <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <span className="text-gold font-mono text-xs font-bold">B</span>
                </div>
                <div>
                  <div className="text-sm font-display text-cream">Bridge</div>
                  <div className="text-xs font-mono text-cream/30">bridgenow.ai · Founded 2023</div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <p className="text-cream/60 leading-relaxed text-sm mb-6">
                AI Business Intelligence platform for founders and operators. Bridge turns
                fragmented business data into decision-ready insight — the kind of clarity
                I spent years helping Fortune 500 companies find at Capgemini, now
                available to founders building on a budget.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="space-y-3 mb-8">
                {BRIDGE_PRODUCTS.map((p) => (
                  <div
                    key={p.url}
                    className="flex items-center justify-between py-3 border-b border-white/5"
                  >
                    <div>
                      <div className="text-xs font-mono text-cream/50">{p.url}</div>
                      <div className="text-xs text-cream/30 mt-0.5">{p.desc}</div>
                    </div>
                    <div className="text-xs font-mono text-gold/50">{p.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <div>
                <div className="text-xs font-mono text-cream/25 mb-3 tracking-widest uppercase">Stack</div>
                <div className="flex flex-wrap gap-2">
                  {STACK.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono text-cream/40 border border-white/10 rounded-full px-3 py-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right — screenshot placeholder */}
          <AnimatedSection direction="left" delay={0.1}>
            <div className="rounded-2xl border border-white/10 bg-surface overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-surface-elevated">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <div className="flex-1 mx-3 bg-ink rounded-md px-3 py-1 text-xs font-mono text-cream/30">
                  app.bridgenow.ai
                </div>
              </div>
              {/* Screenshot area */}
              <div className="aspect-video bg-ink flex items-center justify-center">
                <p className="text-xs font-mono text-cream/20 text-center px-8">
                  Screenshot coming soon<br />
                  <span className="text-cream/10">app.bridgenow.ai</span>
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Morális — secondary mention */}
        <AnimatedSection delay={0.1}>
          <div className="rounded-2xl border border-white/10 bg-surface p-8 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-cream/5 border border-white/10 flex items-center justify-center">
                  <span className="text-cream/60 font-mono text-xs font-bold">M</span>
                </div>
                <div>
                  <div className="text-sm font-display text-cream">Morális</div>
                  <div className="text-xs font-mono text-cream/30">moralis.studio · Founded 2024</div>
                </div>
              </div>
              <p className="text-cream/50 text-sm leading-relaxed">
                AI automation for brick-and-mortar businesses. Where Bridge is intelligence,
                Morális is execution — automating the operational layer so small business owners
                can focus on what makes them irreplaceable.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              {["AI Automation", "Small Business", "Operations", "Applied AI"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono text-cream/30 border border-white/10 rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
