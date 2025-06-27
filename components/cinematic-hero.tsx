"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";


const words = ["Founder", "Storyteller", "Artist"];

export function CinematicHero() {
    const [showContent, setShowContent] = useState(false);
    const [displayedText, setDisplayedText] = useState("");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);

    useEffect(() => {
        setShowContent(true);
    }, []);

    useEffect(() => {
        if (currentWordIndex >= words.length) return;

        const targetText = words.slice(0, currentWordIndex + 1).join(". ") + ".";

        if (currentCharIndex < targetText.length) {
            const timer = setTimeout(() => {
                setDisplayedText(targetText.slice(0, currentCharIndex + 1));
                setCurrentCharIndex(prev => prev + 1);
            }, 80); // slightly faster typing speed for better performance

            return () => clearTimeout(timer);
        } else {
            // Finished typing current word, move to next after a pause
            if (currentWordIndex < words.length - 1) {
                const timer = setTimeout(() => {
                    setCurrentWordIndex(prev => prev + 1);
                }, 600); // shorter pause for better flow

                return () => clearTimeout(timer);
            }
        }
    }, [currentCharIndex, currentWordIndex]);

    return (
        <section
            id="hero"
            className="relative flex flex-col items-center justify-center min-h-[calc(100dvh-4rem)] text-center px-4 sm:px-6 lg:px-8"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10" />
            </div>

            <div className="z-10 flex flex-col items-center max-w-4xl space-y-8">
                {showContent && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        <h1
                            aria-live="polite"
                            className="font-bold leading-tight text-[clamp(2rem,5vw,3.5rem)] md:text-[clamp(2.5rem,4.5vw,4rem)] min-h-[1.2em]"
                        >
                            {displayedText.split('.').map((word, index) => (
                                <span key={index}>
                                    {word}
                                    {index < displayedText.split('.').length - 1 && (
                                        <span className="text-primary">.</span>
                                    )}
                                </span>
                            ))}
                            {currentWordIndex < words.length && (
                                <span className="animate-pulse text-primary">|</span>
                            )}
                        </h1>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
                            className="space-y-8"
                        >
                            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-bold leading-tight">
                                Business <span className="text-primary">≡</span> Poetry
                            </h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="text-xl sm:text-2xl lg:text-3xl max-w-3xl mx-auto text-muted-foreground leading-relaxed"
                            >
                                Turning narrative into revenue for founders & creators.
                            </motion.p>


                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 pb-16"
                            >
                                <Link
                                    href="/contact"
                                    className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25"
                                >
                                    <span className="relative z-10">Book a Discovery Call</span>
                                    <div className="absolute inset-0 bg-primary rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                                </Link>

                                <Link
                                    href="/blog"
                                    className="px-8 py-4 border-2 border-primary text-primary rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                                >
                                    Read the Essays
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Scroll indicator */}
                {showContent && (
                    <motion.a
                        href="#hero"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                        className="absolute left-1/2 bottom-8 -translate-x-1/2 flex flex-col items-center gap-1 group hidden sm:flex"
                        onClick={(e) => {
                            e.preventDefault();
                            const nextSection = document.querySelector('#hero')?.nextElementSibling;
                            if (nextSection) {
                                nextSection.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                    >
                        <span className="text-sm opacity-70 tracking-wide group-hover:opacity-100 transition-opacity">
                            Scroll&nbsp;to&nbsp;Explore
                        </span>
                        <ChevronDown className="h-5 w-5 animate-bounce-slow" />
                    </motion.a>
                )}
            </div>
        </section>
    );
} 