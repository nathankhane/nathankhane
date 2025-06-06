"use client";

import { CinematicHero } from "@/components/cinematic-hero";
import { CredibilityBar } from "@/components/credibility-bar";
import { CaseStudyCard } from "@/components/case-study-card";
import { VisionCTA } from "@/components/VisionCTA";
import AnimatedSection from "@/components/AnimatedSection";
import LatestPosts from "@/components/LatestPosts";
import Link from "next/link";
import SubstackForm from "@/components/SubstackForm";
import ServiceCard from "@/components/ServiceCard";

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Cinematic Hero */}
      <CinematicHero />

      {/* Value Propositions */}
      <AnimatedSection direction="up" delay={0.2}>
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection direction="fade" delay={0.1} className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Every venture is a verse, every metric a rhyme
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                I help founders and creators transform their stories into strategic advantages that drive real growth.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="up" stagger={0.1} className="grid md:grid-cols-3 gap-8">
              <ServiceCard
                icon="growth"
                title="Growth Story Audit"
                description="Uncover the narrative gaps holding back your growth and get a roadmap to fix them."
                href="/work-with-me"
                cta="Learn More"
              />
              <ServiceCard
                icon="coaching"
                title="Creative Coaching"
                description="Bridge the gap between artistic vision and business strategy for sustainable creative success."
                href="/work-with-me"
                cta="Apply Now"
              />
              <ServiceCard
                icon="gtm"
                title="Go-To-Market Sprints"
                description="Rapid-fire strategy sessions to nail your positioning, messaging, and launch strategy."
                href="/work-with-me"
                cta="Book Sprint"
              />
            </AnimatedSection>
          </div>
        </section>
      </AnimatedSection>

      {/* Credibility Bar */}
      <AnimatedSection direction="fade">
        <CredibilityBar />
      </AnimatedSection>

      {/* Featured Work Preview */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection direction="fade" className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Proof in the poetry
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Case studies that show how narrative strategy transforms into measurable results.
            </p>
          </AnimatedSection>

          <AnimatedSection direction="up" stagger={0.1} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CaseStudyCard
              title="TrustedApp"
              category="Client Campaigns"
              description="Scaled expert signup 300% in four weeks through narrative-driven cold outreach."
              image="/images/trustedapp-screenshot.png"
              kpi={{
                metric: "Email List Growth",
                value: "300%",
                context: "in 4 weeks"
              }}
              link="https://www.trustedapp.co"
              featured
            />

            <CaseStudyCard
              title="WSA Speed Academy"
              category="Startups"
              description="End-to-end design & build; site ranked #1 locally for 'speed training' within 21 days."
              image="/images/wsa-screenshot.png"
              kpi={{
                metric: "Organic Site Visits",
                value: "+2,700",
                context: "in 21 days"
              }}
              link="https://wilson-speed-academy.vercel.app/"
            />

            <CaseStudyCard
              title="Reseeit"
              category="Startups"
              description="Prototype built at the Wolff Center introducing a fresh way to track expenses with zero manual entry."
              image="/images/reseeit-screens.jpg"
              kpi={{
                metric: "Pitch Competition",
                value: "1st",
                context: "Place Winner"
              }}
              link="https://xd.adobe.com/view/57e025cb-48fb-4bb6-bcb3-4dee68792db9-02b3/"
            />
          </AnimatedSection>

          <AnimatedSection direction="scale" delay={0.2} className="text-center mt-12">
            <Link
              href="/portfolio"
              className="inline-block px-8 py-4 border-2 border-primary text-primary rounded-2xl font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
            >
              View All Work
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Vision CTA */}
      <VisionCTA />

      {/* Latest Essays section */}
      <AnimatedSection direction="up">
        <LatestPosts />
      </AnimatedSection>

      {/* Newsletter CTA */}
      <AnimatedSection direction="fade">
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection direction="scale">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Join the Business ≡ Poetry newsletter
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Weekly insights on turning narrative into revenue. Stories, strategies, and behind-the-scenes from the intersection of business and creativity.
              </p>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.1} className="max-w-md mx-auto">
              <SubstackForm />
            </AnimatedSection>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}




