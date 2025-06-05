import CaseStudyCard from "@/components/CaseStudyCard";
import ContentCreationSection from "@/components/ContentCreationSection";

export const metadata = {
    title: "Portfolio – Nathan Khane",
    description: "Selected case studies across SaaS, music, and brand storytelling.",
};

const studies = [
    {
        title: "TrustedApp — SaaS Marketplace Launch",
        description: "Scaled expert signup 300 % in four weeks through narrative-driven cold outreach.",
        image: "/images/trustedapp-screenshot.png",
        link: "https://www.trustedapp.co",
        kpis: [
            { label: "Email List Growth", value: "300 %" },
            { label: "MQLs in 30 Days", value: "116" },
        ],
    },
    {
        title: "Intro to Modern Moguls — Live Panel",
        description: "Produced & hosted a panel of young visionaries sharing textbook‑defying business insights.",
        image: "/images/momo-panel.jpeg",
        link: "https://iondistrict.com/event/intro-to-modern-moguls/",
        kpis: [
            { label: "Audience", value: "200+" },
            { label: "Post‑event NPS", value: "92" },
        ],
    },
    {
        title: "Reseeit — Receipt‑Compiling App",
        description: "Prototype built at the Wolff Center introducing a fresh way to track expenses with zero manual entry.",
        image: "/images/reseeit-screens.jpg",
        link: "https://xd.adobe.com/view/57e025cb-48fb-4bb6-bcb3-4dee68792db9-02b3/",
        kpis: [
            { label: "Prototype Users", value: "50" },
            { label: "Pitch Competition Wins", value: "1st Place" },
        ],
    },
    {
        title: "WSA — Speed Academy Site",
        description: "End-to-end design & build; site ranked #1 locally for 'speed training' within 21 days.",
        image: "/images/wsa-screenshot.png",
        link: "https://wilson-speed-academy.vercel.app/",
        kpis: [
            { label: "Organic Site Visits", value: "+2,700" },
            { label: "Lead Conv. Rate", value: "18 %" },
        ],
    },
];

export default function Portfolio() {
    return (
        <section className="mx-auto max-w-4xl space-y-10">
            <h1 className="text-4xl font-bold">Case Studies</h1>
            <div className="grid md:grid-cols-2 gap-8">
                {studies.map((s) => (
                    <CaseStudyCard key={s.title} {...s} />
                ))}
            </div>

            <ContentCreationSection />


        </section>
    );
} 