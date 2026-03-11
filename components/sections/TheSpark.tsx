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
      className="relative py-24 md:py-36 bg-surface overflow-hidden"
      aria-label="The Spark — Act 1"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Eyebrow */}
        <AnimatedSection direction="fade">
          <span className="text-xs font-mono text-gold/60 tracking-[0.2em] uppercase">
            The Spark
          </span>
        </AnimatedSection>

        {/* Headline */}
        <AnimatedSection delay={0.1}>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-display text-cream leading-tight max-w-2xl">
            I didn&apos;t ask Google questions.{" "}
            <EasterEgg
              mode="hover"
              content="I'm Feeling Lucky"
              data-easter-egg="im-feeling-lucky"
            >
              <span className="text-gold italic cursor-help">
                I built the answers.
              </span>
            </EasterEgg>
          </h2>
        </AnimatedSection>

        {/* Body copy */}
        <AnimatedSection delay={0.2}>
          <div className="mt-8 space-y-5 text-cream/60 leading-relaxed max-w-2xl">
            <p>
              Growing up in Houston, I was always the kid who took things apart —
              not to break them, but to understand the system underneath. Music became
              my first real laboratory. A beat isn&apos;t noise. It&apos;s architecture.
            </p>
            <p>
              At Capgemini, I sat across the table from Fortune 500 executives and saw
              something they couldn&apos;t: the gap between what their technology did and
              what their story told. Systems thinking and narrative craft aren&apos;t
              opposites. They&apos;re the same discipline in different clothes.
            </p>
            <p>
              That&apos;s the spark. Seeing systems where others see chaos. Building
              bridges — literal and figurative — between what exists and what&apos;s possible.
            </p>
          </div>
        </AnimatedSection>

        {/* CliftonStrengths grid */}
        <AnimatedSection delay={0.3}>
          <div className="mt-14">
            <p className="text-xs font-mono text-cream/30 tracking-widest uppercase mb-6">
              CliftonStrengths Top 5
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {STRENGTHS.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: 0.35 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="group rounded-xl border border-white/10 bg-ink/60 p-4 hover:border-gold/30 transition-colors cursor-default"
                >
                  <div className="text-xs font-mono text-gold/80 mb-2">#{i + 1}</div>
                  <div className="text-sm font-display text-cream mb-1">{s.name}</div>
                  <div className="text-xs text-cream/30 leading-relaxed sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
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
