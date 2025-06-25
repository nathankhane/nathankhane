"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

export default function About() {
    return (
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
            <motion.section
                className="space-y-6 sm:space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <AnimatedSection direction="fade" delay={0.1}>
                    <h1 className="text-3xl sm:text-4xl font-bold">About Me</h1>
                </AnimatedSection>

                {/* Portrait with mobile-optimized sizing */}
                <AnimatedSection direction="scale" delay={0.3}>
                    <motion.div
                        className="relative overflow-hidden rounded-xl group"
                        whileHover={{
                            scale: 1.02,
                            transition: { duration: 0.4, ease: "easeOut" }
                        }}
                    >
                        <motion.div
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="relative overflow-hidden rounded-xl"
                        >
                            <Image
                                src="/nate_on_stage.JPG"
                                alt="Nathan Khane Morales on stage"
                                width={800}
                                height={450}
                                className="rounded-xl transition-transform duration-700 group-hover:scale-105 w-full h-auto max-h-[300px] sm:max-h-[400px] md:max-h-[450px] object-cover"
                                priority
                            />
                            {/* Subtle gradient overlay that appears on hover */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-0 rounded-xl"
                                whileHover={{
                                    opacity: 1,
                                    transition: { duration: 0.3 }
                                }}
                            />
                        </motion.div>
                    </motion.div>
                </AnimatedSection>

                {/* Bio content with mobile-optimized spacing */}
                <motion.article
                    className="prose prose-neutral dark:prose-invert max-w-none space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                >
                    <motion.p
                        className="text-lg sm:text-xl font-semibold text-primary mb-4 sm:mb-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                        whileHover={{
                            scale: 1.02,
                            transition: { duration: 0.2 }
                        }}
                    >
                        Founder. Creative specialist. Empathy engine.
                    </motion.p>

                    <motion.p
                        className="text-base sm:text-lg leading-relaxed mb-3 sm:mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
                    >
                        I build products and stories that move people—because honest creativity is my main KPI.
                    </motion.p>

                    <motion.p
                        className="leading-relaxed mb-3 sm:mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
                    >
                        From prototyping Reseeit at UH's Wolff Center to launching TrustedApp and coaching indie artists, I've learned that ideas don't change the world until someone feels them. I translate complex ambition into language that lands, then rally teams to ship.
                    </motion.p>

                    <motion.p
                        className="leading-relaxed mb-3 sm:mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" }}
                        whileHover={{
                            x: 4,
                            transition: { duration: 0.2 }
                        }}
                    >
                        Articulating incomprehensible thoughts into digestible bits is my superpower.
                    </motion.p>

                    <motion.p
                        className="leading-relaxed mb-3 sm:mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
                        whileHover={{
                            x: 4,
                            transition: { duration: 0.2 }
                        }}
                    >
                        Connecting people, and activating purpose within them, is my purpose.
                    </motion.p>

                    <motion.p
                        className="leading-relaxed mb-3 sm:mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.7, ease: "easeOut" }}
                        whileHover={{
                            x: 4,
                            transition: { duration: 0.2 }
                        }}
                    >
                        Inspiring others is what fulfills me.
                    </motion.p>

                    <motion.p
                        className="leading-relaxed font-medium text-primary"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.9, ease: "easeOut" }}
                        whileHover={{
                            scale: 1.02,
                            x: 4,
                            transition: { duration: 0.2 }
                        }}
                    >
                        It is how I am creating change in the world.
                    </motion.p>
                </motion.article>
            </motion.section>
        </div>
    );
} 