import Link from "next/link";
import { getEpisodeData, getAnimeDetail } from "@/lib/api";
import VideoPlayer from "@/components/VideoPlayer";
import EpisodeList from "@/components/EpisodeList";
import type { EpisodeItem } from "@/types/anime";

interface StreamingPageProps {
    params: Promise<{ episodeSlug: string }>;
    searchParams: Promise<{ anime?: string }>;
}

export default async function StreamingPage({
    params,
    searchParams,
}: StreamingPageProps) {
    const { episodeSlug } = await params;
    const sp = await searchParams;
    const animeSlug = sp.anime;

    const episode = await getEpisodeData(episodeSlug);

    let episodes: EpisodeItem[] = [];
    let animeTitle: string | null = null;
    if (animeSlug) {
        try {
            const { detail } = await getAnimeDetail(animeSlug);
            episodes = detail.episodes;
            animeTitle = detail.title;
        } catch {
            // Silently fail
        }
    }

    return (
        <div className="mx-auto max-w-[1440px] px-4 py-6 lg:px-6">
            {/* Breadcrumb */}
            <nav className="mb-4 flex items-center gap-2 text-xs text-white/30">
                <Link href="/" className="transition-colors hover:text-hn-primary">
                    Home
                </Link>
                {animeTitle && (
                    <>
                        <span className="text-white/15">/</span>
                        <Link
                            href={`/anime/${animeSlug}`}
                            className="transition-colors hover:text-hn-primary"
                        >
                            {animeTitle}
                        </Link>
                    </>
                )}
                <span className="text-white/15">/</span>
                <span className="max-w-xs truncate text-white/50">
                    {episode.title}
                </span>
            </nav>

            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                {/* Left: Player + Navigation */}
                <div>
                    <VideoPlayer streams={episode.streams} title={episode.title} />

                    {/* Episode Navigation */}
                    {episodes.length > 0 && (
                        <EpisodeList
                            episodes={episodes}
                            currentEpisodeSlug={episodeSlug}
                            animeSlug={animeSlug}
                        />
                    )}
                </div>

                {/* Right Sidebar: Episode List (desktop) */}
                {episodes.length > 0 && (
                    <aside className="hidden lg:block">
                        <div className="sticky top-[76px] rounded-lg bg-hn-card p-3">
                            <div className="mb-3 flex items-center gap-2 border-b border-white/5 pb-3">
                                <h3 className="text-sm font-bold text-white">Episodes</h3>
                                <span className="rounded bg-hn-primary/15 px-2 py-0.5 text-[10px] font-bold text-hn-primary">
                                    {episodes.length}
                                </span>
                            </div>
                            <div className="max-h-[calc(100vh-180px)] space-y-1 overflow-y-auto pr-1 scrollbar-thin">
                                {episodes.map((ep) => {
                                    const isActive = ep.slug === episodeSlug;
                                    const href = animeSlug
                                        ? `/anime/watch/${ep.slug}?anime=${animeSlug}`
                                        : `/anime/watch/${ep.slug}`;
                                    return (
                                        <Link
                                            key={ep.slug}
                                            href={href}
                                            className={`flex items-center gap-2 rounded-md px-3 py-2 text-[12px] font-medium transition-all ${isActive
                                                    ? "bg-hn-primary text-hn-dark"
                                                    : "text-white/50 hover:bg-white/5 hover:text-white"
                                                }`}
                                        >
                                            <svg className="h-3 w-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
                                            </svg>
                                            <span className="truncate">{ep.name}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </aside>
                )}
            </div>

            {/* Back buttons */}
            <div className="mt-6 flex items-center gap-2">
                {animeSlug && (
                    <Link
                        href={`/anime/${animeSlug}`}
                        className="rounded-full bg-hn-card px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-hn-card-hover"
                    >
                        ← Back to Anime
                    </Link>
                )}
                <Link
                    href="/"
                    className="rounded-full bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/40 transition-all hover:bg-white/[0.08] hover:text-white"
                >
                    Home
                </Link>
            </div>
        </div>
    );
}
