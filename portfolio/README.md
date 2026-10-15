# Portfolio — [Your Name]

Full-stack developer portfolio. Source of truth for content, design system,
and architecture before implementation. Every section of the live site pulls
its copy and structure from the files in this repo — content changes happen
here first, then flow into the build.

## Design direction (one line)

Editorial-Swiss minimalism with a single Art Deco–influenced accent line —
warm near-black base, cream type, one restrained accent color spent on
exactly one thing per screen. Full system in `docs/DESIGN-SYSTEM.md`.

## Repo structure

```
portfolio/
├── README.md                  You are here
├── ABOUT.md                   Long-form bio (source for About section + resume)
├── EXPERIENCE.md              Work history
├── EDUCATION.md               Formal education / certifications
├── SKILLS.md                  Full skills inventory, grouped
├── PROJECTS.md                Project index (short-form, links to /projects)
├── ACHIEVEMENTS.md            Awards, talks, open-source contributions
├── RESUME.md                  Resume metadata + download source
├── CONTACT.md                 Contact info + preferred channels
│
├── docs/                      How the site is designed and built
│   ├── DESIGN-SYSTEM.md       Color, type, spacing, components
│   ├── UI-UX.md               User flow, wireframes, interaction states
│   ├── TECH-STACK.md          What the site itself is built with
│   ├── ARCHITECTURE.md        Codebase file/folder structure
│   ├── PERFORMANCE.md         Performance budget and targets
│   ├── SEO.md                 Metadata, sitemap, social cards
│   ├── ACCESSIBILITY.md       WCAG target and specific commitments
│   ├── RESPONSIVE-DESIGN.md   Breakpoints and layout rules
│   ├── ANIMATIONS.md          The one motion moment, and where motion is banned
│   ├── DEPLOYMENT.md          Hosting, CI/CD, domains
│   └── DEVELOPMENT.md         Local setup, scripts, conventions
│
├── projects/                  One file per project — full technical detail
│   ├── KRAMA-OS.md
│   ├── LEDGERMIND.md
│   ├── HEALTHGUARD.md
│   └── future-project.md      Template — copy this for new projects
│
├── case-studies/              Long-form narrative version of each project
│   ├── KRAMA-OS-CASE-STUDY.md
│   ├── LEDGERMIND-CASE-STUDY.md
│   └── HEALTHGUARD-CASE-STUDY.md
│
└── content/                   Exact copy for each on-page section
    ├── HERO.md
    ├── ABOUT-SECTION.md
    ├── PROJECTS-SECTION.md
    ├── SKILLS-SECTION.md
    ├── EXPERIENCE-SECTION.md
    ├── CONTACT-SECTION.md
    └── FOOTER.md
```

## How to use this repo

1. Fill in every `[bracketed placeholder]` with your real content.
2. `docs/` is decided and shouldn't change per-project — it's the system.
3. `content/` is what actually renders on the page — keep it short. The long
   version of a project lives in `case-studies/`, not on the page itself.
4. Shipping a new project: copy `projects/future-project.md`, fill it in,
   write a matching case study, then add a short entry to `PROJECTS.md` and
   `content/PROJECTS-SECTION.md`.

## Page flow

```
Hero → Selected Work → Skills → About → Contact
```

One page, scroll-driven. No separate routes for v1 — each project opens as
an expanded panel rather than a new page, to keep the experience
uninterrupted. Full flow in `docs/UI-UX.md`.
