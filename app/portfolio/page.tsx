import CaseStudyCard from "@/components/CaseStudyCard";
import ContentCreationSection from "@/components/ContentCreationSection";

export const metadata = {
    title: "Portfolio: Khane Creative",
    description: "Selected case studies across SaaS, music, and brand storytelling.",
};

const studies = [
    {
        title: "TrustedApp — SaaS Marketplace Launch",
        description: "The marketplace where SaaS teams book discovery calls & content sessions with vetted power-users in minutes, instead of weeks.",
        image: "/images/trustedapp-screenshot.png",
        link: "https://www.trustedapp.co",
        kpis: [],
    },
    {
        title: "Intro to Modern Moguls — Live Panel",
        description: "Produced & hosted a panel of young visionaries sharing textbook‑defying business insights.",
        image: "/images/momo-panel.jpeg",
        link: "https://iondistrict.com/event/intro-to-modern-moguls/",
        kpis: [],
    },
    {
        title: "Reseeit — Receipt‑Compiling App",
        description: "Prototype built at the Wolff Center introducing a fresh way to track expenses with zero manual entry.",
        image: "/images/reseeit-screens.jpg",
        link: "https://xd.adobe.com/view/57e025cb-48fb-4bb6-bcb3-4dee68792db9-02b3/",
        kpis: [],
    },
    {
        title: "WSA — Speed Academy Site",
        description: "Elite speed training platform for athletes looking to transform their performance through personalized coaching and structured programs.",
        image: "/images/wsa-screenshot.png",
        link: "https://wilson-speed-academy.vercel.app/",
        kpis: [],
    },
];

export default function Portfolio() {
    return (
        <div className="mx-auto max-w-4xl px-6 sm:px-8">
            <section className="space-y-8 sm:space-y-10">
                <h1 className="text-3xl sm:text-4xl font-bold">Case Studies</h1>
                <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
                    {studies.map((s) => (
                        <CaseStudyCard key={s.title} {...s} />
                    ))}
                </div>

                <ContentCreationSection />
            </section>
        </div>
    );
} 