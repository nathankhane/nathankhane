/**
 * CuratorOfTaste — Act 2, Section 7
 *
 * Connective tissue: Substack excerpts, poetry sample, Founders Basketball, DJ.
 * Easter Egg #4: Hidden search query "how to DJ a birthday party in pacific heights".
 * Substack RSS via existing /api/rss route.
 */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import EasterEgg from "@/components/EasterEgg";

interface Post {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
}

const POETRY_SAMPLE = `Every venture is a verse —
the pitch a volta, the pivot
iambic. Founders speak in metaphor
whether they know it or not.

I know it.`;

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
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/rss")
      .then((r) => r.json())
      .then((data) => {
        if (data.items) setPosts(data.items.slice(0, 2));
      })
      .catch(() => {/* RSS unavailable — show placeholder */});
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
                    <div className="text-xs font-mono text-cream/30 tracking-widest uppercase mb-1">Writing</div>
                    <div className="text-sm font-display text-cream">Khane School of Thought</div>
                  </div>
                  <a
                    href="https://substack.com/@nathankhane"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-gold/60 hover:text-gold transition-colors"
                  >
                    Substack →
                  </a>
                </div>

                <div className="space-y-4">
                  {posts.length > 0 ? posts.map((post) => (
                    <a
                      key={post.link}
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <div className="border border-white/10 rounded-xl p-4 hover:border-gold/30 transition-colors">
                        <div className="text-sm font-display text-cream/80 group-hover:text-cream group-hover:translate-x-1 transition-all duration-200 leading-snug mb-2">
                          {post.title}
                        </div>
                        {post.contentSnippet && (
                          <div className="text-xs text-cream/30 leading-relaxed line-clamp-2">
                            {post.contentSnippet}
                          </div>
                        )}
                      </div>
                    </a>
                  )) : (
                    // Placeholder if RSS unavailable
                    <div className="border border-white/10 rounded-xl p-4 opacity-50">
                      <div className="text-sm font-display text-cream/40 mb-1">Essays on systems, creativity, and the spaces between</div>
                      <div className="text-xs text-cream/20">Khane School of Thought on Substack</div>
                    </div>
                  )}
                </div>
              </div>
            </AnimatedSection>

            {/* Poetry sample */}
            <AnimatedSection delay={0.2}>
              <div>
                <div className="text-xs font-mono text-cream/30 tracking-widest uppercase mb-4">Poetry</div>
                <blockquote className="border-l-2 border-gold/40 pl-5">
                  <p className="font-display text-cream/70 text-sm leading-relaxed italic whitespace-pre-line">
                    {POETRY_SAMPLE}
                  </p>
                  <footer className="mt-3 text-xs font-mono text-cream/25">
                    — Nathan Khane Morales
                  </footer>
                </blockquote>
              </div>
            </AnimatedSection>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {ACTIVITIES.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-2xl border border-white/10 bg-ink/60 p-6 border-l-2 ${i === 0 ? "border-l-gold/50" : "border-l-cream/20"}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-sm font-display text-cream">{a.title}</div>
                  <div className="text-xs font-mono text-gold/50">{a.subtitle}</div>
                </div>
                <p className="text-xs text-cream/40 leading-relaxed">{a.desc}</p>
              </motion.div>
            ))}

            {/* Capgemini credential */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-white/10 bg-ink/60 p-6 border-l-2 border-l-google-blue/30"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-sm font-display text-cream">UX Consulting</div>
                <div className="text-xs font-mono text-cream/40">Capgemini</div>
              </div>
              <p className="text-xs text-cream/30 italic font-mono tracking-wide">
                [Placeholder — Nate to rewrite]
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
