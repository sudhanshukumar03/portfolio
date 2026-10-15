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
