import { TraceRail } from "@/components/ui/Trace";

// Max content width + horizontal gutters. When `rail` is set, a single vertical
// copper trace runs down the left margin on mobile (<900px) — the simplified
// continuous trace called for in §13; the horizontal per-section segments take
// over from 900px up.
export function PageShell({
  children,
  rail = false,
}: {
  children: React.ReactNode;
  rail?: boolean;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 ${rail ? "relative" : ""}`}>
      {rail && (
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-3 min-[900px]:hidden"
        >
          <span className="absolute -top-0.5 left-1/2 h-[7px] w-[7px] -translate-x-1/2 rounded-full border border-[var(--color-accent)] bg-[var(--color-base)]" />
          <TraceRail className="h-full" />
        </div>
      )}
      {children}
    </div>
  );
}
