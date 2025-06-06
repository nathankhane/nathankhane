"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <>
            {/* Hamburger Menu Button */}
            <button
                onClick={toggleMenu}
                className="md:hidden p-2 hover:scale-110 transition-transform duration-200"
                aria-label="Toggle menu"
            >
                <Menu className="h-6 w-6" />
            </button>

            {/* Mobile Menu Overlay with Animation */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-40 md:hidden"
                            onClick={closeMenu}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="fixed inset-0 z-50 md:hidden overflow-hidden"
                            style={{
                                background: 'linear-gradient(180deg, #0F0F0F 0%, #1A1A1A 100%)',
                            }}
                        >
                            {/* Menu Header */}
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.3 }}
                                className="flex items-center justify-between p-6 border-b border-white/10"
                            >
                                <h2 className="text-xl font-semibold text-white">Menu</h2>
                                <button
                                    onClick={closeMenu}
                                    className="p-2 hover:scale-110 transition-transform duration-200 text-white/80 hover:text-white rounded-lg hover:bg-white/10"
                                    aria-label="Close menu"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </motion.div>

                            {/* Menu Items */}
                            <nav className="flex-1 px-6 py-8">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.4 }}
                                    className="space-y-2"
                                >
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.3, duration: 0.3 }}
                                    >
                                        <Link
                                            href="/portfolio"
                                            onClick={closeMenu}
                                            className="block text-2xl font-medium text-white hover:text-primary px-4 py-4 rounded-xl transition-all duration-300 hover:bg-white/5 hover:pl-6"
                                        >
                                            Portfolio
                                        </Link>
                                    </motion.div>

                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.35, duration: 0.3 }}
                                    >
                                        <Link
                                            href="/about"
                                            onClick={closeMenu}
                                            className="block text-2xl font-medium text-white hover:text-primary px-4 py-4 rounded-xl transition-all duration-300 hover:bg-white/5 hover:pl-6"
                                        >
                                            Who Am I
                                        </Link>
                                    </motion.div>

                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.4, duration: 0.3 }}
                                    >
                                        <Link
                                            href="/contact"
                                            onClick={closeMenu}
                                            className="block text-2xl font-medium text-white hover:text-primary px-4 py-4 rounded-xl transition-all duration-300 hover:bg-white/5 hover:pl-6"
                                        >
                                            Work With Me
                                        </Link>
                                    </motion.div>

                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.45, duration: 0.3 }}
                                    >
                                        <Link
                                            href="/blog"
                                            onClick={closeMenu}
                                            className="block text-2xl font-medium text-white hover:text-primary px-4 py-4 rounded-xl transition-all duration-300 hover:bg-white/5 hover:pl-6"
                                        >
                                            Blog
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </nav>

                            {/* Footer with subtle branding */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.3 }}
                                className="p-6 border-t border-white/10"
                            >
                                <p className="text-sm text-white/60 text-center">
                                    nathankhane.com
                                </p>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
} 