"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function VisionCTA() {
    return (
        <motion.section
            className="py-24 px-6 bg-background"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.1 }}
        >
            <div className="max-w-4xl mx-auto text-center">
                <motion.h2
                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    viewport={{ once: true, amount: 0.1 }}
                >
                    Let's bring your vision to <em className="italic font-bold">life</em>.
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <Link
                        href="https://calendly.com/nathankhane/20min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                    >
                        <motion.button
                            className="px-12 py-4 border-2 border-primary text-primary rounded-full font-semibold text-lg tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                            whileHover={{
                                scale: 1.02, // More subtle scale
                                boxShadow: "0 8px 20px rgba(142, 45, 52, 0.25)" // Updated to cherry color
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            LET'S TALK
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </motion.section>
    );
} 