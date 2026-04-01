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

import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import EasterEgg from "@/components/EasterEgg";


const ACTIVITIES = [
  {
    title: "Founders Basketball",
    subtitle: "SF Chapter Lead",
    desc: "Built the bridge between competitive pickup and founder culture in San Francisco. The court is where relationships stop being transactional.",
  },
  {
    title: "DJ",
    subtitle: "DDJ-400 + Rekordbox",
    desc: "I curate the room before I walk in. Every set is an edit — you're making decisions about energy, arc, and release the whole time.",
  },
];

export default function CuratorOfTaste() {
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
        {/* Header — right-aligned (alternating layout) */}
        <div className="mb-16 text-right">
          <AnimatedSection direction="fade">
            <span className="text-xs font-mono text-gold/60 tracking-[0.2em] uppercase">
              Curator of Taste
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="mt-4 text-3xl sm:text-4xl font-display text-cream leading-tight max-w-2xl ml-auto text-balance">
              The connective tissue between everything.
            </h2>
          </AnimatedSection>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 md:items-start">
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

                {/* Substack post cards */}
                <div className="space-y-4">
                  {[
                    {
                      title: "Uncertainty is the birthplace of possibility",
                      excerpt: "We\u2019re only limited in this life by two things: our worry, and our regret.",
                      href: "https://nathankhane.substack.com/p/uncertainty-is-the-birthplace-of",
                      date: "Apr 14, 2025",
                    },
                    {
                      title: "The Identity Paradox",
                      excerpt: "Everything you are is built from everything you\u2019re not.",
                      href: "https://nathankhane.substack.com/p/the-identity-paradox",
                      date: "Mar 2025",
                    },
                  ].map((post) => (
                    <a
                      key={post.href}
                      href={post.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-xl bg-surface border border-white/10 hover:border-white/20 transition-colors overflow-hidden group"
                    >
                      <div className="p-5">
                        <p className="font-bold text-cream text-base leading-snug mb-2 group-hover:text-white transition-colors">
                          {post.title}
                        </p>
                        <p className="text-cream/50 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                        <div className="flex items-center gap-2 mb-4">
                          <div>
                            <span className="text-xs font-semibold text-cream/80">nathan khane</span>
                            <span className="text-xs text-cream/40 ml-1">· Khane School of Thought</span>
                          </div>
                        </div>
                        <div className="w-full bg-[#FF6719] text-white text-sm font-semibold text-center py-2.5 rounded-lg">
                          Read on Substack
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </AnimatedSection>

          </div>

          {/* Right column — CU4: directional entrance from right */}
          <div>
            {/* Header row matching left column structure */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-xs font-mono text-cream/60 tracking-widest uppercase mb-1">Activities</div>
                <div className="text-sm font-display text-cream">Beyond the screen</div>
              </div>
            </div>

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
              <p className="text-xs text-cream/60 leading-relaxed">
                Translated complexity into clarity for Fortune 500 clients. Learned that the best design is invisible, and the worst never lets you forget it&apos;s there.
              </p>
            </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
