export const metadata = { title: "Portfolio – Proof in the Poetry" };

import { CaseStudyCard } from "@/components/case-study-card";

export default function Portfolio() {
    const caseStudies = [
        {
            title: "TrustedApp",
            category: "Client Campaigns" as const,
            description: "Complete rebrand and go-to-market strategy for a B2B security platform. Transformed their narrative from tech-focused to trust-focused.",
            kpi: {
                metric: "Email List Growth",
                value: "300%",
                context: "in 6 months"
            },
            link: "/portfolio/trustedapp",
            featured: true
        },
        {
            title: "Midnight Verses",
            category: "Music" as const,
            description: "Album launch strategy blending artistic vision with streaming optimization. Authentic storytelling meets data-driven distribution.",
            kpi: {
                metric: "Monthly Streams",
                value: "50K+",
                context: "organic reach"
            },
            link: "/portfolio/midnight-verses"
        },
        {
            title: "Behind the Scenes",
            category: "Reels" as const,
            description: "Studio diary content that humanizes the creative process. Raw authenticity that builds deeper audience connection.",
            kpi: {
                metric: "Engagement Rate",
                value: "8.5%",
                context: "avg per post"
            },
            link: "/portfolio/behind-scenes"
        },
        {
            title: "FounderFlow",
            category: "Startups" as const,
            description: "Series A pitch deck storytelling for a productivity startup. Narrative framework that secured $2M funding.",
            kpi: {
                metric: "Funding Secured",
                value: "$2M",
                context: "Series A round"
            },
            link: "/portfolio/founderflow"
        },
        {
            title: "Creative Catalyst",
            category: "Music" as const,
            description: "Brand positioning for an independent record label. Strategy that attracts both artists and investors.",
            kpi: {
                metric: "Artist Signups",
                value: "250%",
                context: "increase"
            },
            link: "/portfolio/creative-catalyst"
        },
        {
            title: "Morning Rituals",
            category: "Reels" as const,
            description: "Content series showcasing daily creative practices. Educational content that drives service inquiries.",
            kpi: {
                metric: "Lead Generation",
                value: "40+",
                context: "qualified leads"
            },
            link: "/portfolio/morning-rituals"
        }
    ];

    return (
        <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                        Proof in the poetry
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Case studies where narrative strategy transforms into measurable results. Every story told with purpose, every metric earned through authentic connection.
                    </p>
                </div>

                {/* Filter buttons could go here in the future */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <button className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-semibold">
                        All Work
                    </button>
                    <button className="px-6 py-2 border border-border rounded-full hover:bg-muted transition-colors">
                        Client Campaigns
                    </button>
                    <button className="px-6 py-2 border border-border rounded-full hover:bg-muted transition-colors">
                        Music
                    </button>
                    <button className="px-6 py-2 border border-border rounded-full hover:bg-muted transition-colors">
                        Startups
                    </button>
                    <button className="px-6 py-2 border border-border rounded-full hover:bg-muted transition-colors">
                        Reels
                    </button>
                </div>

                {/* Case Studies Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {caseStudies.map((study, index) => (
                        <CaseStudyCard
                            key={index}
                            title={study.title}
                            category={study.category}
                            description={study.description}
                            kpi={study.kpi}
                            link={study.link}
                            featured={study.featured}
                        />
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center mt-20 p-12 bg-muted/30 rounded-3xl">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                        Ready to write your success story?
                    </h2>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Every breakthrough starts with a narrative. Let&apos;s craft yours.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold hover:scale-105 transition-all duration-300"
                        >
                            Book a Discovery Call
                        </a>
                        <a
                            href="/work-with-me"
                            className="px-8 py-4 border-2 border-primary text-primary rounded-2xl font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                        >
                            Explore Services
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
} 