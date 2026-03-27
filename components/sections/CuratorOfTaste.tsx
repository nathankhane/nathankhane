/**
 * CuratorOfTaste — Act 2, Section 7
 *
 * Connective tissue: Substack embeds, poetry sample, Founders Basketball, DJ.
 * Easter Egg #4: Hidden search query "how to DJ a birthday party in pacific heights".
 *
 * CU1: Poetry lines reveal one-by-one with a stagger (left offset → 0).
 *
 * CU2: Gold left border on the poetry blockquote draws down (scaleY 0→1)
 *      before the lines appear, giving the illusion of a quill striking the page.
 *
 * CU4: Activity cards enter from the right (x: 20→0) instead of plain fade-up —
 *      directional pull matching column side.
 */
"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import EasterEgg from "@/components/EasterEgg";

const POETRY_SAMPLE = `Every venture is a verse —
the pitch a volta, the pivot
iambic. Founders speak in metaphor
whether they know it or not.

I know it.`;

/* CU1 — split into individual lines for staggered reveal */
const POETRY_LINES = POETRY_SAMPLE.split("\n");

const ACTIVITIES = [
  {
    title: "Founders Basketball",
    subtitle: "SF Chapter Lead",
    desc: "[Placeholder — Nate to rewrite]",
  },
  {
    title: "DJ",
    subtitle: "DDJ-400 + Rekordbox",
    desc: "[Placeholder — Nate to rewrite]",
  },
];

export default function CuratorOfTaste() {
  // Dynamically load Substack embed.js after React mount so both embed divs
  // are guaranteed to be in the DOM when the script processes them.
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://substack.com/embedjs/embed.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  return (
    <section
      id="curator"
      className="relative py-24 md:py-36 overflow-hidden"
      aria-label="Curator of Taste — Act 2"
    >
      {/* Easter Egg #4 — hidden search query */}
      <EasterEgg
        mode="hidden"
        content="how to DJ a birthday party in pacific heights"
        data-easter-egg="hidden-search-query"
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <AnimatedSection direction="fade">
            <span className="text-xs font-mono text-gold/60 tracking-[0.2em] uppercase">
              Curator of Taste
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="mt-4 text-3xl sm:text-4xl font-display text-cream leading-tight max-w-2xl text-balance">
              The connective tissue between everything.
            </h2>
          </AnimatedSection>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Left column */}
          <div className="space-y-20">
            {/* Substack */}
            <AnimatedSection delay={0.1}>
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-xs font-mono text-cream/60 tracking-widest uppercase mb-1">Writing</div>
                    <div className="text-sm font-display text-cream">Khane School of Thought</div>
                  </div>
                  <a
                    href="https://nathankhane.substack.com/?utm_campaign=profile_chips"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-gold/60 hover:text-gold transition-colors"
                  >
                    Substack →
                  </a>
                </div>

                {/* Embedded Substack articles */}
                <div className="space-y-4">
                  {[
                    {
                      title: "Uncertainty is the birthplace of possibility by nathan khane",
                      excerpt: "We\u2019re only limited in this life by two things: our worry, and our regret.",
                      href: "https://nathankhane.substack.com/p/uncertainty-is-the-birthplace-of",
                    },
                    {
                      title: "The Identity Paradox by nathan khane",
                      excerpt: "Everything you are is built from everything you\u2019re not.",
                      href: "https://nathankhane.substack.com/p/the-identity-paradox",
                    },
                  ].map((post) => (
                    <div
                      key={post.href}
                      className="rounded-xl overflow-hidden ring-1 ring-white/10 shadow-lg"
                    >
                      <div className="substack-post-embed">
                        <p lang="en">{post.title}</p>
                        <p>{post.excerpt}</p>
                        <a data-post-link="" href={post.href}>Read on Substack</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Poetry sample */}
            <AnimatedSection delay={0.2}>
              <div>
                <div className="text-xs font-mono text-cream/60 tracking-widest uppercase mb-4">Poetry</div>

                {/* CU2: Animated left border + CU1: line-by-line reveal */}
                <blockquote className="relative pl-5">
                  {/* CU2 — border draws downward before lines appear */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold/40"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: "top" }}
                    aria-hidden="true"
                  />

                  <p className="font-display text-cream/70 text-sm leading-relaxed italic">
                    {/* CU1 — each line staggers in after the border draws */}
                    {POETRY_LINES.map((line, i) => (
                      <motion.span
                        key={i}
                        className="block"
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.4 + i * 0.13,
                          duration: 0.5,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        {/* Preserve blank lines in the poem */}
                        {line || "\u00A0"}
                      </motion.span>
                    ))}
                  </p>
                  <footer className="mt-3 text-xs font-mono text-cream/70">
                    — Nathan Khane Morales
                  </footer>
                </blockquote>
              </div>
            </AnimatedSection>
          </div>

          {/* Right column — CU4: directional entrance from right */}
          <div className="space-y-6">
            {ACTIVITIES.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-2xl border border-white/10 bg-ink/60 p-6 border-l-2 ${
                  i === 0 ? "border-l-gold/50" : "border-l-cream/20"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-sm font-display text-cream">{a.title}</div>
                  <div className="text-xs font-mono text-gold/70">{a.subtitle}</div>
                </div>
                <p className="text-xs text-cream/70 leading-relaxed">{a.desc}</p>
              </motion.div>
            ))}

            {/* Capgemini credential — also from right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-white/10 bg-ink/60 p-6 border-l-2 border-l-google-blue/30"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-sm font-display text-cream">UX Consulting</div>
                <div className="text-xs font-mono text-cream/70">Capgemini</div>
              </div>
              <p className="text-xs text-cream/60 italic font-mono tracking-wide">
                [Placeholder — Nate to rewrite]
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
