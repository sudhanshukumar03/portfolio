// Section header — the exact treatment that crowns the Contact heading
// ("Establish connection"): a copper node marks the section start, and the tail
// of the title lifts into the copper accent. Color theory: the warm-neutral ink
// carries the heading weight; the copper accent is the ~10% focal touch — the
// dot plus the accented words — so each section opens with one deliberate note
// of warmth instead of a flat slab of charcoal. Pass `accent` as the trailing
// substring of `title` to tint; it falls back to the plain title if it doesn't
// match.
export function SectionHeading({
  title,
  accent,
  eyebrow,
  subtitle,
  className = "",
}: {
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
        <div className="flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]" />
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="flex items-center gap-3.5 max-w-3xl text-balance font-display text-[clamp(2.1rem,4.8vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.038em] text-[var(--color-heading)]">
        {!eyebrow && (
          <span
            aria-hidden="true"
            className="h-2 w-2 flex-none rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]"
          />
        )}
        <span>
          {lead}
          {tail && <span className="text-[var(--color-accent)]">{tail}</span>}
        </span>
      </h2>
      {subtitle && (
        <p className="mt-1 max-w-[64ch] text-[clamp(1.05rem,1.35vw,1.22rem)] font-medium leading-[1.68] text-[var(--color-body)] text-pretty">
          {subtitle}
        </p>
      )}
    </div>
  );
}

