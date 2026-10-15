# Deployment

## Hosting
[e.g. Vercel — pick based on framework choice in TECH-STACK.md]

## Domain
[yourname.dev] or [yourname.com] — a `.dev` domain reads well
specifically for a developer portfolio.

## CI/CD
- Push to `main` → automatic production deploy
- Pull requests → automatic preview deploy for review before merge
- Build must pass: type check, lint, and a Lighthouse CI threshold
  (see `PERFORMANCE.md` targets) before merge is allowed

## Environments
| Environment | Branch | URL |
|---|---|---|
| Production | `main` | [yourdomain] |
| Preview | any PR | auto-generated preview URL |

## Pre-deploy checklist
- [ ] Resume PDF is current (see `RESUME.md` checklist)
- [ ] All project links (live + GitHub) return 200, not 404
- [ ] Contact email is correct and tested
- [ ] Lighthouse scores meet `PERFORMANCE.md` targets
- [ ] Accessibility checklist in `ACCESSIBILITY.md` passed
