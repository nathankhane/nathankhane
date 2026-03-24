/**
 * TheSpark — Act 1, Section 3
 *
 * The origin story: the moment Nate realized he was a builder, not just a user.
 * Easter Egg #2: "I'm Feeling Lucky" appears on hover over a specific element.
 * CliftonStrengths DNA: Ideation, Arranger, Input, Connectedness, Belief.
 */
"use client";

import { motion } from "framer-motion";
import EasterEgg from "@/components/EasterEgg";
import AnimatedSection from "@/components/AnimatedSection";

const STRENGTHS = [
  { name: "Ideation", desc: "Fascinated by ideas. Finds connections between phenomena." },
  { name: "Arranger", desc: "Organizes, then reorganizes, in search of the perfect configuration." },
  { name: "Input", desc: "Craves to know more. Collects information, ideas, artifacts." },
  { name: "Connectedness", desc: "Believes things happen for a reason. Faith in the links." },
  { name: "Belief", desc: "Has core values. These define a purpose. Success is living them." },
];

export default function TheSpark() {
  return (
    <section
      id="spark"
      className="relative py-24 md:py-36 overflow-hidden"
      aria-label="The Spark — Act 1"
    >
      {/* Soft gold ambient blob behind cards */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-48 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(212,168,83,0.05) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="max-w-4xl mx-auto px-6">
        {/* Eyebrow */}
        <AnimatedSection direction="fade">
          <span className="text-xs font-mono text-gold/60 tracking-[0.2em] uppercase">
            The Spark
          </span>
        </AnimatedSection>

        {/* Headline */}
        <AnimatedSection delay={0.1}>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-display text-cream leading-tight max-w-2xl text-balance">
            I ask Google the right questions...{" "}
            <EasterEgg
              mode="hover"
              content="I'm Feeling Lucky"
              data-easter-egg="im-feeling-lucky"
            >
              <span className="text-gold italic cursor-pointer underline decoration-gold/30 underline-offset-4">
                then I build the answers.
              </span>
            </EasterEgg>
          </h2>
        </AnimatedSection>

        {/* Body copy */}
        <AnimatedSection delay={0.2}>
          <div className="mt-8 space-y-5 text-cream/60 leading-relaxed max-w-2xl">
            <p className="text-cream/30 italic font-mono text-xs tracking-wide">
              [Placeholder — Nate to rewrite]
            </p>
          </div>
        </AnimatedSection>

        {/* CliftonStrengths grid */}
        <AnimatedSection delay={0.3}>
          <div className="mt-14">
            <p className="text-xs font-mono text-cream/30 tracking-widest uppercase mb-6">
              CliftonStrengths Top 5
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STRENGTHS.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: 0.35 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`group rounded-xl border p-4 hover:border-gold/40 transition-colors cursor-default active:scale-[0.98] ${
                    i === 0
                      ? "col-span-2 sm:col-span-4 border-gold/40 bg-surface-elevated shadow-gold-glow"
                      : "border-white/10 bg-ink/60"
                  }`}
                >
                  <div className={`text-xs font-mono mb-2 ${i === 0 ? "text-gold" : "text-gold/60"}`}>#{i + 1}</div>
                  <div className={`font-display mb-1 ${i === 0 ? "text-base text-cream" : "text-sm text-cream"}`}>{s.name}</div>
                  <div className="text-xs text-cream/40 leading-relaxed">
                    {s.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
