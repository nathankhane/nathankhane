"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import AnimatedSection from "@/components/AnimatedSection";

interface BlogPost {
    title: string;
    link: string;
    pubDate: string;
}

export default function LatestPosts() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch RSS data client-side
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/rss');
                const data = await response.json();
                setPosts(data.slice(0, 3));
            } catch {
                // Fail silently in production
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <section className="py-20 space-y-6 px-6 max-w-6xl mx-auto">
                <h2 className="text-3xl font-semibold text-center">Latest Essays</h2>
                <div className="grid md:grid-cols-3 gap-6 pb-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="border rounded-xl p-4 animate-pulse">
                            <div className="h-4 bg-muted rounded mb-2"></div>
                            <div className="h-3 bg-muted rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 space-y-6 px-6 max-w-6xl mx-auto">
            <AnimatedSection direction="fade">
                <h2 className="text-3xl font-semibold text-center">Latest Essays</h2>
            </AnimatedSection>
            <AnimatedSection direction="up" stagger={0.1} className="grid md:grid-cols-3 gap-6 pb-8">
                {posts.map((post, index) => (
                    <motion.a
                        key={post.link}
                        href={post.link}
                        target="_blank"
                        rel="noreferrer"
                        className="border rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300 flex flex-col group"
                        whileHover={{
                            y: -4,
                            transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <motion.h3
                            className="font-medium group-hover:text-primary transition-colors duration-200"
                            whileHover={{ scale: 1.02 }}
                        >
                            {post.title}
                        </motion.h3>
                        <span className="mt-auto text-xs opacity-60 pt-2">{post.pubDate}</span>
                    </motion.a>
                ))}
            </AnimatedSection>
        </section>
    );
} 