// Single typed source of truth for on-page content.
// Mirrors portfolio/content/* and portfolio/projects/*. Sections import from here.

export const profile = {
  name: "Sudhanshu Kumar",
  displayName: ["SUDHANSHU", "KUMAR"], // stacked hero lines
  role: "Full-Stack Developer & AI Engineer",
  status: "Available for new roles",
  monogram: "SK",
  motto: ["Build", "Learn", "Create"],
  sideLabelsLeft: ["Ideas", "Systems", "Impact"],
  sideLabelsRight: ["Tech", "Product", "People"],
  tagline:
    "I build full-stack applications and AI-powered systems — with a focus on scalable architecture, thoughtful UX, and practical problem-solving.",
  location: "Bengaluru, Karnataka",
  // Hero metadata (Mono) — concise positioning, not a résumé line.
  heroMeta: ["ECE", "Full-Stack", "AI"],
  // Fuller facts live in About; kept here for reference/reuse.
  heroStats: ["7.6/10 CGPA", "ECE", "Bengaluru, Karnataka"],
  links: {
    github: "https://github.com/sudhanshukumar03",
    linkedin: "https://www.linkedin.com/in/sudhanshurajputt/",
    x: "https://x.com/Sudhans69033589",
    email: "sksingh032003@gmail.com",
    phone: "+91 93043 72352",
    // WhatsApp deep link — opens a chat directly (digits only, country code, no +).
    whatsapp: "https://wa.me/919304372352",
    discord: "https://discord.gg/bWaqCsvV4",
    // Résumé — drop the PDF at web/public/resume/ under this exact filename.
    resume: "/resume/Sudhanshu-Kumar-Resume.pdf",
  },
} as const;

// About sidebar — offset column. Facts drawn from the profile + real focus areas.
export const aboutMeta = {
  from: "Patna, Bihar",
  interests: ["AI systems", "Product design", "Developer tooling"],
  exploring: ["Agentic workflows", "RAG at scale", "LangGraph"],
};

export const about = {
  short:
    "I'm an Electronics & Communication Engineering student focused on software engineering, full-stack development, and generative AI. I like building products that solve real problems and are engineered for reliability and scale — not just demos.",
  long: [
    "My interests sit at the intersection of technology, product design, and intelligent systems. I enjoy building applications that go beyond basic functionality — products that deliver thoughtful user experiences and hold up in production.",
    "My current focus is modern frontend development, backend architecture, databases, AI-powered applications, and production-oriented engineering. Through projects like KRAMA OS and LedgerMind I explore how software can combine structured systems, intelligent automation, and user-centered design.",
    "I'm continuously learning, experimenting, and building toward becoming a stronger software engineer.",
  ],
};

export const education = {
  degree: "B.Tech — Electronics & Communication Engineering",
  school: "JSS Academy of Technical Education, Bengaluru",
  detail: "4th year · 7th semester · CGPA 7.6 / 10",
};

export type SkillGroup = { label: string; items: string[] };

// The core stack — what actually defines the work. Led with, before the full
// inventory, so the signal isn't buried under ~50 tags.
export const primaryStack: string[] = [
  "React / Next.js",
  "TypeScript",
  "Node.js / NestJS",
  "PostgreSQL / Prisma",
  "RAG / LangChain",
  "Docker",
];

// Relevance cluster (§9) — one loose cluster, sized by weight (3 = core to the
// work, 1 = supporting). Real tools only; drawn from the groups below.
export type ClusterSkill = { label: string; weight: 1 | 2 | 3 };
export const skillCluster: ClusterSkill[] = [
  { label: "TypeScript", weight: 3 },
  { label: "React", weight: 3 },
  { label: "Next.js", weight: 3 },
  { label: "Node.js", weight: 3 },
  { label: "PostgreSQL", weight: 3 },
  { label: "RAG", weight: 3 },
  { label: "NestJS", weight: 2 },
  { label: "Prisma", weight: 2 },
  { label: "Tailwind CSS", weight: 2 },
  { label: "LangChain", weight: 2 },
  { label: "Redis", weight: 2 },
  { label: "Docker", weight: 2 },
  { label: "Python", weight: 2 },
  { label: "LangGraph", weight: 2 },
  { label: "Express.js", weight: 1 },
  { label: "Fastify", weight: 1 },
  { label: "pgvector", weight: 1 },
  { label: "Pinecone", weight: 1 },
  { label: "Gemini", weight: 1 },
  { label: "Groq", weight: 1 },
  { label: "BullMQ", weight: 1 },
  { label: "WebSockets", weight: 1 },
  { label: "TanStack Query", weight: 1 },
  { label: "Zustand", weight: 1 },
  { label: "Tiptap", weight: 1 },
  { label: "GitHub Actions", weight: 1 },
  { label: "Docker Compose", weight: 1 },
  { label: "Nginx", weight: 1 },
  { label: "Vercel", weight: 1 },
  { label: "Railway", weight: 1 },
  { label: "Embeddings", weight: 1 },
  { label: "Hybrid search", weight: 1 },
];

