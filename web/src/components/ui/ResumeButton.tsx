"use client";

import { useEffect, useState, useRef } from "react";

// Resume CTA with interactive hover preview:
// 1. Hovering (or keyboard-focusing) the button triggers an ultra-premium floating dossier preview card.
// 2. The preview card header has a dedicated, glowing Download pill for 1-click PDF download.
// 3. The card shows a crisp, live iframe preview of the resume with realistic paper lighting and depth.
// 4. Clicking either the preview card or the main Resume button opens the resume in full screen in a new tab.
export function ResumeButton({ href }: { href: string }) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Pre-mount iframe preview on idle for instant display
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setMounted(true));
      return () => window.cancelIdleCallback(id);
    } else {
      const timer = setTimeout(() => setMounted(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const keepOpen = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setMounted(true);
    setIsOpen(true);
  };

  const scheduleClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 320);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className="resume-preview-wrapper group/resume relative inline-block"
      onMouseEnter={keepOpen}
      onMouseMove={keepOpen}
      onMouseLeave={scheduleClose}
      onFocus={keepOpen}
      onBlur={handleBlur}
      onTouchStart={() => {
        setMounted(true);
        setIsOpen((prev) => !prev);
      }}
    >
      {/* Preview popover — ultra-premium glassmorphic dossier card */}
      <div
        className={`resume-popover absolute bottom-[calc(100%+0.65rem)] left-0 z-50 w-[290px] sm:w-[320px] origin-bottom-left rounded-2xl border border-white/[0.14] bg-[#0b0e15]/95 p-1.5 shadow-[0_1px_0_inset_rgba(255,255,255,0.2),0_24px_64px_-12px_rgba(0,0,0,0.95),0_0_0_1px_rgba(0,0,0,0.7),0_12px_36px_-8px_color-mix(in_srgb,var(--color-accent)_26%,transparent)] backdrop-blur-2xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-2 scale-95 opacity-0"
        }`}
        onMouseEnter={keepOpen}
        onMouseMove={keepOpen}
        onMouseLeave={scheduleClose}
        role="dialog"
        aria-label="Résumé Preview Card"
      >
        {/* Invisible hit-area bridge spanning between button and popover */}
        <div
          className="pointer-events-auto absolute -bottom-5 -left-4 -right-4 h-7"
          aria-hidden="true"
        />

        {/* Inner bezel wrapper */}
        <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#080a0f]">
          {/* Header strip: Title + Precision Download Pill */}
          <div className="flex items-center justify-between gap-2 border-b border-white/[0.08] bg-gradient-to-r from-white/[0.05] via-white/[0.02] to-transparent px-3 py-2">
            <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-heading)]">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_6px_var(--color-accent)]"
              />
              Résumé
            </div>

            {/* Precision Download Pill */}
            <a
              href={href}
              download="Sudhanshu-Kumar-Resume.pdf"
              className="focus-accent group/dl inline-flex items-center gap-1.5 rounded-full border border-white/[0.14] bg-white/[0.07] px-2.5 py-1 font-mono text-[10.5px] font-semibold text-zinc-200 shadow-sm transition-all duration-200 hover:border-[var(--color-accent)] hover:bg-[color-mix(in_srgb,var(--color-accent)_24%,transparent)] hover:text-white hover:shadow-[0_0_12px_color-mix(in_srgb,var(--color-accent)_40%,transparent)] active:scale-[0.97]"
              title="Download Sudhanshu-Kumar-Resume.pdf"
            >
              <svg
                width="11"
                height="11"
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

          {/* Document Tray: Inset matte with realistic floating paper */}
          <div className="bg-[#05070a] p-2.5">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/grid relative block aspect-[1/1.3] w-full cursor-pointer overflow-hidden rounded-lg bg-white ring-1 ring-black/30 shadow-[0_14px_30px_-8px_rgba(0,0,0,0.92)] transition-transform duration-300 ease-out hover:scale-[1.018]"
              title="Click to open resume in full screen in new tab"
            >
              {mounted && (
                <iframe
                  src={`${href}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                  title="Sudhanshu Kumar Resume Preview"
                  className="pointer-events-none absolute inset-0 h-full w-full border-0 bg-white"
                />
              )}

              {/* Subtle top glare reflection across the paper */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-11 bg-gradient-to-b from-white/35 to-transparent opacity-60"
              />

              {/* Bottom vignette gradient for read-depth */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
              />

              {/* Hover prompt overlay — luxury frosted glass badge */}
              <div className="absolute inset-0 flex items-end justify-center p-3 opacity-0 transition-opacity duration-200 group-hover/grid:opacity-100">
                <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/85 px-3 py-1.5 font-mono text-[11px] font-semibold text-white shadow-[0_8px_20px_rgba(0,0,0,0.85)] backdrop-blur-md">
                  <span>Open full screen</span>
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
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
        </div>
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
