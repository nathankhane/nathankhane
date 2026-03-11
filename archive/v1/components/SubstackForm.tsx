"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function SubstackForm() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");

        try {
            // Redirect to Substack with email pre-filled
            const substackUrl = `https://nathankhane.substack.com/subscribe?email=${encodeURIComponent(email)}`;
            window.open(substackUrl, '_blank');
            setMessage("Redirecting to Substack...");
            setEmail("");
        } catch {
            setMessage("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!mounted) {
        return (
            <div className="w-full">
                <div className="w-full h-40 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
            </div>
        );
    }

    return (
        <div className="w-full flex justify-center">
            <div className={`w-full max-w-md rounded-lg p-6 transition-all duration-300 ${theme === 'dark'
                ? 'bg-[#2A2A2A] text-[#FAF7F5] border border-[#3A3A3A]'
                : 'bg-[#FAF7F5] text-[rgba(30,30,30,0.9)] border border-[#E8E2DE]'
                }`}>
                <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">Nathan's Substack</h3>
                    <p className="text-sm opacity-80">Substacking my thoughts and experiences</p>
                    <p className="text-xs opacity-60 mt-1">By Nathan Khane</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Type your email..."
                            required
                            className={`flex-1 px-4 py-3 rounded-lg border transition-all duration-300 ${theme === 'dark'
                                ? 'border-[#3A3A3A] bg-[#3A3A3A] text-[#FAF7F5] placeholder-[#94A3B8] focus:border-[#8E2D34] focus:ring-[#8E2D34]'
                                : 'border-[#E8E2DE] bg-white text-[rgba(30,30,30,0.9)] placeholder-[#64748B] focus:border-[#8E2D34] focus:ring-[#8E2D34]'
                                }`}
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting || !email}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${isSubmitting || !email
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-[#8E2D34] hover:bg-[#5B1E23] text-white hover:scale-105'
                                }`}
                        >
                            {isSubmitting ? "Subscribing..." : "Subscribe"}
                        </button>
                    </div>

                    {message && (
                        <p className={`text-sm ${message.includes("Redirecting")
                            ? "text-green-500"
                            : "text-red-500"
                            }`}>
                            {message}
                        </p>
                    )}

                    <p className="text-xs opacity-60">
                        By subscribing you agree to{" "}
                        <a
                            href="https://substack.com/terms"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:opacity-100 transition-opacity duration-200"
                        >
                            Substack's Terms of Use
                        </a>
                        , our{" "}
                        <a
                            href="/privacy"
                            className="underline hover:opacity-100 transition-opacity duration-200"
                        >
                            Privacy Policy
                        </a>
                        {" "}and our{" "}
                        <a
                            href="/information-collection"
                            className="underline hover:opacity-100 transition-opacity duration-200"
                        >
                            Information collection notice
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
} 