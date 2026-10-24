# portfolio-web

Production implementation of Sudhanshu Kumar's personal portfolio web application.

- **Live URL**: [https://sudhanshukumar03.vercel.app](https://sudhanshukumar03.vercel.app/)
- **Repository**: [https://github.com/sudhanshukumar03/portfolio](https://github.com/sudhanshukumar03/portfolio)

## Stack
React 19 · Next.js 16 (App Router) · TypeScript 5.6 · Tailwind CSS v4 · Vercel

CSS-first animations with zero runtime animation library in the initial bundle. Bespoke UI primitives calibrated for the **Obsidian & Scarlet Flame** aesthetic (`#0b0c0e` charcoal base, `#ea2e20` scarlet accents).

## Structure
```
src/
├── app/            App Router — page.tsx, layout, opengraph, twitter-image, sitemap, robots
├── components/
│   ├── sections/   Hero, Work (sticky deck), About, CollaborateCTA, Contact, Footer
│   ├── ui/         Bespoke UI primitives (CaseStudyModal, PresenceClock, ContactForm, etc.)
│   └── layout/     Nav, PageShell
├── content/        Typed content source (site.ts, caseStudies.ts, brandIcons.ts)
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
