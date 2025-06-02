export const metadata = { title: "Contact – Khane" };

export default function Contact() {
    return (
        <section className="mx-auto max-w-3xl space-y-8">
            <h1 className="text-4xl font-bold">Start a Project</h1>
            <p className="text-lg">
                Pick a time that works for you and let's talk about turning business
                into poetry.
            </p>
            <div
                className="calendly-inline-widget w-full"
                data-url="https://calendly.com/nathankhane/20min"
                style={{ minWidth: 320, height: 700 }}
            />
            <script
                type="text/javascript"
                src="https://assets.calendly.com/assets/external/widget.js"
                async
            ></script>
        </section>
    );
} 