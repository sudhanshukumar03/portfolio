"use client";

import { useEffect, useRef, useState } from "react";

type CelestialPhase = "dawn" | "day" | "golden" | "dusk" | "night";

export function PresenceClock() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  // Bengaluru discrete clock state
  const [hours, setHours] = useState("06");
  const [minutes, setMinutes] = useState("10");
  const [seconds, setSeconds] = useState("00");
  const [ampm, setAmpm] = useState("PM");
  const [hourAngle, setHourAngle] = useState(185);
  const [minuteAngle, setMinuteAngle] = useState(60);
  const [secondAngle, setSecondAngle] = useState(0);
  const [isWorkingHours, setIsWorkingHours] = useState(true);
  const [phaseLabel, setPhaseLabel] = useState("Dusk / Twilight");
  const [sunProgress, setSunProgress] = useState(0.76);

  // Visitor timezone comparison
  const [visitorCity, setVisitorCity] = useState("Your City");
  const [visitorTimeStr, setVisitorTimeStr] = useState("");
  const [timeDiffText, setTimeDiffText] = useState("UTC+5:30");

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);

    // 1. Detect visitor location & compute timezone difference
    try {
      const visitorTz = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
      let vCity = "Your City";
      if (visitorTz.includes("/")) {
        const parts = visitorTz.split("/");
        vCity = parts[parts.length - 1].replace(/_/g, " ");
      } else {
        vCity = visitorTz;
      }
      setVisitorCity(vCity);

      const now = new Date();
      const visitorOffsetMin = -now.getTimezoneOffset();
      const kolkataOffsetMin = 330; // UTC+5:30
      const diffHours = (kolkataOffsetMin - visitorOffsetMin) / 60;

      if (Math.abs(diffHours) < 0.25) {
        setTimeDiffText("Same timezone as you");
      } else if (diffHours > 0) {
        setTimeDiffText(`${diffHours % 1 === 0 ? diffHours : diffHours.toFixed(1)} hours ahead of you`);
      } else {
        const absDiff = Math.abs(diffHours);
        setTimeDiffText(`${absDiff % 1 === 0 ? absDiff : absDiff.toFixed(1)} hours behind you`);
      }
    } catch {
      // Graceful fallback
    }

    // 2. Discrete 1-second "tick tick" clock loop
    const updateTick = () => {
      const now = new Date();

      // Format Bengaluru 12-hour time
      const kolkataParts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      }).formatToParts(now);

      const h = kolkataParts.find((p) => p.type === "hour")?.value || "12";
      const m = kolkataParts.find((p) => p.type === "minute")?.value || "00";
      const s = kolkataParts.find((p) => p.type === "second")?.value || "00";
      const p = kolkataParts.find((p) => p.type === "dayPeriod")?.value || "PM";

      setHours(h);
      setMinutes(m.padStart(2, "0"));
      setSeconds(s.padStart(2, "0"));
      setAmpm(p.toUpperCase());

      // 24-hour hour for hand angles & day/night cycle
      const k24Parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      }).formatToParts(now);

      const hour24 = parseInt(k24Parts.find((x) => x.type === "hour")?.value || "0", 10);
      const min24 = parseInt(k24Parts.find((x) => x.type === "minute")?.value || "0", 10);
      const sec24 = parseInt(k24Parts.find((x) => x.type === "second")?.value || "0", 10);

      // Distinct mechanical "tick" angles
      const sAngle = sec24 * 6; // 360 / 60 = 6 degrees per tick
      const mAngle = (min24 + sec24 / 60) * 6;
      const hAngle = ((hour24 % 12) + min24 / 60) * 30;

      setSecondAngle(sAngle);
      setMinuteAngle(mAngle);
      setHourAngle(hAngle);

      // Working hours roughly 9 AM to 10 PM IST
      setIsWorkingHours(hour24 >= 9 && hour24 < 22);

      // Sun progress across 24h
      const totalMin = hour24 * 60 + min24;
      setSunProgress(totalMin / 1440);

      // Solar phase label
      if (hour24 >= 5 && hour24 < 7) {
        setPhaseLabel("Dawn / Sunrise");
      } else if (hour24 >= 7 && hour24 < 17) {
        setPhaseLabel("Daylight");
      } else if (hour24 >= 17 && (hour24 < 18 || (hour24 === 18 && min24 <= 30))) {
        setPhaseLabel("Golden Hour");
      } else if ((hour24 === 18 && min24 > 30) || hour24 === 19) {
        setPhaseLabel("Dusk / Twilight");
      } else {
        setPhaseLabel("Night Sky");
      }

      // Visitor local time
      const vTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);
      setVisitorTimeStr(vTime);
    };

    updateTick();
    const interval = setInterval(updateTick, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close popover on outside click or Escape key
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

  // Sun path along curved solar arc: normalized between sunrise (~6 AM) and sunset (~6 PM)
  const arcProgress = Math.max(0, Math.min(1, (sunProgress - 0.25) / 0.5));
  const sunX = 14 + arcProgress * 172;
  const sunY = 46 - Math.sin(arcProgress * Math.PI) * 32;

  return (
    <div
      ref={containerRef}
      className="group/clock relative hidden sm:block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Clean, Normal Ticking Clock Pill */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label="Bengaluru local time clock. Hover or click to view timezone and presence details."
        title="Bengaluru, India (IST) · Click for timezone & availability details"
        className="group flex cursor-pointer items-center gap-2.5 rounded-full border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_85%,transparent)] px-3 py-1.5 text-xs shadow-[0_2px_12px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md transition-all duration-200 hover:border-[color-mix(in_srgb,var(--color-accent)_50%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-surface-2)_90%,transparent)] select-none"
      >
        {/* Classic Analog Clock with Mechanical "Tick Tick" Second Hand */}
        <span className="relative flex h-4 w-4 shrink-0 items-center justify-center text-[var(--color-accent)]">
          <svg viewBox="0 0 20 20" className="h-4 w-4 overflow-visible" aria-hidden="true">
            {/* Clock Face Bezel */}
            <circle
              cx="10"
              cy="10"
              r="8.8"
              fill="rgba(18, 20, 24, 0.85)"
              stroke="color-mix(in srgb, var(--color-accent) 60%, transparent)"
              strokeWidth="1.1"
              className="transition-colors group-hover:stroke-[var(--color-accent)]"
            />

            {/* Hour Hand */}
            <line
              x1="10"
              y1="10"
              x2="10"
              y2="6.2"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              transform={`rotate(${hourAngle} 10 10)`}
            />

            {/* Minute Hand */}
            <line
              x1="10"
              y1="10"
              x2="10"
              y2="4.2"
              stroke="#e4e7ec"
              strokeWidth="1.1"
              strokeLinecap="round"
              transform={`rotate(${minuteAngle} 10 10)`}
            />

            {/* Discrete "Tick-Tick" Second Needle with Spring Escapement Snap */}
            <g
              transform={`rotate(${secondAngle} 10 10)`}
              style={{
                transition: "transform 0.14s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <line x1="10" y1="11.8" x2="10" y2="3.2" stroke="#f97316" strokeWidth="0.9" strokeLinecap="round" />
              <circle cx="10" cy="3.2" r="0.8" fill="#f97316" />
            </g>

            {/* Center Pivot Jewel */}
            <circle cx="10" cy="10" r="1.1" fill="var(--color-accent)" />
          </svg>
        </span>

        {/* Normal Time Readout with Second-by-Second Tick Tick */}
        <div className="flex items-center gap-1.5 font-mono text-[11.5px] tabular-nums">
          <span className="font-sans font-medium text-[var(--color-heading)] hidden md:inline">
            Bengaluru
          </span>
          <span className="font-sans font-medium text-[var(--color-heading)] md:hidden">
            BLR
          </span>
          <span className="text-[var(--color-border)] select-none">·</span>
          <span className="font-medium text-[var(--color-text)]">
            {mounted ? (
              <>
                <span>{hours}:{minutes}:</span>
                <span className="font-semibold text-[var(--color-accent)]">{seconds}</span>
                <span className="ml-1 text-[10px] text-[var(--color-muted)]">{ampm}</span>
              </>
            ) : (
              "6:10 PM"
            )}
          </span>
        </div>
      </button>

      {/* Exquisitely Arranged Telemetry & Timezone Cockpit Card on Hover */}
      <div
        className={`absolute right-0 top-full z-50 pt-2 transition-all duration-200 ease-out ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-95 opacity-0 group-hover/clock:pointer-events-auto group-hover/clock:translate-y-0 group-hover/clock:scale-100 group-hover/clock:opacity-100"
        }`}
      >
        <div className="w-[340px] rounded-2xl border border-[color-mix(in_srgb,var(--color-accent)_40%,transparent)] bg-[#0d0e12]/95 p-5 shadow-[0_24px_50px_-10px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl">
          {/* Header Row: City + Live Status Pill */}
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <span className="font-sans text-xs font-semibold text-[var(--color-heading)]">
                Bengaluru, Karnataka, India
              </span>
            </div>
            <span className="rounded-md border border-[color-mix(in_srgb,var(--color-accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)] px-2 py-0.5 font-mono text-[10px] font-medium text-[var(--color-accent)]">
              UTC+5:30 (IST)
            </span>
          </div>

          {/* Prominent Digital Clock Hero */}
          <div className="mt-4 flex items-baseline justify-between">
            <div className="font-mono text-2xl font-semibold tracking-tight text-[var(--color-text)] tabular-nums">
              {hours}:{minutes}:<span className="text-[var(--color-accent)]">{seconds}</span>{" "}
              <span className="text-sm font-normal text-[var(--color-muted)]">{ampm}</span>
            </div>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[10.5px] font-medium font-sans ${
                isWorkingHours
                  ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
                  : "border-amber-400/30 bg-amber-400/10 text-amber-400"
              }`}
            >
              {isWorkingHours ? "Active Working Hours" : "Available Asynchronously"}
            </span>
          </div>

          {/* 24-Hour Solar Trajectory Arc */}
          <div className="mt-4 rounded-xl border border-[var(--color-border)] bg-[#121418]/70 p-3.5">
            <div className="flex items-center justify-between text-[10.5px] text-[var(--color-muted)] font-mono">
              <span>Sunrise 6:05 AM</span>
              <span className="font-medium text-[var(--color-heading)]">{phaseLabel}</span>
              <span>Sunset 6:12 PM</span>
            </div>

            {/* Sun Trajectory Arc SVG */}
            <div className="relative mt-2 h-12 w-full">
              <svg viewBox="0 0 200 54" className="h-full w-full overflow-visible">
                {/* Horizon Line */}
                <line
                  x1="10"
                  y1="46"
                  x2="190"
                  y2="46"
                  stroke="var(--color-border)"
                  strokeWidth="1"
                />

                {/* Sky Arch Path */}
                <path
                  d="M 14 46 Q 100 12 186 46"
                  fill="none"
                  stroke="color-mix(in srgb, var(--color-accent) 25%, transparent)"
                  strokeWidth="1.6"
                />

                {/* Trajectory Completed Arc */}
                {sunProgress >= 0.25 && sunProgress <= 0.75 && (
                  <path
                    d={`M 14 46 Q 100 12 ${sunX} ${sunY}`}
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                )}

                {/* Sun Marker with Radial Glow */}
                <g transform={`translate(${sunX}, ${sunY})`}>
                  <circle r="4.5" fill="var(--color-accent)" />
                  <circle r="7.5" fill="none" stroke="var(--color-accent)" strokeWidth="0.8" opacity="0.5" />
                </g>
              </svg>
            </div>
          </div>

          {/* Dual Timezone Synchronization (Visitor vs. Sudhanshu) */}
          <div className="mt-3.5 rounded-xl border border-[var(--color-border)] bg-[#121418]/70 p-3.5">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)]">
              <span>Timezone Comparison</span>
              <span className="font-medium text-[var(--color-accent)]">{timeDiffText}</span>
            </div>

            {/* Unified Comparison Row (No grid) */}
            <div className="mt-2.5 flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-xs">
              {/* Visitor Location */}
              <div className="min-w-0 pr-2">
                <span className="block text-[10.5px] text-[var(--color-muted)] truncate" title={visitorCity}>
                  📍 {visitorCity}
                </span>
                <span className="mt-0.5 block font-mono text-[13px] font-semibold text-[var(--color-heading)] tabular-nums">
                  {visitorTimeStr || "--:--"}
                </span>
              </div>

              {/* Subtle hairline separator */}
              <div className="h-7 w-px shrink-0 bg-[var(--color-border)]" aria-hidden="true" />

              {/* Sudhanshu Location */}
              <div className="pl-2 text-right">
                <span className="block text-[10.5px] font-medium text-[var(--color-accent)]">
                  ⚡ Sudhanshu (BLR)
                </span>
                <span className="mt-0.5 block font-mono text-[13px] font-semibold text-[var(--color-text)] tabular-nums">
                  {hours}:{minutes}:{seconds} {ampm}
                </span>
              </div>
            </div>

            <p className="mt-2.5 text-[11px] leading-relaxed text-[var(--color-secondary)]">
              Comfortable coordinating with teams across US, EU &amp; APAC. Async-first workflow with ~4–6h real-time overlap.
            </p>
          </div>

          {/* Card Footer Action */}
          <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border)] pt-3 text-xs">
            <span className="text-[11px] text-[var(--color-muted)]">
              Status: <span className="text-[var(--color-heading)] font-medium">Open for roles</span>
            </span>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="focus-accent group flex items-center gap-1.5 rounded-lg border border-[color-mix(in_srgb,var(--color-accent)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)] px-3 py-1 font-sans text-[11.5px] font-medium text-[var(--color-accent)] transition-all hover:border-[var(--color-accent)] hover:bg-[color-mix(in_srgb,var(--color-accent)_20%,transparent)] hover:text-white"
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
