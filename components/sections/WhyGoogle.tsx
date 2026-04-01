/**
 * WhyGoogle — Act 3, Section 8
 *
 * Direct address to the fellowship reviewers. No pretense.
 * Easter Egg #5: Google brand DNA colors (#4285F4, #EA4335, #FBBC05, #34A853)
 *   pulse subtly in the background gradient — the DNA without the logo.
 * Easter Egg #6: "Dear Sophie" reference embedded in copy.
 *
 * WG1: Google DNA background fades in from opacity 0 → 0.5 as section enters —
 *      colors emerge rather than being static, making it feel earned.
 *
 * WG2: Role card top accent lines draw left→right (scaleX 0→1) on viewport entry.
 *
 * WG3: Google campaigns list rows stagger in sequentially from the left.
 *
 * WG5: The closing quote declaration enters with a dramatic scale + rise —
 *      the whole thesis made physical.
 */
"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const ROLES = [
  {
    title: "Video Storyteller (AI Focus)",
    org: "YouTube Creative Studio",
    why: "Age 5. Bedroom. Writing scripts, poetry, love songs, even though nobody asked me to. I just had too much to say. That instinct never went away, it just got faster tools. AI didn't change how I tell stories. It gave me a way to tell them at the speed I actually think. I built this whole application that way: in public, live, iterating. YouTube is where story moves at scale and where that speed is the whole point. That's been my room since before I knew it existed.",
    // YouTube red
    accent: {
      line: "bg-google-red/60",
      label: "text-google-red/70",
      glow: "shadow-[0_0_32px_rgba(234,67,53,0.18)]",
      bg: "bg-google-red/[0.04]",
      border: "border-google-red/20",
    },
  },
  {
    title: "Producer",
    org: "Brand Studio",
    why: "Records. Software. Brand campaigns. All produced. The through-line isn't the medium — it's the instinct to hold the vision steady while everything around it is on fire. I didn't develop that skill. I was born with it and the last 25 years just gave me more rooms to use it in. Brand-critical work across social, film, and interactive? I've been training for this my whole life. I've been a producer longer than I've had a title for it.",
    // Google blue
    accent: {
      line: "bg-google-blue/60",
      label: "text-google-blue/70",
      glow: "shadow-[0_0_32px_rgba(66,133,244,0.18)]",
      bg: "bg-google-blue/[0.04]",
      border: "border-google-blue/20",
    },
  },
];

const GOOGLE_CAMPAIGNS = [
  { name: "Dear Sophie", year: "2011", desc: "Chrome ad. The one that proved technology can be tender.", href: "https://www.youtube.com/watch?v=R4vkVHijdQk" },
  { name: "Year in Search", year: "2013–", desc: "Annual proof that data, told right, makes people cry.", href: "https://trends.withgoogle.com/year-in-search/2013/" },
  { name: "Ted (Just Ask Google)", year: "2025", desc: "My favorite Google Ad of all time... I used to watch it weekly before there was a marketing error that pulled it from Youtube.", href: null },
];

export default function WhyGoogle() {
  return (
    <section
      id="google"
      className="relative py-24 md:py-36 overflow-hidden"
      aria-label="Why Google — Act 3"
    >
      {/* WG1 — Easter Egg #5: Google DNA colors emerge from 0 on section entry */}
      <motion.div
        className="absolute inset-0 google-dna-bg"
        aria-hidden="true"
        data-easter-egg="google-dna-colors"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Overlay to keep text readable */}
      <div className="absolute inset-0 bg-ink/80" aria-hidden="true" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <AnimatedSection direction="fade">
            <span className="text-xs font-mono text-google-blue/70 tracking-[0.2em] uppercase">
              Act III: The Future
            </span>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-display text-cream leading-tight text-balance">
              Why Google?
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="mt-6 text-cream/70 font-display text-lg italic">
              One could say I was born for it...
            </p>
          </AnimatedSection>
        </div>

        {/* Fellowship roles — WG2: accent lines draw on entry */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {ROLES.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -2, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className={`rounded-2xl border backdrop-blur-sm p-6 overflow-hidden relative ${role.accent.bg} ${role.accent.border} ${role.accent.glow}`}
            >
              {/* WG2 — top accent line draws left→right */}
              <motion.div
                className={`absolute top-0 left-0 right-0 h-[2px] ${role.accent.line}`}
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "left" }}
              />
              <div className={`text-xs font-mono mb-1 ${role.accent.label}`}>
                {role.org}
              </div>
              <div className="text-lg font-display text-cream mb-4">{role.title}</div>
              <p className="text-sm text-cream/75 leading-relaxed">{role.why}</p>
            </motion.div>
          ))}
        </div>

        {/* Resume link — subtle bridge between roles and credentials */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center -mt-10 mb-16"
        >
          <a
            href="/resume"
            className="text-xs font-mono text-gold/60 hover:text-gold transition-colors border-b border-gold/30 hover:border-gold pb-0.5"
          >
            View structured resume →
          </a>
        </motion.div>

        {/* WG3 — campaigns stagger in from left */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-mono text-cream/70 tracking-widest uppercase mb-6"
          >
            Google creative I&apos;ve studied obsessively
          </motion.div>
          <div className="space-y-0">
            {GOOGLE_CAMPAIGNS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start justify-between py-4 border-b border-white/5"
              >
                <div>
                  {c.href ? (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-display text-cream/80 hover:text-google-blue transition-colors inline-flex items-center gap-1.5 group"
                    >
                      {c.name}
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="opacity-0 group-hover:opacity-60 transition-opacity shrink-0">
                        <path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  ) : (
                    <div className="text-sm font-display text-cream/80">{c.name}</div>
                  )}
                  <div className="text-xs text-cream/70 mt-1">{c.desc}</div>
                </div>
                <div className="text-xs font-mono text-cream/70 shrink-0 ml-4">{c.year}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* WG5 — closing quote enters dramatically: scale + rise */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 max-w-2xl mx-auto text-center"
        >
          <p className="text-2xl md:text-3xl font-display text-cream/80 leading-relaxed italic text-balance">
            <span className="text-gold not-italic">&ldquo;</span>The site you&apos;re reading right now is the portfolio piece.
            I didn&apos;t submit a PDF. I&apos;ve been building my case for a position in the Google Creative Fellowship from the ground up, since I was a curious infant.&rdquo;
          </p>
          <p className="mt-4 text-sm font-mono text-cream/70">
            — Nathan Khane Morales
          </p>
          {/* Fellowship interest CTA */}
          <motion.button
            onClick={() => {
              document.getElementById("persistent-ui")?.classList.remove("hero-hidden");
              window.dispatchEvent(
                new CustomEvent("nate:search", {
                  detail: { query: "Make the case for why Nate belongs at Google Creative. Why is he applying for the fellowship?" },
                })
              );
            }}
            className="mt-8 text-xs font-mono text-google-blue/60 hover:text-google-blue transition-colors duration-200 border-b border-google-blue/20 hover:border-google-blue/50 pb-0.5 block"
            whileTap={{ scale: 0.97 }}
          >
            Ask me about it →
          </motion.button>
        </motion.div>

        {/* Site footer */}
        <AnimatedSection delay={0.4}>
          <div className="mt-20 pt-10 border-t border-white/10 text-center">
            <p className="text-xs font-mono text-cream/50 tracking-widest">
              Business Is Poetry · nathankhane.com · 2026
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
