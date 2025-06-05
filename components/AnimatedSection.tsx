"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "fade" | "scale";
    duration?: number;
    stagger?: number;
}

const getAnimationVariants = (direction: string, duration: number, delay: number, stagger: number): Variants => {
    const baseTransition = {
        duration,
        ease: "easeOut" as const,
        ...(delay > 0 && { delay }),
        ...(stagger > 0 && { staggerChildren: stagger })
    };

    switch (direction) {
        case "up":
            return {
                hidden: { opacity: 0, y: 30 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: baseTransition
                }
            };
        case "down":
            return {
                hidden: { opacity: 0, y: -30 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: baseTransition
                }
            };
        case "left":
            return {
                hidden: { opacity: 0, x: -30 },
                visible: {
                    opacity: 1,
                    x: 0,
                    transition: baseTransition
                }
            };
        case "right":
            return {
                hidden: { opacity: 0, x: 30 },
                visible: {
                    opacity: 1,
                    x: 0,
                    transition: baseTransition
                }
            };
        case "scale":
            return {
                hidden: { opacity: 0, scale: 0.9 },
                visible: {
                    opacity: 1,
                    scale: 1,
                    transition: baseTransition
                }
            };
        default:
            return {
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: baseTransition
                }
            };
    }
};

export default function AnimatedSection({
    children,
    className = "",
    delay = 0,
    direction = "up",
    duration = 0.4,
    stagger = 0
}: AnimatedSectionProps) {
    const variants = getAnimationVariants(direction, duration, delay, stagger);

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{
                once: true,
                margin: "0px",
                amount: 0.1
            }}
            variants={variants}
        >
            {children}
        </motion.div>
    );
} 