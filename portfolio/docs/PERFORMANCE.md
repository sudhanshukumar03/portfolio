# Performance Budget

A developer portfolio that's slow undercuts its own message. Targets:

| Metric | Target |
|---|---|
| Lighthouse Performance | 95+ |
| LCP (Largest Contentful Paint) | < 2.0s |
| INP (Interaction to Next Paint) | < 200ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| Total JS shipped (initial) | < 150KB gzipped |
| Hero image | served as WebP/AVIF, responsive `srcset`, no layout shift |

## Rules
- Fonts: self-hosted, `font-display: swap`, subset to used characters
- Images: next-gen formats, lazy-loaded below the fold, hero image
  preloaded
- No unused component libraries — every dependency justified
- Static generation over client-side rendering wherever possible
- Animation: CSS transforms/opacity only (GPU-accelerated), never
  animate layout properties (width/height/top/left)
