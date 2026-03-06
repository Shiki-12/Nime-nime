import Image from "next/image";
import Link from "next/link";
import { getAnimeDetail } from "@/lib/api";

interface AnimeDetailPageProps {
    params: Promise<{ slug: string }>;
}

export default async function AnimeDetailPage({ params }: AnimeDetailPageProps) {
    const { slug } = await params;
    const { detail: anime } = await getAnimeDetail(slug);

    return (
        <div className="relative">
            {/* Hero Banner */}
            <div className="relative h-[420px] w-full overflow-hidden sm:h-[480px]">
                {/* Background (blurred poster) */}
                <Image
                    src={anime.poster}
                    alt={anime.title}
                    fill
                    priority
                    className="object-cover blur-2xl brightness-[0.3] saturate-150 scale-110"
                />

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/80 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex items-end">
                    <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 pb-8 sm:px-6 lg:px-8">
                        {/* Poster */}
                        <div className="hidden shrink-0 sm:block">
                            <div className="relative h-[280px] w-[200px] overflow-hidden rounded-xl shadow-2xl shadow-black/50 ring-1 ring-white/10">
                                <Image
                                    src={anime.poster}
                                    alt={anime.title}
                                    fill
                                    priority
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex flex-col justify-end gap-3">
                            <h1 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
                                {anime.title}
                            </h1>

                            {/* Rating + Meta */}
                            <div className="flex flex-wrap items-center gap-3">
                                {anime.rating && (
                                    <div className="flex items-center gap-1 rounded-lg bg-yellow-500/20 px-2.5 py-1 text-sm font-bold text-yellow-400">
                                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
                                        </svg>
                                        {anime.rating}
                                    </div>
                                )}
                                <span className="rounded-lg bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300 ring-1 ring-white/10">
                                    {anime.type}
                                </span>
                                <span className="rounded-lg bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300 ring-1 ring-white/10">
                                    {anime.status}
                                </span>
                                {anime.duration && (
                                    <span className="rounded-lg bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300 ring-1 ring-white/10">
                                        {anime.duration}
                                    </span>
                                )}
                            </div>

                            {/* Genres */}
                            <div className="flex flex-wrap gap-2">
                                {anime.genres.map((g) => (
                                    <span
                                        key={g.slug}
                                        className="rounded-full bg-violet-600/20 px-3 py-1 text-xs font-medium text-violet-300 ring-1 ring-violet-500/30"
                                    >
                                        {g.name}
                                    </span>
                                ))}
                            </div>

                            {/* Synopsis (truncated for hero) */}
                            <p className="line-clamp-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
                                {anime.synopsis}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Additional info */}
                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { label: "Studio", value: anime.studio },
                        { label: "Season", value: anime.season },
                        { label: "Aired", value: anime.aired },
                        { label: "Author", value: anime.author },
                    ]
                        .filter((item) => item.value)
                        .map((item) => (
                            <div
                                key={item.label}
                                className="rounded-xl bg-zinc-900/60 p-4 ring-1 ring-white/5"
                            >
                                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                                    {item.label}
                                </p>
                                <p className="mt-1 text-sm font-semibold text-white">
                                    {item.value}
                                </p>
                            </div>
                        ))}
                </div>

                {/* Full Synopsis */}
                <section className="mb-10">
                    <h2 className="mb-3 text-lg font-bold text-white">Synopsis</h2>
                    <p className="max-w-4xl text-sm leading-relaxed text-zinc-400">
                        {anime.synopsis}
                    </p>
                </section>

                {/* Trailer */}
                {anime.trailer && (
                    <section className="mb-10">
                        <h2 className="mb-3 text-lg font-bold text-white">Trailer</h2>
                        <div className="overflow-hidden rounded-xl ring-1 ring-white/10">
                            <iframe
                                src={anime.trailer}
                                className="aspect-video w-full max-w-2xl"
                                allowFullScreen
                                allow="autoplay; fullscreen"
                            />
                        </div>
                    </section>
                )}

                {/* Episode List */}
                <section>
                    <div className="mb-4 flex items-center gap-3">
                        <div className="h-6 w-1 rounded-full bg-gradient-to-b from-violet-500 to-fuchsia-500" />
                        <h2 className="text-lg font-bold text-white">
                            Episodes ({anime.episodes.length})
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                        {anime.episodes.map((ep) => (
                            <Link
                                key={ep.slug}
                                href={`/anime/watch/${ep.slug}`}
                                className="group flex items-center gap-3 rounded-xl bg-zinc-900/80 p-3 ring-1 ring-white/5 transition-all hover:bg-zinc-800 hover:ring-violet-500/30"
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-600/20 text-sm font-bold text-violet-400 transition-colors group-hover:bg-violet-600 group-hover:text-white">
                                    <svg
                                        className="h-4 w-4"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
                                    </svg>
                                </div>
                                <span className="truncate text-sm font-medium text-zinc-300 group-hover:text-white">
                                    {ep.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
