# Sudhanshu Kumar — Portfolio

> *"Most developer portfolios look like a neon casino: purple gradients, floating spheres, and five years of experience claimed on a framework that came out eight months ago. I wanted a page that felt like an editorial dispatch — quiet, deliberate, and backed by code that actually runs."*

This is the source code and design documentation for my personal portfolio: **[sudhanshukumar.dev](https://sudhanshukumar.dev)**.

It’s built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**, paired with a custom CSS design system. But more than the stack, it's an honest record of how I think about full-stack engineering, applied AI, and user interfaces.

---

## 📖 The Backstory & The Flaws

I’m in my final year studying Electronics & Communication Engineering at JSS Academy of Technical Education in Bengaluru. When you spend your mornings debugging microcontroller timing registers and your nights writing PostgreSQL queries or LangChain pipelines, you develop a low tolerance for fluff.

When I sat down to build this site, I made several mistakes before getting it right:

### 1. The Interactive Mockup Trap (And what got killed)
In the first iteration, I tried to write a mini in-browser dashboard for **KRAMA OS** directly inside React (`components/krama/Panel.tsx` and custom authored icon sets). It was clever, but it was also bloated. It took hundreds of lines of simulation state just to show someone a fake preview of a note-taking tool inside a card. It distracted from the actual engineering of KRAMA OS.

I ended up deleting the entire simulated dashboard component suite. Instead, I replaced it with authentic, high-resolution interface captures and deep-dive technical case studies. The portfolio is meant to show what I've shipped, not run a simulation inside a simulation.

### 2. The Light Mode That Looked Like Undercooked Paper
I wrote a working `ThemeToggle` component with localStorage persistence and an inline anti-flash script. Then I looked at the light theme in broad daylight: it was awful. 

The copper accent—which looks sharp against warm obsidian near-black (`#0b0c0e`)—looked muddy on cream white. The typography lost its quiet authority and felt like a printed receipt. Rather than keep a mediocre light theme just to tick the *"Look, I have a theme switcher!"* box, I deleted the toggle and permanently locked the site to the obsidian dark editorial palette. Sometimes the best design decision is subtraction.

### 3. Killing Heavy Animation Libraries
I initially considered pulling in heavy runtime animation packages like Framer Motion for the layout transitions. But loading 30KB+ of JavaScript just to slide cards into view felt hypocritical for someone who preaches web performance. 

Instead:
- The **Work** section’s layered deck uses pure native CSS `position: sticky` (`.work-stack`), keeping the main thread free.
- Section dividers use a hairline copper trace line that animates with CSS keyframes.
- Reduced-motion queries are respected out of the box.

---

## 🎨 Design Philosophy: Obsidian & Copper

The aesthetic is built around three rules:
1. **Neutrals do 85% of the heavy lifting**: The base is warm charcoal/obsidian (`#0b0c0e`), not harsh `#000000`. Body text is an off-white cream that doesn't burn your eyes.
2. **One single accent spent sparingly**: Copper (`#b0592f` / `#c86d3b`). It is never used as body text. It is reserved strictly for structural traces, active navigation pips, and wordmark seams. It's a quiet nod to copper PCB traces from my ECE coursework.
3. **Editorial Typography**:
   - **Fraunces**: A high-contrast optical serif used for major display titles. It gives the page weight and rhythm.
   - **Inter Tight**: Clean, slightly condensed sans-serif for comfortable reading.
   - **IBM Plex Mono**: Reserved strictly for technical metadata, stats, and code tags.

---

## 🏛️ Architecture: The Two Halves

I chose to split this repository into two distinct halves:

```
├── portfolio/             # 🧠 The Think Tank (Source of Truth)
│   ├── case-studies/      # Detailed engineering retrospectives
│   │   ├── KRAMA-OS-CASE-STUDY.md
│   │   ├── CONTEXT-CASE-STUDY.md
│   │   ├── LEDGERMIND-CASE-STUDY.md
│   │   └── HEALTHGUARD-CASE-STUDY.md
│   ├── content/           # Exact copy for on-page sections
│   ├── docs/              # Architecture, Design System, SEO, A11y rules
│   └── projects/          # Raw project specs & technical boundaries
│
├── web/                   # ⚡ The Engine Room (Next.js Implementation)
│   ├── src/
│   │   ├── app/           # App Router, opengraph generation, layout
│   │   ├── components/    # Reusable sections & bespoke UI primitives
│   │   ├── content/       # Typed content registry (site.ts, brandIcons.ts)
│   │   └── styles/        # CSS variables & typography tokens (globals.css)
│   └── public/            # Optimized webp portraits, resume HTML/PDF, project mockups
│
├── DESIGN.md              # Living design constitution
└── PRODUCT.md             # Positioning, audience, and evidence
```

### Why keep markdown docs alongside the code?
Because writing copy directly in TSX files leads to messy commits and sloppy prose. Before a single section was rendered, the case studies and architectural decisions were documented in `portfolio/`. When I want to revise a case study or clarify a project's technical limits, I do it in markdown first.

---

## 🛠️ The Real Projects Featured

I don't believe in listing tutorial clones. The four featured systems represent distinct engineering challenges:

### 1. KRAMA OS — Unified Productivity & Knowledge System
- **The Problem**: Switching between Notion, Linear, habit trackers, and ChatGPT fragments context.
- **The Architecture**: A unified PostgreSQL schema connecting nested rich-text documents (Tiptap editor), Kanban sprint execution, habit tracking, and local context-aware RAG search.
- **Stack**: Next.js, TypeScript, PostgreSQL, Prisma, Redis, Tiptap, RAG.
- [GitHub Repo](https://github.com/sudhanshukumar03/KRAMA) · [Read Case Study](file:///c:/Users/sksin/Downloads/portfolio-docs%20%281%29/portfolio/case-studies/KRAMA-OS-CASE-STUDY.md)

### 2. Context — Autonomous Incident Intelligence & Causal Dependency Graph
- **The Stance**: *Graphs map causality. Telemetry streams evidence. AI explains root causes. Engineers command.*
- **The Problem**: When a service degrades at 2:14 AM, thirty alerts fire simultaneously across Datadog and PagerDuty. Engineers waste 40+ minutes jumping between four dashboards and correlating timestamps by eye before finding a config push made six minutes prior.
- **The Architecture**: Models live microservice dependencies as a directional DAG to compute blast radius. Correlates Kubernetes deployments, PagerDuty alerts, and Slack bridge logs in real time. Provides role-based lenses (Engineer, SRE, Manager) with revenue exposure ($/hr) and an isolated simulation sandbox for dry-run rollbacks. AI is strictly read-only; human engineers authorize commands.
- **Stack**: TypeScript 5.9, Express 5.0, React 19, Vite 7, PostgreSQL 16, Drizzle ORM, OpenAI GPT-4o-mini, Clerk.
- [GitHub Repo](https://github.com/sudhanshukumar03/Context) · [Read Case Study](file:///c:/Users/sksin/Downloads/portfolio-docs%20%281%29/portfolio/case-studies/CONTEXT-CASE-STUDY.md)

### 3. LedgerMind — AI Finance Controller for Payment Reconciliation
- **The Stance**: *Deterministic rules first, AI second.* LLMs are notoriously bad at basic arithmetic and should never be trusted to reconcile money on their own.
- **The Architecture**: Ingests Razorpay webhooks, verifies HMAC signatures, normalizes bank statements, and runs deterministic matching (exact transaction ID, bank UTR, fuzzy timestamps). The AI layer (Gemini via LangChain) is invoked *only* to investigate unresolved exceptions and summarize discrepancies for human operators.
- **Stack**: NestJS, PostgreSQL, Prisma, Redis, BullMQ, Docker, Next.js, Gemini.
- [GitHub Repo](https://github.com/sudhanshukumar03/ledgerMind) · [Read Case Study](file:///c:/Users/sksin/Downloads/portfolio-docs%20%281%29/portfolio/case-studies/LEDGERMIND-CASE-STUDY.md)

### 4. HealthGuard — Hardware Sensor to Cloud Pipeline
- **The Reality Check**: This is an exploratory prototype, not an FDA-cleared diagnostic device.
- **The Architecture**: ESP32 microcontrollers wire into pulse oximeters (MAX30102) and temperature probes, transmitting telemetry via JSON over HTTP to a Node.js ingestion backend, storing raw series in PostgreSQL, and graphing trends on a responsive dashboard.
- **Stack**: ESP32 (C++), Node.js, PostgreSQL, Python, React.
- [GitHub Repo](https://github.com/sudhanshukumar03/healthguard) · [Read Case Study](file:///c:/Users/sksin/Downloads/portfolio-docs%20%281%29/portfolio/case-studies/HEALTHGUARD-CASE-STUDY.md)

---

## 🏃 Getting Started Locally

If you'd like to run the portfolio locally or explore the code:

### 1. Clone the repo
```bash
git clone https://github.com/sudhanshukumar03/portfolio.git
cd portfolio/web
```

### 2. Install dependencies
```bash
pnpm install
# or npm install / yarn install
```

### 3. Setup environment keys
```bash
cp .env.example .env.local
```
*(Optional: Add a Web3Forms key if you want the contact form to actually dispatch emails, or leave it blank to test the automatic `mailto:` fallback).*

### 4. Run development server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to view the page.

### 5. Typecheck & Build
```bash
pnpm run typecheck
pnpm run build
```

---

## 📬 Contact & Links

I’m currently based in Bengaluru, Karnataka, finishing my degree and looking for full-time software engineering and AI systems roles where code quality, scalable architecture, and thoughtful UX matter.

- **Portfolio**: [sudhanshukumar.dev](https://sudhanshukumar.dev)
- **Email**: [sksingh032003@gmail.com](mailto:sksingh032003@gmail.com)
- **LinkedIn**: [linkedin.com/in/sudhanshurajputt](https://www.linkedin.com/in/sudhanshurajputt/)
- **GitHub**: [@sudhanshukumar03](https://github.com/sudhanshukumar03)
- **Twitter / X**: [@Sudhans69033589](https://x.com/Sudhans69033589)
- **WhatsApp**: [+91 93043 72352](https://wa.me/919304372352)

---

*Authored with care. No cookie-cutter templates, no purple blur halos, no faked client testimonials.*
