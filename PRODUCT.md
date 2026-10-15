# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters, hiring managers, and technical interviewers evaluating
Sudhanshu Kumar for full-time software / AI engineering roles. They arrive from
a résumé, LinkedIn, or a referral, often skimming on limited time, and decide
whether he is worth a conversation. Secondary: prospective freelance / project
clients. The portfolio serves both, but employment is the primary intent —
success is a recruiter reaching out about a role (freelance inquiry is the
secondary win).

## Product Purpose

A single-page personal portfolio that presents Sudhanshu Kumar as a full-stack
developer and AI engineer and gets qualified visitors to make contact. It exists
to convert a skim into a credible impression and an outbound message (email /
WhatsApp) — not to be a comprehensive résumé dump.

## Positioning

A final-year Electronics & Communication Engineering student who ships
production-oriented full-stack and AI systems, not demos. The differentiator is
end-to-end range — data model to deployed UI — paired with an honest engineering
stance (e.g. LedgerMind runs deterministic reconciliation first and uses the LLM
only to investigate exceptions; HealthGuard is framed as an exploratory concept,
not validated medical monitoring).

## Operating Context

- Single-page site, top-down flow: Hero → Work → Skills → About → Contact.
- Content is authored in a typed module and mirrors the source-of-truth docs in
  `portfolio/` (`portfolio/content/*`, `portfolio/projects/*`,
  `portfolio/docs/*`). Copy changes should stay consistent with those docs.
- Visitors skim first; most decide in the hero and the Work list.
- Primary conversion actions: email (mailto) and WhatsApp; secondary: GitHub,
  LinkedIn, X.

## Capabilities and Constraints

- Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict), Tailwind
  CSS v4. Statically generated; content from a typed module
  (`web/src/content/site.ts`); no database, no server secrets.
- Animation is CSS-first (no Framer Motion in the core build); shadcn/ui and
  Framer Motion are listed skills, not site dependencies.
- Deploy target: Vercel.
- Featured work is fixed at three projects: **KRAMA OS**, **LedgerMind**,
  **HealthGuard** — unless the user says otherwise.
- Terminology: "Full-Stack Developer & AI Engineer" is the role line.

## Brand Commitments

- Name: Sudhanshu Kumar. Monogram: SK.
- Real links only — email `sksingh032003@gmail.com`, GitHub
  `github.com/sudhanshukumar03`, LinkedIn `linkedin.com/in/sudhanshurajputt`,
  X `x.com/Sudhans69033589`. Never invent handles, URLs, or a different email.
- Contact via WhatsApp is expressed as a WhatsApp icon/link that opens a chat
  directly (wa.me deep link), in place of a plain displayed phone number.
- HealthGuard must always be framed as an exploratory concept, not validated
  medical monitoring.

## Evidence on Hand

- Real project documentation and case studies in `portfolio/projects/*` and
  `portfolio/case-studies/*` (KRAMA OS, LedgerMind, HealthGuard).
- Real résumé / education / contact facts in `portfolio/RESUME.md`,
  `portfolio/EDUCATION.md`, `portfolio/CONTACT.md`.
- Real portrait at `web/public/images/portrait.webp`; SK logo source at
  `web/public/images/logo.png`.
- No testimonials, client metrics, employer references, press, or benchmarks
  exist — future work must not fabricate them.

## Product Principles

- Honest engineering over hype: state what is built, in progress, or conceptual.
- Convert the skim: the hero and Work list must land the value fast.
- Real proof only: every link, project, and claim traces to something real.
- One coherent system: on-page content stays consistent with the `portfolio/`
  source docs.

## Accessibility & Inclusion

Target WCAG 2.1 AA: text/meaningful contrast ≥ 4.5:1 (≥ 3:1 for large / non-text),
visible keyboard focus, and `prefers-reduced-motion` respected (motion is
opt-out, non-essential).
