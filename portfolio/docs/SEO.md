# SEO

## Metadata (per page / root)
- Title: `[Your Name] — Full-Stack Developer`
- Description: one sentence, matches Hero tagline — specific, not generic
- Open Graph image: custom card (name + role + one visual element from
  the palette), not a generic screenshot

## Structured data
- `Person` schema (JSON-LD) with name, role, sameAs (GitHub, LinkedIn)
- `CreativeWork` schema per project, if project pages are indexed
  individually

## Technical
- `sitemap.xml` generated at build time
- `robots.txt` allowing full indexing
- Canonical URLs on every page
- Semantic HTML throughout (see ACCESSIBILITY.md — the two overlap
  heavily: correct heading order and landmark regions help both)

## Content
- Each project's short description (in `PROJECTS.md` / `projects/*.md`)
  doubles as its meta description — write it for a human first, it'll
  work for search too
