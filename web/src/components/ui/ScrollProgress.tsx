"use client";

import { useEffect, useRef } from "react";

// Copper scroll-progress rail — a fixed trace on the left edge of the viewport
// that charges top→bottom as the page scrolls, a glowing via riding its head.
// The page-wide expression of the PCB world "powering on" as you descend.
// Reduced motion renders it fully drawn and static (handled in globals.css).
export function ScrollProgress() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
        el.style.setProperty("--progress", String(p));
        el.style.setProperty("--progress-visible", p > 0.01 ? "1" : "0");
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={root} aria-hidden="true" className="scroll-progress">
      <span className="scroll-progress-fill" />
      <span className="scroll-progress-head" />
    </div>
  );
}
