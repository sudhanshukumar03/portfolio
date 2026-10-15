"use client";

import { useEffect, useRef } from "react";

// Ambient Mouse Light Aura — a soft, atmospheric copper luminescence that glides
// across the deep obsidian substrate behind content. Lerped smoothly with
// requestAnimationFrame so movement feels silky and physical, never jittery.
export function AmbientAura() {
  const auraRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = auraRef.current;
    if (!el) return;

    // Check for reduced motion or touch-only devices
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia?.("(pointer: coarse)").matches) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight * 0.3;
    let currentX = targetX;
    let currentY = targetY;
    let rafId = 0;
    let isMoving = false;

    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isMoving) {
        isMoving = true;
        el.style.opacity = "1";
      }
    };

    const update = () => {
      // Smooth linear interpolation (lerp factor 0.08 for fluid inertia)
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      el.style.setProperty("--aura-x", `${currentX.toFixed(1)}px`);
      el.style.setProperty("--aura-y", `${currentY.toFixed(1)}px`);

      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={auraRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-0 transition-opacity duration-700 motion-reduce:hidden"
      style={{
        background:
          "radial-gradient(750px circle at var(--aura-x, 50vw) var(--aura-y, 30vh), color-mix(in srgb, var(--color-accent) 7.5%, transparent), transparent 68%)",
      }}
    />
  );
}
