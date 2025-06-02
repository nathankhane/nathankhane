"use client";
export default function SubstackForm() {
    return (
        <div
            className="w-full"
            dangerouslySetInnerHTML={{
                __html: `<iframe src="https://nathankhane.substack.com/embed" width="100%" height="160" style="border:0; background:transparent;" frameborder="0" scrolling="no"></iframe>`,
            }}
        />
    );
} 