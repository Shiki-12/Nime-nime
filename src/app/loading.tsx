export default function HomeLoading() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Hero skeleton */}
            <div className="mb-12 flex flex-col items-center gap-4">
                <div className="skeleton h-12 w-80 sm:w-96" />
                <div className="skeleton h-5 w-64" />
            </div>

            {/* Section header skeleton */}
            <div className="mb-6 flex items-center gap-3">
                <div className="skeleton h-6 w-1 rounded-full" />
                <div className="skeleton h-7 w-40" />
            </div>

            {/* Grid skeleton */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i} className="skeleton aspect-[3/4] w-full" />
                ))}
            </div>
        </div>
    );
}
