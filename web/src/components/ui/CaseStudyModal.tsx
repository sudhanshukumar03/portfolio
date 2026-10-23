"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { type CaseStudy } from "@/content/caseStudies";

export function CaseStudyModal({
  study,
  onClose,
}: {
  study: CaseStudy | null;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!study) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [study, onClose]);

  if (!study) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-8"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-[#07080a]/85 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Card */}
      <div
        ref={modalRef}
        className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] border-t-[rgba(255,255,255,0.18)] bg-[#0d1017] shadow-[0_32px_80px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06)]"
      >
        {/* Modal Header */}
        <div className="flex shrink-0 items-start justify-between border-b border-[var(--color-border)] bg-[#10141e]/90 px-6 py-5 sm:px-8">
          <div className="min-w-0 pr-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center rounded-full border border-[color-mix(in_srgb,var(--color-accent)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)] px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-accent)]">
                {study.statusBadge}
              </span>
              <span className="font-mono text-xs text-[var(--color-muted)]">
                {study.role}
              </span>
            </div>
            <h2
              id="case-study-title"
              className="mt-2.5 font-display text-2xl font-bold tracking-tight text-[var(--color-heading)] sm:text-3xl"
            >
              {study.title}
              <span className="ml-2 font-sans text-sm font-normal text-[var(--color-muted)] sm:text-base">
                — {study.subtitle}
              </span>
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="focus-accent group flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-text)]"
          >
            <svg viewBox="0 0 24 24" width={18} height={18} stroke="currentColor" strokeWidth={2} fill="none">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-8 text-[15px] leading-relaxed text-[var(--color-body)] sm:px-8 sm:py-10">
          <div className="space-y-10">
            {/* Tech Stack Pills */}
            <div>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                System Stack
              </span>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {study.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 font-mono text-xs text-[var(--color-heading)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* System Interface / Architectural Showcase */}
            {study.image && (
              <div
                className={`relative ${
                  study.id === "ledgermind" ? "aspect-[16/10] bg-[#f5f4ef]" : "aspect-[16/9] bg-[#121620]"
                } w-full overflow-hidden rounded-xl border border-[var(--color-border)] shadow-[0_20px_45px_-15px_rgba(0,0,0,0.8)]`}
              >
                <Image
                  src={study.image}
                  alt={`${study.title} preview`}
                  fill
                  unoptimized
                  className="object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/[0.08]" />
              </div>
            )}

            {/* The Incident / Problem */}
            <div className="rounded-xl border border-[color-mix(in_srgb,var(--color-accent)_20%,transparent)] bg-[color-mix(in_srgb,var(--color-accent)_4%,transparent)] p-5 sm:p-6">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                The Real-World Context &amp; Incident
              </span>
              <h3 className="mt-2 text-lg font-bold text-[var(--color-heading)]">
                {study.incident.headline}
              </h3>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-relaxed text-[var(--color-body)]">
                {study.incident.narrative.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              {study.incident.takeaway && (
                <div className="mt-4 border-l-2 border-[var(--color-accent)] pl-4 text-sm font-medium italic text-[var(--color-heading)]">
                  &ldquo;{study.incident.takeaway}&rdquo;
                </div>
              )}
            </div>

            {/* Invariants */}
            <div>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                Engineering Guarantees
              </span>
              <h3 className="mt-1 text-xl font-bold tracking-tight text-[var(--color-heading)]">
                {study.invariants.headline}
              </h3>
              <blockquote className="mt-3 border-l-2 border-[var(--color-border)] pl-4 text-sm italic text-[var(--color-secondary)]">
                &ldquo;{study.invariants.quote}&rdquo;
              </blockquote>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {study.invariants.items.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
                  >
                    <h4 className="font-mono text-xs font-bold text-[var(--color-heading)]">
                      {item.label}
                    </h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-secondary)]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Subsystems */}
            <div>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                Subsystems &amp; Implementation
              </span>
              <h3 className="mt-1 text-xl font-bold tracking-tight text-[var(--color-heading)]">
                What Was Engineered
              </h3>
              <div className="mt-4 space-y-4">
                {study.subsystems.map((sub) => (
                  <div
                    key={sub.title}
                    className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
                  >
                    <h4 className="font-semibold text-[var(--color-heading)]">
                      {sub.title}
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {sub.bullets.map((bullet, bi) => (
                        <li key={bi} className="flex items-start gap-2.5 text-sm text-[var(--color-body)]">
                          <span className="font-mono text-[var(--color-accent)] font-bold select-none">
                            -
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Trade-Offs & Decisions */}
            <div>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                Architectural Trade-Offs
              </span>
              <h3 className="mt-1 text-xl font-bold tracking-tight text-[var(--color-heading)]">
                Defending Key Technical Choices
              </h3>
              <div className="mt-4 space-y-3.5">
                {study.decisions.map((dec) => (
                  <div
                    key={dec.title}
                    className="rounded-lg border border-[var(--color-border)] bg-[#121620] p-4.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-[var(--color-heading)]">
                        {dec.title}
                      </span>
                      <span className="font-mono text-[11px] font-medium text-[var(--color-accent)]">
                        {dec.choice}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--color-secondary)]">
                      {dec.rationale}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hard Bugs & Engineering Hurdles */}
            <div>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                Real Edge Cases
              </span>
              <h3 className="mt-1 text-xl font-bold tracking-tight text-[var(--color-heading)]">
                Hard Bugs &amp; Resolutions
              </h3>
              <div className="mt-4 space-y-3">
                {study.challenges.map((c, ci) => (
                  <div
                    key={ci}
                    className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-xs"
                  >
                    <div className="font-semibold text-rose-300">
                      Issue: {c.problem}
                    </div>
                    <div className="mt-2 text-[var(--color-body)] leading-relaxed">
                      <strong className="text-emerald-400">Resolution: </strong>
                      {c.solution}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reflections */}
            <div className="border-t border-[var(--color-border)] pt-6">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                Retrospective
              </span>
              <p className="mt-2 text-sm italic leading-relaxed text-[var(--color-body)]">
                &ldquo;{study.reflections}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-border)] bg-[#10141e]/90 px-6 py-4 sm:px-8">
          <span className="font-mono text-xs text-[var(--color-muted)]">
            Source code and commit history on GitHub
          </span>
          <div className="flex items-center gap-3">
            <a
              href={study.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-accent group inline-flex items-center gap-2 rounded-lg border border-[var(--color-accent)] bg-[color-mix(in_srgb,var(--color-accent)_15%,transparent)] px-4 py-2 text-xs font-semibold text-[var(--color-text)] transition-all hover:bg-[color-mix(in_srgb,var(--color-accent)_25%,transparent)]"
            >
              <span>Explore Repository</span>
              <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
              </svg>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="focus-accent rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-xs font-medium text-[var(--color-secondary)] hover:text-[var(--color-text)]"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
