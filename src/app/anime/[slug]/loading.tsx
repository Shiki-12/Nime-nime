export default function AnimeDetailLoading() {
    return (
        <div className="relative">
            {/* Hero skeleton */}
            <div className="relative h-[420px] w-full overflow-hidden bg-zinc-900 sm:h-[480px]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
                <div className="absolute inset-0 flex items-end">
                    <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 pb-8 sm:px-6 lg:px-8">
                        <div className="hidden sm:block">
                            <div className="skeleton h-[280px] w-[200px]" />
                        </div>
                        <div className="flex flex-col justify-end gap-3">
                            <div className="skeleton h-10 w-64 sm:w-96" />
                            <div className="flex gap-2">
                                <div className="skeleton h-7 w-16" />
                                <div className="skeleton h-7 w-14" />
                                <div className="skeleton h-7 w-20" />
                            </div>
                            <div className="flex gap-2">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="skeleton h-6 w-16 rounded-full" />
                                ))}
                            </div>
                            <div className="skeleton h-16 w-full max-w-xl" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Episodes skeleton */}
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="skeleton mb-6 h-7 w-36" />
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="skeleton h-16 w-full" />
                    ))}
                </div>
            </div>
        </div>
    );
}
