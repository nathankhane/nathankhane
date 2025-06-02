"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const roleSequence = [
    "Founder",
    "Storyteller",
    "Artist"
];

export function CinematicHero() {
    const [currentRole, setCurrentRole] = useState(0);
    const [showFinalMessage, setShowFinalMessage] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentRole < roleSequence.length - 1) {
                setCurrentRole(prev => prev + 1);
            } else {
                // After showing all roles, show the final message
                setTimeout(() => {
                    setShowFinalMessage(true);
                }, 1500);
                clearInterval(interval);
            }
        }, 2000); // Show each role for 2 seconds

        return () => clearInterval(interval);
    }, [currentRole]);

    return (
        <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden pb-24">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10" />
            </div>

            <div className="text-center space-y-8 max-w-4xl relative z-10">
                <AnimatePresence mode="wait">
                    {!showFinalMessage ? (
                        <motion.div
                            key={currentRole}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="space-y-4"
                        >
                            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold leading-tight">
                                {roleSequence[currentRole]}<span className="text-primary">.</span>
                            </h1>
                            <div className="w-32 h-1 bg-primary mx-auto opacity-60" />
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="space-y-8"
                        >
                            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold leading-tight">
                                Business <span className="text-primary">≡</span> Poetry
                            </h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="text-xl sm:text-2xl lg:text-3xl max-w-3xl mx-auto text-muted-foreground leading-relaxed"
                            >
                                Turning narrative into revenue for founders & creators.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.8 }}
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
                    )}
                </AnimatePresence>

                {/* Scroll indicator */}
                {showFinalMessage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 0.8 }}
                        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
                    >
                        <div className="flex flex-col items-center text-muted-foreground">
                            <span className="text-sm font-mono mb-3">Scroll to explore</span>
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="w-6 h-10 border-2 border-current rounded-full flex justify-center"
                            >
                                <motion.div
                                    animate={{ y: [0, 12, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="w-1 h-3 bg-current rounded-full mt-2"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
} 