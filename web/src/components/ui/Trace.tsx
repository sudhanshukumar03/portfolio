import type { CSSProperties } from "react";

// The one structural device of the PCB world: a copper trace that powers on
// left-to-right once on load, with a via (pad) lighting at each end. Marks each
// section boundary. `inset` shifts the segment's horizontal start so the trace
// reads as one line threading down the page at a changing position (§5).
// Server component — the draw is pure CSS; reduced motion renders it at rest.
export function Trace({
  delay = 0,
  inset = 0,
  className = "",
}: {
  delay?: number;
  inset?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`trace ${className}`}
      style={
        {
          "--trace-delay": `${delay}ms`,
          marginLeft: inset || undefined,
          width: inset ? `calc(100% - ${inset}px)` : undefined,
        } as CSSProperties
      }
    >
      <span className="trace-line" />
      <span className="trace-via" />
      <span className="trace-via trace-via--end" />
    </div>
  );
}

// Vertical rail — the continuous trace run down the left margin. On mobile this
// is the only trace (the horizontal segments are hidden); it draws top-to-bottom
// on load. Positioned by the parent (absolute).
export function TraceRail({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`trace-rail block w-px bg-[linear-gradient(to_bottom,var(--color-accent),color-mix(in_srgb,var(--color-accent)_35%,var(--color-border)))] ${className}`}
    />
  );
}