export const skills: SkillGroup[] = [
  {
    label: "Frontend",
    items: [
      "React 19",
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS v4",
    ],
  },
  {
    label: "Libraries & UI",
    items: [
      "shadcn/ui",
      "Framer Motion",
      "TanStack Query",
      "Zustand",
      "Tiptap",
      "Vite",
    ],
  },
  {
    label: "Backend",
    items: [
      "Node.js",
      "NestJS",
      "Express.js",
      "Fastify",
      "WebSockets / Socket.IO",
    ],
  },
  {
    label: "Databases",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Prisma ORM",
      "Drizzle ORM",
      "Redis",
      "pgvector",
      "Pinecone",
    ],
  },
  {
    label: "Artificial Intelligence",
    items: [
      "LangChain",
      "LangGraph",
      "LlamaIndex",
      "Hugging Face",
      "Ollama",
    ],
  },
  {
    label: "DevOps & Deployment",
    items: [
      "Docker",
      "Docker Compose",
      "Nginx",
      "GitHub Actions",
      "pnpm",
      "Vercel",
      "Railway",
    ],
  },
];

export type BlogPlatform = "devto" | "hashnode" | "medium" | "linkedin";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO — used for sort + <time>
  readingMinutes: number;
  tags: string[];
  status: "published" | "draft";
  // Where this post is (or will be) cross-published. Empty = local only.
  crossPosts: { platform: BlogPlatform; url: string }[];
};

// Seed content. Replace with your real posts — or, later, load from a
// markdown folder / a platform's API (see docs note in Blog section).
export const posts: BlogPost[] = [
  {
    slug: "building-krama-os",
    title: "Designing a unified data model for KRAMA OS",
    excerpt:
      "How I connected notes, tasks, goals, and habits under one schema instead of stitching together separate apps.",
    date: "2026-08-14",
    readingMinutes: 7,
    tags: ["Architecture", "PostgreSQL", "Product"],
    status: "draft",
    crossPosts: [],
  },
  {
    slug: "deterministic-reconciliation-with-ai",
    title: "Deterministic reconciliation first, AI second",
    excerpt:
      "Why LedgerMind matches financial records with hard rules and uses the LLM only to investigate exceptions.",
    date: "2026-07-02",
    readingMinutes: 9,
    tags: ["AI", "Fintech", "NestJS"],
    status: "draft",
    crossPosts: [],
  },
  {
    slug: "rag-that-actually-retrieves",
    title: "RAG that actually retrieves: hybrid search + reranking",
    excerpt:
      "Notes on combining vector similarity with keyword search and a reranker to cut down hallucinated answers.",
    date: "2026-05-20",
    readingMinutes: 6,
    tags: ["AI", "RAG", "pgvector"],
    status: "draft",
    crossPosts: [],
  },
];

export type Service = { title: string; description: string };

export const services: Service[] = [
  {
    title: "Full-Stack Web Development",
    description:
      "Modern web applications with React, Next.js, TypeScript, Node.js, and PostgreSQL.",
  },
  {
    title: "AI-Powered Applications",
    description:
      "RAG systems, LLM integrations, AI assistants, and intelligent workflows.",
  },
  {
    title: "Backend & Database Engineering",
    description:
      "APIs, relational data modeling, PostgreSQL, Prisma, Redis, and background processing.",
  },
  {
    title: "Product UI / UX Development",
    description:
      "Premium, responsive, accessible interfaces inspired by editorial and modern product design.",
  },
];

