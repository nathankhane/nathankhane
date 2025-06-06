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

            {/* Mobile Menu - Full Screen Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 md:hidden"
                    style={{
                        backgroundColor: '#0F0F0F',
                        background: 'linear-gradient(180deg, #0F0F0F 0%, #1A1A1A 100%)'
                    }}
                >
                    {/* Menu Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <h2 className="text-xl font-semibold text-white">Menu</h2>
                        <button
                            onClick={closeMenu}
                            className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors duration-200"
                            aria-label="Close menu"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Menu Items */}
                    <nav className="flex-1 px-6 py-8">
                        <div className="space-y-2">
                            <Link
                                href="/portfolio"
                                onClick={closeMenu}
                                className="block text-2xl font-medium text-white hover:text-primary px-4 py-4 rounded-xl transition-all duration-300 hover:bg-white/5 hover:pl-6"
                            >
                                Portfolio
                            </Link>

                            <Link
                                href="/about"
                                onClick={closeMenu}
                                className="block text-2xl font-medium text-white hover:text-primary px-4 py-4 rounded-xl transition-all duration-300 hover:bg-white/5 hover:pl-6"
                            >
                                Who Am I
                            </Link>

                            <Link
                                href="/contact"
                                onClick={closeMenu}
                                className="block text-2xl font-medium text-white hover:text-primary px-4 py-4 rounded-xl transition-all duration-300 hover:bg-white/5 hover:pl-6"
                            >
                                Work With Me
                            </Link>

                            <Link
                                href="/blog"
                                onClick={closeMenu}
                                className="block text-2xl font-medium text-white hover:text-primary px-4 py-4 rounded-xl transition-all duration-300 hover:bg-white/5 hover:pl-6"
                            >
                                Blog
                            </Link>
                        </div>
                    </nav>

                    {/* Footer */}
                    <div className="p-6 border-t border-white/10">
                        <p className="text-sm text-white/60 text-center">
                            nathankhane.com
                        </p>
                    </div>
                </div>
            )}
        </>
    );
} 