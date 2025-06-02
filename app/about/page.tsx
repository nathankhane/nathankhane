import Image from "next/image";

export const metadata = {
    title: "About – Nathan Khane",
    description: "Founder · Storyteller · Artist. The journey behind Business ≡ Poetry.",
};

export default function About() {
    return (
        <section className="mx-auto max-w-3xl space-y-8">
            <h1 className="text-4xl font-bold">About Me</h1>
            {/* Portrait */}
            <Image
                src="/images/profile.jpg" // TODO: drop your headshot in public/images/
                alt="Nathan Khane Morales"
                width={800}
                height={450}
                className="rounded-xl"
            />
            {/* Long-form Bio */}
            <article className="prose prose-neutral dark:prose-invert">
                <p><strong>TODO:</strong> Paste your full Squarespace bio here—your Wolff Center roots, Birkman insight, TrustedApp chapter, music journey, etc.</p>
            </article>
        </section>
    );
} 