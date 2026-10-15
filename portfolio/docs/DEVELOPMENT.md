# Development

## Setup
```
git clone [repo-url]
cd [repo-name]
npm install
npm run dev
```

## Conventions
- Content changes: edit the relevant `.md` file in this content repo
  first, never hardcode copy directly into a component
- Component naming: PascalCase, one component per file, colocated
  styles if using CSS modules
- Commits: [pick a convention — e.g. Conventional Commits
  (`feat:`, `fix:`, `content:`) so content-only changes are easy to
  distinguish from code changes in history]

## Scripts
| Command | Purpose |
|---|---|
| `npm run dev` | local dev server |
| `npm run build` | production build |
| `npm run lint` | lint check |
| `npm run typecheck` | TypeScript check |

## Adding a new project
1. Copy `projects/future-project.md` → `projects/[NAME].md`, fill in
2. Copy a case study template → `case-studies/[NAME]-CASE-STUDY.md`
3. Add a short entry to `PROJECTS.md`
4. Add a short entry to `content/PROJECTS-SECTION.md`
5. Add project images to `public/images/projects/[name]/`
