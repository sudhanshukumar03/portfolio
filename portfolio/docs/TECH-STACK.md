# Tech Stack

Locked for v1. This is a static, content-driven one-pager — the stack is
deliberately small. Everything a visiting engineer sees here should be
defensible against `SKILLS.md` (visitors will check), but the site using a
tool is not required just because it's in the skills list.

## Site framework
- **React 19**
- **Next.js 16 (App Router)**
- **TypeScript** (strict)

Static generation throughout — see `ARCHITECTURE.md`.

## Styling
**Tailwind CSS v4**, with the token system from `DESIGN-SYSTEM.md` mapped to
the Tailwind `@theme` namespace (see the token-mapping table in that doc) —
no inline magic-number colors.

**No component-library default styling.** The handful of UI primitives
(Button, Tag, Divider, NavLink) are bespoke and match the editorial system.
`DESIGN-SYSTEM.md` explicitly bans rounded cards, soft shadows, and pill
radii, which are exactly the defaults a kit like shadcn/ui ships — so we
don't pull one in for v1. If a future feature needs accessible interactive
primitives (a dialog, a combobox), add Radix or shadcn then and restyle it
to the tokens; don't adopt it speculatively.

## Animation
**CSS-first.** The one hero status-dot pulse and the 150–250ms transitions
in `ANIMATIONS.md` are all plain CSS — no animation library in the initial
bundle, which protects the JS budget in `PERFORMANCE.md`.

Framer Motion is optional and reached for only if a specific interaction
(e.g. the project-panel height accordion) proves awkward in pure CSS. It is
not a core dependency.

## Content
Markdown files (the `portfolio/` repo) parsed at build time — project and
case-study content is statically generated, so adding a project means adding
a file, not editing component code.

## Hosting
**Vercel** — see `DEPLOYMENT.md`. CI/CD via GitHub Actions.

## Fonts
Self-hosted variable fonts (display + body pair from `DESIGN-SYSTEM.md`) —
avoids a third-party font CDN as a render-blocking dependency and a
privacy/perf cost.

## Analytics
[e.g. Plausible or Vercel Analytics — privacy-respecting, no cookie banner
required] — optional, add only if you'll actually look at it.

## Form handling
Not used. Contact is a plain `mailto:` link — simpler, zero failure modes.
See `content/CONTACT-SECTION.md`.
