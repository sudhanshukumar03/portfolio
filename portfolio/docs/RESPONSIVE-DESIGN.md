# Responsive Design

## Breakpoints
| Name | Width |
|---|---|
| Mobile | < 640px |
| Tablet | 640–1024px |
| Desktop | 1024–1440px |
| Wide | > 1440px |

## Layout rules by breakpoint

**Mobile**
- Hero: name stacks above photo (photo behind/below type, not
  overlapping to the side — overlap needs width to read cleanly)
- Nav collapses to a simple horizontal row or a minimal menu — avoid a
  heavy hamburger+drawer pattern if only 4 links exist
- Project list: stack tags wrap under the project name
- Section padding reduces from 120–160px to 64px vertical

**Tablet**
- Hero keeps side-by-side type/photo but at reduced type scale
- Two-column layouts (if any, e.g. skills groups) collapse to one

**Desktop / Wide**
- Full layout as specified in `UI-UX.md`
- Max content width capped (e.g. 1200–1320px) and centered — do not
  let line lengths or list items stretch full-bleed on very wide
  screens

## Images
- Hero photo: `srcset` with mobile/tablet/desktop crops — the overlap
  composition may need a different crop on mobile than desktop, not
  just a scaled-down version
