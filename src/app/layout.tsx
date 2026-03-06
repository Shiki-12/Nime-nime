import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "NimeNime — Anime Streaming Portal",
  description:
    "Watch the latest anime episodes for free. Discover ongoing series, stream in HD, and explore a vast library of anime titles.",
  keywords: ["anime", "streaming", "watch anime", "ongoing anime", "anime episodes"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-[#0a0a0f] text-white selection:bg-violet-500/30`}
      >
        <Navbar />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-black/40">
          <div className="mx-auto max-w-7xl px-4 py-8 text-center text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} NimeNime. For educational purposes only.
          </div>
        </footer>
      </body>
    </html>
  );
}
