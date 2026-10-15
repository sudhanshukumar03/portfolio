import type { Metadata } from "next";
import { Inter_Tight, Fraunces, IBM_Plex_Mono } from "next/font/google";
import "@/styles/globals.css";

// Self-hosted at build time by next/font (no third-party CDN). Editorial-luxury
// three-role system:
//   • Display — Fraunces. High-contrast serif with real optical character; the
//     authority and warmth of a premium studio/editorial masthead.
//   • Body — Inter Tight. Clean, slightly condensed sans; quiet and expensive.
//   • Mono — IBM Plex Mono. Reserved strictly for code/data artifacts, used
//     sparingly (not as a decorative "technical" costume).
const sans = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// Set the deploy origin so Next can resolve absolute URLs for OpenGraph/Twitter
// images (the /opengraph-image route). Override via NEXT_PUBLIC_SITE_URL at build.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sudhanshukumar.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sudhanshu Kumar — Full-Stack Developer & AI Engineer",
  description:
    "Full-stack developer & AI engineer building scalable web applications and AI-powered systems — from data model to deployed UI.",
};

// Enforce obsidian dark mode permanently across all sessions.
const themeScript = `(function(){document.documentElement.dataset.theme='dark';try{localStorage.setItem('theme','dark');}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta
          name="description"
          content="Full-stack developer & AI engineer building scalable web applications and AI-powered systems — from data model to deployed UI."
        />
        <meta name="theme-color" content="#0b0c0e" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
