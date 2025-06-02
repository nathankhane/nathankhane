import { Instagram, Music, Video } from "lucide-react";

export default function SocialLinks() {
    return (
        <div className="flex gap-6">
            <a href="https://www.instagram.com/nathankmorales/" aria-label="Instagram">
                <Instagram />
            </a>
            <a href="https://www.tiktok.com/@nathankmorales" aria-label="TikTok">
                <Video />
            </a>
            <a href="https://nathankhane.substack.com/" aria-label="Substack">
                <Music />
            </a>
        </div>
    );
} 