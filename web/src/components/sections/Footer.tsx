"use client";

import { profile } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-16 border-t border-[color-mix(in_srgb,var(--color-border)_70%,transparent)] pt-8 pb-12 text-xs text-[var(--color-muted)]">
      {/* Top Hairline Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--color-accent)_40%,transparent),transparent)]"
      />

      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        {/* Left: Identity & Year */}
        <div className="flex items-center gap-2.5">
          <span className="font-display font-semibold text-[var(--color-heading)]">
            {profile.name}
          </span>
          <span className="text-[var(--color-border)] select-none">/</span>
          <span className="font-mono text-[11.5px] text-[var(--color-muted)]">
            &copy; {year}
          </span>
        </div>

        {/* Center: Direct Channels */}
        <div className="flex flex-wrap items-center justify-center gap-5 font-mono text-[11.5px]">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--color-text)]"
          >
            GitHub ↗
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--color-text)]"
          >
            LinkedIn ↗
          </a>
          <a
            href={profile.links.x}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--color-text)]"
          >
            X ↗
          </a>
          <a
            href={profile.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#25D366]"
          >
            WhatsApp ↗
          </a>
        </div>

        {/* Right: Timezone & Scroll to Top */}
        <div className="flex items-center gap-3.5">
          <span className="font-mono text-[11.5px]">
            Bengaluru, IN (IST)
          </span>
          <span aria-hidden="true" className="text-[var(--color-border)] select-none">&bull;</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="focus-accent inline-flex items-center gap-1.5 font-mono text-[11.5px] transition-colors hover:text-[var(--color-accent)] cursor-pointer"
            title="Scroll back to top"
          >
            <span>Back to top</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
