# portfolio-web

Implementation of Sudhanshu Kumar's personal portfolio web application.

## Stack
React 19 · Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Vercel

CSS-first animation (no heavy runtime animation library in the initial bundle). Bespoke UI primitives calibrated for the Obsidian & Copper aesthetic.

## Structure
```
src/
├── app/            App Router — single-page composition (page.tsx), layout, opengraph
├── components/
│   ├── sections/   Hero, Work, Skills, About, Contact, Footer
│   ├── ui/         Bespoke UI primitives (buttons, tags, dials, aura)
│   └── layout/     Nav, PageShell
├── content/        Typed content source (site.ts, brandIcons.ts)
└── styles/         globals.css with design-system tokens and custom utilities
public/
├── images/         Optimized webp portraits & project screenshots
└── resume/         Print-ready HTML resume & PDF
```

## Develop
```bash
pnpm install
pnpm dev
```

The Next.js development server will start on [http://localhost:3000](http://localhost:3000).

## Build & Verify
```bash
pnpm run typecheck
pnpm run lint
pnpm run build
```
