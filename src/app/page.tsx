import { getOngoingAnime } from "@/lib/api";
import AnimeCard from "@/components/AnimeCard";
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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="mb-12 text-center">
        <h1 className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
          Discover &amp; Stream Anime
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400 sm:text-lg">
          Catch up on the latest ongoing anime — updated daily with new episodes.
        </p>
      </section>

      {/* Error state */}
      {fetchError && (
        <div className="mx-auto mb-10 max-w-xl rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white">API Unavailable</h3>
          <p className="mt-1 text-sm text-zinc-400">
            The anime API server is currently unreachable. This could be a temporary DNS or server issue.
          </p>
          <p className="mt-2 text-xs text-zinc-600 break-all">{fetchError}</p>
          <Link
            href={`/?page=${currentPage}`}
            className="mt-4 inline-block rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-violet-500"
          >
            Try again
          </Link>
        </div>
      )}

      {/* Content */}
      {animeList.length > 0 && (
        <>
          {/* Section header */}
          <div className="mb-6 flex items-center gap-3">
            <div className="h-6 w-1 rounded-full bg-gradient-to-b from-violet-500 to-fuchsia-500" />
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Ongoing Anime
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {animeList.map((anime) => (
              <AnimeCard key={anime.slug} anime={anime} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex items-center justify-center gap-3">
            {pagination.hasPrev && (
              <Link
                href={`/?page=${currentPage - 1}`}
                className="rounded-xl bg-zinc-800 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/10 transition-all hover:bg-zinc-700"
              >
                ← Previous
              </Link>
            )}
            <span className="rounded-xl bg-violet-600/20 px-4 py-2 text-sm font-bold text-violet-400 ring-1 ring-violet-500/30">
              Page {currentPage}
            </span>
            {pagination.hasNext && (
              <Link
                href={`/?page=${currentPage + 1}`}
                className="rounded-xl bg-zinc-800 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/10 transition-all hover:bg-zinc-700"
              >
                Next →
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}
