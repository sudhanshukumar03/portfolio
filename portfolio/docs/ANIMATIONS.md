# Animations

> **Revised direction (v2).** The original spec below banned entrance and
> scroll motion entirely. That read as static/flat in practice, so we added
> a restrained motion layer: a staggered hero entrance on load and a single
> gentle fade-up as each section scrolls into view (once). Everything stays
> reduced-motion-safe and short (<900ms). The "one accent moment" rule for
> *color* is unchanged — motion and accent-color are separate budgets. The
> original restraint notes are kept below as the baseline rationale.

## Motion layer (current)
- **Hero entrance:** elements rise + fade in, staggered ~100ms apart, shared
  `--ease-out-expo` easing. Runs once on load.
- **Section reveal:** each section fades up once when it enters the viewport
  (IntersectionObserver, no re-trigger on scroll-up). Subtle: 28px lift,
  700ms. Not a per-item cascade on everything — grids stagger by ~90ms max.
- **Ambient:** one low-opacity accent glow behind the hero photo (static).
- All of the above are disabled/instant under `prefers-reduced-motion`.

---

Per the design principle of restraint: one orchestrated moment, not
scattered effects.

## The one moment
On initial hero load: a small status dot/marker next to the
availability line does a single soft opacity pulse in `--accent`,
twice, then settles static. The dot is a non-text element, so it's
exempt from the text-contrast constraint in `docs/DESIGN-SYSTEM.md` —
the status text itself stays in `--text-secondary` and never changes
color. Duration: ~1.6s total. This is the entire "look, it's alive"
signal for the whole page.

## Everywhere else: functional motion only
- Nav background fade-in on scroll threshold: 150ms ease
- Project list hover (underline draw, color shift): 150–200ms ease-out
- Project panel expand/collapse: 250ms ease, height + opacity only
- Page-level scroll: native, no scroll-jacking, no parallax

## Explicitly banned
- Fade-and-slide-up entrance on every section as it scrolls into view
- Hover scale/lift effects on project items
- Cursor-follow effects, particle backgrounds, animated gradients
- Any animation longer than 300ms on a user-triggered interaction

## Reduced motion
`prefers-reduced-motion: reduce` disables the hero pulse entirely and
caps all transitions to near-instant (≤ 50ms), removing easing curves.
