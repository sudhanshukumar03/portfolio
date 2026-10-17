"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
}

// Ambient Living Canvas — an atmospheric substrate that combines a breathing
// copper radial aura with delicate interactive constellation particles.
// Smoothly tracks pointer position, gently drifts when idle, and connects nearby
// nodes to the cursor with ultra-fine hairlines.
export function AmbientAura() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    let mouseX = -9999;
    let mouseY = -9999;
    let targetAuraX = 0;
    let targetAuraY = 0;
    let currentAuraX = 0;
    let currentAuraY = 0;
    let hasUserMoved = false;
    let rafId = 0;

    const particles: Particle[] = [];
    const PARTICLE_COUNT = 38;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      if (!hasUserMoved) {
        targetAuraX = width * 0.55;
        targetAuraY = height * 0.35;
        currentAuraX = targetAuraX;
        currentAuraY = targetAuraY;
      }
    };

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const baseAlpha = 0.12 + Math.random() * 0.28;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.22,
          vy: -0.15 - Math.random() * 0.2, // Gentle upward drift
          size: 1 + Math.random() * 1.5,
          alpha: baseAlpha,
          baseAlpha,
        });
      }
    };

    resize();
    initParticles();

    const onPointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      targetAuraX = e.clientX;
      targetAuraY = e.clientY;
      hasUserMoved = true;
    };

    const onPointerLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
      hasUserMoved = false;
    };

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave, { passive: true });

    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      // Idle breathing drift when user is not moving mouse
      let effTargetX = targetAuraX;
      let effTargetY = targetAuraY;
      if (!hasUserMoved) {
        effTargetX += Math.sin(now * 0.0006) * 70;
        effTargetY += Math.cos(now * 0.0005) * 50;
      }

      // Fluid inertia tracking
      currentAuraX += (effTargetX - currentAuraX) * 0.065;
      currentAuraY += (effTargetY - currentAuraY) * 0.065;

      // 1. Draw Living Ambient Radial Luminescence
      const auraRadius = Math.max(width * 0.45, 520);
      const gradient = ctx.createRadialGradient(
        currentAuraX,
        currentAuraY,
        0,
        currentAuraX,
        currentAuraY,
        auraRadius
      );
      gradient.addColorStop(0, "rgba(234, 46, 32, 0.12)"); // Radiant scarlet core
      gradient.addColorStop(0.35, "rgba(234, 46, 32, 0.05)");
      gradient.addColorStop(0.7, "rgba(234, 46, 32, 0.015)");
      gradient.addColorStop(1, "rgba(234, 46, 32, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-100 transition-opacity duration-1000 motion-reduce:hidden"
    />
  );
}
