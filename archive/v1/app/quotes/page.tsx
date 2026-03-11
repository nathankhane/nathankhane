"use client";

import AnimatedSection from "@/components/AnimatedSection";

const quotes = [
  "Let's bring your vision to life.",
  "Growth should be noticed, not forced.",
  "Smooth seas never made a skilled sailor.",
  "Live in the future, then build what's missing.",
  "Don't game the system—be the system.",
  "Raison d'être: reason for being.",
  "The most valuable truths are the unbelieved ones.",
  "Break uncertainty into parts; then decide.",
  "Feel the thrill of launching something real.",
];

export default function QuotesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Philosophy & <span className="text-primary">Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A collection of thoughts on business, growth, and the pursuit of meaningful work.
            </p>
          </div>
        </AnimatedSection>

        <div className="space-y-8">
          {quotes.map((quote, index) => (
            <AnimatedSection key={index}>
              <div className="group">
                <blockquote className="text-2xl md:text-3xl font-semibold text-center py-12 px-8 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                  <p className="italic leading-relaxed">
                    "{quote}"
                  </p>
                </blockquote>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="text-center mt-16 pt-16 border-t border-border/50">
            <p className="text-muted-foreground mb-6">
              Want to discuss these ideas further?
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
            >
              Let's Connect
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}