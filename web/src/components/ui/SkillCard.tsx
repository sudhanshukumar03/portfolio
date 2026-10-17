"use client";

import { useEffect, useRef, useState } from "react";
import { brandIcons } from "@/content/brandIcons";

// A category card that feels alive: a copper spotlight tracks the pointer across
// the surface, the whole card lifts on hover, its crown brightens, and the icon
// tile leans in. Motion is disabled for reduced-motion users.
export function SkillCard({
  label,
  items,
  icon,
  tint,
}: {
  label: string;
  items: string[];
  icon: React.ReactNode;
  tint?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(false);

  // Power-on: the first time the card scrolls into view it energizes once (the
  // CSS keyframes hang off data-lit). Disconnects after firing so it stays a
  // one-shot arrival, not a loop that re-triggers on every scroll pass.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLit(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    el.style.setProperty("--mx", `${px}px`);
    el.style.setProperty("--my", `${py}px`);
  };

  return (
    <div
      ref={ref}
      data-lit={lit ? "true" : undefined}
      onMouseMove={onMove}
      className="group relative h-full overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-border)_95%,transparent)] bg-[linear-gradient(180deg,rgba(26,30,42,0.78)_0%,rgba(16,19,27,0.88)_100%)] p-5 shadow-[0_1px_0_inset_rgba(255,255,255,0.09),0_20px_45px_-20px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--tile,var(--color-accent))_50%,transparent)] hover:shadow-[0_1px_0_inset_rgba(255,255,255,0.15),0_24px_50px_-20px_color-mix(in_srgb,var(--tile,var(--color-accent))_20%,rgba(0,0,0,0.8))] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {/* Category ambient glow — subtle chromatic illumination so cards never feel like empty black */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -left-12 h-40 w-40 rounded-full blur-3xl opacity-20 transition-opacity duration-300 group-hover:opacity-40"
        style={{
          background: tint ?? "var(--color-accent)",
        }}
      />

      {/* Copper spotlight — follows the pointer, fades in on hover. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx,50%) var(--my,-20%), color-mix(in srgb, var(--color-accent) 16%, transparent), transparent 62%)",
        }}
      />
      {/* Copper hairline crown, brightening on hover. */}
      <span
        aria-hidden="true"
        className="skill-crown pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--color-accent)_45%,transparent),transparent)] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Specular sheen — a soft gloss that sweeps diagonally across the card on
          hover, like light catching coated stock. One-pass, premium, quiet. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(115deg,transparent_42%,color-mix(in_srgb,var(--color-text)_7%,transparent)_50%,transparent_58%)] transition-transform duration-700 ease-out group-hover:translate-x-full motion-reduce:hidden"
      />

      <div className="relative flex items-center gap-3">
        <span
          className="skill-tile grid h-10 w-10 flex-none place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-[var(--color-heading)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 group-hover:border-[var(--tile)] group-hover:bg-[color-mix(in_srgb,var(--tile)_14%,transparent)] group-hover:text-[var(--tile)] group-hover:shadow-[0_0_16px_color-mix(in_srgb,var(--tile)_30%,transparent)]"
          style={{ ["--tile" as string]: tint ?? "var(--color-accent)" }}
        >
          <svg viewBox="0 0 24 24" width={19} height={19} aria-hidden="true">
            {icon}
          </svg>
        </span>
        <h3 className="skill-title font-display text-[15px] font-semibold tracking-tight text-[var(--color-heading)]">
          {label}
        </h3>
      </div>
      <ul className="relative mt-4 grid grid-cols-2 gap-2">
        {items.map((item, ci) => {
          const brand = brandIcons[item];
          return (
            <li
              key={item}
              style={{ ["--ci" as string]: String(ci), ["--tile" as string]: tint ?? "var(--color-accent)" }}
              className="skill-chip group/chip flex min-w-0 items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-2 font-mono text-[12.5px] font-medium leading-tight text-[var(--color-body)] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--tile)_45%,transparent)] hover:bg-[color-mix(in_srgb,var(--tile)_14%,transparent)] hover:text-[var(--color-text)] hover:shadow-[0_4px_12px_-4px_color-mix(in_srgb,var(--tile)_30%,transparent)]"
            >
              {brand ? (
                <svg
                  viewBox="0 0 24 24"
                  width={14}
                  height={14}
                  aria-hidden="true"
                  className="flex-none opacity-65 grayscale transition-all duration-200 group-hover/chip:opacity-100 group-hover/chip:grayscale-0"
                  style={{ color: brand.mono ? "var(--color-text)" : brand.color }}
                >
                  <path d={brand.path} fill="currentColor" />
                </svg>
              ) : (
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 flex-none rounded-full bg-white/25 transition-all duration-200 group-hover/chip:bg-[var(--tile)] group-hover/chip:shadow-[0_0_6px_var(--tile)]"
                />
              )}
              <span className="truncate">{item}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
