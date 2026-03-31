/**
 * TheSpark — Act 1, Section 3
 *
 * The origin story: the moment Nate realized he was a builder, not just a user.
 * Easter Egg #2: "I'm Feeling Lucky" appears on hover over a specific element.
 * CliftonStrengths DNA: Ideation, Arranger, Input, Connectedness, Belief.
 *
 * SP1: Removed the outer AnimatedSection wrapper around the strengths grid —
 *      it was racing with inner whileInView, breaking the stagger. Each card
 *      now fires independently on viewport entry with correct stagger timing.
 *
 * SP2: Ideation (#1) card has a shimmer scan line that plays once on entry.
 *
 * SP3: All cards have hover scale + border color micro-interaction.
 */
"use client";

import { motion } from "framer-motion";
import EasterEgg from "@/components/EasterEgg";
import AnimatedSection from "@/components/AnimatedSection";

const STRENGTHS = [
  { name: "Ideation",      desc: "Fascinated by ideas. Finds connections between phenomena." },
  { name: "Arranger",      desc: "Organizes, then reorganizes, in search of the perfect configuration." },
  { name: "Input",         desc: "Craves to know more. Collects information, ideas, artifacts." },
  { name: "Connectedness", desc: "Believes things happen for a reason. Faith in the links." },
  { name: "Belief",        desc: "Has core values. These define a purpose. Success is living them." },
];

export default function TheSpark() {
  return (
    <section
      id="spark"
      className="relative py-24 md:py-36 overflow-hidden"
      aria-label="The Spark — Act 1"
    >
      {/* Soft gold ambient blob */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-48 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(212,168,83,0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-6">
        {/* Eyebrow — left-aligned (alternating layout) */}
        <AnimatedSection direction="fade">
          <span className="text-xs font-mono text-gold/60 tracking-[0.2em] uppercase block">
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
          <div className="mt-8 space-y-5 text-cream/75 leading-relaxed max-w-2xl">
            <p>
              At 5 years old, I was in my bedroom writing scripts, poetry, and love songs. Not because anyone told me to — because I had observations I needed to get out of my head. I&apos;ve been a meticulous observer of people, places, and things since the day I was born.
            </p>
            <p>
              This obsession has swung me from honors band saxophone, to managing a boy band in LA, to building AI companies in San Francisco. The throughline was never the medium. It was always the need to find new ways to unleash what&apos;s inside. Finding new ways to create may be a stronger drug than love, for me at least.
            </p>
            <p className="text-cream/50 italic">
              I produce madness.
            </p>
          </div>
        </AnimatedSection>

        {/* CliftonStrengths grid
            SP1: Outer AnimatedSection removed — each card fires its own
            whileInView independently so the stagger actually works. */}
        <div className="mt-14">
          <AnimatedSection delay={0.25} direction="fade">
            <p className="text-xs font-mono text-cream/60 tracking-widest uppercase mb-6">
              CliftonStrengths Top 5
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STRENGTHS.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 14, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: 0.1 + i * 0.09,
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
                /* SP3: hover scale + border highlight */
                whileHover={{
                  scale: 1.025,
                  transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                }}
                whileTap={{ scale: 0.98 }}
                className={`group relative rounded-xl border p-4 transition-colors cursor-default overflow-hidden ${
                  i === 0
                    ? "col-span-2 sm:col-span-4 border-gold/40 bg-surface-elevated shadow-gold-glow hover:border-gold/60"
                    : "border-white/10 bg-ink/60 hover:border-gold/30"
                }`}
              >
                {/* SP2: Ideation card shimmer scan — plays once on entry */}
                {i === 0 && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(212,168,83,0.18) 50%, transparent 100%)",
                    }}
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "200%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}

                <div className={`text-xs font-mono mb-2 ${i === 0 ? "text-gold" : "text-gold/60"}`}>
                  #{i + 1}
                </div>
                <div className={`font-display mb-1 ${i === 0 ? "text-base text-cream" : "text-sm text-cream"}`}>
                  {s.name}
                </div>
                <div className="text-xs text-cream/70 leading-relaxed">
                  {s.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
