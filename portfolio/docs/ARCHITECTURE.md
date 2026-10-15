# Architecture

## Codebase structure (implementation, not content repo)

```
src/
├── app/                    routes (Next.js App Router) or pages/
│   ├── page.tsx            single-page composition of all sections
│   └── projects/[slug]/    optional: dedicated project route if not
│                           using inline-expand pattern
├── components/
│   ├── sections/           Hero, Work, Skills, About, Contact, Footer
│   ├── ui/                 Button, Tag, Divider, NavLink — small,
│                           reusable, no business logic
│   └── layout/             Nav, PageShell
├── content/                mirrors this markdown repo — parsed at
│                           build time via a content loader
├── lib/                    content-loading utilities, MDX config
├── styles/                 Tailwind config with DESIGN-SYSTEM tokens
└── public/
    ├── images/
    └── resume/
```

## Content flow

`portfolio/` (this repo) → build-time content loader → typed data →
React components. Section components never hardcode copy — they import
from parsed content, so `content/HERO.md` changing is the only edit
needed to change what's on screen.

## Rendering strategy

Static generation for all pages — no client-side data fetching needed
since content is markdown, not a live database. This keeps performance
high by default (see `PERFORMANCE.md`).
