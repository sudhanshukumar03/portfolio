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
    // Subtle 3D tilt toward the pointer — skipped for reduced-motion users.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rx = (0.5 - py / r.height) * 6;
    const ry = (px / r.width - 0.5) * 7;
    el.style.transform = `perspective(820px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    // Magnetic icon tile — leans toward the cursor (small offset, smoothed by the
    // tile's own transition).
    el.style.setProperty("--tx", `${(px / r.width - 0.5) * 10}px`);
    el.style.setProperty("--ty", `${(py / r.height - 0.5) * 10}px`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    el.style.setProperty("--tx", "0px");
    el.style.setProperty("--ty", "0px");
  };

  return (
    <div
      ref={ref}
      data-lit={lit ? "true" : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative h-full overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-border)_80%,transparent)] bg-[var(--color-surface)] p-5 shadow-[0_1px_0_inset_color-mix(in_srgb,var(--color-text)_5%,transparent),0_18px_44px_-34px_rgba(0,0,0,0.5)] transition-[transform,border-color,box-shadow,opacity,scale] duration-300 [transform-style:preserve-3d] hover:border-[color-mix(in_srgb,var(--color-accent)_45%,transparent)] hover:shadow-[0_1px_0_inset_color-mix(in_srgb,var(--color-text)_8%,transparent),0_30px_60px_-32px_rgba(0,0,0,0.6)] hover:[will-change:transform] motion-reduce:transition-none"
    >
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

      <div className="relative flex items-center gap-3 [transform:translateZ(28px)]">
        <span
          className="skill-tile grid h-10 w-10 flex-none place-items-center rounded-xl border border-[color-mix(in_srgb,var(--tile)_28%,transparent)] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--tile)_15%,transparent),color-mix(in_srgb,var(--tile)_5%,transparent))] text-[var(--tile)] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-text)_10%,transparent),0_6px_16px_-10px_color-mix(in_srgb,var(--tile)_60%,transparent)] [translate:var(--tx,0px)_var(--ty,0px)] transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3 motion-reduce:transition-none motion-reduce:group-hover:transform-none"
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
      <ul className="relative mt-4 grid grid-cols-2 gap-x-3 gap-y-1 [transform:translateZ(16px)]">
        {items.map((item, ci) => {
          const brand = brandIcons[item];
          return (
            <li
              key={item}
              style={{ ["--ci" as string]: String(ci), ["--tile" as string]: tint ?? "var(--color-accent)" }}
              className="skill-chip flex min-w-0 items-center gap-2 rounded-md px-2 py-1.5 font-mono text-[12.5px] leading-tight text-[var(--color-body)] transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--tile)_13%,transparent)] hover:text-[var(--color-text)]"
            >
              {brand ? (
                <svg
                  viewBox="0 0 24 24"
                  width={14}
                  height={14}
                  aria-hidden="true"
                  className="flex-none"
                  style={{ color: brand.mono ? "var(--color-text)" : brand.color }}
                >
                  <path d={brand.path} fill="currentColor" />
                </svg>
              ) : (
                <span
                  aria-hidden="true"
                  className="h-1 w-1 flex-none rounded-full bg-[var(--tile)]"
                />
              )}
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
