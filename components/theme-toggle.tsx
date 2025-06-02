"use client";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { setTheme, theme } = useTheme();
    return (
        <Switch
            checked={theme === "dark"}
            onCheckedChange={(v) => setTheme(v ? "dark" : "light")}
            aria-label="Toggle theme"
            className="absolute top-4 right-4"
        />
    );
} 