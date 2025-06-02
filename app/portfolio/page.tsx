import TikTokSection from "@/components/TikTokSection";

export const metadata = { title: "Portfolio – Proof in the Poetry" };

export default function Portfolio() {
    return (
        <section className="mx-auto max-w-3xl space-y-8">
            <h1 className="text-4xl font-bold">Featured Reels</h1>

            {/* TikTok embeds */}
            <TikTokSection />
        </section>
    );
} 