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
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300"
                    onClick={closeMenu}
                />
            )}

            {/* Mobile Menu Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-background/80 backdrop-blur-xl border-l border-border/30 z-50 transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-border/30 bg-background/20">
                    <h2 className="text-xl font-bold">Menu</h2>
                    <button
                        onClick={closeMenu}
                        className="p-2 hover:scale-110 transition-transform duration-200"
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
                            className="block text-lg font-medium hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-3 transition-all duration-300 hover:scale-105"
                        >
                            Portfolio
                        </Link>
                        <Link
                            href="/about"
                            onClick={closeMenu}
                            className="block text-lg font-medium hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-3 transition-all duration-300 hover:scale-105"
                        >
                            Who Am I
                        </Link>
                        <Link
                            href="/contact"
                            onClick={closeMenu}
                            className="block text-lg font-medium hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-3 transition-all duration-300 hover:scale-105"
                        >
                            Work With Me
                        </Link>
                        <Link
                            href="/blog"
                            onClick={closeMenu}
                            className="block text-lg font-medium hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-3 transition-all duration-300 hover:scale-105"
                        >
                            Blog
                        </Link>
                    </div>
                </nav>
            </div>
        </>
    );
} 