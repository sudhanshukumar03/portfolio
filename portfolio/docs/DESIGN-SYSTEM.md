# Design System

Style: Editorial-Swiss minimalism, one Art Deco–influenced accent line.
Grounded in the brief: a developer portfolio that should feel premium and
restrained, not "SaaS template" or "dev-tool neon."

## Color

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#0F0812` | Base background — warm near-black, purple undertone |
| `--surface` | `#1A1024` | Card/section surface, lifted one step off background |
| `--text-primary` | `#FBE4D8` | Primary text — warm off-white, never pure white |
| `--text-secondary` | `#8C8577` | Muted labels, captions, metadata |
| `--accent` | `#C1121F` | Single accent — CTA, hover state, cursor blink. Nothing else. |
| `--border` | `#2C2A26` | Hairline dividers only |

**Rule:** the accent color appears in exactly one place per screen. Never
two accent-colored elements visible at once. This is what keeps the
palette premium instead of decorative.

### Tailwind v4 mapping

These semantic tokens are the source of truth. In the stylesheet they live
in Tailwind v4's `@theme` block under the `--color-*` namespace so utilities
generate correctly — keep both names in sync (code follows this table, not
the reverse):

| Semantic token | Tailwind `@theme` var | Generates |
|---|---|---|
| `--bg` `#0F0812` | `--color-base` | `bg-base`, `text-base` |
| `--surface` `#1A1024` | `--color-surface` | `bg-surface` |
| `--text-primary` `#FBE4D8` | `--color-text` | `text-text` |
| `--text-secondary` `#8C8577` | `--color-muted` | `text-muted` |
| `--accent` `#C1121F` | `--color-accent` | `text-accent`, `border-accent` |
| `--border` `#2C2A26` | `--color-border` | `border-border` |

### Verified contrast (WCAG 2.1, checked against both surfaces)

| Pair | Ratio | AA normal text (4.5:1) | AA large text (3:1) |
|---|---|---|---|
| `--text-primary` on `--bg` | 16.16:1 | Pass | Pass |
| `--text-secondary` on `--bg` | 5.39:1 | Pass | Pass |
| `--text-primary` on `--surface` | 15.03:1 | Pass | Pass |
| `--text-secondary` on `--surface` | 5.02:1 | Pass | Pass |
| `--accent` on `--bg` | 3.17:1 | **Fail** | Pass |
| `--accent` on `--surface` | 2.95:1 | **Fail** | Fail |

**Accent usage constraint (this changes the components below):** `--accent`
does not meet AA for normal-size text. Use it only for:
- Large text — 24px+ regular or 18.66px+ bold (section headings, hero
  elements, the project-name hover state, since that's set at display size)
- Non-text elements — underlines, focus rings, icons, the cursor-blink dot
- Never for small body text, captions, or inline links at 16–18px — those
  get an underline + `--text-primary` shift instead of a color-only accent
  change (see Components → Buttons below, updated accordingly)

## Type

- **Display** (hero name, section titles): a high-contrast condensed
  grotesk or refined serif — e.g. Söhne Breit, Canela, or General Sans
  at a heavy weight. Used big, left-aligned, tight tracking.
- **Body / UI** (nav, paragraphs, labels): a quiet grotesk — e.g. Inter
  or Neue Haas Grotesk. Small, restrained, never competing with display type.
- No monospace. Tech stack tags use body type in a tag/pill treatment,
  not a code-font affectation.

### Type scale (base 16px)
| Role | Size | Weight | Line height |
|---|---|---|---|
| Hero display | 96–160px (clamp for viewport) | 700 | 0.95 |
| Section heading | 40–56px | 600 | 1.1 |
| Subheading | 22–28px | 500 | 1.3 |
| Body | 16–18px | 400 | 1.6 |
| Caption / label | 13px | 500 | 1.4 |

Line length capped at ~72 characters for body text.

## Spacing

8px base unit. Section vertical padding: 120–160px desktop, 64px mobile.
Generous whitespace is a deliberate premium signal — do not compress it
to fit more content; cut content instead.

## Components

**Buttons**
- Primary (set at large/display type, e.g. hero CTA): text + underline
  that fills in accent color on hover — accent is safe here at this size
- Secondary (set at body size, e.g. nav links, footer links): underline
  draw + shift to `--text-primary` on hover, not accent — body-size text
  in accent fails contrast (see table above)

**Project list item** (not a card)
- Left: project name — set at the Subheading scale, minimum 24px, so
  it reliably qualifies as WCAG "large text" and the accent hover
  below stays valid (see contrast table)
- Right: year + stack tags (small, muted)
- Bottom: hairline border divider
- Hover: name shifts to accent color, thin underline draws left-to-right
- This is a list/index treatment, not a rounded card with a shadow —
  ties back to the "editorial index" concept in the layout plan

**Tags** (skills, stack)
- No background fill, no border-radius pill unless very subtle (4px)
- Muted text color, hairline border only

**Dividers**
- 1px hairline, `--border` color, full content-width or inset — used
  between sections and list items, purely decorative separation
- `--border` is low-contrast by design (1.38:1 against `--bg`) and must
  never be the only boundary on something meaningful — an input field,
  a focus target, or a clickable card edge. Those use `--accent` or
  `--text-secondary` instead, per `docs/ACCESSIBILITY.md`

## What to avoid
- Rounded cards with soft drop shadows (generic SaaS default)
- Gradient washes as background decoration
- Glassmorphism / blur panels
- More than one accent color live on screen at once
- All-caps labels as a structural device (use size/weight instead)
