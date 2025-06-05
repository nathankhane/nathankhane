"use client";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                <Switch
                    checked={false}
                    disabled
                    aria-label="Toggle theme"
                />
                <Moon className="h-4 w-4" />
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <Switch
                checked={theme === "dark"}
                onCheckedChange={(v) => setTheme(v ? "dark" : "light")}
                aria-label="Toggle theme"
            />
            <Moon className="h-4 w-4" />
        </div>
    );
} 