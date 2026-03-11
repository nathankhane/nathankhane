/**
 * SearchBar — Google search bar motif
 *
 * Used throughout the narrative as a recurring visual element.
 * Evokes the familiar search interface while recontextualizing it:
 * Nathan doesn't just search — he builds the answers.
 *
 * JetBrains Mono font applied per design spec (google search bar motif).
 * Appears in: TitleCard, TheSpark (hidden), ParallelTimeline
 */
"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  readOnly?: boolean;
  animate?: boolean;
  className?: string;
  onSubmit?: (value: string) => void;
}

export default function SearchBar({
  placeholder = "Search anything...",
  value: initialValue = "",
  readOnly = true,
  animate: _animate = false,
  className,
  onSubmit,
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (onSubmit) onSubmit(value);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex items-center gap-3 bg-surface border border-cream/10 rounded-full px-5 py-3",
        "hover:border-cream/20 transition-colors duration-300",
        "w-full max-w-xl",
        className
      )}
    >
      <Search className="h-4 w-4 text-cream/30 flex-shrink-0" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={cn(
          "bg-transparent flex-1 text-cream/70 font-mono text-sm outline-none",
          "placeholder:text-cream/30",
          readOnly && "cursor-default"
        )}
      />
      {/* Google favicon colors — subtle easter egg within the search bar */}
      <div className="flex gap-0.5 flex-shrink-0">
        <div className="w-1.5 h-1.5 rounded-full bg-google-blue opacity-60" />
        <div className="w-1.5 h-1.5 rounded-full bg-google-red opacity-60" />
        <div className="w-1.5 h-1.5 rounded-full bg-google-yellow opacity-60" />
        <div className="w-1.5 h-1.5 rounded-full bg-google-green opacity-60" />
      </div>
    </form>
  );
}
