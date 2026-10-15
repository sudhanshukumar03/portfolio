"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import portrait from "../../../public/images/portrait.webp";

// Portrait layer — the figure is a background-removed cutout on transparency,
// lifted off the substrate by a soft dark backing field (not a ringed "component
// pad" — the concentric rings / cardinal vias read as generic tech-halo, so they
// are gone). Because the dark core shows through the cutout's transparency around
// the figure, it separates the copper-duotone person from the substrate in BOTH
// themes. That is decisive in light mode, where the locked #duotone filter's
// highlights sit close to the cream base and the figure would otherwise wash out.
//
// The backing core is #0e1512 (the exposed-board substrate) warmed ~12% toward
// --color-accent so it harmonizes with the theme instead of reading as a cold
// grey-green smudge on the cream light base, and fades edgelessly to transparent
// (no hard ring). The figure reveals in on load and drifts with a subtle scroll
// parallax so it reads as emerging from the board. Respects reduced motion.
export function HeroPortrait({ alt }: { alt: string }) {
  const layer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = layer.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const shift = Math.min(window.scrollY * 0.08, 40);
        el.style.transform = `translate3d(0, ${shift}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="rise absolute inset-0" style={{ ["--rise-delay" as string]: "120ms" }}>
      {/* Dark backing — a soft, edgeless field behind the figure. NOT a ringed
          "component pad" anymore (the orbital rings/tech-halo read as generic);
          just a quiet dark core so the copper-duotone figure separates from the
          substrate in BOTH themes — decisive in light mode, where the #duotone
          highlights sit close to the cream base and the figure would wash out. */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[45%] aspect-square w-[104%] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 44%, var(--hero-backing-core) 0%, var(--hero-backing-mid) 46%, transparent 74%)",
          }}
        />
      </div>

      {/* Soft copper glow — a warm rim light anchored behind the head. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(42% 44% at 58% 33%, color-mix(in srgb, #c9a878 20%, transparent), transparent 72%)",
        }}
      />

      {/* Figure layer — object-contain, bottom-anchored, so the FULL head is
          always in frame (object-cover was cropping the crown). The cutout's
          transparent margins let the pad + substrate show around the figure,
          so it reads as a person mounted ON the component pad. A small top
          inset keeps the crown clear of the container edge; the parallax drift
          (capped 40px) only slides the figure within the bottom-anchored box —
          it can never clip the head, and the transparent margins mean no hard
          edge is ever revealed. */}
      <div ref={layer} className="absolute inset-x-0 bottom-0 top-[3%] will-change-transform">
        <Image
          src={portrait}
          alt={alt}
          fill
          priority
          sizes="(max-width: 900px) 100vw, 44vw"
          className="object-contain object-bottom [filter:url(#duotone)]"
        />
      </div>

      {/* Fades — light-touch. A soft left blend melts the figure's edge into the
          text column; a gentle bottom ground dissolves the torso crop into the
          substrate. Deliberately no heavy right/top veil over the figure — that
          was the main cause of the light-mode wash-out. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, var(--color-base) 0%, color-mix(in srgb, var(--color-base) 32%, transparent) 20%, transparent 50%), linear-gradient(to top, var(--color-base) 0%, var(--color-base) 8%, transparent 34%)",
        }}
      />
    </div>
  );
}
