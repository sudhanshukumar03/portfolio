// Brand glyphs for the Skills cards. Each tool that has a recognizable logo maps
// to a Simple Icons single-path SVG rendered in its official color. Brands whose
// official color is (near-)black would vanish on the dark substrate, so they're
// flagged `mono` and inherit the theme ink instead — the same monochrome-brand
// convention the social icons use. Tools with no real logo (REST APIs, SQL, RAG,
// concepts) simply have no entry and render as plain text chips.
import {
  siReact,
  siNextdotjs,
  siTypescript,
  siJavascript,
  siTailwindcss,
  siHtml5,
  siCss,
  siShadcnui,
  siFramer,
  siReactquery,
  siVite,
  siNodedotjs,
  siNestjs,
  siExpress,
  siFastify,
  siSocketdotio,
  siPostgresql,
  siMongodb,
  siPrisma,
  siDrizzle,
  siRedis,
  siLangchain,
  siGooglegemini,
  siHuggingface,
  siOllama,
  siDocker,
  siNginx,
  siGithubactions,
  siPnpm,
  siVercel,
  siRailway,
  siPython,
} from "simple-icons";

export type BrandIcon = { path: string; color: string; mono?: boolean };

const hex = (h: string) => `#${h}`;

// mono → ignore the (near-black) brand hex, use currentColor so it adapts to theme.
export const brandIcons: Record<string, BrandIcon> = {
  // Frontend
  "React 19": { path: siReact.path, color: hex(siReact.hex) },
  "Next.js 16": { path: siNextdotjs.path, color: hex(siNextdotjs.hex), mono: true },
  "TypeScript": { path: siTypescript.path, color: hex(siTypescript.hex) },
  "JavaScript": { path: siJavascript.path, color: hex(siJavascript.hex) },
  "Tailwind CSS v4": { path: siTailwindcss.path, color: hex(siTailwindcss.hex) },
  "HTML5": { path: siHtml5.path, color: hex(siHtml5.hex) },
  "CSS3": { path: siCss.path, color: hex(siCss.hex) },
  // Libraries & UI
  "shadcn/ui": { path: siShadcnui.path, color: hex(siShadcnui.hex), mono: true },
  "Framer Motion": { path: siFramer.path, color: hex(siFramer.hex) },
  "TanStack Query": { path: siReactquery.path, color: hex(siReactquery.hex) },
  "Vite": { path: siVite.path, color: hex(siVite.hex) },
  // Backend
  "Node.js": { path: siNodedotjs.path, color: hex(siNodedotjs.hex) },
  "NestJS": { path: siNestjs.path, color: hex(siNestjs.hex) },
  "Express.js": { path: siExpress.path, color: hex(siExpress.hex), mono: true },
  "Fastify": { path: siFastify.path, color: hex(siFastify.hex), mono: true },
  "WebSockets / Socket.IO": { path: siSocketdotio.path, color: hex(siSocketdotio.hex), mono: true },
  // Databases & Data
  "PostgreSQL": { path: siPostgresql.path, color: hex(siPostgresql.hex) },
  "MongoDB": { path: siMongodb.path, color: hex(siMongodb.hex) },
  "pgvector": { path: siPostgresql.path, color: hex(siPostgresql.hex) },
  "Prisma ORM": { path: siPrisma.path, color: hex(siPrisma.hex), mono: true },
  "Drizzle ORM": { path: siDrizzle.path, color: hex(siDrizzle.hex) },
  "Redis": { path: siRedis.path, color: hex(siRedis.hex) },
  // AI & Generative AI
  "LangChain": { path: siLangchain.path, color: hex(siLangchain.hex) },
  "LangGraph": { path: siLangchain.path, color: hex(siLangchain.hex) },
  "Hugging Face": { path: siHuggingface.path, color: hex(siHuggingface.hex) },
  "Ollama": { path: siOllama.path, color: hex(siOllama.hex), mono: true },
  "Vercel AI SDK": { path: siVercel.path, color: hex(siVercel.hex), mono: true },
  "Gemini": { path: siGooglegemini.path, color: hex(siGooglegemini.hex) },
  // DevOps & Deployment
  "Docker": { path: siDocker.path, color: hex(siDocker.hex) },
  "Docker Compose": { path: siDocker.path, color: hex(siDocker.hex) },
  "Nginx": { path: siNginx.path, color: hex(siNginx.hex) },
  "GitHub Actions": { path: siGithubactions.path, color: hex(siGithubactions.hex) },
  "pnpm": { path: siPnpm.path, color: hex(siPnpm.hex) },
  "Vercel": { path: siVercel.path, color: hex(siVercel.hex), mono: true },
  "Railway": { path: siRailway.path, color: hex(siRailway.hex), mono: true },
  "Python": { path: siPython.path, color: hex(siPython.hex) },
};
