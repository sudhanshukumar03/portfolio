# Accessibility

Target: WCAG 2.1 AA, minimum.

## Commitments
- Color contrast: verified against WCAG 2.1 formulas, not assumed —
  full ratio table in `docs/DESIGN-SYSTEM.md`. Headline result:
  `--text-primary` and `--text-secondary` both clear 4.5:1 on both
  `--bg` and `--surface`; `--accent` does **not** clear 4.5:1 and is
  restricted to large text and non-text elements only (see that doc's
  "Accent usage constraint")
- Every interactive state (hover, focus, active) has a non-color signal
  — underline, outline, or position shift — never color alone. This
  also covers the accent-contrast gap above: because accent fails at
  body size, every accent-colored hover/focus state pairs it with an
  underline or outline, so the state is never carried by color alone
  even where accent is used
- Visible keyboard focus ring on every interactive element, using
  `--accent` — never `outline: none` without a replacement
- All images have descriptive `alt` text; decorative images use `alt=""`
- Heading hierarchy is strictly sequential (h1 → h2 → h3), not chosen
  for visual size
- `prefers-reduced-motion` disables the hero blink and any transition
  longer than instant
- Project expand/collapse panels are keyboard-operable (Enter/Space to
  toggle) and announce state via `aria-expanded`
- Form fields (if used) have associated `<label>` elements, not
  placeholder-only labeling

## Testing checklist before launch
- [ ] Full keyboard-only pass (Tab, Shift+Tab, Enter, Esc)
- [ ] Screen reader pass (VoiceOver or NVDA) on Hero, Work, Contact
- [ ] Automated audit (axe or Lighthouse) with zero critical issues
- [ ] Zoom to 200% — layout doesn't break or truncate content
