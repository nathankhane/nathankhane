"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

interface KPI { label: string; value: string; }
interface Props {
    title: string;
    description: string;
    image?: string;
    kpis?: KPI[];
    link?: string;
}

export default function CaseStudyCard({ title, description, image, kpis, link }: Props) {
    const [isHovered, setIsHovered] = useState(false);
    const [isTouched, setIsTouched] = useState(false);

    const previewImage = image || "/images/placeholder-preview.jpg";

    const content = (
        <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onTouchStart={() => setIsTouched(true)}
            onTouchEnd={() => setIsTouched(false)}
            whileHover={{
                y: -12,
                transition: { duration: 0.3, ease: "easeOut" }
            }}
            whileTap={{
                scale: 0.98,
                transition: { duration: 0.1 }
            }}
            className="border rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 cursor-pointer group"
        >
            <div className="relative overflow-hidden">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <Image
                        src={previewImage}
                        alt={`${title} website preview`}
                        width={800}
                        height={450}
                        className="w-full aspect-video object-cover"
                    />
                </motion.div>

                {/* Overlay gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Floating preview badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{
                        opacity: isHovered || isTouched ? 1 : 0,
                        scale: isHovered || isTouched ? 1 : 0.8,
                        y: isHovered || isTouched ? 0 : 10
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-xs font-medium"
                >
                    Live Preview
                </motion.div>
            </div>

            <div className="p-6 space-y-4">
                <motion.h3
                    className="text-2xl font-semibold group-hover:text-primary transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                >
                    {title}
                </motion.h3>

                <p className="text-muted-foreground leading-relaxed">{description}</p>

                {kpis && (
                    <motion.ul
                        className="grid grid-cols-2 gap-4 pt-4"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        {kpis.map(({ label, value }, index) => (
                            <motion.li
                                key={label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.3 }}
                                whileHover={{ scale: 1.05 }}
                                className="text-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200"
                            >
                                <p className="text-sm opacity-70 mb-1">{label}</p>
                                <p className="text-lg font-bold text-primary">{value}</p>
                            </motion.li>
                        ))}
                    </motion.ul>
                )}

                {/* Animated arrow indicator */}
                <motion.div
                    className="flex items-center text-primary font-medium pt-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                >
                    <span className="mr-2">View Project</span>
                    <motion.span
                        animate={{ x: isHovered ? [0, 4, 0] : 0 }}
                        transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
                    >
                        →
                    </motion.span>
                </motion.div>
            </div>
        </motion.div>
    );

    if (link) {
        return (
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
            >
                {content}
            </a>
        );
    }

    return <div className="block">{content}</div>;
} 