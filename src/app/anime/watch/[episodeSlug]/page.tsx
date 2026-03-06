import Link from "next/link";
import { getEpisodeData } from "@/lib/api";
import VideoPlayer from "@/components/VideoPlayer";

interface StreamingPageProps {
    params: Promise<{ episodeSlug: string }>;
}

export default async function StreamingPage({ params }: StreamingPageProps) {
    const { episodeSlug } = await params;
    const episode = await getEpisodeData(episodeSlug);

    return (
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-4 flex items-center gap-2 text-xs text-zinc-500">
                <Link href="/" className="transition-colors hover:text-white">
                    Home
                </Link>
                <span>/</span>
                <span className="text-zinc-300 truncate max-w-xs">{episode.title}</span>
            </nav>

            {/* Video Player + streams */}
            <VideoPlayer streams={episode.streams} title={episode.title} />

            {/* Back button */}
            <div className="mt-6 flex items-center gap-4">
                <Link
                    href="/"
                    className="group flex items-center gap-2 rounded-xl bg-zinc-800/80 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition-all hover:bg-zinc-700 hover:ring-violet-500/50"
                >
                    <svg
                        className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5 8.25 12l7.5-7.5"
                        />
                    </svg>
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
