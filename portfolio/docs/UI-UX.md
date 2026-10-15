# UI/UX Flow

## Page structure (single page, scroll-driven)

```
┌─────────────────────────────────────┐
│ NAV (sticky, transparent → solid     │
│  on scroll)                          │
├─────────────────────────────────────┤
│ HERO                                 │
│  name + role, oversized display type │
│  photo overlapping type, right side  │
│  tagline, one CTA (View Work)        │
├─────────────────────────────────────┤
│ SELECTED WORK                        │
│  index-style list, 3–5 projects      │
│  click/tap → expands inline panel    │
│  (not a route change)                │
├─────────────────────────────────────┤
│ SKILLS                               │
│  grouped tags, quiet, no bars/rating │
├─────────────────────────────────────┤
│ ABOUT                                │
│  short bio, left-aligned, one photo  │
│  optional or none — text carries it  │
├─────────────────────────────────────┤
│ CONTACT                              │
│  email as primary CTA, socials,      │
│  resume download                     │
├─────────────────────────────────────┤
│ FOOTER                               │
└─────────────────────────────────────┘
```

## Interaction states

**Nav**
- Transparent over hero, gains `--surface` background + hairline bottom
  border once user scrolls past hero (state change, not decoration)
- Active section indicator: small accent-colored dot (non-text) next to
  the current section's nav label, updated on scroll position (not
  click alone) — the label text itself stays `--text-primary`, only
  the dot carries accent color
- Nav labels are body-size text, so their own hover/active state uses
  an underline + `--text-primary` shift, not a color change to accent
  (accent fails contrast at body size — see docs/DESIGN-SYSTEM.md)

**Project list item**
- Default: name in `--text-primary`, stack tags in `--text-secondary`
- Hover/focus: name transitions to `--accent`, underline draws in
  150ms ease-out — valid here because the name is pinned to 24px+
  (see docs/DESIGN-SYSTEM.md component spec), which clears the
  large-text contrast threshold
- Click/tap: item expands in place (accordion-style) to show
  screenshot, description, links — page does not navigate away
- Keyboard: fully operable via Tab + Enter, visible focus ring in
  `--accent` (this list sits on `--bg`, where accent clears 3:1 for
  non-text UI components — see the note under Buttons/links below for
  where it doesn't)

**Buttons/links**
- Large/display-size CTAs (e.g. hero "View Work"): underline fill
  animation, color shift to accent on hover
- Body-size links (nav, footer, inline text links): underline draw +
  shift to `--text-primary` only — never accent, which fails contrast
  at this size
- Focus (keyboard): visible outline in `--accent` on `--bg`; on
  `--surface`-backed elements, accent drops to 2.95:1 and fails the
  3:1 non-text threshold, so use a thicker/higher-contrast outline
  (e.g. `--text-primary`) for focus rings on surface backgrounds
  instead

**Forms (if a contact form is used instead of/alongside mailto)**
- Inline validation on blur, not on every keystroke
- Error state: a small accent-colored icon (non-text) appears next to
  the field, with the message itself in `--text-primary` below it —
  specific wording ("Enter a valid email"), never a red border alone
  and never the message text itself set in accent, since it's body size

## The one motion moment

Per the design principle of restraint: exactly one orchestrated
animation on page load, in the hero. No scroll-triggered fade-ins on
every section — that default reads as generated/templated. Full timing
and reduced-motion spec lives in `docs/ANIMATIONS.md` — don't duplicate
it here if it changes.

## Responsive behavior (see RESPONSIVE-DESIGN.md for full breakpoints)

- Hero type scales down but stays oversized relative to viewport;
  photo moves from overlapping-right to stacked-behind on mobile
- Project list collapses stack tags to wrap under the name on narrow
  screens rather than truncating

## Accessibility touchpoints (see ACCESSIBILITY.md for full commitments)

- All interactive states above have a non-color-dependent signal
  (underline, outline, position shift) — never color alone
- Reduced-motion: the one hero blink is disabled entirely for users
  with `prefers-reduced-motion`
