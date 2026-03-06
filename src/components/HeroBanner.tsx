import Image from "next/image";
import Link from "next/link";

export default function HeroBanner() {
    return (
        <section className="relative mx-auto mb-8 max-w-[1440px] overflow-hidden rounded-none px-0 sm:rounded-2xl sm:px-4 lg:px-6">
            {/* Container with blue glow */}
            <div className="relative overflow-hidden rounded-none shadow-[0_0_40px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/10 sm:rounded-2xl">
                {/* Banner Image */}
                <div className="relative h-[240px] w-full sm:h-[300px] md:h-[360px] lg:h-[400px]">
                    <Image
                        src="/images/banner.png"
                        alt="NimeNime — Watch the Best Anime in HD"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />

                    {/* Blue gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-hn-body via-transparent to-blue-950/30" />

                    {/* Decorative blue glow orb */}
                    <div className="absolute -left-20 top-1/2 h-60 w-60 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full max-w-xl px-6 sm:px-10 lg:px-14">
                            {/* Tag */}
                            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-blue-500/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-300 ring-1 ring-blue-400/20 backdrop-blur-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                                Streaming Now
                            </span>

                            {/* Heading */}
                            <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl md:text-4xl lg:text-[42px]">
                                Watch the Best{" "}
                                <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                                    Anime
                                </span>{" "}
                                in HD
                            </h2>

                            {/* Subtitle */}
                            <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-white/50 sm:text-sm">
                                Stream thousands of episodes — from legendary series to the
                                latest seasonal hits. No ads, no interruptions.
                            </p>

                            {/* CTA */}
                            <div className="mt-5 flex items-center gap-3">
                                <Link
                                    href="/popular"
                                    className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500 hover:shadow-blue-500/30"
                                >
                                    <svg
                                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
                                    </svg>
                                    Explore Now
                                </Link>
                                <Link
                                    href="/genres"
                                    className="rounded-full bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-white/70 ring-1 ring-white/10 transition-all hover:bg-white/10 hover:text-white"
                                >
                                    Browse Genres
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Thin blue accent line at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
            </div>
        </section>
    );
}
