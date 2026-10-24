# Sudhanshu Kumar — Portfolio

<p align="left">
  <a href="https://sudhanshukumar03.vercel.app/"><img src="https://img.shields.io/badge/Live%20Portfolio-sudhanshukumar03.vercel.app-ea2e20?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Portfolio" /></a>
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16.4-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=black" alt="React 19" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.6-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript 5" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" /></a>
</p>

> *"Most developer portfolios look like a neon casino: purple gradients, floating spheres, and five years of experience claimed on a framework that came out eight months ago. I wanted a page that felt like an editorial dispatch — quiet, deliberate, and backed by code that actually runs."*

This repository houses the source code, design system, and technical case studies for my personal portfolio: **[sudhanshukumar03.vercel.app](https://sudhanshukumar03.vercel.app/)**.

Engineered with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**, the site prioritizes sub-second delivery, zero-runtime animation overhead, strict WCAG AA contrast standards, and deep technical transparency over generic templates.

---

## 📖 The Backstory & Honest Engineering Decisions

I am in my final year studying Electronics & Communication Engineering at JSS Academy of Technical Education in Bengaluru. When your background balances hardware fundamentals—debugging microcontroller register timings, clock drift, and signal noise—with building distributed web backends and LLM pipelines, you develop a natural allergy to fluff.

Building this portfolio went through distinct iterations and hard architectural subtractions:

### 1. The Interactive Mockup Trap (And what got killed)
In an early draft, I built a simulated in-browser interactive desktop widget for **KRAMA OS** (`components/krama/Panel.tsx`). While neat on paper, it required hundreds of lines of synthetic mock state just to render an artificial note-taking card. It was a distraction from real engineering.

**The Fix**: I deleted the simulated widget suite entirely. Instead, projects are documented with high-fidelity production captures and in-depth architectural case study modals that break down real database schemas, latency benchmarks, failure modes, and production trade-offs.

### 2. The Light Mode That Looked Like Undercooked Paper
I wrote a functioning `ThemeToggle` with `localStorage` synchronization and an inline anti-flash script. But when previewed in daytime conditions, the editorial typography lost its quiet authority and felt washed out. 

**The Fix**: Rather than keeping a mediocre theme switch merely to check a feature box, I deleted the toggle and locked the entire surface to an **Obsidian Dark** substrate. Subtraction is often the strongest design decision.

### 3. Eliminating Heavy Animation Libraries
I deliberately bypassed heavy JavaScript motion runtimes like Framer Motion for the core page layout. Delivering 35KB+ of parsing and execution overhead just to animate elements into view conflicts with building high-performance web systems.

**The Fix**:
- **Pure CSS Sticky Stacking**: The **Work** section features a tactile sticky deck (`.work-stack`) driven purely by native CSS `position: sticky; top: ...` with hardware acceleration.
- **Micro-interactions**: Subtle hairline border traces, hover state elevations, and active indicator pips execute entirely through CSS variables and keyframes.
- **Accessibility**: Full `@media (prefers-reduced-motion: reduce)` compliance is honored across all surfaces.

---

## 🎨 Design Philosophy: Obsidian & Scarlet Flame

The interface follows a strict visual hierarchy designed for typographic legibility and architectural density:

| Layer | Token / Value | Purpose |
| :--- | :--- | :--- |
| **Substrate** | `#0b0c0e` (Base Obsidian) | Warm deep charcoal foundation; prevents eye fatigue compared to harsh `#000000`. |
| **Elevations** | `#141720` / `#1b202c` | Elevated card surfaces, wells, and nested metadata containers. |
| **Primary Ink** | `#ffffff` / `#f1f3f7` | Crisp display text and headers exceeding 18:1 contrast ratios. |
| **Body Copy** | `#d4d9e2` | High-legibility editorial copy with optimal line height (13.5:1 contrast). |
| **Muted Ink** | `#a2abb9` / `#8a93a1` | Technical metadata, labels, and timestamps (exceeding WCAG AA 4.5:1). |
| **Signature Accent** | `#ea2e20` (Scarlet Flame) | Used strictly for 2–3% of the surface area: active pips, hairline traces, and focus seams. |

---

## ✨ Key Portfolio Features

- **Tactile Card Stack Deck**: Interactive project showcase using native sticky scroll physics with zero JavaScript runtime animation cost.
- **Deep-Dive Case Study Modals**: Accessible architectural overlays detailing system diagrams, edge cases, benchmarks, and honest "What broke & how it was fixed" disclosures.
- **Bengaluru Live Presence**: Live analog & digital time display synchronized with Indian Standard Time (IST, UTC+5:30) and an ambient activity status indicator.
- **Direct Web3Forms Dispatcher**: Integrated contact form with seamless AJAX submission, real-time feedback, and automated zero-JS `mailto:` fallbacks.
- **App Router Automated SEO**: Dynamically generated [`robots.txt`](https://sudhanshukumar03.vercel.app/robots.txt), [`sitemap.xml`](https://sudhanshukumar03.vercel.app/sitemap.xml), and dynamic Edge OpenGraph & Twitter preview banners (`/opengraph-image`).
- **Recruiter-Ready Resume**: Built-in interactive resume preview modal with direct PDF download and print-ready HTML styling (`/resume/Sudhanshu-Kumar-Resume.html`).

---

## 🏛️ Repository Architecture

```
portfolio/
├── README.md                          # Root documentation & architecture overview
├── package.json                       # Monorepo scripts (dev, build, lint, typecheck)
└── web/                               # Next.js 16 web application
    ├── README.md                      # Web application documentation
    ├── package.json                   # Dependencies (Next 16, React 19, Tailwind v4)
    ├── .env.example                   # Environment variable templates
    ├── public/
    │   ├── images/                    # Optimized portrait webp & project mockups
    │   ├── resume/                    # Print-ready HTML resume & PDF
    │   └── videos/                    # Motion demo assets
    └── src/
        ├── app/                       # App Router routes & handlers
        │   ├── layout.tsx             # Root layout, fonts, metadataBase
        │   ├── page.tsx               # Main single-page portfolio layout
        │   ├── robots.ts              # Automated robots.txt route handler
        │   ├── sitemap.ts             # Automated sitemap.xml route handler
        │   ├── opengraph-image.tsx    # Dynamic OpenGraph preview generator
        │   └── twitter-image.tsx      # Dynamic Twitter card preview generator
        ├── components/
        │   ├── layout/                # Nav.tsx, PageShell.tsx
        │   ├── sections/              # Hero, Work, About, CollaborateCTA, Contact, Footer
        │   └── ui/                    # CaseStudyModal, ContactForm, PresenceClock, AmbientAura, etc.
        ├── content/
        │   ├── site.ts                # Typed source of truth for site content & links
        │   ├── caseStudies.ts         # In-depth architectural case studies & diagrams
        │   └── brandIcons.ts          # Inline SVG icons for tech stack
        └── styles/
            └── globals.css            # Tailwind v4 theme tokens & custom utility classes
```

---

## 🛠️ Featured Systems

Four production-oriented projects demonstrating full-stack architecture, distributed systems, and applied AI:

### 1. KRAMA OS — Unified Productivity & Knowledge System
- **Problem**: Context fragmentation across disconnected tools (Notion, Linear, habit trackers, and AI chatbots).
- **Architecture**: Unified relational schema in PostgreSQL modeling nested rich-text document hierarchies (Tiptap editor), Kanban sprint workflows, habit telemetry, and local context-aware RAG search.
- **Stack**: Next.js 16, React 19, TypeScript, PostgreSQL, Prisma, Redis, Tiptap, LangChain.
- **Repository**: [github.com/sudhanshukumar03/KRAMA](https://github.com/sudhanshukumar03/KRAMA)

### 2. Context — Autonomous Incident Intelligence & Causal Dependency Graph
- **The Stance**: *Graphs map causality. Telemetry streams evidence. AI explains root causes. Engineers command.*
- **Problem**: When a service degrades under incident conditions, dozens of alerts fire simultaneously. Engineers waste 40+ minutes jumping across disconnected dashboards correlating logs by eye.
- **Architecture**: Live microservice dependency mapping as a directional DAG to calculate blast radius. Correlates Kubernetes rollouts, PagerDuty alerts, and Slack bridge logs in real time with revenue-at-risk estimation ($/hr). AI is strictly advisory and read-only; human operators hold execution authority.
- **Stack**: TypeScript 5.9, Express 5.0, React 19, Vite 7, PostgreSQL 16, Drizzle ORM, OpenAI GPT-4o-mini, Clerk.
- **Repository**: [github.com/sudhanshukumar03/Context](https://github.com/sudhanshukumar03/Context)

### 3. LedgerMind — AI Finance Controller for Payment Reconciliation
- **The Stance**: *Deterministic rules first, AI second.* LLMs must never be trusted with autonomous balance reconciliation without strict deterministic guardrails.
- **Architecture**: Ingests Razorpay webhook payloads with HMAC SHA-256 signature verification, normalizes external bank statements, and runs three-stage deterministic matching (Transaction ID, Bank UTR, fuzzy timestamps). Gemini is invoked exclusively on unresolved exception queues.
- **Stack**: NestJS, PostgreSQL, Prisma, Redis, BullMQ, Docker, Next.js, Google Gemini.
- **Repository**: [github.com/sudhanshukumar03/ledgerMind](https://github.com/sudhanshukumar03/ledgerMind)

### 4. Vyana — AI Health Monitoring System & IoT Vitals Pipeline
- **Problem**: Translating real-time analog biometric hardware signals into reliable clinical telemetry.
- **Architecture**: Bridges ESP32 hardware sensors (ECG, PPG, temperature) via WebSockets to a FastAPI pipeline, PostgreSQL time-series storage, and a low-latency clinical monitoring interface with predictive AI health alerts and continuous ECG canvas sweeps.
- **Stack**: React, TypeScript, FastAPI, PostgreSQL, ESP32 (C++), WebSockets.
- **Repository**: [github.com/sudhanshukumar03/healthguard](https://github.com/sudhanshukumar03/healthguard)

---

## 🏃 Local Development

### 1. Clone the repository
```bash
git clone https://github.com/sudhanshukumar03/portfolio.git
cd portfolio
```

### 2. Install dependencies
```bash
# From root or inside web/
npm install
# or with pnpm
pnpm --filter portfolio-web install
```

### 3. Setup environment variables
```bash
cp web/.env.example web/.env.local
```
Add your optional `NEXT_PUBLIC_WEB3FORMS_KEY` for contact form dispatch, or leave it blank to rely on the automated `mailto:` fallback.

### 4. Start the development server
```bash
npm run dev
# or
pnpm --prefix web dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Typecheck & Build
```bash
npm run typecheck
npm run build
```

---

## 📬 Contact & Links

I am based in Bengaluru, Karnataka, completing my degree and seeking full-time Software Engineering, Full-Stack, and Applied AI roles where architectural clarity, code quality, and user experience matter.

- **Live Portfolio**: [sudhanshukumar03.vercel.app](https://sudhanshukumar03.vercel.app/)
- **Email**: [sksingh032003@gmail.com](mailto:sksingh032003@gmail.com)
- **LinkedIn**: [linkedin.com/in/sudhanshurajputt](https://www.linkedin.com/in/sudhanshurajputt/)
- **GitHub**: [@sudhanshukumar03](https://github.com/sudhanshukumar03)
- **Twitter / X**: [@Sudhans69033589](https://x.com/Sudhans69033589)
- **WhatsApp**: [+91 93043 72352](https://wa.me/919304372352)

---

<p align="center">
  <sub>Built with care and attention to detail. No generic templates, no artificial animations, no fluff.</sub>
</p>
