"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { retroAnimations } from "@/lib/retro-animations";
import { EstablishedBadge } from "@/components/VintageBadge";
import { VintageArrowRight } from "@/components/VintageIcons";

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
            }, 80);

            return () => clearTimeout(timer);
        } else {
            if (currentWordIndex < words.length - 1) {
                const timer = setTimeout(() => {
                    setCurrentWordIndex(prev => prev + 1);
                }, 600);

                return () => clearTimeout(timer);
            }
        }
    }, [currentCharIndex, currentWordIndex]);

    return (
        <section
            id="hero"
            className="relative flex flex-col items-center justify-center min-h-[calc(100dvh-4rem)] text-center px-4 sm:px-6 lg:px-8 bg-[#FDF6E3] dark:bg-[#1A1A1A]"
        >
            {/* Retro Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#B73E2A]/20 via-transparent to-[#D4741A]/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(183,62,42,0.1),transparent_50%)] opacity-60" />
            </div>

            <div className="z-10 flex flex-col items-center max-w-4xl space-y-8 mx-auto">
                {showContent && (
                    <motion.div
                        {...retroAnimations.vintageScaleIn}
                        className="space-y-8"
                    >
                        <h1
                            aria-live="polite"
                            className="font-hero font-bold leading-tight text-[clamp(2rem,5vw,3.5rem)] md:text-[clamp(2.5rem,4.5vw,4rem)] min-h-[1.2em] text-[#B73E2A]"
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
                            <div className="relative">
                                <h2 className="font-hero text-5xl sm:text-7xl lg:text-8xl font-bold leading-tight text-[#1A1A1A] dark:text-[#FDF6E3]">
                                    Business <span className="text-[#B73E2A]">≡</span> Poetry
                                </h2>
                                <div className="absolute -top-8 -right-8 hidden lg:block">
                                    <EstablishedBadge year="2020" />
                                </div>
                            </div>
                            
                            <motion.p
                                {...retroAnimations.vintageFadeIn}
                                className="font-body text-xl sm:text-2xl lg:text-3xl max-w-3xl mx-auto text-muted-foreground leading-relaxed"
                            >
                                Turning narrative into revenue for founders & creators.
                            </motion.p>

                            <motion.div
                                {...retroAnimations.retroStagger}
                                className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 pb-16"
                            >
                                <motion.div {...retroAnimations.retroButtonHover}>
                                    <Link
                                        href="/contact"
                                        className="group relative px-8 py-4 bg-gradient-to-r from-[#B73E2A] to-[#8B2E1F] text-white rounded-xl font-headline font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                                    >
                                        <span className="relative z-10">Book a Discovery Call</span>
                                        <VintageArrowRight size="sm" color="vintage-cream" className="transition-transform group-hover:translate-x-1" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#8B2E1F] to-[#B73E2A] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </Link>
                                </motion.div>

                                <motion.div {...retroAnimations.retroButtonHover}>
                                    <Link
                                        href="/blog"
                                        className="px-8 py-4 border-2 border-[#B73E2A] text-[#B73E2A] rounded-xl font-headline font-semibold text-lg transition-all duration-300 hover:bg-[#B73E2A] hover:text-white shadow-md hover:shadow-lg"
                                    >
                                        Read the Essays
                                    </Link>
                                </motion.div>
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