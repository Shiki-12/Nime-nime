import Image from "next/image";
import Link from "next/link";
import { getAnimeDetail } from "@/lib/api";
import AnimeActions from "@/components/AnimeActions";

interface AnimeDetailPageProps {
    params: Promise<{ slug: string }>;
}

export default async function AnimeDetailPage({ params }: AnimeDetailPageProps) {
    const { slug } = await params;
    const { detail: anime } = await getAnimeDetail(slug);

    const hasValidRating =
        anime.rating &&
        anime.rating !== "N/A" &&
        anime.rating !== "0" &&
        anime.rating.trim() !== "";

    return (
        <div className="relative">
            {/* Hero Banner */}
            <div className="relative h-[400px] w-full overflow-hidden sm:h-[440px]">
                <Image
                    src={anime.poster}
                    alt={anime.title}
                    fill
                    priority
                    className="object-cover blur-2xl brightness-[0.2] saturate-150 scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-hn-body via-hn-body/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-hn-body/90 to-transparent" />

                <div className="absolute inset-0 flex items-end">
                    <div className="mx-auto flex w-full max-w-[1440px] gap-6 px-4 pb-8 lg:px-6">
                        {/* Poster */}
                        <div className="hidden shrink-0 sm:block">
                            <div className="relative h-[260px] w-[185px] overflow-hidden rounded-lg shadow-2xl shadow-black/50 ring-1 ring-white/10">
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
                        <div className="flex flex-col justify-end gap-2.5">
                            <h1 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                                {anime.title}
                            </h1>

                            {/* Meta row */}
                            <div className="flex flex-wrap items-center gap-2 text-[12px]">
                                {hasValidRating && (
                                    <span className="flex items-center gap-1 rounded bg-hn-orange/20 px-2 py-0.5 font-bold text-hn-orange">
                                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
                                        </svg>
                                        {anime.rating}
                                    </span>
                                )}
                                <span className="rounded bg-hn-primary/20 px-2 py-0.5 font-semibold text-hn-primary">
                                    {anime.type}
                                </span>
                                <span className="rounded bg-white/[0.06] px-2 py-0.5 font-medium text-white/60">
                                    {anime.status}
                                </span>
                                {anime.duration && (
                                    <span className="rounded bg-white/[0.06] px-2 py-0.5 font-medium text-white/60">
                                        {anime.duration}
                                    </span>
                                )}
                            </div>

                            {/* Genres */}
                            <div className="flex flex-wrap gap-1.5">
                                {anime.genres.map((g) => (
                                    <Link
                                        key={g.slug}
                                        href={`/genres/${g.slug}`}
                                        className="rounded bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-white/50 transition-colors hover:bg-hn-primary/15 hover:text-hn-primary"
                                    >
                                        {g.name}
                                    </Link>
                                ))}
                            </div>

                            {/* Synopsis (truncated) */}
                            <p className="line-clamp-3 max-w-2xl text-[13px] leading-relaxed text-white/40">
                                {anime.synopsis}
                            </p>

                            {/* Actions */}
                            <AnimeActions
                                anime={{
                                    slug,
                                    title: anime.title,
                                    poster: anime.poster,
                                    type: anime.type,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="mx-auto max-w-[1440px] px-4 py-8 lg:px-6">
                {/* Meta cards */}
                <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
                                className="rounded-lg bg-hn-card p-4"
                            >
                                <p className="text-[10px] font-bold uppercase tracking-wider text-white/30">
                                    {item.label}
                                </p>
                                <p className="mt-1 text-sm font-semibold text-white">
                                    {item.value}
                                </p>
                            </div>
                        ))}
                </div>

                {/* Synopsis */}
                <section className="mb-8">
                    <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-white">
                        <div className="h-4 w-1 rounded-full bg-hn-primary" />
                        Synopsis
                    </h2>
                    <p className="max-w-3xl text-sm leading-relaxed text-white/50">
                        {anime.synopsis}
                    </p>
                </section>

                {/* Trailer */}
                {anime.trailer && (
                    <section className="mb-8">
                        <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-white">
                            <div className="h-4 w-1 rounded-full bg-hn-primary" />
                            Trailer
                        </h2>
                        <div className="overflow-hidden rounded-lg ring-1 ring-white/5">
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
                    <div className="mb-4 flex items-center gap-2">
                        <div className="h-4 w-1 rounded-full bg-hn-primary" />
                        <h2 className="text-base font-bold text-white">
                            Episodes
                        </h2>
                        <span className="rounded bg-hn-primary/15 px-2 py-0.5 text-[11px] font-bold text-hn-primary">
                            {anime.episodes.length}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                        {anime.episodes.map((ep) => (
                            <Link
                                key={ep.slug}
                                href={`/anime/watch/${ep.slug}?anime=${slug}`}
                                className="group flex items-center gap-2.5 rounded-lg bg-hn-card p-2.5 transition-all hover:bg-hn-primary/15 hover:ring-1 hover:ring-hn-primary/30"
                            >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-hn-primary/10 text-hn-primary transition-colors group-hover:bg-hn-primary group-hover:text-hn-dark">
                                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
                                    </svg>
                                </div>
                                <span className="truncate text-[12px] font-medium text-white/70 group-hover:text-hn-primary">
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
