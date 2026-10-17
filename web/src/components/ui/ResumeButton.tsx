"use client";

import { useState } from "react";

// Resume CTA with a hover-preview. Hovering (or focusing) the button pops a
// framed preview of the résumé up and out from the button — the document shows
// itself off — then clicking opens the full PDF. The preview is lazily mounted
// on first reveal. Touch/keyboard: focusing reveals it; clicking opens the PDF.
export function ResumeButton({ href }: { href: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const show = () => {
    setOpen(true);
    setMounted(true);
  };
  const hide = () => setOpen(false);

  return (
    <div
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) hide();
      }}
    >
      {/* Preview — pops up and out from the button on hover/focus. */}
      <div
        aria-hidden={!open}
        className={`absolute bottom-[calc(100%+0.8rem)] left-0 z-30 w-[244px] origin-bottom-left overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_1px_0_inset_color-mix(in_srgb,var(--color-text)_6%,transparent),0_28px_60px_-22px_rgba(0,0,0,0.6)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-3 scale-95 opacity-0"
        }`}
      >
        {/* Header strip */}
        <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-accent)_6%,transparent)] px-3 py-2">
          <span className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-secondary)]">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_6px_color-mix(in_srgb,var(--color-accent)_60%,transparent)]"
            />
            Résumé
          </span>
          <span className="font-mono text-[11px] font-medium text-[var(--color-muted)]">PDF</span>
        </div>

        {/* Document peek — the real PDF first page; a clean label fallback until
            the file is in place. */}
        <div className="relative aspect-[1/1.26] w-full bg-[var(--color-surface-2)]">
          {mounted && (
            <object
              data={`${href}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
              type="application/pdf"
              className="absolute inset-0 h-full w-full"
            >
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-5 text-center">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ color: "var(--color-accent)" }}>
                  <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M14 3v5h5M8.5 13h7M8.5 16.5h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm font-semibold text-[var(--color-heading)]">Résumé preview</span>
                <span className="text-xs leading-snug text-[var(--color-muted)]">Click “Resume” to open the full PDF</span>
              </div>
            </object>
          )}
        </div>
      </div>

      {/* The button — opens the full résumé on click. */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "var(--color-heading)" }}
        className="focus-accent group relative overflow-hidden inline-flex min-w-[10.5rem] items-center justify-center gap-2 rounded-lg border border-[var(--color-accent)] px-5 py-2.5 text-base font-semibold shadow-[0_4px_16px_-8px_color-mix(in_srgb,var(--color-accent)_40%,transparent)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)] hover:shadow-[0_10px_25px_-8px_color-mix(in_srgb,var(--color-accent)_60%,transparent)] active:scale-[0.97]"
      >
        {/* Sheen sweep — a soft gloss crosses the button on hover. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(115deg,transparent_42%,color-mix(in_srgb,#ffffff_25%,transparent)_50%,transparent_58%)] transition-transform duration-700 ease-out group-hover:translate-x-full motion-reduce:hidden"
        />
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
