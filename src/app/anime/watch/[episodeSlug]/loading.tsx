export default function EpisodeLoading() {
    return (
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Breadcrumb skeleton */}
            <div className="mb-4 flex items-center gap-2">
                <div className="skeleton h-4 w-10" />
                <span className="text-zinc-700">/</span>
                <div className="skeleton h-4 w-40" />
            </div>

            {/* Video skeleton */}
            <div className="skeleton aspect-video w-full rounded-2xl" />

            {/* Server buttons skeleton */}
            <div className="mt-3 flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="skeleton h-8 w-20 rounded-lg" />
                ))}
            </div>

            {/* Title skeleton */}
            <div className="skeleton mt-3 h-7 w-80" />

            {/* Back button skeleton */}
            <div className="skeleton mt-6 h-11 w-36 rounded-xl" />
        </div>
    );
}
