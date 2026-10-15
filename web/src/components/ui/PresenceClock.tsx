"use client";

import { useEffect, useRef, useState } from "react";

type CelestialPhase = "dawn" | "day" | "golden" | "dusk" | "night";
type DisplayMode = "blr" | "visitor" | "status";

export function PresenceClock() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<DisplayMode>("blr");

  // Bengaluru time parts
  const [kHours, setKHours] = useState("05");
  const [kMinutes, setKMinutes] = useState("54");
  const [kSeconds, setKSeconds] = useState("00");
  const [kPeriod, setKPeriod] = useState("PM");
  const [hourAngle, setHourAngle] = useState(177);
  const [minuteAngle, setMinuteAngle] = useState(324);
  const [secondAngle, setSecondAngle] = useState(0);
  const [secondProgress, setSecondProgress] = useState(0); // 0 to 1 across 60s
  const [isWorkingHours, setIsWorkingHours] = useState(true);
  const [phase, setPhase] = useState<CelestialPhase>("golden");
  const [phaseLabel, setPhaseLabel] = useState("Golden Hour");
  const [sunProgress, setSunProgress] = useState(0.74);

  // Visitor info
  const [visitorCity, setVisitorCity] = useState("Your Location");
  const [visitorTimeStr, setVisitorTimeStr] = useState("");
  const [timeDiffText, setTimeDiffText] = useState("UTC+5:30");
  const [diffHoursNum, setDiffHoursNum] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);

    // 1. Detect visitor timezone & difference from Kolkata (UTC+5:30)
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
      setDiffHoursNum(diffHours);

      if (Math.abs(diffHours) < 0.25) {
        setTimeDiffText("Same timezone as you");
      } else if (diffHours > 0) {
        setTimeDiffText(`+${diffHours % 1 === 0 ? diffHours : diffHours.toFixed(1)}h ahead of you`);
      } else {
        const absDiff = Math.abs(diffHours);
        setTimeDiffText(`-${absDiff % 1 === 0 ? absDiff : absDiff.toFixed(1)}h behind you`);
      }
    } catch {
      // Graceful fallback
    }

    // 2. High-precision continuous 60fps loop for sweeping hands & ring
    let animId = 0;
    const tick = () => {
      const now = new Date();

      // Seconds & milliseconds for continuous fluid rotation
      const sec = now.getSeconds();
      const ms = now.getMilliseconds();
      const totalSec = sec + ms / 1000;
      const sAngle = totalSec * 6; // 360 / 60 = 6 deg/sec

      setSecondAngle(sAngle);
      setSecondProgress(totalSec / 60);

      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    // 3. Discrete 1-second update for digits, timezone & phases
    const updateTime = () => {
      const now = new Date();

      // Kolkata parts
      const kolkataFmt = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      });
      const parts = kolkataFmt.formatToParts(now);

      const h = parts.find((p) => p.type === "hour")?.value || "12";
      const m = parts.find((p) => p.type === "minute")?.value || "00";
      const s = parts.find((p) => p.type === "second")?.value || "00";
      const p = parts.find((p) => p.type === "dayPeriod")?.value || "PM";

      setKHours(h);
      setKMinutes(m.padStart(2, "0"));
      setKSeconds(s.padStart(2, "0"));
      setKPeriod(p.toUpperCase());

      // 24h hour for angle and phase calculation
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

      const mAngle = (min24 + sec24 / 60) * 6;
      const hAngle = ((hour24 % 12) + min24 / 60) * 30;
      setMinuteAngle(mAngle);
      setHourAngle(hAngle);

      // Sun progress across 24h
      const totalMin = hour24 * 60 + min24;
      setSunProgress(totalMin / 1440);

      // Phase
      if (hour24 >= 5 && hour24 < 7) {
        setPhase("dawn");
        setPhaseLabel("Dawn / Sunrise");
      } else if (hour24 >= 7 && hour24 < 17) {
        setPhase("day");
        setPhaseLabel("Daylight");
      } else if (hour24 >= 17 && (hour24 < 18 || (hour24 === 18 && min24 <= 30))) {
        setPhase("golden");
        setPhaseLabel("Golden Hour");
      } else if ((hour24 === 18 && min24 > 30) || hour24 === 19) {
        setPhase("dusk");
        setPhaseLabel("Dusk / Twilight");
      } else {
        setPhase("night");
        setPhaseLabel("Night Sky");
      }

      setIsWorkingHours(hour24 >= 9 && hour24 < 22);

      // Visitor time string
      const vFmt = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);
      setVisitorTimeStr(vFmt);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(intervalId);
    };
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

  // Sun path on arc: X from 14 to 186, Y along curved arch
  const arcProgress = Math.max(0, Math.min(1, (sunProgress - 0.25) / 0.5));
  const sunX = 14 + arcProgress * 172;
  const sunY = 52 - Math.sin(arcProgress * Math.PI) * 36;

  // Toggle modes on click for instant utility
  const cycleMode = (e: React.MouseEvent) => {
    // If user clicked the expand arrow or popover trigger, toggle popover
    const target = e.target as HTMLElement;
    if (target.closest("[data-popover-toggle]")) {
      setOpen((prev) => !prev);
      return;
    }

    // Otherwise cycle display mode: blr -> visitor -> status -> blr
    setMode((prev) => {
      if (prev === "blr") return "visitor";
      if (prev === "visitor") return "status";
      return "blr";
    });
  };

  const ringCircumference = 2 * Math.PI * 9.5; // ~59.69

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
        aria-label="Sudhanshu's timezone and live presence in Bengaluru"
        title="Click to open live timezone cockpit & solar telemetry"
        className="group flex cursor-pointer items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--color-border)_85%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_70%,transparent)] py-1 pl-2 pr-2.5 text-xs shadow-[0_2px_14px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md transition-all duration-300 hover:border-[color-mix(in_srgb,var(--color-accent)_60%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-surface-2)_85%,transparent)] hover:shadow-[0_0_22px_color-mix(in_srgb,var(--color-accent)_20%,transparent)] select-none"
      >
        {/* Active 22px Mechanical Chronometer with Continuous Sweeping Needle & Charging Ring */}
        <span className="relative flex h-5 w-5 shrink-0 items-center justify-center text-[var(--color-accent)]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 overflow-visible" aria-hidden="true">
            {/* Dial Background */}
            <circle cx="12" cy="12" r="9.5" fill="rgba(18, 20, 24, 0.85)" />

            {/* 60-Second Perimeter Charge Track */}
            <circle
              cx="12"
              cy="12"
              r="9.5"
              fill="none"
              stroke="color-mix(in srgb, var(--color-border) 90%, transparent)"
              strokeWidth="1.2"
            />

            {/* Live Active 60-Second Charging Arc (Continuously sweeps 0-100% every minute) */}
            <circle
              cx="12"
              cy="12"
              r="9.5"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="1.4"
              strokeDasharray={ringCircumference}
              strokeDashoffset={ringCircumference * (1 - secondProgress)}
              strokeLinecap="round"
              transform="rotate(-90 12 12)"
            />

            {/* Cardinal Hour Ticks (12, 3, 6, 9) */}
            <line x1="12" y1="3.5" x2="12" y2="5.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="20.5" y1="12" x2="18.8" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
            <line x1="12" y1="20.5" x2="12" y2="18.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
            <line x1="3.5" y1="12" x2="5.2" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />

            {/* Hour Hand */}
            <line
              x1="12"
              y1="12"
              x2="12"
              y2="7.2"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              transform={`rotate(${hourAngle} 12 12)`}
            />

            {/* Minute Hand */}
            <line
              x1="12"
              y1="12"
              x2="12"
              y2="4.8"
              stroke="#e4e7ec"
              strokeWidth="1.2"
              strokeLinecap="round"
              transform={`rotate(${minuteAngle} 12 12)`}
            />

            {/* High-visibility Continuous Sweeping Seconds Needle with Glowing Tip */}
            <g transform={`rotate(${secondAngle} 12 12)`}>
              <line x1="12" y1="14" x2="12" y2="3.8" stroke="#f97316" strokeWidth="1.1" strokeLinecap="round" />
              <circle cx="12" cy="3.8" r="1.1" fill="#f97316" />
            </g>

            {/* Center Pinion Jewel */}
            <circle cx="12" cy="12" r="1.3" fill="var(--color-accent)" />
            <circle cx="12" cy="12" r="0.6" fill="#f97316" />
          </svg>
        </span>

        {/* Location & Real-Time Seconds Display */}
        <div className="flex items-center gap-1.5">
          <span className="font-semibold tracking-tight text-[var(--color-heading)] hidden md:inline">
            Bengaluru
          </span>
          <span className="font-semibold tracking-tight text-[var(--color-heading)] md:hidden">
            BLR
          </span>
          <span className="text-[var(--color-border)] select-none">·</span>
          <span className="font-mono text-[11.5px] tabular-nums font-medium text-[var(--color-text)]">
            {mounted ? (
              <>
                <span>{kHours}:{kMinutes}</span>
                <span className="text-[var(--color-accent)] font-semibold">:{kSeconds}</span>
                <span className="ml-1 text-[10px] text-[var(--color-muted)]">{kPeriod}</span>
              </>
            ) : (
              "5:55 PM"
            )}
          </span>
          <span className="font-mono text-[10px] tracking-wider text-[var(--color-muted)]">
            IST
          </span>
        </div>

        {/* Miniature 3-Bar Activity Equalizer (Real-time live telemetry motion) */}
        <span className="flex items-end gap-[2px] h-3 px-0.5" title="Live Telemetry Active">
          <span
            className="w-[2px] bg-emerald-400 rounded-full transition-all duration-300"
            style={{ height: `${4 + Math.sin(secondAngle * 0.1) * 3}px` }}
          />
          <span
            className="w-[2px] bg-emerald-400 rounded-full transition-all duration-300"
            style={{ height: `${6 + Math.cos(secondAngle * 0.12) * 4}px` }}
          />
          <span
            className="w-[2px] bg-emerald-400 rounded-full transition-all duration-300"
            style={{ height: `${5 + Math.sin(secondAngle * 0.15 + 1) * 3}px` }}
          />
        </span>

        {/* Popover Arrow Indicator */}
        <svg
          viewBox="0 0 16 16"
          className={`h-3 w-3 text-[var(--color-muted)] transition-transform duration-200 group-hover:text-[var(--color-accent)] ${
            open ? "rotate-180 text-[var(--color-accent)]" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>

      {/* Floating Interactive Cockpit Card */}
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
              {isWorkingHours ? "ONLINE & AVAILABLE" : "AVAILABLE ASYNC"}
            </span>
            <span className="rounded-md bg-[color-mix(in_srgb,var(--color-accent)_15%,transparent)] px-1.5 py-0.5 font-mono text-[10px] font-medium text-[var(--color-accent)]">
              UTC+5:30 (IST)
            </span>
          </div>

          {/* 24-Hour Solar Arc Visualizer */}
          <div className="relative mt-3 rounded-xl border border-[color-mix(in_srgb,var(--color-border)_70%,transparent)] bg-[#121418]/60 p-3">
            <div className="flex items-center justify-between text-[10px] text-[var(--color-muted)]">
              <span>Sunrise 6:05 AM</span>
              <span className="font-medium text-[var(--color-heading)]">{phaseLabel}</span>
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
                {sunProgress >= 0.25 && sunProgress <= 0.75 && (
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
                {kHours}:{kMinutes}:{kSeconds} {kPeriod}
              </span>
            </div>
          </div>

          {/* Dual Time Intelligence (Visitor vs Sudhanshu) */}
          <div className="mt-3 rounded-xl border border-[color-mix(in_srgb,var(--color-border)_70%,transparent)] bg-[#121418]/60 p-3">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[var(--color-muted)]">
              <span>Timezone Sync</span>
              <span className="font-medium text-[var(--color-accent)]">{timeDiffText}</span>
            </div>

            <div className="mt-2.5 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg bg-[var(--color-surface)] p-2">
                <span className="block text-[10px] text-[var(--color-muted)] truncate" title={visitorCity}>
                  📍 {visitorCity}
                </span>
                <span className="mt-1 block font-mono font-semibold text-[var(--color-heading)]">
                  {visitorTimeStr || "--:--"}
                </span>
              </div>

              <div className="rounded-lg bg-[var(--color-surface)] p-2 border border-[color-mix(in_srgb,var(--color-accent)_25%,transparent)]">
                <span className="block text-[10px] text-[var(--color-accent)]">
                  ⚡ Sudhanshu (BLR)
                </span>
                <span className="mt-1 block font-mono font-semibold text-[var(--color-text)]">
                  {kHours}:{kMinutes}:{kSeconds} {kPeriod}
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
