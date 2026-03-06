"use client";

import { useState } from "react";
import type { StreamSource } from "@/types/anime";

interface VideoPlayerProps {
    streams: StreamSource[];
    title: string;
}

export default function VideoPlayer({ streams, title }: VideoPlayerProps) {
    const [activeIdx, setActiveIdx] = useState(0);
    const activeStream = streams[activeIdx];

    if (!streams.length || !activeStream) {
        return (
            <div className="flex aspect-video w-full items-center justify-center rounded-2xl bg-zinc-900 text-zinc-500">
                <p>No streaming source available.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {/* Iframe Player */}
            <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl shadow-black/50 ring-1 ring-white/10">
                <iframe
                    key={activeStream.url}
                    src={activeStream.url}
                    className="aspect-video w-full"
                    allowFullScreen
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
                    referrerPolicy="no-referrer"
                />
            </div>

            {/* Server / Quality selector */}
            {streams.length > 1 && (
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-medium text-zinc-500">Server:</span>
                    {streams.map((s, i) => (
                        <button
                            key={`${s.name}-${i}`}
                            onClick={() => setActiveIdx(i)}
                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${i === activeIdx
                                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                                }`}
                        >
                            {s.name}
                        </button>
                    ))}
                </div>
            )}

            {/* Title */}
            <h1 className="text-lg font-bold text-white sm:text-xl">{title}</h1>
        </div>
    );
}
