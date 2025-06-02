import dynamic from "next/dynamic";

const TikTokEmbed = dynamic(() => import("@/components/TikTokEmbed"), {
    ssr: false,
});

export const metadata = { title: "Portfolio – Proof in the Poetry" };

export default function Portfolio() {
    return (
        <section className="mx-auto max-w-3xl space-y-8">
            <h1 className="text-4xl font-bold">Featured Reels</h1>

            {/* TikTok embeds */}
            <TikTokEmbed videoId="7499259227735706923" />
            <TikTokEmbed videoId="7448001294297582890" />
            <TikTokEmbed videoId="7456622147159510314" />
        </section>
    );
} 