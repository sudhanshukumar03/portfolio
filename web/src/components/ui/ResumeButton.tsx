"use client";

import { useEffect, useState } from "react";

// Resume CTA with interactive hover preview:
// 1. Hovering (or focusing) the button pops up the live resume preview card above the button.
// 2. The preview card header has a dedicated Download button with a download icon for 1-click download.
// 3. Clicking either the resume preview grid or the main button opens the resume in full screen in a new tab.
export function ResumeButton({ href }: { href: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setMounted(true));
      return () => window.cancelIdleCallback(id);
    } else {
      const timer = setTimeout(() => setMounted(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div
      className="group/resume relative inline-block"
      onMouseEnter={() => setMounted(true)}
      onFocus={() => setMounted(true)}
      onTouchStart={() => setMounted(true)}
    >
      {/* Preview popover — reveals smoothly on button/popover hover or focus */}
      <div
        className="pointer-events-none absolute bottom-[calc(100%+0.5rem)] left-0 z-30 w-[260px] sm:w-[275px] origin-bottom-left translate-y-2 scale-95 opacity-0 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_1px_0_inset_color-mix(in_srgb,var(--color-text)_6%,transparent),0_28px_60px_-22px_rgba(0,0,0,0.75)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/resume:pointer-events-auto group-hover/resume:translate-y-0 group-hover/resume:scale-100 group-hover/resume:opacity-100 group-focus-within/resume:pointer-events-auto group-focus-within/resume:translate-y-0 group-focus-within/resume:scale-100 group-focus-within/resume:opacity-100"
      >
        {/* Invisible hit-area bridge between button and popover to prevent mouseleave gap */}
        <div className="absolute -bottom-3 inset-x-0 h-4" aria-hidden="true" />

        {/* Header strip: Title + Dedicated Download button with download icon */}
        <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-accent)_8%,transparent)] px-3 py-2">
          <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-secondary)]">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_6px_color-mix(in_srgb,var(--color-accent)_60%,transparent)]"
            />
            Résumé
          </div>

          {/* Download button with download icon */}
          <a
            href={href}
            download="Sudhanshu-Kumar-Resume.pdf"
            className="focus-accent group/dl inline-flex items-center gap-1.5 rounded-md border border-[var(--color-accent)]/50 bg-[color-mix(in_srgb,var(--color-accent)_16%,transparent)] px-2.5 py-1 font-mono text-[11px] font-semibold text-[var(--color-heading)] shadow-sm transition-all hover:border-[var(--color-accent)] hover:bg-[color-mix(in_srgb,var(--color-accent)_30%,transparent)] hover:text-white"
            title="Download Sudhanshu-Kumar-Resume.pdf"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="text-[var(--color-accent)] transition-transform duration-200 group-hover/dl:translate-y-0.5 group-hover/dl:text-white"
            >
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
            </svg>
            <span>Download</span>
          </a>
        </div>

        {/* Resume preview grid — clicking opens the full screen resume in a new tab */}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group/grid relative block aspect-[1/1.28] w-full cursor-pointer overflow-hidden bg-white"
          title="Click to view full screen in another tab"
        >
          {mounted && (
            <iframe
              src={`${href}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
              title="Sudhanshu Kumar Resume Preview"
              className="pointer-events-none absolute inset-0 h-full w-full border-0 bg-white"
            />
          )}

          {/* Hover prompt overlay */}
          <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/75 via-black/10 to-transparent p-3 opacity-0 transition-opacity duration-200 group-hover/grid:opacity-100">
            <span className="flex items-center gap-1.5 rounded-md bg-black/85 px-2.5 py-1 text-[11.5px] font-medium text-white shadow-lg backdrop-blur-sm">
              <span>View full screen in other tab</span>
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </span>
          </div>
        </a>
      </div>

      {/* Main Resume Button — original button design, opens full-screen PDF in new tab */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "var(--color-heading)" }}
        className="focus-accent group relative overflow-hidden inline-flex min-w-[10.5rem] items-center justify-center gap-2 rounded-lg border border-[var(--color-accent)] px-5 py-2.5 text-base font-semibold shadow-[0_4px_16px_-8px_color-mix(in_srgb,var(--color-accent)_40%,transparent)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)] hover:shadow-[0_10px_25px_-8px_color-mix(in_srgb,var(--color-accent)_60%,transparent)] active:scale-[0.97]"
        title="Open resume in full screen in new tab"
      >
        {/* Sheen sweep on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(115deg,transparent_42%,color-mix(in_srgb,#ffffff_25%,transparent)_50%,transparent_58%)] transition-transform duration-700 ease-out group-hover:translate-x-full motion-reduce:hidden"
        />
        {/* Download / Document icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="relative transition-transform duration-200 group-hover:translate-y-0.5"
        >
          <path
            d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="relative">Resume</span>
      </a>
    </div>
  );
}
