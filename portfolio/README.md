# Portfolio — Sudhanshu Kumar

Full-stack developer portfolio and technical documentation repository. Source of truth for content, design system, and architecture before implementation. Every section of the live site pulls its copy and structure from the files in this repo — content changes happen here first, then flow into the build.

## Design direction (one line)

Editorial-Swiss minimalism with a single Art Deco–influenced accent line — warm near-black base, cream type, one restrained accent color spent on exactly one thing per screen. Full system in `docs/DESIGN-SYSTEM.md`.

## Repo structure

```
portfolio/
├── README.md                  You are here
├── ABOUT.md                   Long-form bio (source for About section + resume)
├── EXPERIENCE.md              Work history & project-based engineering record
├── EDUCATION.md               Formal education / JSSATE Bengaluru (2023–2027)
├── SKILLS.md                  Full skills inventory, grouped
├── PROJECTS.md                Project index (short-form, links to /projects)
├── ACHIEVEMENTS.md            Algorithms, system milestones, open-source work
├── RESUME.md                  Resume metadata + download source
├── CONTACT.md                 Contact info + direct routes (Email, GitHub, LinkedIn)
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
│   ├── CONTEXT.md             Autonomous Incident Intelligence & Causal Graphs
│   ├── KRAMA-OS.md            Unified Productivity & Knowledge Operating System
│   ├── LEDGERMIND.md          AI Finance Controller for Razorpay Reconciliation
│   ├── HEALTHGUARD.md         Hardware Sensor Telemetry & Biomedical Dashboard
│   └── future-project.md      Template — copy this for new projects
│
├── case-studies/              Long-form narrative deep-dives of each system
│   ├── CONTEXT-CASE-STUDY.md
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

## How this documentation is maintained

1. All profile, contact, education, and skill inventories are kept 100% in sync with the live site and `Sudhanshu-Kumar-Resume.html`.
2. `docs/` defines the design system and operational invariants.
3. `content/` contains the concise copy rendered directly on the single-page scroll. The exhaustive architectural specs live in `projects/`, and the deep narrative retrospectives live in `case-studies/`.
4. Adding a new project: copy `projects/future-project.md`, fill it in, write a matching case study in `case-studies/`, then add short-form entries to `PROJECTS.md` and `content/PROJECTS-SECTION.md`.

## Page flow

```
Hero → Selected Work → Skills → About → Contact
```

One page, scroll-driven. Each project opens as an expanded panel rather than a new page, keeping the user experience cohesive and uninterrupted. Full flow in `docs/UI-UX.md`.
