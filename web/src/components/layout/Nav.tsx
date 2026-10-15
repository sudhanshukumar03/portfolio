"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { profile } from "@/content/site";
import portrait from "../../../public/images/avatar.webp";

// Four primary items (Services folds into Work/About; Blog is a footer link).
// Four short labels — a clean, balanced row at every width with generous tap targets.
const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

function LivePresence() {
  const [time, setTime] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);
      setTime(formatted);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative hidden md:block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex cursor-pointer items-center gap-2.5 rounded-full border border-[color-mix(in_srgb,var(--color-accent)_45%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_88%,transparent)] px-3.5 py-1.5 text-[11px] font-mono text-[var(--color-muted)] shadow-[0_2px_14px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-all duration-300 hover:border-[var(--color-accent)] hover:bg-[color-mix(in_srgb,var(--color-surface)_98%,transparent)] hover:shadow-[0_0_20px_color-mix(in_srgb,var(--color-accent)_30%,transparent)]"
      >
        {/* Living emerald beacon with dual expanding sonar wave */}
        <span className="relative flex h-2 w-2 items-center justify-center">
          <span className="absolute inline-flex h-4 w-4 animate-ping rounded-full bg-emerald-400 opacity-60 duration-1000" />
          <span className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 opacity-40 blur-[2px]" />
          <span className="radar-glow relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
        </span>
        <span className="font-semibold tracking-wider text-[var(--color-heading)]">BLR, IN</span>
        <span className="text-[var(--color-border)]">·</span>
        <span className="font-semibold tabular-nums tracking-wide text-[var(--color-heading)]">{time || "IST"}</span>
      </button>

      {/* Floating status detail popover on hover/click */}
      <div
        className={`absolute left-1/2 top-full z-50 mt-2.5 w-64 -translate-x-1/2 rounded-xl border border-[color-mix(in_srgb,var(--color-accent)_45%,transparent)] bg-[#0d0e12]/95 p-3.5 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl transition-all duration-200 ease-out ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-95 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between text-[11px] font-mono">
          <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            LIVE TELEMETRY
          </span>
          <span className="font-medium text-[var(--color-accent)]">UTC+5:30</span>
        </div>
        <div className="mt-2 text-xs font-semibold text-[var(--color-heading)]">
          Sudhanshu Kumar &mdash; Bengaluru
        </div>
        <p className="mt-1 text-[11px] leading-relaxed text-[var(--color-body)]">
          Actively building systems &amp; available for Full-Stack, Backend, and AI engineering roles.
        </p>
      </div>
    </div>
  );
}

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    // Turn solid almost immediately, so hero content scrolling underneath the
    // fixed bar is masked by the nav background instead of colliding with it.
    const onScroll = () => {
      setSolid(window.scrollY > 12);
      if (window.scrollY < 200) setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        solid ? "border-b border-[var(--color-border)]" : "border-b border-transparent"
      }`}
      style={{
        backgroundColor: solid
          ? "color-mix(in srgb, var(--color-surface) 97%, transparent)"
          : "transparent",
        backdropFilter: solid ? "blur(10px)" : "none",
      }}
    >
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <nav aria-label="Primary" className="flex items-center justify-between gap-3 py-4">
          {/* Brand — circular portrait + wordmark */}
          <a
            href="#hero"
            className="focus-accent group flex shrink-0 items-center gap-2.5 rounded-md font-display text-sm font-semibold tracking-tight text-[var(--color-text)]"
          >
            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[var(--color-surface-2)] ring-1 ring-[var(--color-border)]">
              <Image
                src={portrait}
                alt={`Portrait of ${profile.name}`}
                fill
                loading="eager"
                unoptimized
                sizes="72px"
                className="object-cover object-center"
              />
            </span>
            <span className="hidden min-[420px]:inline">{profile.name}</span>
          </a>

          {/* Center presence indicator */}
          <LivePresence />

          {/* Links — a simple row at every width. Label text stays --text-primary
              always; the active section is signalled by a non-text accent dot.
              Vertical padding (offset by -my) lifts each tap target to ~44px
              without growing the bar. */}
          <ul className="flex items-center gap-4 sm:gap-8">
            {SECTIONS.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? "true" : undefined}
                    className="focus-accent group -my-3.5 -mx-1.5 inline-flex min-h-[44px] items-center rounded px-1.5 py-3.5 text-sm text-[var(--color-text)] underline-offset-4 transition-opacity hover:underline"
                  >
                    <span
                      aria-hidden="true"
                      className={`rounded-full bg-[var(--color-accent)] transition-all duration-200 ${
                        isActive ? "mr-1.5 h-1.5 w-1.5 opacity-100" : "mr-0 h-1.5 w-0 opacity-0"
                      }`}
                    />
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
