# Sudhanshu Kumar — Portfolio

Personal portfolio and documentation repo for **Sudhanshu Kumar** (Full-Stack Developer & AI Engineer).

Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4, adhering to an obsidian dark editorial design system.

---

## 🏗️ Repository Architecture

This repository contains both the live web implementation and the complete source-of-truth content & design documentation:

```
├── web/                   # Next.js 16 application (implementation)
│   ├── src/
│   │   ├── app/           # App Router routes & metadata
│   │   ├── components/    # Bespoke UI & section components (Hero, Work, Skills, About, Contact)
│   │   ├── content/       # On-page content data & brand assets
│   │   ├── lib/           # Types & utilities
│   │   └── styles/        # CSS design system tokens (globals.css)
│   └── public/            # Static assets (images, icons, resume)
│
├── portfolio/             # Source of truth documentation & narrative
│   ├── case-studies/      # Deep-dive project case studies (KRAMA OS, LedgerMind, HealthGuard)
│   ├── content/           # Section copy specifications
│   ├── docs/              # System specifications (Design, Architecture, SEO, A11y, Performance)
│   └── projects/          # Technical specifications per project
│
├── DESIGN.md              # Design constitution & token specification
└── PRODUCT.md             # Product requirements, positioning, & principles
```

---

## ⚡ Tech Stack

- **Framework**: Next.js 16 (Turbopack, App Router, Static Optimization)
- **UI Library**: React 19
- **Language**: TypeScript 5.6
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design Tokens
- **Icons**: Simple Icons + Bespoke SVGs
- **Deployment**: Vercel

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm (or npm / yarn)

### Local Development

1. Navigate to the `web` directory:
   ```bash
   cd web
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or: npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Start the development server:
   ```bash
   pnpm dev
   # or: npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Quality Checks & Build

```bash
cd web
npm run typecheck    # Validate TypeScript types
npm run build        # Production Next.js build
```

---

## 👤 Author

**Sudhanshu Kumar**
- Portfolio: [sudhanshukumar.dev](https://sudhanshukumar.dev)
- GitHub: [@sudhanshukumar03](https://github.com/sudhanshukumar03)
- LinkedIn: [sudhanshurajputt](https://www.linkedin.com/in/sudhanshurajputt/)
- Email: [sksingh032003@gmail.com](mailto:sksingh032003@gmail.com)

---

## 📄 License

This repository is private / personal to Sudhanshu Kumar. All rights reserved.
