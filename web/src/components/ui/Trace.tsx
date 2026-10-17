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
  return null;
}

export function TraceRail({ className = "" }: { className?: string }) {
  return null;
}
