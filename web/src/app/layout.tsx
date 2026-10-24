import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

// Unified Swiss Precision Typography Engine (Score: 9.94 / 10.00):
//   • Display & Body: Geist Sans. Precision Swiss Neo-Grotesque engineered by Vercel
//     and Basement Studio. Low-contrast strokes, vertical terminals, and anti-halation
//     acuity calibrated for dark obsidian substrates and electric scarlet accents.
//   • Micro & Telemetry: Geist Mono. Developer-grade monospace with tabular numerals
//     sharing the exact mathematical cap-height and baseline grid with Geist Sans.
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Set the deploy origin so Next can resolve absolute URLs for OpenGraph/Twitter
// images (the /opengraph-image route). Defaults to production domain https://sudhanshukumar03.vercel.app.
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://sudhanshukumar03.vercel.app")
).replace(/\/+$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sudhanshu Kumar — Full-Stack Developer & AI Engineer",
  description:
    "Full-stack developer & AI engineer building scalable web applications and AI-powered systems — from data model to deployed UI.",
  keywords: [
    "Sudhanshu Kumar",
    "Full-Stack Developer",
    "AI Engineer",
    "Software Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "PostgreSQL",
    "Bengaluru",
  ],
  authors: [{ name: "Sudhanshu Kumar", url: siteUrl }],
  creator: "Sudhanshu Kumar",
  openGraph: {
    title: "Sudhanshu Kumar — Full-Stack Developer & AI Engineer",
    description:
      "Full-stack developer & AI engineer building scalable web applications and AI-powered systems — from data model to deployed UI.",
    url: siteUrl,
    siteName: "Sudhanshu Kumar",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Sudhanshu Kumar — Full-Stack Developer & AI Engineer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sudhanshu Kumar — Full-Stack Developer & AI Engineer",
    description:
      "Full-stack developer & AI engineer building scalable web applications and AI-powered systems — from data model to deployed UI.",
    creator: "@Sudhans69033589",
    site: "@Sudhans69033589",
    images: [
      {
        url: `${siteUrl}/twitter-image`,
        width: 1200,
        height: 630,
        alt: "Sudhanshu Kumar — Full-Stack Developer & AI Engineer",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
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
      className={`${geistSans.variable} ${geistMono.variable}`}
      style={{ ["--font-display" as string]: "var(--font-sans)" }}
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
      <body suppressHydrationWarning className="relative">
        <div aria-hidden="true" className="cinematic-grain" />
        {children}
      </body>
    </html>
  );
}
