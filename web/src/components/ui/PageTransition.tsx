"use client";

import { useEffect, useState } from "react";

// SECTIONS registry for the page transition system
const SECTIONS = [
  { id: "hero", label: "Intro", num: "00" },
  { id: "work", label: "Work", num: "01" },
  { id: "skills", label: "Skills", num: "02" },
  { id: "about", label: "About", num: "03" },
  { id: "contact", label: "Contact", num: "04" },
] as const;

export function PageTransition() {
  const [transitioning, setTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    // Listen for custom section transition events triggered by nav or links
    const handleTransitionStart = (e: Event) => {
      const customEvent = e as CustomEvent<{ targetId: string }>;
      const targetId = customEvent.detail?.targetId;

      setTransitioning(true);
      setProgress(15);

      const t1 = setTimeout(() => setProgress(65), 80);
      const t2 = setTimeout(() => setProgress(100), 220);
      const t3 = setTimeout(() => {
        setTransitioning(false);
        setProgress(0);

        if (targetId) {
          setActiveSection(targetId);
          // Highlight destination section with arrival bloom
          const el = document.getElementById(targetId);
          if (el) {
            el.classList.remove("section-arrived");
            void el.offsetWidth; // trigger reflow
            el.classList.add("section-arrived");
          }
        }
      }, 420);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    };

    window.addEventListener("section-transition-start", handleTransitionStart);

    // Track scroll position to update active page indicator
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    // Also trigger transition when browser hash changes directly
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        window.dispatchEvent(
          new CustomEvent("section-transition-start", { detail: { targetId: hash } })
        );
      }
    };
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("section-transition-start", handleTransitionStart);
      window.removeEventListener("hashchange", handleHashChange);
      observer.disconnect();
    };
  }, []);

  const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
  const current = SECTIONS[currentIndex] ?? SECTIONS[0];

  const navigateTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    window.dispatchEvent(
      new CustomEvent("section-transition-start", { detail: { targetId: id } })
    );

    const navOffset = 72;
    const targetTop = el.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top: targetTop, behavior: "smooth" });

    if (window.history.pushState) {
      window.history.pushState(null, "", `#${id}`);
    }
  };

  const prevSection = currentIndex > 0 ? SECTIONS[currentIndex - 1] : null;
  const nextSection = currentIndex < SECTIONS.length - 1 ? SECTIONS[currentIndex + 1] : null;

  return (
    <>
      {/* 1. Top Laser Beam Route Progress Indicator */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[2.5px] transition-all duration-300 ease-out"
        style={{
          opacity: transitioning ? 1 : 0,
        }}
      >
        <div
          className="h-full bg-[var(--color-accent)] shadow-[0_0_12px_var(--color-accent),0_0_24px_var(--color-accent)] transition-all duration-300 ease-out"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      {/* 2. Cinematic Atmosphere Flash / Page Curtain */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 transition-opacity duration-300 ease-out"
        style={{
          opacity: transitioning ? 0.35 : 0,
          background: "radial-gradient(ellipse at 50% 45%, color-mix(in srgb, var(--color-accent) 8%, transparent) 0%, rgba(0, 0, 0, 0.45) 100%)",
          backdropFilter: transitioning ? "blur(2px)" : "none",
        }}
      />

      {/* 3. Floating Chapter / Page HUD (Bottom-right) */}
      <div
        className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/85 px-3.5 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 hover:border-[color-mix(in_srgb,var(--color-accent)_40%,var(--color-border))]"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_6px_var(--color-accent)]" />
        </span>

        <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-wider text-[var(--color-text)]">
          <span className="text-[var(--color-accent)]">{current.num}</span>
          <span className="text-[var(--color-muted)]">/</span>
          <span className="uppercase text-[var(--color-text)]">{current.label}</span>
        </div>

        {/* Up / Down Section Flip Controls */}
        <div className="ml-2 flex items-center gap-1 border-l border-[var(--color-border)] pl-2">
          <button
            type="button"
            disabled={!prevSection}
            onClick={() => prevSection && navigateTo(prevSection.id)}
            title={prevSection ? `Jump to previous: ${prevSection.label}` : "At start"}
            aria-label="Previous section"
            className="rounded p-1 text-[var(--color-muted)] transition-colors hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text)] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </button>
          <button
            type="button"
            disabled={!nextSection}
            onClick={() => nextSection && navigateTo(nextSection.id)}
            title={nextSection ? `Jump to next: ${nextSection.label}` : "At end"}
            aria-label="Next section"
            className="rounded p-1 text-[var(--color-muted)] transition-colors hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text)] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
