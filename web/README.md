# portfolio-web

Implementation of the portfolio site. Content and design decisions are the
source of truth in the sibling `portfolio/` docs repo.

## Stack
React 19 · Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Vercel

CSS-first animation (no library in the initial bundle). Bespoke UI primitives —
no component-kit defaults, per `portfolio/docs/DESIGN-SYSTEM.md`. See `portfolio/docs/TECH-STACK.md`.

## Structure
```
src/
├── app/            App Router — single-page composition (page.tsx), layout, styles import
├── components/
│   ├── sections/   Hero, Work, Skills, About, Contact, Footer
│   ├── ui/         Button, Tag, Divider, NavLink
│   └── layout/     Nav, PageShell
├── content/        build-time markdown mirror of portfolio/ docs
├── lib/            content loader, utils, types
└── styles/         globals.css with design-system tokens
public/
├── images/
└── resume/
```

## Develop
```bash
pnpm install
pnpm dev
```

Content flow, rendering strategy, and folder rationale: `portfolio/docs/ARCHITECTURE.md`.
