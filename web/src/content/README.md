# content/

Build-time content mirror of the `portfolio/` docs repo. The content loader
(`src/lib/content.ts`) parses these markdown files into typed data at build
time. Section components import from that loader and never hardcode copy.

Populate this from `portfolio/content/*`, `portfolio/projects/*`, and the
root docs (`ABOUT.md`, `SKILLS.md`, etc.).
