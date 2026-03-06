export default function GenresLoading() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col items-center gap-3">
                <div className="skeleton h-10 w-64" />
                <div className="skeleton h-5 w-80" />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="skeleton h-16 w-full" />
                ))}
            </div>
        </div>
    );
}
