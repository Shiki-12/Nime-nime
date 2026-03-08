import Image from "next/image";
import Link from "next/link";
import { getAnimeDetail, getMalRating } from "@/lib/api";
import AnimeActions from "@/components/AnimeActions";
import DetailEpisodeList from "@/components/DetailEpisodeList";

interface AnimeDetailPageProps {
    params: Promise<{ slug: string }>;
}

export default async function AnimeDetailPage({ params }: AnimeDetailPageProps) {
    const { slug } = await params;
    const { detail: anime } = await getAnimeDetail(slug);
    const malScore = await getMalRating(anime.title);

    const hasValidRating = malScore !== "N/A" && malScore !== "0";

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
                <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                    {[
                        { label: "Rating MAL", value: malScore },
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
                    <section className="mb-8 ">
                        <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-white">
                            <div className="h-4 w-1 rounded-full bg-hn-primary" />
                            Trailer
                        </h2>
                        <div className="overflow-hidden">
                            <iframe
                                src={anime.trailer}
                                className="aspect-video w-full max-w-2xl mx-auto"
                                allowFullScreen
                                allow="autoplay; fullscreen"
                            />
                        </div>
                    </section>
                )}

                {/* Episode List */}
                <DetailEpisodeList
                    episodes={anime.episodes}
                    animeSlug={slug}
                />
            </div>
        </div>
    );
}
