import { CinematicHero } from "@/components/cinematic-hero";
import { CredibilityBar } from "@/components/credibility-bar";
import { CaseStudyCard } from "@/components/case-study-card";
import Link from "next/link";
import SubstackForm from "@/components/SubstackForm";
import dynamic from "next/dynamic";
const LogoStrip = dynamic(() => import("@/components/LogoStrip"));

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Cinematic Hero */}
      <CinematicHero />

      {/* Value Propositions */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Every venture is a verse, every metric a rhyme
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              I help founders and creators transform their stories into strategic advantages that drive real growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-card border border-border/50">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Growth Story Audit</h3>
              <p className="text-muted-foreground mb-6">
                Uncover the narrative gaps holding back your growth and get a roadmap to fix them.
              </p>
              <Link href="/work-with-me" className="text-primary font-semibold hover:underline">
                Learn More →
              </Link>
            </div>

            <div className="text-center p-8 rounded-2xl bg-card border border-border/50">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Creative Coaching</h3>
              <p className="text-muted-foreground mb-6">
                Bridge the gap between artistic vision and business strategy for sustainable creative success.
              </p>
              <Link href="/work-with-me" className="text-primary font-semibold hover:underline">
                Apply Now →
              </Link>
            </div>

            <div className="text-center p-8 rounded-2xl bg-card border border-border/50">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Go-To-Market Sprints</h3>
              <p className="text-muted-foreground mb-6">
                Rapid-fire strategy sessions to nail your positioning, messaging, and launch strategy.
              </p>
              <Link href="/work-with-me" className="text-primary font-semibold hover:underline">
                Book Sprint →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Bar */}
      <CredibilityBar />

      {/* Social proof logo strip */}
      <LogoStrip />

      {/* Featured Work Preview */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Proof in the poetry
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Case studies that show how narrative strategy transforms into measurable results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CaseStudyCard
              title="TrustedApp"
              category="Client Campaigns"
              description="Complete rebrand and go-to-market strategy for a B2B security platform."
              kpi={{
                metric: "Email List Growth",
                value: "300%",
                context: "in 6 months"
              }}
              link="/portfolio/trustedapp"
              featured
            />

            <CaseStudyCard
              title="Midnight Verses"
              category="Music"
              description="Album launch strategy blending artistic vision with streaming optimization."
              kpi={{
                metric: "Monthly Streams",
                value: "50K+",
                context: "organic reach"
              }}
              link="/portfolio/midnight-verses"
            />

            <CaseStudyCard
              title="Behind the Scenes"
              category="Reels"
              description="Studio diary content that humanizes the creative process."
              kpi={{
                metric: "Engagement Rate",
                value: "8.5%",
                context: "avg per post"
              }}
              link="/portfolio/behind-scenes"
            />
          </div>

          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="inline-block px-8 py-4 border-2 border-primary text-primary rounded-2xl font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              View All Work
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Essays section */}
      <LatestPosts />

      {/* Newsletter CTA */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Join the Business ≡ Poetry newsletter
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Weekly insights on turning narrative into revenue. Stories, strategies, and behind-the-scenes from the intersection of business and creativity.
          </p>
          <div className="max-w-md mx-auto">
            <SubstackForm />
          </div>
        </div>
      </section>
    </div>
  );
}

/* --------------------------- Latest Essays ---------------------------- */
import Parser from "rss-parser";

async function LatestPosts() {
  const parser = new Parser();
  const feed = await parser.parseURL("https://nathankhane.substack.com/feed");
  const latest = feed.items.slice(0, 3);
  return (
    <section className="pt-20 space-y-6">
      <h2 className="text-3xl font-semibold text-center">Latest Essays</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {latest.map((p) => (
          <a
            key={p.link}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="border rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition flex flex-col"
          >
            <h3 className="font-medium">{p.title}</h3>
            <span className="mt-auto text-xs opacity-60">{p.pubDate}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
