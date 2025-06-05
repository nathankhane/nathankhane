"use client";
import { useState, useEffect } from "react";

const lines = [
    "Let&apos;s bring your vision to life.",
    "Growth should be noticed, not forced.",
    "Smooth seas never made a skilled sailor.",
    "Live in the future, then build what&apos;s missing.",
    "Don&apos;t game the system—be the system.",
    "Raison d'être: reason for being.",
    "The most valuable truths are the unbelieved ones.",
    "Break uncertainty into parts; then decide.",
    "Feel the thrill of launching something real.",
];

export default function RotatingTagline() {
    const [idx, setIdx] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setIdx((i) => (i + 1) % lines.length), 4000);
        return () => clearInterval(id);
    }, []);
    return (
        <p className="text-xl sm:text-2xl max-w-2xl mx-auto opacity-80 transition-opacity duration-500" key={idx}>
            {lines[idx]}
        </p>
    );
} 