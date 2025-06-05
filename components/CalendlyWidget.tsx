"use client";
import { useEffect, useRef, useState } from "react";

const CALENDLY_URL = "https://calendly.com/nathankhane/20min";

// Singleton iframe for preloading
let calendlyIframe: HTMLIFrameElement | null = null;

export default function CalendlyWidget() {
    const [loaded, setLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Preload Calendly script
        if (!document.querySelector("#calendly-script")) {
            const script = document.createElement("script");
            script.id = "calendly-script";
            script.src = "https://assets.calendly.com/assets/external/widget.js";
            script.async = true;
            document.body.appendChild(script);
        }

        // Pre-mount the iframe off-screen if not already
        if (!calendlyIframe) {
            calendlyIframe = document.createElement("iframe");
            calendlyIframe.src = CALENDLY_URL + "?embed_domain=" + window.location.hostname;
            calendlyIframe.style.position = "absolute";
            calendlyIframe.style.left = "-9999px";
            calendlyIframe.style.width = "100%";
            calendlyIframe.style.height = "700px";
            calendlyIframe.style.border = "none";
            calendlyIframe.onload = () => setLoaded(true);
            document.body.appendChild(calendlyIframe);
        } else {
            // If already loaded, set loaded state
            if (calendlyIframe.contentWindow) setLoaded(true);
        }

        // When this component mounts, move the iframe into the container
        if (containerRef.current && calendlyIframe) {
            containerRef.current.appendChild(calendlyIframe);
            calendlyIframe.style.position = "static";
            calendlyIframe.style.left = "0";
            calendlyIframe.style.opacity = "1";
            calendlyIframe.style.pointerEvents = "auto";
        }

        return () => {
            // On unmount, move the iframe off-screen again
            if (calendlyIframe) {
                calendlyIframe.style.position = "absolute";
                calendlyIframe.style.left = "-9999px";
                calendlyIframe.style.opacity = "0";
                calendlyIframe.style.pointerEvents = "none";
                document.body.appendChild(calendlyIframe);
            }
        };
    }, []);

    return (
        <div className="w-full min-h-[700px] relative">
            {!loaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-background">
                    <span className="text-xl font-serif text-primary animate-fade-in">Business ≡ Poetry in progress…</span>
                </div>
            )}
            <div ref={containerRef} className={loaded ? "" : "invisible"} />
        </div>
    );
} 