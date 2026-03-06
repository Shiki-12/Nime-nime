"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = query.trim();
        if (trimmed) {
            router.push(`/search/${encodeURIComponent(trimmed)}`);
            setQuery("");
            inputRef.current?.blur();
        }
    };

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") inputRef.current?.blur();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-md">
            <div
                className={`flex items-center gap-2.5 rounded-lg bg-white/[0.06] px-3.5 py-2 transition-all duration-200 ${isFocused
                        ? "ring-1 ring-hn-primary/40 bg-white/[0.1]"
                        : "hover:bg-white/[0.08]"
                    }`}
            >
                <svg
                    className="h-4 w-4 shrink-0 text-white/40"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                </svg>
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Search anime..."
                    className="w-full bg-transparent text-[13px] text-white placeholder:text-white/30 focus:outline-none"
                />
                {query && (
                    <button
                        type="button"
                        onClick={() => setQuery("")}
                        className="shrink-0 text-white/30 hover:text-white/60"
                    >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
                <kbd className="hidden shrink-0 rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-medium text-white/25 sm:inline-block">
                    Filter
                </kbd>
            </div>
        </form>
    );
}
