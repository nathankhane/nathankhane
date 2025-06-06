import CalendlyWidget from "@/components/CalendlyWidget";

export const metadata = { title: "Contact – Khane" };

export default function Contact() {
    return (
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
            <section className="space-y-6 sm:space-y-8">
                <h1 className="text-3xl sm:text-4xl font-bold">Start a Project</h1>
                <p className="text-base sm:text-lg leading-relaxed">
                    Pick a time that works for you and let's talk about turning business
                    into poetry.
                </p>
                <CalendlyWidget />
            </section>
        </div>
    );
} 