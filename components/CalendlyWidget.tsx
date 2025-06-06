"use client";
import { useEffect, useRef, useState } from "react";

const CALENDLY_URL = "https://calendly.com/nathankhane/20min";

// Singleton iframe for preloading
let calendlyIframe: HTMLIFrameElement | null = null;

export default function CalendlyWidget() {
    const [loaded, setLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Add custom CSS to remove Calendly padding
        if (!document.querySelector("#calendly-custom-styles")) {
            const style = document.createElement("style");
            style.id = "calendly-custom-styles";
            style.textContent = `
                .calendly-inline-widget {
                    margin: 0 !important;
                    padding: 0 !important;
                    border-radius: 16px !important;
                    overflow: hidden !important;
                }
                
                .calendly-inline-widget iframe {
                    margin: 0 !important;
                    padding: 0 !important;
                    border-radius: 16px !important;
                }
                
                /* Remove default Calendly padding/margins */
                .calendly-popup-content,
                .calendly-popup-wrapper {
                    padding: 0 !important;
                    margin: 0 !important;
                }
                
                /* Dark mode improvements */
                .calendly-inline-widget {
                    background: transparent !important;
                }
            `;
            document.head.appendChild(style);
        }

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

            // Improved URL with better parameters for dark mode and minimal styling
            const params = new URLSearchParams({
                embed_domain: window.location.hostname,
                embed_type: 'Inline',
                hide_event_type_details: '1',
                hide_gdpr_banner: '1',
                primary_color: '4F8DFD', // Your brand primary color
                text_color: 'ffffff',    // White text for dark mode
                background_color: '0F0F0F' // Your dark background
            });

            calendlyIframe.src = `${CALENDLY_URL}?${params.toString()}`;
            calendlyIframe.style.position = "absolute";
            calendlyIframe.style.left = "-9999px";
            calendlyIframe.style.width = "100%";
            calendlyIframe.style.height = "700px";
            calendlyIframe.style.border = "none";
            calendlyIframe.style.borderRadius = "16px";
            calendlyIframe.style.overflow = "hidden";
            calendlyIframe.style.margin = "0";
            calendlyIframe.style.padding = "0";
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
        <div className="w-full min-h-[700px] relative overflow-hidden rounded-2xl bg-card border border-border/50">
            {!loaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-background/95 backdrop-blur-sm rounded-2xl">
                    <div className="animate-spin w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full mb-4"></div>
                    <span className="text-lg font-medium text-muted-foreground">Loading calendar...</span>
                </div>
            )}
            <div
                ref={containerRef}
                className={`calendly-widget-container ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500 rounded-2xl overflow-hidden`}
                style={{
                    margin: 0,
                    padding: 0,
                    borderRadius: '16px',
                }}
            />
        </div>
    );
} 