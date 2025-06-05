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
                    className="fixed inset-0 bg-black/50 z-50 md:hidden"
                    onClick={closeMenu}
                />
            )}

            {/* Mobile Menu Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-background border-l border-border/50 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-border/50">
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
                            className="block text-lg font-medium hover:text-primary transition-colors duration-300"
                        >
                            Portfolio
                        </Link>
                        <Link
                            href="/about"
                            onClick={closeMenu}
                            className="block text-lg font-medium hover:text-primary transition-colors duration-300"
                        >
                            Who Am I
                        </Link>
                        <Link
                            href="/contact"
                            onClick={closeMenu}
                            className="block text-lg font-medium hover:text-primary transition-colors duration-300"
                        >
                            Work With Me
                        </Link>
                        <Link
                            href="/blog"
                            onClick={closeMenu}
                            className="block text-lg font-medium hover:text-primary transition-colors duration-300"
                        >
                            Blog
                        </Link>
                    </div>
                </nav>
            </div>
        </>
    );
} 