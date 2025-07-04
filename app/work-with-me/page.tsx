import CalWidget from "@/components/CalWidget";

export const metadata = {
    title: "Work With Me – Nathan Khane",
    description: "Strategic storytelling, creative coaching, and GTM sprints for founders & creators.",
};

const services = [
    {
        name: "Growth Story Audit",
        desc: "90-minute deep dive unearthing the narrative gaps costing you conversions.",
        calLink: "https://cal.com/nathankhane/discovery?utm_service=growth-audit",
        price: "From $750",
    },
    {
        name: "Creative Coaching",
        desc: "Four-week mentorship for musicians & creators: branding, release plans, media hooks.",
        calLink: "https://cal.com/nathankhane/discovery?utm_service=coaching",
        price: "From $1,200",
    },
    {
        name: "Go-To-Market Sprint",
        desc: "Rapid 2-week sprint crafting positioning, press kit, and first funnel for SaaS launches.",
        calLink: "https://cal.com/nathankhane/discovery?utm_service=gtm-sprint",
        price: "Custom",
    },
];

export default function Services() {
    return (
        <div className="mx-auto max-w-3xl space-y-10">
            <section className="space-y-6">
                <h1 className="text-4xl font-bold">Work With Me</h1>
                <p className="text-lg">Turning business into poetry for founders, artists, and operators.</p>

                {services.map((s) => (
                    <div key={s.name} className="border rounded-xl p-6 space-y-2">
                        <h2 className="text-2xl font-semibold">{s.name}</h2>
                        <p>{s.desc}</p>
                        <p className="font-medium">{s.price}</p>
                        <a
                            href={s.calLink}
                            className="inline-block mt-2 rounded-xl bg-primary text-primary-foreground px-4 py-2 font-medium hover:bg-primary/90 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Book Intro Call
                        </a>
                    </div>
                ))}
            </section>

            <section className="space-y-6">
                <h2 className="text-3xl font-bold">Book a Discovery Call</h2>
                <p className="text-lg">Ready to get started? Schedule a time that works for you.</p>
                <CalWidget />
            </section>
        </div>
    );
} 