/**
 * TalentDNA — Act 2, Section 7
 *
 * Personality assessment showcase: CliftonStrengths 34 + Birkman Signature.
 * Two cards, two frameworks, one operating system.
 *
 * Data sources:
 * - CliftonStrengths 34 (Gallup, March 2026) — /public/docs/clifton-strengths.pdf
 * - Birkman Signature Report (January 2021) — /public/docs/birkman.pdf
 */
"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

/* ── CliftonStrengths data ──────────────────────────────────────── */
type Domain = "strategic" | "executing" | "relationship" | "influencing";

const DOMAIN_STYLES: Record<Domain, { dot: string; label: string; badge: string }> = {
  strategic:    { dot: "bg-emerald-400",  label: "Strategic Thinking", badge: "text-emerald-400/80 border-emerald-400/20 bg-emerald-400/5"  },
  executing:    { dot: "bg-purple-400",   label: "Executing",          badge: "text-purple-400/80  border-purple-400/20  bg-purple-400/5"   },
  relationship: { dot: "bg-blue-400",     label: "Relationship",       badge: "text-blue-400/80    border-blue-400/20    bg-blue-400/5"     },
  influencing:  { dot: "bg-orange-400",   label: "Influencing",        badge: "text-orange-400/80  border-orange-400/20  bg-orange-400/5"   },
};

const STRENGTHS: { rank: number; name: string; domain: Domain; insight: string }[] = [
  { rank: 1,  name: "Ideation",        domain: "strategic",    insight: "Sees connections others miss. Powerful and creative brainstorming partner." },
  { rank: 2,  name: "Arranger",        domain: "executing",    insight: "Organizes people and resources for maximum flexibility and efficiency." },
  { rank: 3,  name: "Input",           domain: "strategic",    insight: "Collects knowledge obsessively. Mastery-seeker who reads what most find boring." },
  { rank: 4,  name: "Connectedness",   domain: "relationship", insight: "Believes everything happens for a reason. Builds bridges across domains." },
  { rank: 5,  name: "Belief",          domain: "executing",    insight: "Values-led above all. Purpose and mission are non-negotiable anchors." },
];

/* ── Birkman Map data ───────────────────────────────────────────── */
const BIRKMAN_MAP = [
  {
    symbol: "✦",
    label: "Interests",
    quadrant: "Blue",
    color: "text-blue-400",
    border: "border-blue-400/20",
    bg: "bg-blue-400/5",
    dot: "bg-blue-400",
    desc: "Innovate · Create · Plan · Think theoretically",
  },
  {
    symbol: "◆",
    label: "Usual Behavior",
    quadrant: "Green",
    color: "text-emerald-400",
    border: "border-emerald-400/20",
    bg: "bg-emerald-400/5",
    dot: "bg-emerald-400",
    desc: "Persuasive · Insightful · Flexible · Selectively sociable",
  },
  {
    symbol: "●",
    label: "Needs",
    quadrant: "Blue",
    color: "text-blue-400",
    border: "border-blue-400/20",
    bg: "bg-blue-400/5",
    dot: "bg-blue-400",
    desc: "Reflection time · Appreciated · Space to think deeply",
  },
  {
    symbol: "■",
    label: "Under Stress",
    quadrant: "Blue",
    color: "text-blue-400/60",
    border: "border-blue-400/10",
    bg: "bg-blue-400/[0.03]",
    dot: "bg-blue-400/50",
    desc: "Withdrawing · Needs quiet to reset and return",
  },
];

