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
    website: "https://sudhanshukumar03.vercel.app",
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
    "I'm an Electronics & Communication Engineering student who fell in love with building software. Coming from hardware—working with breadboards, microcontrollers, and signal noise—gave me a deep respect for how computers work under the hood. It taught me to value clean architecture, reliability, and code that holds up in the real world.",
  long: [
    "Most of my days are spent working across the stack: designing solid relational schemas in PostgreSQL, setting up resilient background queues, and crafting fast, intuitive interfaces with React and TypeScript. I care deeply about fast page loads, thoughtful design details, and making complex systems feel simple to use.",
    "Through projects like KRAMA OS, Context, LedgerMind, and Vyana, I've built systems spanning incident intelligence, automated reconciliation, and IoT vitals telemetry. I'm always building, learning, and looking forward to collaborating on high-impact products.",
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
      "Brain Workspace — Nested pages with **Tiptap rich text** and markdown support",
      "Execution Engine — Unified **Kanban boards**, **sprint views**, and issue tracking",
      "Structured Planner — **Weekly time blocks** and planning matrix prioritization",
      "Context-Aware AI — In-session assistant grounded over project data via **RAG**",
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
      "Causal Dependency Graph — Real-time **directional blast radius** across Kubernetes clusters",
      "Root-Cause Isolation — Automated **causal inference** tracing alerts to originating deploys",
      "Financial Risk Engine — Real-time **revenue-at-risk ($/hr)** modeling downtime impact",
      "Remediation Sandbox — Dry-run simulation for **kubectl rollbacks** and targeted pod restarts",
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
      "Deterministic Matching — Multi-stage exact reconciliation across **UTRs** and **payment IDs**",
      "AI Exception Classifier — **Vector-similarity retrieval** isolating unmatched Razorpay anomalies",
      "High-Throughput Pipeline — Signature-verified webhooks normalized with **BullMQ** and **Redis**",
      "Audit-Ready Ledger — Immutable double-entry transaction invariants enforced in **PostgreSQL**",
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
      "Unified Vital Trends — Real-time tracking for **heart rate (BPM)**, **blood oxygen (SpO2)**, **body temperature**, and live **ECG rhythm**",
      "Predictive AI Insights — Sleep consistency and recovery recommendations synthesized from **longitudinal vitals baselines**",
      "Dual-Engine Pipeline — Low-latency **FastAPI** and **Node.js** telemetry streaming over **WebSockets**",
      "Vyana Simulator & IoT — **ESP32 biosensor firmware** paired with virtual device simulation for automated testing",
    ],
    tech: ["React", "TypeScript", "Node.js", "FastAPI", "PostgreSQL", "ESP32", "WebSockets"],
    repo: "https://github.com/sudhanshukumar03/healthguard",
    note: "Exploratory prototype. Hardware sensor integration with simulated device telemetry — not validated for clinical diagnosis.",
  },
];
