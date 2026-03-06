import { getOngoingAnime } from "@/lib/api";
import AnimeCard from "@/components/AnimeCard";
import HeroBanner from "@/components/HeroBanner";
import Link from "next/link";
import type { OngoingAnime, Pagination } from "@/types/anime";

interface HomeProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  let animeList: OngoingAnime[] = [];
  let pagination: Pagination = {
    hasNext: false,
    hasPrev: false,
    currentPage: currentPage,
  };
  let fetchError: string | null = null;

  try {
    const res = await getOngoingAnime(currentPage);
    animeList = res.animes;
    pagination = res.pagination;
  } catch (err) {
    fetchError =
      err instanceof Error ? err.message : "Failed to fetch anime data.";
  }

  return (
    <>
      {/* Hero Banner */}
      <HeroBanner />

      <div className="mx-auto max-w-[1440px] px-4 pb-6 lg:px-6">

        {/* Error state */}
        {fetchError && (
          <div className="mx-auto mb-10 max-w-xl rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center">
            <h3 className="text-lg font-bold text-white">API Unavailable</h3>
            <p className="mt-1 text-sm text-white/50">
              The anime API server is currently unreachable.
            </p>
            <p className="mt-2 break-all text-xs text-white/20">{fetchError}</p>
            <Link
              href={`/?page=${currentPage}`}
              className="mt-4 inline-block rounded-full bg-hn-primary px-5 py-2 text-sm font-semibold text-hn-dark"
            >
              Try again
            </Link>
          </div>
        )}

        {/* Content */}
        {animeList.length > 0 && (
          <>
            {/* Section header */}
            <div className="mb-5 flex items-center gap-2.5">
              <div className="h-5 w-1 rounded-full bg-hn-primary" />
              <h2 className="text-lg font-bold text-white">
                Ongoing Anime
              </h2>
              <span className="text-xs text-white/30">
                Page {currentPage}
              </span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {animeList.map((anime) => (
                <AnimeCard key={anime.slug} anime={anime} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-10 flex items-center justify-center gap-2">
              {pagination.hasPrev && (
                <Link
                  href={`/?page=${currentPage - 1}`}
                  className="rounded-full bg-hn-card px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-hn-card-hover"
                >
                  ← Previous
                </Link>
              )}
              <span className="rounded-full bg-hn-primary/15 px-4 py-2 text-sm font-bold text-hn-primary">
                {currentPage}
              </span>
              {pagination.hasNext && (
                <Link
                  href={`/?page=${currentPage + 1}`}
                  className="rounded-full bg-hn-card px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-hn-card-hover"
                >
                  Next →
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
