export default function SearchLoading() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="skeleton mb-2 h-4 w-24" />
            <div className="skeleton mb-8 mt-3 h-9 w-80" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="skeleton aspect-[3/4] w-full" />
                ))}
            </div>
        </div>
    );
}
