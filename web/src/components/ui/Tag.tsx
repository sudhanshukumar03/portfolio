// Skills / stack render as tags only — never bars or ratings.
// These are technical artifacts (framework + version strings), so they're set
// in IBM Plex Mono. Squared-off pads with a trace-toned border read as PCB
// solder pads rather than generic soft-shadow chips.
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 text-xs text-[var(--color-muted)]">
      {children}
    </span>
  );
}
