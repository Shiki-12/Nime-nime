import type {
    OngoingResponse,
    AnimeDetailResponse,
    EpisodeResponse,
} from "@/types/anime";

const BASE_URL = "https://www.sankavollerei.com/anime/animasu";

/**
 * Generic fetcher with error handling and Next.js revalidation.
 */
async function apiFetch<T>(
    endpoint: string,
    revalidate: number = 3600
): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;

    const res = await fetch(url, {
        next: { revalidate },
    });

    if (!res.ok) {
        throw new Error(
            `API Error: ${res.status} ${res.statusText} — ${url}`
        );
    }

    const json: T = await res.json();
    return json;
}

// ─── Public helpers ────────────────────────────────────────────────

/**
 * Fetch the list of currently airing / ongoing anime.
 */
export async function getOngoingAnime(
    page: number = 1
): Promise<OngoingResponse> {
    return apiFetch<OngoingResponse>(
        `/ongoing?page=${page}`,
        3600 // revalidate every hour
    );
}

/**
 * Fetch full details for a single anime by its slug.
 */
export async function getAnimeDetail(
    slug: string
): Promise<AnimeDetailResponse> {
    return apiFetch<AnimeDetailResponse>(`/detail/${slug}`, 3600);
}

/**
 * Fetch streaming links for a specific episode by its slug.
 */
export async function getEpisodeData(
    episodeSlug: string
): Promise<EpisodeResponse> {
    return apiFetch<EpisodeResponse>(`/episode/${episodeSlug}`, 3600);
}

/**
 * Search anime by keyword.
 */
export async function searchAnime(
    keyword: string
): Promise<OngoingResponse> {
    return apiFetch<OngoingResponse>(
        `/search/${encodeURIComponent(keyword)}`,
        60
    );
}
