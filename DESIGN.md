# Design

The design constitution for Sudhanshu Kumar's portfolio (`web/`). Product truth
lives in [PRODUCT.md](PRODUCT.md); this file governs how it looks and moves.
Derived from the shipped artifact — when code and this doc disagree, fix one to
match the other on purpose, never by drift.

## Direction & identity

An **ivory/charcoal editorial portfolio with a restrained copper signature** — a
maker who ships production systems, presented like a well-set page, not a
dashboard. It is **not "copper-themed."** Neutrals carry 80–85% of every surface;
a granular text hierarchy does the work weight and scale can't; copper is a sparse
~2–3% accent.

Premium here comes from **typography, composition, and restraint** — never from
gradients, glass, glow, or effect. Decision hierarchy when trade-offs collide:
identity > typography > composition > UX > grid/spacing > color > imagery >
motion > decoration.

Mode: **Persuade, leaning Experience.** The visitor is skimming and deciding
whether to make contact; the hero and Work list must land the value fast, and the
artifact should feel authored, not templated.

## Color

Text is **white and grey only.** Copper is an accent and structural mark
(traces, underlines, focus rings, the active-nav dot, the logo) — **never a font
color, never a text mark.** The base is a warm neutral (paper/ink), deliberately
not clinical pure `#fff`/`#000`; the whisper of warmth is what reads premium while
still reading as white and grey. Tokens live in `web/src/styles/globals.css` as
`--color-*`; components read them directly, so theming is token overrides only.

Dark is the default; light is independently derived (not an invert). All pairs
meet WCAG AA at true size — **contrast ratios (4.5:1 body / 3:1 large + UI), not a
luminance-difference rule.** In light, `muted` and `accent` sit ~4.3–4.4:1 and are
reserved for large text, labels, and UI marks — never small body copy.

| Token | Dark | Light | Use |
|---|---|---|---|
| base | `#101112` | `#f4f1e8` | page substrate |
| surface / surface-2 | `#171819` / `#1d1e20` | `#ece8de` / `#e4dfd4` | panels, wells |
| text | `#f4f1e8` | `#171716` | display / H1 / wordmark / interactive |
| heading | `#eae7df` | `#211f1c` | section + card headings |
| body | `#c8c4bb` | `#403e39` | running copy (ambient default) |
| secondary | `#b8b4aa` | `#5c5a54` | taglines, supporting |
| muted | `#8f8b83` | `#7a766d` | metadata, labels, tags |
| border | `#2b2c2e` | `#d8d2c6` | trace-tone hairline — decorative, never text |
| accent | `#c67a55` | `#a65e3b` | copper signature — accent/marks only |

`--color-on-fill` (dark `#101112` / light `#f4f1e8`) is for the filled `Button`
primary and semantic chips only. `#0e1512` is used literally as "exposed board"
in the portrait backing (both themes) — it is not a token.

## Typography

**IBM Plex Sans** for display and body — one family; **weight and scale carry
hierarchy**, not extra colors. **IBM Plex Mono** is for technical artifacts only
(stack tags, metadata labels, the project index) — never running voice. No serif.

- Display / H1: `clamp(2.25rem, 4.8vw, 3.65rem)`, bold, tracking `-0.04em`,
  leading `~1.02`.
- Section H2 / project H3: fluid `clamp`, semibold/bold, tight tracking.
- Body: 1rem base, leading `1.7`; measure capped `52–68ch`.
- Mono labels: uppercase, tracking `0.18–0.2em`, small.

## Spacing, grid & shape

- Section rhythm: `py-24 md:py-32` (Contact `md:py-40`).
- Gutters: `px-6 md:px-12 lg:px-20`.
- Layout on 12-col grids (Work spread 7/5, About 8/4 with an offset sidebar).
- Radius: `rounded-md` controls, `rounded-lg` previews, `rounded-2xl` work cards.
- Elevation is mostly flat — hairline `border` (trace tone) does the separating.
  The one real shadow is the Work stacked-card depth cue.

