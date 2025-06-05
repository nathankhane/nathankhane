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
                src="/images/about-photo.jpg"
                alt="Nathan Khane Morales"
                width={800}
                height={450}
                className="rounded-xl"
            />
            {/* Long-form Bio */}
            <article className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-xl font-semibold text-primary mb-6">
                    Founder. Creative specialist. Empathy engine.
                </p>

                <p className="text-lg leading-relaxed mb-4">
                    I build products and stories that move people—because honest creativity is my main KPI.
                </p>

                <p className="leading-relaxed mb-4">
                    From prototyping Reseeit at UH's Wolff Center to launching TrustedApp and coaching indie artists, I've learned that ideas don't change the world until someone feels them. I translate complex ambition into language that lands, then rally teams to ship.
                </p>

                <p className="leading-relaxed mb-4">
                    Articulating incomprehensible thoughts into digestible bits is my superpower.
                </p>

                <p className="leading-relaxed mb-4">
                    Connecting people, and activating purpose within them, is my purpose.
                </p>

                <p className="leading-relaxed mb-4">
                    Inspiring others is what fulfills me.
                </p>

                <p className="leading-relaxed font-medium">
                    It is how I am creating change in the world.
                </p>
            </article>
        </section>
    );
} 