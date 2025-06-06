"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { X, Menu } from "lucide-react";

// Create a context to share the mobile menu state
import { createContext, useContext } from "react";

const MobileNavContext = createContext<{
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}>({
    isOpen: false,
    setIsOpen: () => { },
});

export function MobileNavProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <MobileNavContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </MobileNavContext.Provider>
    );
}

export function MobileNavButton() {
    const { isOpen, setIsOpen } = useContext(MobileNavContext);

    return (
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:scale-110 transition-transform duration-200"
            aria-label="Toggle menu"
        >
            <Menu className="h-6 w-6" />
        </button>
    );
}

export function MobileNavOverlay() {
    const { isOpen, setIsOpen } = useContext(MobileNavContext);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] md:hidden"
            style={{
                backgroundColor: '#0F0F0F',
                background: 'linear-gradient(180deg, #0F0F0F 0%, #1A1A1A 100%)',
                opacity: '1'
            }}
        >
            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-xl font-semibold text-white">Menu</h2>
                <button
                    onClick={() => setIsOpen(false)}
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
                        onClick={() => setIsOpen(false)}
                        className="block text-2xl font-medium text-white hover:text-primary px-4 py-4 rounded-xl transition-all duration-300 hover:bg-white/5 hover:pl-6"
                    >
                        Portfolio
                    </Link>

                    <Link
                        href="/about"
                        onClick={() => setIsOpen(false)}
                        className="block text-2xl font-medium text-white hover:text-primary px-4 py-4 rounded-xl transition-all duration-300 hover:bg-white/5 hover:pl-6"
                    >
                        Who Am I
                    </Link>

                    <Link
                        href="/contact"
                        onClick={() => setIsOpen(false)}
                        className="block text-2xl font-medium text-white hover:text-primary px-4 py-4 rounded-xl transition-all duration-300 hover:bg-white/5 hover:pl-6"
                    >
                        Work With Me
                    </Link>

                    <Link
                        href="/blog"
                        onClick={() => setIsOpen(false)}
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
    );
}

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    // Mobile menu overlay component
    const MobileMenuOverlay = () => (
        <div
            className="fixed inset-0 z-[999999] md:hidden"
            style={{
                backgroundColor: '#0F0F0F',
                background: 'linear-gradient(180deg, #0F0F0F 0%, #1A1A1A 100%)',
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0'
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
    );

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

            {/* Mobile Menu Overlay - Rendered via Portal */}
            {isOpen && mounted && createPortal(
                <MobileMenuOverlay />,
                document.body
            )}
        </>
    );
} 