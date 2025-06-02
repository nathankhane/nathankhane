"use client";
import { useEffect } from "react";

export default function CalendlyWidget() {
    useEffect(() => {
        // inject Calendly script only once
        if (!document.querySelector("#calendly-script")) {
            const script = document.createElement("script");
            script.id = "calendly-script";
            script.src = "https://assets.calendly.com/assets/external/widget.js";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    return (
        <div
            className="calendly-inline-widget w-full"
            data-url="https://calendly.com/nathankhane/20min"
            style={{ minWidth: 320, height: 700 }}
        />
    );
} 