import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
        className={`${inter.variable} font-sans antialiased`}
      >
        <Navbar />
        <main className="min-h-screen pt-[60px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
