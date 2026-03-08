"use client";

import Image from "next/image";
import Link from "next/link";
import { useWatchHistory } from "@/hooks/useWatchHistory";

export default function HistoryPage() {
    const { getHistorySorted, clearHistory } = useWatchHistory();
    const entries = getHistorySorted();

    return (
        <main className="mx-auto max-w-[1440px] px-4 pb-16 pt-24 lg:px-6">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white sm:text-3xl">
                        <span className="text-hn-primary">🕘</span> My Watch History
                    </h1>
                    <p className="mt-1 text-sm text-white/40">
                        {entries.length > 0
                            ? `${entries.length} anime watched`
                            : "Your history will appear here."}
                    </p>
                </div>

                {entries.length > 0 && (
                    <button
                        onClick={() => {
                            if (confirm("Clear your entire watch history?")) {
                                clearHistory();
                            }
                        }}
                        className="flex items-center gap-1.5 self-start rounded-full bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/20"
                    >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                        Clear History
                    </button>
                )}
            </div>

            {/* Empty state */}
            {entries.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-hn-card/50 py-20">
                    <svg className="mb-4 h-16 w-16 text-white/10" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <h2 className="text-lg font-semibold text-white/40">
                        No watch history yet
                    </h2>
                    <p className="mt-1 text-sm text-white/20">
                        Start watching anime and your history will appear here.
                    </p>
                    <Link
                        href="/"
                        className="mt-5 rounded-full bg-hn-primary px-5 py-2 text-sm font-semibold text-hn-dark transition-all hover:shadow-lg hover:shadow-hn-primary/25"
                    >
                        Browse Anime
                    </Link>
                </div>
            )}

            {/* History grid */}
            {entries.length > 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {entries.map((entry) => {
                        const watchedCount = entry.watchedEpisodes.length;
                        const continueHref = `/anime/watch/${entry.lastWatchedEpisode}?anime=${entry.slug}`;
                        const timeAgo = getRelativeTime(entry.timestamp);

                        return (
                            <div
                                key={entry.slug}
                                className="group overflow-hidden rounded-xl bg-hn-card transition-all duration-300 hover:ring-1 hover:ring-hn-primary/20"
                            >
                                <div className="flex gap-3 p-3">
                                    {/* Poster */}
                                    <Link href={`/anime/${entry.slug}`} className="relative h-28 w-20 shrink-0 overflow-hidden rounded-lg">
                                        <Image
                                            src={entry.poster}
                                            alt={entry.title}
                                            fill
                                            sizes="80px"
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        {/* Type badge */}
                                        {entry.type && (
                                            <span className="absolute right-0 top-0 rounded-bl bg-hn-primary/90 px-1.5 py-0.5 text-[9px] font-bold uppercase text-hn-dark">
                                                {entry.type}
                                            </span>
                                        )}
                                    </Link>

                                    {/* Info */}
                                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                                        <div>
                                            <Link href={`/anime/${entry.slug}`}>
                                                <h3 className="line-clamp-2 text-sm font-semibold text-white transition-colors group-hover:text-hn-primary">
                                                    {entry.title}
                                                </h3>
                                            </Link>
                                            <p className="mt-1 text-[11px] text-white/30">
                                                {watchedCount} episode{watchedCount !== 1 ? "s" : ""} watched · {timeAgo}
                                            </p>
                                        </div>

                                        <div className="mt-2 space-y-1.5">
                                            <p className="truncate text-[11px] font-medium text-hn-primary/70">
                                                Last: {entry.lastWatchedEpisodeName}
                                            </p>
                                            <Link
                                                href={continueHref}
                                                className="inline-flex items-center gap-1 rounded-full bg-hn-primary/15 px-3 py-1 text-[11px] font-semibold text-hn-primary transition-all hover:bg-hn-primary/25"
                                            >
                                                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
                                                </svg>
                                                Continue Watching
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </main>
    );
}

// ─── Helper ────────────────────────────────────────────────────────

function getRelativeTime(timestamp: number): string {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks}w ago`;
    return new Date(timestamp).toLocaleDateString();
}
