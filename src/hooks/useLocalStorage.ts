"use client";

import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item) {
                // eslint-disable-next-line
                setStoredValue(JSON.parse(item) as T);
            }
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
        }
    }, [key]);

    // Setter that also persists to localStorage
    const setValue = useCallback(
        (value: T | ((prev: T) => T)) => {
            setStoredValue((prev) => {
                const newValue =
                    value instanceof Function ? value(prev) : value;
                try {
                    window.localStorage.setItem(key, JSON.stringify(newValue));
                } catch (error) {
                    console.warn(`Error writing localStorage key "${key}":`, error);
                }
                return newValue;
            });
        },
        [key]
    );

    return [storedValue, setValue];
}

// ─── Saved Anime Types ─────────────────────────────────────────────

export interface SavedAnimeItem {
    slug: string;
    title: string;
    poster: string;
    type: string;
    savedAt: number;
}

export interface AnimeRating {
    slug: string;
    rating: "like" | "dislike" | null;
}

// ─── Helpers ────────────────────────────────────────────────────────

export function useSavedAnime() {
    const [saved, setSaved] = useLocalStorage<SavedAnimeItem[]>(
        "nimenime-saved",
        []
    );

    const isSaved = (slug: string) => saved.some((s) => s.slug === slug);

    const toggleSave = (anime: Omit<SavedAnimeItem, "savedAt">) => {
        setSaved((prev) => {
            if (prev.some((s) => s.slug === anime.slug)) {
                return prev.filter((s) => s.slug !== anime.slug);
            }
            return [...prev, { ...anime, savedAt: Date.now() }];
        });
    };

    return { saved, isSaved, toggleSave };
}

export function useAnimeRating(slug: string) {
    const [ratings, setRatings] = useLocalStorage<Record<string, "like" | "dislike">>(
        "nimenime-ratings",
        {}
    );

    const currentRating = ratings[slug] || null;

    const setRating = (rating: "like" | "dislike") => {
        setRatings((prev) => {
            if (prev[slug] === rating) {
                // Toggle off
                const next = { ...prev };
                delete next[slug];
                return next;
            }
            return { ...prev, [slug]: rating };
        });
    };

    return { currentRating, setRating };
}
