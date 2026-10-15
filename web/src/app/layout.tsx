import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

// High-End Architectural Sans typography system:
//   • Display & Sans: Plus Jakarta Sans. Sculpted geometric neo-grotesque with
//     bespoke curves and prestigious modern software feel (Linear, Raycast, Supabase).
//   • Mono: Geist Mono. Precision developer-grade monospace with tabular figures.
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
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
      className={`${plusJakartaSans.variable} ${geistMono.variable}`}
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
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
