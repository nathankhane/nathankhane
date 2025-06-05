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
        <motion.section
            className="py-12 bg-muted/30 overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                        Featured In & Collaborated With
                    </p>
                </motion.div>

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
                            <motion.div
                                key={`first-${index}`}
                                className="flex items-center justify-center min-w-[200px] h-16 opacity-60 hover:opacity-100 transition-all duration-300 group cursor-pointer"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.2 }
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 0.6, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.5 }}
                            >
                                <span className="text-lg font-semibold text-muted-foreground group-hover:text-primary transition-colors duration-300">
                                    {item.name}
                                </span>
                            </motion.div>
                        ))}

                        {/* Duplicate set for seamless loop */}
                        {credibilityItems.map((item, index) => (
                            <motion.div
                                key={`second-${index}`}
                                className="flex items-center justify-center min-w-[200px] h-16 opacity-60 hover:opacity-100 transition-all duration-300 group cursor-pointer"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <span className="text-lg font-semibold text-muted-foreground group-hover:text-primary transition-colors duration-300">
                                    {item.name}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Gradient overlays for fade effect */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
                </div>
            </div>
        </motion.section>
    );
} 