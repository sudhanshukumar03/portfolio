import { profile } from "@/content/site";

// Copy source: portfolio/content/FOOTER.md — stays quiet, no new accent moment.
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="flex flex-col gap-3 border-t border-[var(--color-border)] py-10 text-sm text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
      <p>
        © {year} {profile.name}
      </p>
      <div className="flex items-center gap-6">
        <a
          href={profile.links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-4 transition-colors hover:text-[var(--color-text)] hover:underline"
        >
          WhatsApp
        </a>
        <a
          href={profile.links.x}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-4 transition-colors hover:text-[var(--color-text)] hover:underline"
        >
          Writing
        </a>
        <span>Built with Next.js &amp; Tailwind CSS</span>
        <a
          href="#hero"
          className="underline-offset-4 transition-colors hover:text-[var(--color-text)] hover:underline"
        >
          Back to top
        </a>
      </div>
    </footer>
  );
}
