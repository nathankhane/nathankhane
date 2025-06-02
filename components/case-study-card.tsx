"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface CaseStudyCardProps {
    title: string;
    category: "Music" | "Client Campaigns" | "Startups" | "Reels";
    description: string;
    image?: string;
    kpi: {
        metric: string;
        value: string;
        context: string;
    };
    link: string;
    featured?: boolean;
}

const categoryColors = {
    "Music": "bg-purple-500",
    "Client Campaigns": "bg-primary",
    "Startups": "bg-green-500",
    "Reels": "bg-pink-500"
};

export function CaseStudyCard({
    title,
    category,
    description,
    image,
    kpi,
    link,
    featured = false
}: CaseStudyCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className={`group relative rounded-2xl overflow-hidden bg-card border border-border/50 ${featured ? 'md:col-span-2 md:row-span-2' : ''
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <Link href={link} className="block h-full">
                {/* Background Image or Gradient */}
                <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                    {image ? (
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className={`w-full h-full bg-gradient-to-br from-${category === "Music" ? "purple" : category === "Client Campaigns" ? "cyan" : category === "Startups" ? "green" : "pink"}-400 to-${category === "Music" ? "purple" : category === "Client Campaigns" ? "cyan" : category === "Startups" ? "green" : "pink"}-600`} />
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${categoryColors[category]}`}>
                            {category}
                        </span>
                    </div>

                    {/* KPI Overlay */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            y: isHovered ? 0 : 20
                        }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black/80 flex items-center justify-center backdrop-blur-sm"
                    >
                        <div className="text-center text-white p-6">
                            <div className="text-4xl lg:text-6xl font-bold text-primary mb-2">
                                {kpi.value}
                            </div>
                            <div className="text-lg lg:text-xl font-semibold mb-1">
                                {kpi.metric}
                            </div>
                            <div className="text-sm lg:text-base opacity-80">
                                {kpi.context}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                    <h3 className="text-xl lg:text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                        {title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                        {description}
                    </p>

                    {/* Read More Arrow */}
                    <div className="flex items-center text-primary font-semibold pt-2">
                        <span className="mr-2">Explore Case Study</span>
                        <motion.div
                            animate={{ x: isHovered ? 4 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            →
                        </motion.div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
} 