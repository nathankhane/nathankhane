"use client";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
    const { setTheme, theme } = useTheme();

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