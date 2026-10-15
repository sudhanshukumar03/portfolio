"use client";

import { useEffect, useRef, useState } from "react";

type CelestialPhase = "dawn" | "day" | "golden" | "dusk" | "night";

interface TimeState {
  timeStr: string;
  timeWithSec: string;
  hourAngle: number;
  minuteAngle: number;
  secondAngle: number;
  isWorkingHours: boolean;
  phase: CelestialPhase;
  phaseLabel: string;
  sunProgress: number; // 0 to 1 across 24h
  visitorTimeStr: string;
  visitorCity: string;
  timeDiffText: string;
}

export function PresenceClock() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [timeState, setTimeState] = useState<TimeState>({
    timeStr: "5:30 PM",
    timeWithSec: "5:30:00 PM",
    hourAngle: 165,
    minuteAngle: 180,
    secondAngle: 0,
    isWorkingHours: true,
    phase: "golden",
    phaseLabel: "Golden Hour",
    sunProgress: 0.72,
    visitorTimeStr: "",
    visitorCity: "Your Location",
    timeDiffText: "UTC+5:30",
  });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const secondAngleRef = useRef(0);

  useEffect(() => {
    setMounted(true);

    // Detect visitor timezone
    let visitorCityName = "Your City";
    let diffText = "Local Time";
    try {
      const visitorTz = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
      if (visitorTz.includes("/")) {
        const parts = visitorTz.split("/");
        visitorCityName = parts[parts.length - 1].replace(/_/g, " ");
      } else {
        visitorCityName = visitorTz;
      }

      // Calculate difference from Kolkata (UTC+5:30 = +330 min)
      const now = new Date();
      const visitorOffsetMin = -now.getTimezoneOffset();
      const kolkataOffsetMin = 330;
      const diffHours = (kolkataOffsetMin - visitorOffsetMin) / 60;

      if (Math.abs(diffHours) < 0.25) {
        diffText = "Same timezone as you";
      } else if (diffHours > 0) {
        diffText = `+${diffHours % 1 === 0 ? diffHours : diffHours.toFixed(1)}h ahead of you`;
      } else {
        const absDiff = Math.abs(diffHours);
        diffText = `-${absDiff % 1 === 0 ? absDiff : absDiff.toFixed(1)}h behind you`;
      }
    } catch {
      // Graceful fallback
    }

    const updateCalculations = () => {
      const now = new Date();

      // Time in Asia/Kolkata
      const kolkataFmt = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      });

      const parts = kolkataFmt.formatToParts(now);
      const hour = parseInt(parts.find((p) => p.type === "hour")?.value || "0", 10);
      const min = parseInt(parts.find((p) => p.type === "minute")?.value || "0", 10);
      const sec = parseInt(parts.find((p) => p.type === "second")?.value || "0", 10);

      // Primary display format (e.g. "5:30 PM")
      const primaryStr = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(now);

      // Precision display format (e.g. "5:30:15 PM")
      const secStr = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);

      // Visitor local time string
      const vTimeStr = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(now);

      // Celestial phase & sun progress
      const totalMinutes = hour * 60 + min;
      const sunProgress = totalMinutes / 1440; // 0 to 1 across 24 hours

      let phase: CelestialPhase = "night";
      let phaseLabel = "Night Sky";

      if (hour >= 5 && hour < 7) {
        phase = "dawn";
        phaseLabel = "Dawn / Sunrise";
      } else if (hour >= 7 && hour < 17) {
        phase = "day";
        phaseLabel = "Daylight";
      } else if (hour >= 17 && (hour < 18 || (hour === 18 && min <= 30))) {
        phase = "golden";
        phaseLabel = "Golden Hour";
      } else if ((hour === 18 && min > 30) || hour === 19) {
        phase = "dusk";
        phaseLabel = "Dusk / Twilight";
      } else {
        phase = "night";
        phaseLabel = "Night Sky";
      }

      // Working hours roughly 9 AM to 10 PM IST
      const isWorkingHours = hour >= 9 && hour < 22;

      // Clock angles
      const minuteAngle = (min + sec / 60) * 6;
      const hourAngle = ((hour % 12) + min / 60) * 30;

      setTimeState((prev) => ({
        ...prev,
        timeStr: primaryStr,
        timeWithSec: secStr,
        hourAngle,
        minuteAngle,
        isWorkingHours,
        phase,
        phaseLabel,
        sunProgress,
        visitorTimeStr: vTimeStr,
        visitorCity: visitorCityName,
        timeDiffText: diffText,
      }));
    };

    updateCalculations();
    const interval = setInterval(updateCalculations, 1000);

    // Continuous 60fps sweeping second hand
    let animId = 0;
    const sweep = () => {
      const now = new Date();
      const sec = now.getSeconds();
      const ms = now.getMilliseconds();
      const sAngle = (sec + ms / 1000) * 6;
      secondAngleRef.current = sAngle;
      setTimeState((prev) => (prev.secondAngle === sAngle ? prev : { ...prev, secondAngle: sAngle }));
      animId = requestAnimationFrame(sweep);
    };
    animId = requestAnimationFrame(sweep);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Close on outside click or Escape key
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  // Sun path on arc: X from 10 to 190, Y along curved arch
  const arcProgress = Math.max(0, Math.min(1, (timeState.sunProgress - 0.25) / 0.5)); // 6am to 6pm normalized
  const sunX = 14 + arcProgress * 172;
  const sunY = 52 - Math.sin(arcProgress * Math.PI) * 36;

  return (
    <div
      ref={containerRef}
      className="group/clock relative hidden sm:block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Interactive Timepiece Pill */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label="Sudhanshu's timezone and availability in Bengaluru"
        className="group relative flex cursor-pointer items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--color-border)_85%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_70%,transparent)] py-1 pl-2 pr-3 text-xs shadow-[0_2px_12px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md transition-all duration-300 hover:border-[color-mix(in_srgb,var(--color-accent)_60%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-surface-2)_85%,transparent)] hover:shadow-[0_0_20px_color-mix(in_srgb,var(--color-accent)_18%,transparent)]"
      >
        {/* Automatic Mechanical Chronograph Dial with Sweeping Second Needle */}
        <span className="relative flex h-4 w-4 shrink-0 items-center justify-center text-[var(--color-accent)]">
          <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
            {/* Outer Bezel */}
            <circle
              cx="10"
              cy="10"
              r="8.8"
              fill="rgba(18, 20, 24, 0.7)"
              stroke="currentColor"
              strokeWidth="1.1"
              className="opacity-75 transition-opacity group-hover:opacity-100"
            />
            {/* 12, 3, 6, 9 Cardinal Pips */}
            <circle cx="10" cy="3" r="0.75" fill="currentColor" />
            <circle cx="17" cy="10" r="0.55" fill="currentColor" className="opacity-60" />
            <circle cx="10" cy="17" r="0.55" fill="currentColor" className="opacity-60" />
            <circle cx="3" cy="10" r="0.55" fill="currentColor" className="opacity-60" />

            {/* Hour hand */}
            <line
              x1="10"
              y1="10"
              x2="10"
              y2="6.2"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              transform={`rotate(${timeState.hourAngle} 10 10)`}
            />

            {/* Minute hand */}
            <line
              x1="10"
              y1="10"
              x2="10"
              y2="4"
              stroke="#e4e7ec"
              strokeWidth="1.1"
              strokeLinecap="round"
              transform={`rotate(${timeState.minuteAngle} 10 10)`}
            />

            {/* Sweeping Seconds Hand (Automatic High-beat movement) */}
            <line
              x1="10"
              y1="11.8"
              x2="10"
              y2="3"
              stroke="#f97316"
              strokeWidth="0.8"
              strokeLinecap="round"
              transform={`rotate(${timeState.secondAngle} 10 10)`}
            />

            {/* Center Pinion Jewel */}
            <circle cx="10" cy="10" r="1.1" fill="currentColor" />
            <circle cx="10" cy="10" r="0.45" fill="#f97316" />
          </svg>
        </span>

        {/* Dynamic Celestial Phase Orb */}
        <span
          className="flex h-3.5 w-3.5 items-center justify-center transition-transform duration-300 group-hover:scale-110"
          title={timeState.phaseLabel}
        >
          {timeState.phase === "day" && (
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-amber-400" fill="currentColor">
              <circle cx="8" cy="8" r="3.2" />
              <path
                d="M8 1.5v1.2M8 13.3v1.2M1.5 8h1.2M13.3 8h1.2M3.4 3.4l.9.9M11.7 11.7l.9.9M3.4 12.6l.9-.9M11.7 4.3l.9-.9"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          )}
          {timeState.phase === "golden" && (
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-amber-500" fill="currentColor">
              <circle cx="8" cy="8" r="3" />
              <path d="M2 13h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          )}
          {timeState.phase === "dusk" && (
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-orange-400" fill="currentColor">
              <path d="M12 9.5a4 4 0 1 1-4-4 3 3 0 0 0 4 4z" />
            </svg>
          )}
          {timeState.phase === "night" && (
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-indigo-300" fill="currentColor">
              <path d="M12 9.2a4.2 4.2 0 1 1-4.4-4.4c.1 0 .2 0 .3.02A3.6 3.6 0 0 0 12 9.2z" />
            </svg>
          )}
          {timeState.phase === "dawn" && (
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-rose-300" fill="currentColor">
              <circle cx="8" cy="8" r="3" />
              <path d="M2 12h12M4 14h8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
          )}
        </span>

        {/* Location Label */}
        <span className="hidden font-medium tracking-tight text-[var(--color-heading)] md:inline">
          Bengaluru
        </span>
        <span className="hidden select-none text-[var(--color-border)] md:inline">·</span>

        {/* Tabular Numerals */}
        <span className="font-mono text-[11px] font-medium tabular-nums text-[var(--color-text)]">
          {mounted ? timeState.timeStr : "5:30 PM"}
        </span>
        <span className="font-mono text-[10px] tracking-wider text-[var(--color-muted)]">
          IST
        </span>

        {/* Live Availability Beacon */}
        <span className="relative ml-0.5 flex h-2 w-2 items-center justify-center">
          {timeState.isWorkingHours ? (
            <>
              <span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-emerald-400 opacity-40 duration-1000" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            </>
          ) : (
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] opacity-80" />
          )}
        </span>
      </button>

      {/* Floating Interactive Timepiece & Presence Card */}
      <div
        className={`absolute right-0 top-full z-50 pt-2 transition-all duration-200 ease-out ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-95 opacity-0 group-hover/clock:pointer-events-auto group-hover/clock:translate-y-0 group-hover/clock:scale-100 group-hover/clock:opacity-100"
        }`}
      >
        <div className="w-80 rounded-2xl border border-[color-mix(in_srgb,var(--color-accent)_40%,transparent)] bg-[#0d0e12]/95 p-4 shadow-[0_24px_50px_-10px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl">
          {/* Header Telemetry Status */}
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
            <span className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              {timeState.isWorkingHours ? "ONLINE & AVAILABLE" : "AVAILABLE ASYNC"}
            </span>
            <span className="rounded-md bg-[color-mix(in_srgb,var(--color-accent)_15%,transparent)] px-1.5 py-0.5 font-mono text-[10px] font-medium text-[var(--color-accent)]">
              UTC+5:30 (IST)
            </span>
          </div>

          {/* 24-Hour Solar Arc Visualizer */}
          <div className="relative mt-3 rounded-xl border border-[color-mix(in_srgb,var(--color-border)_70%,transparent)] bg-[#121418]/60 p-3">
            <div className="flex items-center justify-between text-[10px] text-[var(--color-muted)]">
              <span>Sunrise 6:05 AM</span>
              <span className="font-medium text-[var(--color-heading)]">{timeState.phaseLabel}</span>
              <span>Sunset 6:12 PM</span>
            </div>

            {/* Sun Trajectory Arc SVG */}
            <div className="relative mt-1 h-14 w-full">
              <svg viewBox="0 0 200 60" className="h-full w-full overflow-visible">
                {/* Horizon Base Line */}
                <line
                  x1="10"
                  y1="52"
                  x2="190"
                  y2="52"
                  stroke="var(--color-border)"
                  strokeWidth="1.2"
                  strokeDasharray="2 3"
                />

                {/* Daylight Arch */}
                <path
                  d="M 14 52 Q 100 8 186 52"
                  fill="none"
                  stroke="color-mix(in srgb, var(--color-accent) 35%, transparent)"
                  strokeWidth="1.6"
                />

                {/* Completed Arc Trail */}
                {timeState.sunProgress >= 0.25 && timeState.sunProgress <= 0.75 && (
                  <path
                    d={`M 14 52 Q 100 8 ${sunX} ${sunY}`}
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                )}

                {/* Sun / Moon Orb Indicator */}
                <g transform={`translate(${sunX}, ${sunY})`}>
                  <circle
                    r="5"
                    fill="var(--color-accent)"
                    className="shadow-[0_0_12px_var(--color-accent)]"
                  />
                  <circle r="7.5" fill="none" stroke="var(--color-accent)" strokeWidth="0.8" opacity="0.6" />
                </g>
              </svg>
            </div>

            <div className="mt-1 flex items-baseline justify-between text-[11px]">
              <span className="text-[var(--color-body)]">Bengaluru Time:</span>
              <span className="font-mono font-semibold tabular-nums text-[var(--color-text)]">
                {timeState.timeWithSec}
              </span>
            </div>
          </div>

          {/* Dual Time Intelligence (Visitor vs Sudhanshu) */}
          <div className="mt-3 rounded-xl border border-[color-mix(in_srgb,var(--color-border)_70%,transparent)] bg-[#121418]/60 p-3">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[var(--color-muted)]">
              <span>Timezone Sync</span>
              <span className="font-medium text-[var(--color-accent)]">{timeState.timeDiffText}</span>
            </div>

            <div className="mt-2.5 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg bg-[var(--color-surface)] p-2">
                <span className="block text-[10px] text-[var(--color-muted)] truncate" title={timeState.visitorCity}>
                  📍 {timeState.visitorCity}
                </span>
                <span className="mt-1 block font-mono font-semibold text-[var(--color-heading)]">
                  {timeState.visitorTimeStr || "--:--"}
                </span>
              </div>

              <div className="rounded-lg bg-[var(--color-surface)] p-2 border border-[color-mix(in_srgb,var(--color-accent)_25%,transparent)]">
                <span className="block text-[10px] text-[var(--color-accent)]">
                  ⚡ Sudhanshu (BLR)
                </span>
                <span className="mt-1 block font-mono font-semibold text-[var(--color-text)]">
                  {timeState.timeStr}
                </span>
              </div>
            </div>

            <p className="mt-2 text-[10.5px] leading-relaxed text-[var(--color-secondary)]">
              Comfortable coordinating with teams across US, EU &amp; APAC. Async-first workflow with ~4–6h real-time overlap.
            </p>
          </div>

          {/* Call to Action Footer */}
          <div className="mt-3 flex items-center justify-between pt-1 text-xs">
            <span className="text-[11px] text-[var(--color-muted)]">Open for roles</span>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="focus-accent group flex items-center gap-1.5 rounded-lg border border-[color-mix(in_srgb,var(--color-accent)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)] px-2.5 py-1 font-sans text-[11px] font-medium text-[var(--color-accent)] transition-all hover:border-[var(--color-accent)] hover:bg-[color-mix(in_srgb,var(--color-accent)_20%,transparent)] hover:text-white"
            >
              Get in touch
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                &rarr;
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
