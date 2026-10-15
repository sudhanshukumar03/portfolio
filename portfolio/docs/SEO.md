# SEO & Metadata Architecture

## Metadata (Root & Pages)
- **Title**: `Sudhanshu Kumar — Full-Stack & Systems Developer`
- **Description**: `Full-stack engineer building resilient web apps, distributed backend systems, and applied AI workflows. Final-year ECE at JSSATE Bengaluru.`
- **Open Graph Card**: Custom editorial metadata card with name, title, and copper accent line (`/images/og-card.png`).

## Structured Data (JSON-LD)
- `Person` schema:
  - `name`: "Sudhanshu Kumar"
  - `jobTitle`: "Full-Stack & Systems Developer"
  - `alumniOf`: "JSS Academy of Technical Education, Bengaluru"
  - `sameAs`:
    - `https://github.com/sudhanshukumar03`
    - `https://www.linkedin.com/in/sudhanshu-kumar-7284b328a`
- `CreativeWork` schemas for:
  - Context (`https://github.com/sudhanshukumar03/Context`)
  - KRAMA OS (`https://github.com/sudhanshukumar03/KRAMA`)
  - LedgerMind (`https://github.com/sudhanshukumar03/ledgerMind`)
  - HealthGuard (`https://github.com/sudhanshukumar03/healthguard`)

## Technical SEO
- Dynamic `sitemap.xml` and `robots.txt` generated automatically by Next.js app router.
- Canonical URL pointing to production deployment domain.
- Semantic HTML throughout: single `h1`, structured landmark regions (`<header>`, `<main>`, `<section>`, `<footer>`), descriptive ARIA tags.
