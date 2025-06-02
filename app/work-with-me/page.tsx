export const metadata = { title: "Work With Me – Transform Your Story" };

export default function Services() {
    return (
        <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                        Work With Me
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Transform your narrative into your competitive advantage. Choose the service that fits your stage and goals.
                    </p>
                </div>

                {/* Primary Services */}
                <div className="grid lg:grid-cols-3 gap-8 mb-20">

                    {/* Growth Story Audit */}
                    <div className="p-8 bg-card border border-border/50 rounded-3xl">
                        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
                            <span className="text-2xl">📈</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Growth Story Audit</h2>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                            Perfect for SaaS founders and executives who know they have a story problem but aren&apos;t sure where to start. I&apos;ll audit your current narrative and give you a roadmap to fix the gaps.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start space-x-3">
                                <span className="text-primary mt-1">✓</span>
                                <span>90-minute deep-dive session</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-primary mt-1">✓</span>
                                <span>Narrative gap analysis</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-primary mt-1">✓</span>
                                <span>Strategic messaging framework</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-primary mt-1">✓</span>
                                <span>Implementation roadmap</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <span className="text-3xl font-bold">$2,500</span>
                            <span className="text-muted-foreground ml-2">one-time</span>
                        </div>

                        <a
                            href="/contact?service=audit"
                            className="block w-full text-center px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold hover:scale-105 transition-all duration-300"
                        >
                            Book Growth Story Audit
                        </a>
                    </div>

                    {/* Creative Coaching */}
                    <div className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 rounded-3xl relative">
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <span className="px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                                Most Popular
                            </span>
                        </div>
                        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
                            <span className="text-2xl">🎨</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Creative Coaching</h2>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                            For musicians and creators who want to bridge the gap between artistic vision and business strategy. Apply for ongoing coaching that transforms creative passion into sustainable revenue.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start space-x-3">
                                <span className="text-primary mt-1">✓</span>
                                <span>Monthly 1:1 strategy sessions</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-primary mt-1">✓</span>
                                <span>Brand positioning & messaging</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-primary mt-1">✓</span>
                                <span>Release & campaign strategy</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-primary mt-1">✓</span>
                                <span>Ongoing Slack support</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <span className="text-3xl font-bold">$1,500</span>
                            <span className="text-muted-foreground ml-2">per month</span>
                        </div>

                        <a
                            href="/contact?service=coaching"
                            className="block w-full text-center px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold hover:scale-105 transition-all duration-300"
                        >
                            Apply for Creative Coaching
                        </a>
                    </div>

                    {/* Go-To-Market Sprints */}
                    <div className="p-8 bg-card border border-border/50 rounded-3xl">
                        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
                            <span className="text-2xl">🚀</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Go-To-Market Sprints</h2>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                            Rapid-fire strategy sessions for founders who need to nail their positioning, messaging, and launch strategy. Perfect for pre-launch startups or major pivots.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start space-x-3">
                                <span className="text-primary mt-1">✓</span>
                                <span>5-day intensive sprint</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-primary mt-1">✓</span>
                                <span>Positioning & messaging workshop</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-primary mt-1">✓</span>
                                <span>Launch strategy & timeline</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-primary mt-1">✓</span>
                                <span>Content & PR playbook</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <span className="text-3xl font-bold">$5,000</span>
                            <span className="text-muted-foreground ml-2">per sprint</span>
                        </div>

                        <a
                            href="/contact?service=sprint"
                            className="block w-full text-center px-6 py-3 border-2 border-primary text-primary rounded-2xl font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                        >
                            Book Sprint Session
                        </a>
                    </div>
                </div>

                {/* Secondary Offerings */}
                <div className="bg-muted/30 rounded-3xl p-12 mb-20">
                    <h2 className="text-3xl font-bold text-center mb-12">Additional Resources</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <span className="text-xl">📄</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Media Kit</h3>
                            <p className="text-muted-foreground mb-4">
                                Quick credibility snapshot for recruiters and potential partners.
                            </p>
                            <a href="#" className="text-primary font-semibold hover:underline">
                                Download Media Kit →
                            </a>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <span className="text-xl">📰</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Newsletter</h3>
                            <p className="text-muted-foreground mb-4">
                                Weekly insights on turning narrative into revenue.
                            </p>
                            <a href="/blog" className="text-primary font-semibold hover:underline">
                                Join Business ≡ Poetry →
                            </a>
                        </div>
                    </div>
                </div>

                {/* Process Section */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-8">How we work together</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto text-primary-foreground font-bold">
                                1
                            </div>
                            <h3 className="font-semibold">Discovery</h3>
                            <p className="text-sm text-muted-foreground">
                                We dive deep into your current narrative and identify the gaps.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto text-primary-foreground font-bold">
                                2
                            </div>
                            <h3 className="font-semibold">Strategy</h3>
                            <p className="text-sm text-muted-foreground">
                                Together we craft a narrative framework that aligns with your goals.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto text-primary-foreground font-bold">
                                3
                            </div>
                            <h3 className="font-semibold">Implementation</h3>
                            <p className="text-sm text-muted-foreground">
                                We roll out your new story across all touchpoints and channels.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto text-primary-foreground font-bold">
                                4
                            </div>
                            <h3 className="font-semibold">Optimization</h3>
                            <p className="text-sm text-muted-foreground">
                                We measure results and refine the narrative for maximum impact.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-6">Not sure which service fits?</h2>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Book a free 15-minute discovery call and I&apos;ll help you choose the right path forward.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg hover:scale-105 transition-all duration-300"
                    >
                        Book Free Discovery Call
                    </a>
                </div>
            </div>
        </section>
    );
} 