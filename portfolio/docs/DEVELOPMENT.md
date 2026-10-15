# Local Development & Engineering Conventions

## Setup
```bash
git clone https://github.com/sudhanshukumar03/portfolio.git
cd portfolio/web
npm install
npm run dev
```

The Next.js development server runs at `http://localhost:3000`.

## Conventions
- **Single Source of Truth**: All profile data, project details, and technical case studies are maintained in markdown files under `portfolio/` and mirrored in `web/src/content/site.ts`.
- **Component Architecture**: PascalCase components under `web/src/components/`, divided into atomic `ui/` elements and full-width `sections/`.
- **Commit Format**: Conventional Commits (`feat:`, `fix:`, `docs:`, `perf:`, `refactor:`) to maintain clean, audit-friendly git history.

## Scripts (Executed from `web/`)
| Command | Purpose |
|---|---|
| `npm run dev` | Starts local Next.js development server with hot-reload |
| `npm run build` | Compiles production bundle and checks static page generation |
| `npm run typecheck` | Runs strict TypeScript verification (`tsc --noEmit`) |
| `npm run lint` | Runs ESLint over components and utility files |

## Adding a New Project
1. Copy `projects/future-project.md` → `projects/<PROJECT_NAME>.md` and document the system invariants and architecture.
2. Create a narrative retrospective in `case-studies/<PROJECT_NAME>-CASE-STUDY.md`.
3. Add a short entry to `PROJECTS.md` and `content/PROJECTS-SECTION.md`.
4. Add the project entry with wordmark and asset paths in `web/src/content/site.ts`.
5. Place screenshots/mockups in `web/public/images/`.