export default function TalentDNA() {
  return (
    <section
      id="talent"
      className="relative py-24 md:py-36 overflow-hidden"
      aria-label="Talent DNA — Personality Assessments"
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-16">
          <AnimatedSection direction="fade">
            <span className="text-xs font-mono text-gold/60 tracking-[0.2em] uppercase">
              Talent Profile
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-display text-cream leading-tight max-w-2xl text-balance">
              The operating system.
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <p className="mt-4 text-cream/50 text-sm font-mono max-w-lg">
              Gallup CliftonStrengths · Birkman Signature Report — two frameworks, one person.
            </p>
          </AnimatedSection>
        </div>

        {/* Two-card grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">

          {/* ── CliftonStrengths card ────────────────────────────── */}
          <AnimatedSection delay={0.1}>
            <div className="rounded-2xl border border-white/10 bg-surface-elevated p-8 h-full flex flex-col relative overflow-hidden">
              {/* Subtle gold ambient */}
              <motion.div
                className="absolute inset-0 pointer-events-none rounded-2xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 0.08, 0] }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                style={{ background: "rgba(212,168,83,0.15)" }}
                aria-hidden="true"
              />

              {/* Card header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-cream/40 tracking-widest uppercase">CliftonStrengths 34</span>
                  <span className="text-xs font-mono text-gold/60">Gallup · Mar 2026</span>
                </div>
                <div className="text-sm font-display text-cream/80">Leads with Strategic Thinking</div>
              </div>

              {/* Strengths list */}
              <div className="space-y-0 flex-1">
                {STRENGTHS.map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: 0.1 + i * 0.09, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-start gap-4 py-3.5 border-b border-white/5 last:border-0"
                  >
                    <div className="flex items-center gap-2 w-6 shrink-0 pt-0.5">
                      <span className="text-xs font-mono text-cream/30 w-4 text-right">{s.rank}.</span>
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${DOMAIN_STYLES[s.domain].dot}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="text-sm font-display text-cream">{s.name}</span>
                        <span className={`text-[10px] font-mono border rounded-full px-2 py-0.5 ${DOMAIN_STYLES[s.domain].badge}`}>
                          {DOMAIN_STYLES[s.domain].label}
                        </span>
                      </div>
                      <p className="text-xs text-cream/50 leading-relaxed">{s.insight}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Download link */}
              <div className="mt-6 pt-4 border-t border-white/5">
                <a
                  href="/docs/clifton-strengths.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-gold/60 hover:text-gold transition-colors duration-200 flex items-center gap-1.5"
                >
                  Full 34 profile →
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* ── Birkman Signature card ───────────────────────────── */}
          <AnimatedSection delay={0.18} direction="left">
            <div className="rounded-2xl border border-white/10 bg-surface-elevated p-8 h-full flex flex-col">

              {/* Card header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-cream/40 tracking-widest uppercase">Birkman Signature</span>
                  <span className="text-xs font-mono text-cream/40">Jan 2021</span>
                </div>
                <div className="text-sm font-display text-cream/80">Green behavior. Blue core.</div>
              </div>

              {/* Birkman Map positions */}
              <div className="space-y-3 flex-1">
                {BIRKMAN_MAP.map((row, i) => (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: 0.12 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={`rounded-xl border ${row.border} ${row.bg} px-4 py-3 flex items-center gap-3`}
                  >
                    <div className={`w-2 h-2 rounded-full shrink-0 ${row.dot}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-mono ${row.color} uppercase tracking-wide`}>{row.label}</span>
                        <span className="text-[10px] font-mono text-cream/30">{row.quadrant} quadrant</span>
                      </div>
                      <p className="text-xs text-cream/55 mt-0.5">{row.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Key tension callout */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55, duration: 0.7 }}
                className="mt-5 rounded-xl border border-gold/15 bg-gold/[0.04] px-4 py-3"
              >
                <p className="text-xs font-mono text-gold/70 leading-relaxed">
                  Social Energy: shows 99 · needs 17.{" "}
                  <span className="text-cream/50">The room sees a communicator. The interior needs quiet.</span>
                </p>
              </motion.div>

              {/* Download link */}
              <div className="mt-5 pt-4 border-t border-white/5">
                <a
                  href="/docs/birkman.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-cream/40 hover:text-cream/70 transition-colors duration-200 flex items-center gap-1.5"
                >
                  Birkman Signature Report →
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Bottom interests row — Birkman top interests as a quick read */}
        <AnimatedSection delay={0.2}>
          <div className="rounded-2xl border border-white/5 bg-surface/40 px-8 py-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-mono text-cream/30 tracking-widest uppercase">Birkman Interests</span>
              <span className="text-xs font-mono text-cream/20">— what energizes, not just what I'm good at</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Musical", score: "99%" },
                { label: "Scientific", score: "92%" },
                { label: "Persuasive", score: "80%" },
                { label: "Literary", score: "78%" },
                { label: "Artistic", score: "68%" },
                { label: "Technical", score: "50%" },
              ].map(({ label, score }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.4 }}
                  className="flex items-center gap-1.5 border border-white/8 rounded-full px-3 py-1.5 bg-white/[0.02]"
                >
                  <span className="text-xs font-display text-cream/70">{label}</span>
                  <span className="text-[10px] font-mono text-gold/60">{score}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
