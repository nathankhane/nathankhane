"use client";

import { motion } from "framer-motion";

const credibilityItems = [
    { name: "TechCrunch", type: "press" },
    { name: "Forbes", type: "press" },
    { name: "Indie Hackers", type: "podcast" },
    { name: "Product Hunt", type: "platform" },
    { name: "Y Combinator", type: "accelerator" },
    { name: "The Tim Ferriss Show", type: "podcast" },
    { name: "Fast Company", type: "press" },
    { name: "Substack", type: "platform" },
    { name: "Harvard Business Review", type: "press" },
    { name: "Masters of Scale", type: "podcast" },
];

export function CredibilityBar() {
    return (
        <section className="py-12 bg-muted/30 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-8">
                    <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                        Featured In & Collaborated With
                    </p>
                </div>

                <div className="relative">
                    <motion.div
                        className="flex space-x-12 whitespace-nowrap"
                        animate={{
                            x: ["0%", "-50%"],
                        }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        {/* First set */}
                        {credibilityItems.map((item, index) => (
                            <div
                                key={`first-${index}`}
                                className="flex items-center justify-center min-w-[200px] h-16 opacity-60 hover:opacity-100 transition-opacity duration-300"
                            >
                                <span className="text-lg font-semibold text-muted-foreground">
                                    {item.name}
                                </span>
                            </div>
                        ))}

                        {/* Duplicate set for seamless loop */}
                        {credibilityItems.map((item, index) => (
                            <div
                                key={`second-${index}`}
                                className="flex items-center justify-center min-w-[200px] h-16 opacity-60 hover:opacity-100 transition-opacity duration-300"
                            >
                                <span className="text-lg font-semibold text-muted-foreground">
                                    {item.name}
                                </span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Gradient overlays for fade effect */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
                </div>
            </div>
        </section>
    );
} 