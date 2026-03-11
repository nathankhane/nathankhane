"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
    { src: "/logos/forbes.svg", alt: "Forbes" },
    { src: "/logos/producthunt.svg", alt: "Product Hunt" },
    { src: "/logos/pod.svg", alt: "Podcast" },
    // add / replace as needed
];

export default function LogoStrip() {
    return (
        <div className="py-8 overflow-x-hidden">
            <motion.div
                className="flex animate-marquee whitespace-nowrap gap-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {[...logos, ...logos].map((logo, index) => (
                    <motion.div
                        key={`${logo.alt}-${index}`}
                        className="flex-shrink-0"
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.2 }
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: index * 0.1,
                            duration: 0.5
                        }}
                    >
                        <Image
                            key={logo.alt}
                            src={logo.src}
                            alt={logo.alt}
                            width={120}
                            height={60}
                            className="hover:filter hover:brightness-110 transition-all duration-300 opacity-60 hover:opacity-100"
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
} 