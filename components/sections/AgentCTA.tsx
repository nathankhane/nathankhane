/**
 * AgentCTA — Act 3, Section 9
 *
 * The closing section: AI agent chat interface + social links footer.
 * Easter Egg #8: "Just Ask" prompt — direct callback to the Ted ad campaign name.
 * Easter Egg #7: "10 blue links" dissolving into the chat interface appear above.
 *
 * AG1: Phase machine — links stagger IN on mount (each appears with offset delay),
 *      then the container dissolves out when the section reaches the viewport.
 *      This gives them a proper entrance before the cinematic exit.
 *
 * AG2: A scan line sweeps through the blue links block once on mount —
 *      mimicking a search engine reading through results.
 */
"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import ChatInterface from "@/components/ChatInterface";
import { SOCIAL_LINKS } from "@/lib/social-links";

const FOOTER_LABELS = ["TikTok", "YouTube", "LinkedIn", "Substack", "Spotify"] as const;
const footerLinks = FOOTER_LABELS.map((label) =>
  SOCIAL_LINKS.find((l) => l.label === label)
).filter((link): link is (typeof SOCIAL_LINKS)[number] => Boolean(link));

// Easter Egg #7: 10 blue links that dissolve into the chat UI
const TEN_BLUE_LINKS = [
  "What is Nathan Khane Morales known for?",
  "Nathan Khane Morales Bridge AI startup",
  "Nathan Khane Morales Google Fellowship",
  "nathankhane music producer Houston",
  "Nathan Khane Morales Capgemini UX",
  "nathankhane TikTok creator",
  "Nathan Morales Founders Basketball SF",
  "Bridge AI business intelligence platform",
  "nathankhane Substack writer",
  "Nathan Khane Morales creative director",
];

export default function AgentCTA() {
  return (
    <section
      id="agent"
      className="relative py-24 md:py-36 bg-surface overflow-hidden"
      aria-label="Just Ask — Act 3"
    >
      <div className="max-w-3xl mx-auto px-6">
        {/* Easter Egg #7 — 10 blue links: stagger in on mount, dissolve out on viewport entry */}
        <motion.div
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 relative"
          aria-hidden="true"
          data-easter-egg="ten-blue-links"
        >
          {/* AG2 — scan line sweeps through the links once */}
          <motion.div
            className="absolute inset-x-0 h-px pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to right, transparent 0%, rgba(66,133,244,0.5) 50%, transparent 100%)",
              top: 0,
            }}
            initial={{ top: "0%", opacity: 0 }}
            animate={{ top: ["0%", "110%"], opacity: [0, 0.9, 0.9, 0] }}
            transition={{
              delay: 1.0,
              duration: 1.6,
              ease: "linear",
              times: [0, 0.08, 0.92, 1],
            }}
            aria-hidden="true"
          />

          {/* AG1 — links stagger in on mount */}
          <div className="space-y-1.5">
            {TEN_BLUE_LINKS.map((link, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1 - i * 0.08, x: 0 }}
                transition={{
                  delay: 0.15 + i * 0.06,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-xs font-mono text-google-blue/50 underline"
              >
                {link}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Header */}
        <AnimatedSection direction="fade">
          <span className="text-xs font-mono text-gold/60 tracking-[0.2em] uppercase">
            Just Ask
          </span>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2 className="mt-4 text-3xl sm:text-4xl font-display text-cream leading-tight mb-2">
            Want to know more?
          </h2>
          <p className="text-cream/75 text-sm leading-relaxed mb-10">
            {/* Easter Egg #8: "Just Ask" reference */}
            I trained an AI on my background, work, and creative philosophy.{" "}
            <span data-easter-egg="just-ask">Just ask.</span>
          </p>
        </AnimatedSection>

        {/* AI Chat Interface */}
        <AnimatedSection delay={0.15}>
          <ChatInterface />
        </AnimatedSection>

        {/* Links */}
        <AnimatedSection delay={0.3}>
          <div className="mt-16 pt-12 border-t border-white/10">
            <p className="text-xs font-mono text-cream/70 tracking-widest uppercase mb-6 text-center">
              Find Nate
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono text-cream/70 hover:text-gold transition-colors py-2 px-1"
                >
                  {label}
                </a>
              ))}
            </div>

            {/* Resume + email */}
            <div className="flex justify-center gap-6 mt-6">
              <a
                href="/resume.pdf"
                download
                className="text-xs font-mono text-cream/70 hover:text-cream transition-colors border-b border-white/10 hover:border-white/30 pb-0.5"
              >
                Resume PDF ↓
              </a>
              <a
                href="mailto:nathan@nathankhane.com"
                className="text-xs font-mono text-cream/70 hover:text-cream transition-colors border-b border-white/10 hover:border-white/30 pb-0.5"
              >
                Email
              </a>
            </div>

            {/* Footer credit */}
            <div className="mt-12 text-center">
              <p className="text-[10px] font-mono text-cream/15 tracking-widest">
                Business Is Poetry · nathankhane.com · 2026
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
