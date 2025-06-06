"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Menu } from "lucide-react";

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

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 md:hidden transition-all duration-300"
                    onClick={closeMenu}
                />
            )}

            {/* Mobile Menu Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-slate-900/95 dark:bg-slate-800/95 backdrop-blur-xl border-l border-white/20 z-50 transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                style={{
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', // Slate-900 with high opacity
                }}
            >
                {/* Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/20 bg-white/5">
                    <h2 className="text-xl font-bold text-white">Menu</h2>
                    <button
                        onClick={closeMenu}
                        className="p-2 hover:scale-110 transition-transform duration-200 text-white hover:text-primary"
                        aria-label="Close menu"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Menu Items */}
                <nav className="p-6">
                    <div className="space-y-6">
                        <Link
                            href="/portfolio"
                            onClick={closeMenu}
                            className="block text-lg font-medium text-white hover:text-primary hover:bg-primary/20 rounded-lg px-4 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            Portfolio
                        </Link>
                        <Link
                            href="/about"
                            onClick={closeMenu}
                            className="block text-lg font-medium text-white hover:text-primary hover:bg-primary/20 rounded-lg px-4 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            Who Am I
                        </Link>
                        <Link
                            href="/contact"
                            onClick={closeMenu}
                            className="block text-lg font-medium text-white hover:text-primary hover:bg-primary/20 rounded-lg px-4 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            Work With Me
                        </Link>
                        <Link
                            href="/blog"
                            onClick={closeMenu}
                            className="block text-lg font-medium text-white hover:text-primary hover:bg-primary/20 rounded-lg px-4 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            Blog
                        </Link>
                    </div>
                </nav>
            </div>
        </>
    );
} 