## Motion

CSS-first (no Framer Motion in the core build). Every motion has a rest state.

- `rise` — hero content settles in on load, staggered via `--rise-delay`.
- Copper `Trace` — draws left-to-right once per section boundary; a vertical rail
  and a fixed scroll-progress rail express the board "powering on" down the page.
- `reveal` — sections settle in on scroll (IntersectionObserver toggles
  `.is-visible`).
- Work **Sequence** — sticky "stacked deck": each card pins a little lower than
  the last so the next overlays it, leaving a peek. Pure CSS sticky.
- **`prefers-reduced-motion` renders everything at rest** — no draw, no rise, no
  reveal; the Work stack falls back to `position: static` (a plain list).

## The one signature device

A single continuous **copper trace**: section traces, the vertical rail, the
scroll-progress rail, the hero status-rail, and CTA/link underlines. The "PCB
identity" survives as **one quiet line** — **not** literal circuitry, and **not**
rings/halo/orbital treatment (those were removed from the portrait as generic).
The background trace pattern is kept faint (opacity ~0.12) so it never competes.

## Components

- **Nav** — wordmark + 4 links (Work/Skills/About/Contact); active item marked by
  a small copper dot; ThemeToggle. No underline chrome.
- **Hero** — left-anchored editorial headline (a real claim, not a job title),
  first-person positioning line, mono metadata, **unfilled** CTAs (copper-underlined
  primary + chevron / quiet secondary), square social icons, status-rail trace.
- **HeroPortrait** — background-removed cutout under the locked `#duotone` filter,
  lifted by a soft **edgeless dark backing** (no rings/vias). `object-contain
  object-bottom` keeps the full head; subtle scroll parallax.
- **Work** — `Sequence` (sticky stacked spreads) + `Overview` (compact index of
  all projects) via a `role=tablist` toggle. Real repos; `demo` slots render "Live
  demo" when a real URL exists.
- **Skills** — one loose relevance cluster sized by weight (mono), not a grid.
- **About** — unbalanced two-column: bio ~65%, offset meta sidebar ~35%.
- **Contact** — a display headline moment; contact routes live in the social logos
  (email + WhatsApp included).
- **Tag** — squared solder-pad (mono, trace border), never soft-shadow chips.
- **Button** — filled primary (`--color-text` bg) + ghost; hero CTAs stay unfilled.

## Interaction & states

- Focus: `.focus-accent` (copper) on base-backed elements; `.focus-surface`
  (text tone) on surface-backed ones where copper fails the 3:1 non-text threshold.
- Hover: text links fill a copper underline; social marks resolve to their real
  brand color (the one sanctioned multi-color break, on user intent only); nav
  lifts muted → text.
- Tabs/expanders/toggle carry `aria-selected` / `aria-expanded` / `aria-controls`.

## Responsive

`min-[900px]` is the primary desktop switch (hero goes side-by-side, section
traces appear). Below it, layout stacks single-column and the portrait sits above
the text. Standard `sm/md/lg` tuning within each section; measures and type scale
fluidly via `clamp`.

## Content honesty

Real links, projects, and facts only — **no fabricated metrics, testimonials,
clients, or benchmarks.** HealthGuard is always framed as an exploratory concept.
Featured work is fixed at three projects (KRAMA OS, LedgerMind, HealthGuard).
Deployed links are added only when a real deployment exists.

## Anti-patterns (banned)

- Copper (or any hue) as a **font color** or text mark.
- Portrait rings / tech-halo / orbital treatment; loud decorative circuitry.
- Filled hero CTAs; buttons pretending the hero needs a solid shape.
- Eyebrow labels and arrow suffixes on links (the primary-CTA chevron is the one
  intentional affordance). Project index numerals are real anchors, not decoration.
- Premium-by-effect: gradients, glass, glow, drop shadows as the identity.
- Motion without a reduced-motion rest state.

