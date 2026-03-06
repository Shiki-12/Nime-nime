import type {
    AnimeListResponse,
    AnimeDetailResponse,
    EpisodeResponse,
    GenreListResponse,
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

// ─── Ongoing / Home ────────────────────────────────────────────────

export async function getOngoingAnime(
    page: number = 1
): Promise<AnimeListResponse> {
    return apiFetch<AnimeListResponse>(`/ongoing?page=${page}`, 3600);
}

// ─── Detail & Episode ──────────────────────────────────────────────

export async function getAnimeDetail(
    slug: string
): Promise<AnimeDetailResponse> {
    return apiFetch<AnimeDetailResponse>(`/detail/${slug}`, 3600);
}

export async function getEpisodeData(
    episodeSlug: string
): Promise<EpisodeResponse> {
    return apiFetch<EpisodeResponse>(`/episode/${episodeSlug}`, 3600);
}

// ─── Search ────────────────────────────────────────────────────────

export async function searchAnime(
    query: string,
    page: number = 1
): Promise<AnimeListResponse> {
    return apiFetch<AnimeListResponse>(
        `/search/${encodeURIComponent(query)}?page=${page}`,
        60 // short cache for search
    );
}

// ─── Genres ────────────────────────────────────────────────────────

export async function getGenres(): Promise<GenreListResponse> {
    return apiFetch<GenreListResponse>("/genres", 86400); // cache 24h
}

export async function getAnimeByGenre(
    genreSlug: string,
    page: number = 1
): Promise<AnimeListResponse> {
    return apiFetch<AnimeListResponse>(
        `/genre/${genreSlug}?page=${page}`,
        3600
    );
}

// ─── Categories ────────────────────────────────────────────────────

export async function getMovies(
    page: number = 1
): Promise<AnimeListResponse> {
    return apiFetch<AnimeListResponse>(`/movies?page=${page}`, 3600);
}

export async function getPopularAnime(
    page: number = 1
): Promise<AnimeListResponse> {
    return apiFetch<AnimeListResponse>(`/popular?page=${page}`, 3600);
}
