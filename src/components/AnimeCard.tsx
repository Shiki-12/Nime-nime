import Image from "next/image";
import Link from "next/link";
import type { OngoingAnime } from "@/types/anime";

interface AnimeCardProps {
    anime: OngoingAnime;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
    const href = `/anime/${anime.slug}`;

    return (
        <Link
            href={href}
            className="group relative block overflow-hidden rounded-xl bg-zinc-900 shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-violet-500/10"
        >
            {/* Cover image */}
            <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                    src={anime.poster}
                    alt={anime.title}
                    fill
                    sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                {/* Episode badge */}
                <div className="absolute left-2 top-2 flex items-center gap-1 rounded-md bg-violet-600/90 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                    <svg
                        className="h-3 w-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
                    </svg>
                    {anime.episode}
                </div>

                {/* Type badge */}
                <span className="absolute right-2 top-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-zinc-300 backdrop-blur-sm">
                    {anime.type}
                </span>

                {/* Status / Day */}
                {anime.status_or_day && (
                    <span className="absolute bottom-10 right-2 text-xs">
                        {anime.status_or_day}
                    </span>
                )}
            </div>

            {/* Title */}
            <div className="absolute inset-x-0 bottom-0 p-3">
                <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white drop-shadow-lg">
                    {anime.title}
                </h3>
            </div>
        </Link>
    );
}
