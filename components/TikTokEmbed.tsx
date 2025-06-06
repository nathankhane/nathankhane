"use client";
import { useEffect } from "react";

export default function TikTokEmbed({ videoId }: { videoId: string }) {
    useEffect(() => {
        // inject script only once
        if (!document.querySelector("#tiktok-script")) {
            const s = document.createElement("script");
            s.id = "tiktok-script";
            s.src = "https://www.tiktok.com/embed.js";
            s.async = true;
            document.body.appendChild(s);
        }
    }, []);
    return (
        <blockquote
            className="tiktok-embed"
            data-video-id={videoId}
            style={{ maxWidth: 605, minWidth: 325 }}
        ></blockquote>
    );
} 