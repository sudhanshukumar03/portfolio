// Single typed source of truth for on-page content. Sections import directly from here.

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
  heroStats: ["Systems & Distributed Architecture", "Full-Stack & Applied AI", "Bengaluru, Karnataka"],
  links: {
    github: "https://github.com/sudhanshukumar03",
    linkedin: "https://www.linkedin.com/in/sudhanshurajputt/",
    x: "https://x.com/Sudhans69033589",
    email: "sksingh032003@gmail.com",
    phone: "+91 93043 72352",
    // WhatsApp deep link — opens chat directly on mobile & desktop with prefilled greeting.
    whatsapp: "https://wa.me/919304372352?text=Hi%20Sudhanshu,%20I%20saw%20your%20portfolio%20and%20wanted%20to%20connect!",
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
    "I'm an Electronics & Communication Engineering student specializing in full-stack engineering and applied AI systems. Grounded in physical computing and systems architecture, I build software focused on production resilience, deterministic data models, and high-performance execution — engineered for scale, not just demos.",
  long: [
    "My work bridges robust backend systems with refined product design. On the backend, I design relational data schemas with strict transactional invariants, caching layers, and asynchronous worker queues that survive burst traffic. On the frontend, I create calm, high-density interfaces in React and TypeScript tailored for operators under pressure.",
    "Across systems like KRAMA OS, Context, LedgerMind, and Vyana, I explore what happens when you combine mathematically sound foundations with intelligent, human-centered automation.",
  ],
};

export const education = {
  degree: "B.Tech — Electronics & Communication Engineering",
  school: "JSS Academy of Technical Education, Bengaluru",
  detail: "Final Year · Class of 2026 · Bengaluru",
};

export type Project = {
  index: string;
  name: string;
  caseStudyId?: string;
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
  wordmark?: readonly [string, string]; // e.g. ["Con", "text"] for two-tone color treatment
};

export const projects: Project[] = [
  {
    index: "01",
    name: "KRAMA OS",
    caseStudyId: "krama-os",
    featured: true,
    image: "/images/krama-os.png",
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
    caseStudyId: "context",
    wordmark: ["Con", "text"],
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
    caseStudyId: "ledgermind",
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
    name: "Vyana",
    wordmark: ["Vy", "ana"],
    caseStudyId: "vyana",
    image: "/images/vyana.png",
    tagline: "AI Health Monitoring System & IoT Vitals Pipeline",
    summary:
      "A real-time biomedical telemetry platform bridging hardware sensors with FastAPI and Node.js microservices, PostgreSQL time-series storage, and a responsive clinical monitoring console with unified vital trends and predictive AI health insights.",
    features: [
      "Unified Vital Trends — Continuous real-time tracking for heart rate (BPM), blood oxygen (SpO2), body temperature, and live ECG rhythm.",
      "Predictive AI Health Insights — Sleep consistency and daily activity recovery recommendations synthesized from longitudinal vitals baselines.",
      "Dual-Engine Telemetry Pipeline — Node.js and FastAPI ingestion normalizing sensor packets with low-latency WebSocket broadcast.",
      "Vyana Simulator & IoT Integration — ESP32 biomedical sensor firmware paired with virtual simulator telemetry for automated cloud testing.",
    ],
    tech: ["React", "TypeScript", "Node.js", "FastAPI", "PostgreSQL", "ESP32", "WebSockets"],
    repo: "https://github.com/sudhanshukumar03/healthguard",
    note: "Exploratory prototype. Hardware sensor integration with simulated device telemetry — not validated for clinical diagnosis.",
  },
];
