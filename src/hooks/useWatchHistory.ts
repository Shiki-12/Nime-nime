"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

// ─── Types ─────────────────────────────────────────────────────────

export interface WatchedAnimeEntry {
    /** Anime slug (used as the record key) */
    slug: string;
    title: string;
    poster: string;
    type: string;
    /** Episode slugs the user has watched */
    watchedEpisodes: string[];
    /** The most recently watched episode slug */
    lastWatchedEpisode: string;
    /** Human-readable name of the last watched episode */
    lastWatchedEpisodeName: string;
    /** Timestamp of the most recent watch (for sorting) */
    timestamp: number;
}

/** The full history is a slug→entry record */
type WatchHistoryMap = Record<string, WatchedAnimeEntry>;

// ─── Hook ──────────────────────────────────────────────────────────

export function useWatchHistory() {
    const [history, setHistory] = useLocalStorage<WatchHistoryMap>(
        "nimenime-watch-history",
        {}
    );

    /**
     * Mark an episode as watched. Call this on the streaming page.
     * If the anime doesn't exist in history yet, a new entry is created.
     */
    const markEpisodeAsWatched = useCallback(
        (
            anime: { slug: string; title: string; poster: string; type: string },
            episodeSlug: string,
            episodeName: string
        ) => {
            setHistory((prev) => {
                const existing = prev[anime.slug];
                const watchedSet = new Set(existing?.watchedEpisodes ?? []);
                watchedSet.add(episodeSlug);

                return {
                    ...prev,
                    [anime.slug]: {
                        slug: anime.slug,
                        title: anime.title,
                        poster: anime.poster,
                        type: anime.type,
                        watchedEpisodes: Array.from(watchedSet),
                        lastWatchedEpisode: episodeSlug,
                        lastWatchedEpisodeName: episodeName,
                        timestamp: Date.now(),
                    },
                };
            });
        },
        [setHistory]
    );

    /**
     * Get the set of watched episode slugs for a given anime.
     */
    const getWatchedEpisodes = useCallback(
        (animeSlug: string): Set<string> => {
            return new Set(history[animeSlug]?.watchedEpisodes ?? []);
        },
        [history]
    );

    /**
     * Check if a specific episode has been watched.
     */
    const isEpisodeWatched = useCallback(
        (animeSlug: string, episodeSlug: string): boolean => {
            return history[animeSlug]?.watchedEpisodes?.includes(episodeSlug) ?? false;
        },
        [history]
    );

    /**
     * Get all history entries sorted by most recent first.
     */
    const getHistorySorted = useCallback((): WatchedAnimeEntry[] => {
        return Object.values(history).sort((a, b) => b.timestamp - a.timestamp);
    }, [history]);

    /**
     * Clear all watch history.
     */
    const clearHistory = useCallback(() => {
        setHistory({});
    }, [setHistory]);

    return {
        history,
        markEpisodeAsWatched,
        getWatchedEpisodes,
        isEpisodeWatched,
        getHistorySorted,
        clearHistory,
    };
}
