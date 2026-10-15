# Deployment Architecture & CI/CD

## Hosting Platform
- **Frontend & Web Client**: **Vercel** — deployed directly from GitHub repository `sudhanshukumar03/portfolio`.
- **Environment**: Next.js 16 Edge / Node.js runtime with global CDN edge caching for static assets and images.

## Repository & Branch Strategy
- **Repository**: [github.com/sudhanshukumar03/portfolio](https://github.com/sudhanshukumar03/portfolio)
- **Primary Branch**: `main` — commits automatically trigger production build and deployment.
- **Preview Branches**: Pull requests generate preview deployments for staging review.

## CI/CD Pipeline
- **Continuous Integration**:
  - `npm run typecheck` — strict TypeScript verification across all components and content modules.
  - `npm run lint` — ESLint validation.
  - `npm run build` — Next.js production bundle compilation and static route pre-rendering.

## Environments
| Environment | Branch | Hosting Provider | Purpose |
|---|---|---|---|
| **Production** | `main` | Vercel Edge Network | Live public portfolio |
| **Preview** | Feature branches / PRs | Vercel Preview Deployments | Staging visual verification |

## Pre-Deploy Verification Checklist
- [x] Resume PDF (`Sudhanshu-Kumar-Resume.pdf`) generated and verified via Chrome headless.
- [x] All external project URLs (Context, KRAMA OS, LedgerMind, HealthGuard) return HTTP 200.
- [x] Primary communication channels (Email, LinkedIn, GitHub) verified.
- [x] Responsive layout verified across mobile (375px), tablet (768px), and desktop (1440px).
- [x] 100% build health verified locally prior to push.
