// Section header — the exact treatment that crowns the Contact heading
// ("Establish connection"): a copper node marks the section start, and the tail
// of the title lifts into the copper accent. Color theory: the warm-neutral ink
// carries the heading weight; the copper accent is the ~10% focal touch — the
// dot plus the accented words — so each section opens with one deliberate note
// of warmth instead of a flat slab of charcoal. Pass `accent` as the trailing
// substring of `title` to tint; it falls back to the plain title if it doesn't
// match.
export function SectionHeading({
  index,
  title,
  accent,
  eyebrow,
  subtitle,
  className = "",
}: {
  index?: string;
  title: string;
  accent?: string;
  eyebrow?: string;
  subtitle?: string;
  className?: string;
}) {
  const hasAccent = accent && title.endsWith(accent);
  const lead = hasAccent ? title.slice(0, title.length - accent!.length) : title;
  const tail = hasAccent ? accent! : "";

  return (
    <div className={`space-y-2.5 ${className}`}>
      {eyebrow && (
        <div className="flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
          {index ? (
            <span className="inline-flex items-center gap-2 font-mono font-bold tracking-[0.08em] text-[var(--color-accent)]">
              <span className="rounded border border-[color-mix(in_srgb,var(--color-accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)] px-1.5 py-0.5 text-[10px] tabular-nums text-[var(--color-accent)] shadow-[0_0_8px_color-mix(in_srgb,var(--color-accent)_18%,transparent)]">
                {index}
              </span>
              <span className="text-[var(--color-border)] select-none">/</span>
            </span>
          ) : (
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]" />
          )}
          <span>{eyebrow}</span>
          <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-[color-mix(in_srgb,var(--color-border)_85%,transparent)] to-transparent" />
        </div>
      )}
      <h2 className="max-w-3xl text-balance font-display text-[clamp(2.1rem,4.5vw,3.15rem)] font-bold leading-[1.08] tracking-[-0.038em] text-[var(--color-heading)]">
        <span>{lead}</span>
        {tail && (
          <span className="bg-gradient-to-r from-[#ff5e4f] via-[var(--color-accent)] to-[#ff4735] bg-clip-text text-transparent drop-shadow-[0_0_16px_color-mix(in_srgb,var(--color-accent)_25%,transparent)]">
            {tail}
          </span>
        )}
      </h2>
      {subtitle && (
        <p className="mt-1 max-w-[64ch] text-[clamp(1.02rem,1.25vw,1.15rem)] font-normal leading-[1.68] text-[var(--color-body)] text-pretty">
          {subtitle}
        </p>
      )}
    </div>
  );
}

