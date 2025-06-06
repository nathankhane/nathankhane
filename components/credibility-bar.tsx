"use client";

import { motion } from "framer-motion";

const credibilityItems = [
    { name: "TrustedApp", type: "company", url: "https://www.trustedapp.co/" },
    { name: "Ion District", type: "innovation", url: "https://iondistrict.com/" },
    { name: "buildspace", type: "education", url: "https://buildspace.so/" },
    { name: "C.T. Bauer College of Business", type: "education", url: "https://www.bauer.uh.edu/" },
    { name: "byomer", type: "creative", url: "https://www.byomer.com/" },
    { name: "Capgemini", type: "consulting", url: "https://www.capgemini.com/us-en/" },
    { name: "Nexus Veterinary Specialists", type: "healthcare", url: "https://ce.nexus.vet/" },
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
                            <motion.a
                                key={`first-${index}`}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
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
                            </motion.a>
                        ))}

                        {/* Duplicate set for seamless loop */}
                        {credibilityItems.map((item, index) => (
                            <motion.a
                                key={`second-${index}`}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center min-w-[200px] h-16 opacity-60 hover:opacity-100 transition-all duration-300 group cursor-pointer"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <span className="text-lg font-semibold text-muted-foreground group-hover:text-primary transition-colors duration-300">
                                    {item.name}
                                </span>
                            </motion.a>
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