export type Project = {
  index: string;
  name: string;
  tagline: string;
  summary: string;
  features: string[];
  tech: string[];
  repo?: string;
  note?: string; // honesty framing where relevant
  featured?: boolean; // drives the asymmetric Work layout (§8)
  // Drop a screenshot at this path to replace the in-world preview frame.
  image?: string;
  demo?: string; // live deployment, when one exists
};

export const projects: Project[] = [
  {
    index: "01",
    name: "KRAMA OS",
    featured: true,
    image: "/images/krama-os.jpg",
    tagline: "Unified Productivity & Knowledge Operating System",
    summary:
      "A single connected workspace that unifies notes, tasks, goals, habits, planning, and AI assistance — replacing a stack of disconnected apps with one system where knowledge management and execution live together.",
    features: [
      "Brain workspace — Notion-style nested pages with rich text",
      "Execution layer — issues, Kanban boards, sprint views",
      "Planner — weekly planning, time blocks, planning matrix",
      "Habit tracker connected to goals and execution",
      "Focus timer — Pomodoro-based workflows",
      "Context-aware AI assistant over your project data",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Tiptap",
      "RAG",
    ],
    repo: "https://github.com/sudhanshukumar03/KRAMA",
  },
  {
    index: "02",
    name: "Context",
    image: "/images/context.png",
    tagline: "Autonomous Incident Intelligence & Causal Dependency Graph",
    summary:
      "An incident intelligence platform that transforms hundreds of fragmented alerts across Kubernetes, Datadog, PagerDuty, and Slack into an explainable causal graph with real-time root cause isolation, revenue exposure estimation, and role-based remediation.",
    features: [
      "Topology-aware service dependency graph with directional blast radius",
      "Causal root-cause isolation tracing cascade paths to trigger deploys",
      "Financial risk modeling computing real-time revenue at risk ($/hr)",
      "Role-based AI incident lenses (Engineer, SRE, and Manager)",
      "Remediation sandbox for dry-run kubectl rollbacks and restarts",
      "Multi-source telemetry ingestion from Kubernetes, PagerDuty, and Slack",
    ],
    tech: [
      "TypeScript",
      "Express 5",
      "React 19",
      "Vite",
      "PostgreSQL 16",
      "Drizzle ORM",
      "OpenAI",
      "Clerk",
    ],
    repo: "https://github.com/sudhanshukumar03/Context",
  },
  {
    index: "03",
    name: "LedgerMind",
    image: "/images/ledgermind.jpg",
    tagline: "AI Finance Controller for Razorpay Reconciliation",
    summary:
      "A reconciliation engine for fragmented financial data across Razorpay, banks, orders, payments, refunds, and settlements. Deterministic matching runs first; an AI layer investigates exceptions and suggests resolutions — it analyzes, it doesn't replace the core financial logic.",
    features: [
      "Webhook ingestion with signature verification",
      "Financial data normalization",
      "Matching: exact ID, UTR, amount/time-window, metadata similarity",
      "Exception classification",
      "AI-assisted investigation with vector retrieval",
      "Background processing with BullMQ",
    ],
    tech: [
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Docker",
      "Next.js",
      "Gemini",
    ],
    repo: "https://github.com/sudhanshukumar03/ledgerMind",
  },
  {
    index: "04",
    name: "HealthGuard",
    image: "/images/healthguard.jpg",
    tagline: "Intelligent Health Monitoring Platform (concept)",
    summary:
      "A health-monitoring concept combining sensor-based vitals, backend processing, AI analysis, and a web dashboard: sensors → JSON → Node.js → PostgreSQL → Python AI → React dashboard.",
    features: [
      "Sensor integration (ESP32, MAX30102, AD8232, DS18B20, MPU6050)",
      "Backend communication and data storage",
      "AI-assisted health-monitoring concepts",
      "Dashboard visualization of collected data",
    ],
    tech: ["ESP32", "Node.js", "PostgreSQL", "Python", "React"],
    repo: "https://github.com/sudhanshukumar03/healthguard",
    note: "Exploratory concept. Components are in progress or planned — this is not validated medical monitoring.",
  },
];
