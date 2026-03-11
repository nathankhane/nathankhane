/**
 * AgentCTA — Act 3, Section 9
 *
 * The closing section: AI agent chat interface + social links footer.
 * Easter Egg #8: "Just Ask" prompt — direct callback to the Ted ad campaign name.
 * Easter Egg #7: "10 blue links" dissolving into the chat interface appear above.
 */
"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import ChatInterface from "@/components/ChatInterface";
import { SOCIAL_LINKS } from "@/lib/social-links";

const FOOTER_LABELS = ["TikTok", "YouTube", "LinkedIn", "Substack", "Spotify"] as const;
const footerLinks = FOOTER_LABELS.map((label) =>
  SOCIAL_LINKS.find((l) => l.label === label)
).filter(Boolean);

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
        {/* Easter Egg #7 — 10 blue links dissolving into agent */}
        <motion.div
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 space-y-1.5"
          aria-hidden="true"
          data-easter-egg="ten-blue-links"
        >
          {TEN_BLUE_LINKS.map((link, i) => (
            <div
              key={i}
              className="text-xs font-mono text-google-blue/50 underline"
              style={{ opacity: 1 - i * 0.08 }}
            >
              {link}
            </div>
          ))}
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
          <p className="text-cream/50 text-sm leading-relaxed mb-10">
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
            <p className="text-xs font-mono text-cream/25 tracking-widest uppercase mb-6 text-center">
              Find Nate
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono text-cream/40 hover:text-gold transition-colors"
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
                className="text-xs font-mono text-cream/30 hover:text-cream transition-colors border-b border-white/10 hover:border-white/30 pb-0.5"
              >
                Resume PDF ↓
              </a>
              <a
                href="mailto:nathan@nathankhane.com"
                className="text-xs font-mono text-cream/30 hover:text-cream transition-colors border-b border-white/10 hover:border-white/30 pb-0.5"
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
