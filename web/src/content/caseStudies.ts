// Deep-dive architecture and case study data for featured projects.
// Structured typed content rendered in the editorial CaseStudyModal.

export type CaseStudy = {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  stack: string[];
  repo: string;
  demo?: string;
  image?: string;
  statusBadge: string;
  incident: {
    headline: string;
    narrative: string[];
    takeaway?: string;
  };
  invariants: {
    headline: string;
    quote: string;
    items: { label: string; text: string }[];
  };
  subsystems: {
    title: string;
    bullets: string[];
  }[];
  decisions: {
    title: string;
    choice: string;
    rationale: string;
  }[];
  challenges: {
    problem: string;
    solution: string;
  }[];
  reflections: string;
};

export const caseStudies: Record<string, CaseStudy> = {
  "krama-os": {
    id: "krama-os",
    title: "KRAMA OS",
    subtitle: "Unified Knowledge & Execution System",
    role: "Solo Architect & Full-Stack Developer",
    stack: [
      "Next.js 14",
      "TypeScript",
      "PostgreSQL 16",
      "Prisma ORM",
      "Redis",
      "BullMQ",
      "Tiptap 2",
      "pgvector",
      "Tailwind CSS",
    ],
    repo: "https://github.com/sudhanshukumar03/KRAMA",
    image: "/images/krama-os.png",
    statusBadge: "Operational Architecture",
    incident: {
      headline: "The Fragmented Monday Morning",
      narrative: [
        "At 9:30 AM on a sprint planning Monday, my screen was a graveyard of browser tabs: Notion containing a 2,000-word architecture RFC for an API refactor, Linear tracking eight open tickets, Todoist with personal time blocks, Google Calendar with meetings, and ChatGPT with code snippets pasted in seeking edge-case feedback.",
        "When an urgent production bug landed mid-morning, I updated Linear. But Notion remained outdated. The daily time-blocking schedule had no idea my afternoon was hijacked. And ChatGPT had zero context on the prior three weeks of design discussions without manual prompt pasting.",
        "The productivity industry has convinced engineers to buy five subscriptions to solve one human need: organizing thought and executing work. When your knowledge base and backlog live in separate databases, synchronization becomes manual labor—and manual synchronization inevitably decays into chaos.",
      ],
      takeaway:
        "Knowledge without execution is daydreaming. Execution without knowledge is headless thrashing.",
    },
    invariants: {
      headline: "Core Architectural Invariants",
      quote:
        "Every task must link to a document, every document must roll up to a goal, and every AI prompt must be grounded in your actual data.",
      items: [
        {
          label: "Atomic Relational Boundaries",
          text: "Documents, tasks, habits, and vector embeddings reside in a single PostgreSQL schema with strict foreign keys and cascading referential integrity.",
        },
        {
          label: "Non-Blocking Telemetry",
          text: "Document chunking and AI embeddings are strictly offloaded to asynchronous background queues backed by Redis and BullMQ.",
        },
        {
          label: "Context-Aware Grounding",
          text: "AI responses are synthesized using local RAG over pgvector chunks rather than ungrounded generalized prompt memory.",
        },
      ],
    },
    subsystems: [
      {
        title: "Headless Document Engine (Tiptap & ProseMirror)",
        bullets: [
          "Custom ProseMirror block editor with markdown shortcut support (#, >, -, []).",
          "Extended schema with custom node views: syntax-highlighted code blocks with language auto-detection and bidirectional issue cards.",
          "Debounced local auto-saving with optimistic cache invalidation via TanStack Query.",
        ],
      },
      {
        title: "Multi-View Sprint Execution Board",
        bullets: [
          "Fluid Kanban interface using @dnd-kit with collision detection and optimistic column transitions.",
          "High-density keyboard-driven table view (arrow key navigation, inline status hotkeys).",
          "Automated milestone rollups: completing the final open issue automatically computes milestone archival and goal velocity.",
        ],
      },
      {
        title: "Asynchronous pgvector Retrieval Pipeline",
        bullets: [
          "All document mutations dispatch background jobs to Redis-backed BullMQ workers.",
          "Workers chunk content into 500-token blocks with 50-token sliding overlap and compute SHA-256 hashes.",
          "Unchanged hashes skip embedding API calls, slashing token costs and latency by 70%.",
          "Embeddings stored in PostgreSQL with HNSW indexes for sub-10ms approximate nearest neighbor search.",
        ],
      },
    ],
    decisions: [
      {
        title: "PostgreSQL + pgvector vs. Standalone Vector DBs (Pinecone)",
        choice: "Selected PostgreSQL + pgvector",
        rationale:
          "Avoids dual-system synchronization failures. When a user deletes a private page, native ON DELETE CASCADE atomically purges all chunk vectors and embeddings in the same transaction.",
      },
      {
        title: "Materialized Paths vs. Recursive CTEs for Folders",
        choice: "Selected Materialized Paths",
        rationale:
          "Recursive CTEs traversing parent_id at 200+ nested documents took ~420ms and saturated connection pools. Indexed materialized paths reduced tree queries to 14ms.",
      },
      {
        title: "BullMQ Job Debouncing vs. Serverless Functions",
        choice: "Selected BullMQ with Redis",
        rationale:
          "Continuous typing on a 3,000-word document triggers dozens of paragraph updates per minute. Job debouncing collapses bursts into a single reconciliation job executed 15s after pauses.",
      },
    ],
    challenges: [
      {
        problem: "Tiptap SSR Hydration Mismatch during Next.js server-rendering.",
        solution:
          "Structured editor into an isolated client-only boundary with a deterministic fallback skeleton loader. Server passes immutable serialized JSON ASTs; Tiptap mounts post-hydration with zero console warnings.",
      },
      {
        problem: "Prisma connection pool saturation during bulk markdown imports.",
        solution:
          "Enforced strict worker concurrency of 4 parallel jobs, implemented connection reuse via singleton Prisma client instances, and batched inserts with prisma.chunk.createMany().",
      },
    ],
    reflections:
      "KRAMA OS proved that great developer tooling doesn't come from piling on features. It comes from enforcing clean data invariants where your thoughts, code tickets, and AI context share the exact same source of truth.",
  },

  context: {
    id: "context",
    title: "Context",
    subtitle: "Autonomous Incident Intelligence & Causal Dependency Graph",
    role: "Systems Architect & AI Engineer",
    stack: [
      "TypeScript 5.9",
      "Express 5.0",
      "React 19",
      "Vite 7",
      "PostgreSQL 16",
      "Drizzle ORM",
      "OpenAI GPT-4o-mini",
      "Clerk",
    ],
    repo: "https://github.com/sudhanshukumar03/Context",
    image: "/images/context.png",
    statusBadge: "Distributed Systems Telemetry",
    incident: {
      headline: "Tuesday, 2:14 AM — The $68,000 Outage",
      narrative: [
        "At 2:14 AM, PagerDuty triggered on checkout-service: 504 Gateway Timeouts, error rates jumping to 28%, and latency crossing 4,200ms. Within ninety seconds, thirty monitors lit up red: payment-v2 pool exhausted, auth-session Redis latency spike, order-processor queue overflowing.",
        "Thirty engineers joined the triage bridge. They performed the traditional incident ritual: Datadog in tab one, Grafana in tab two, Honeycomb in tab three, GitHub releases in tab four. They correlated timestamps by eye and guessed network hops from memory.",
        "Forty-four minutes in, someone discovered an engineer pushed a config tweak to inventory-db at 2:08 AM that dropped max connection pool from 200 to 20. The database queued requests, choking inventory-service, timing out cart-service, and downing checkout-service. The fix took 30 seconds (kubectl rollout undo). The diagnosis took 44 minutes and cost $68,000 in dropped transactions.",
      ],
      takeaway:
        "The operational cost of an incident was never the recovery command. The cost is human correlation time.",
    },
    invariants: {
      headline: "The Four Foundational Invariants",
      quote:
        "Graphs map causality. Telemetry streams evidence. AI explains root causes. Engineers command.",
      items: [
        {
          label: "Physical Topology Over Semantic Guessing",
          text: "Services are modeled as a Directed Acyclic Graph (DAG). If Service A has no topological connection to Service B, an outage in B cannot be the causal root of A's failure.",
        },
        {
          label: "Strictly Read-Only AI",
          text: "AI agents never issue autonomous production rollbacks or pod terminations. AI digests telemetry, calculates blast radiuses, and suggests playbooks; human engineers authorize execution.",
        },
        {
          label: "Remediation Sandboxing",
          text: "Includes an in-memory simulation sandbox that models the recovery curve across dependent services before commands touch live production clusters.",
        },
      ],
    },
    subsystems: [
      {
        title: "Dynamic Dependency Graph Canvas",
        bullets: [
          "Interactive SVG canvas in React 19 with force-directed physics.",
          "Visualizes directional blast radius with pulsing edges and state-based node styling (Healthy, Investigate, Degraded).",
          "Smooth pan and zoom (50% to 250%) without DOM frame drops.",
        ],
      },
      {
        title: "Multi-Source Telemetry Ingress Pipeline",
        bullets: [
          "Express 5.0 and PostgreSQL 16 via Drizzle ORM.",
          "Ingests Kubernetes deployment webhooks, Datadog/PagerDuty alerts, and Slack incident bridge logs.",
          "Normalizes disparate payloads into unified time-series tables with millisecond precision.",
        ],
      },
      {
        title: "Role-Based AI Incident Commander",
        bullets: [
          "Simultaneously extracts three targeted lenses from a single causal timeline.",
          "Engineer lens: stack traces, affected endpoints, and verified kubectl remediation commands.",
          "SRE lens: cascading blast radius percentages, queue metrics, and MTTR estimates.",
          "Manager lens: plain-English impact narrative, downtime duration, and revenue at risk ($/hr).",
        ],
      },
    ],
    decisions: [
      {
        title: "Drizzle ORM vs. Prisma",
        choice: "Selected Drizzle ORM",
        rationale:
          "Prisma's query engine overhead and connection pool latency were unacceptable during high-frequency webhook bursts. Drizzle compiles directly to raw SQL with zero runtime overhead.",
      },
      {
        title: "Server-Sent Events (SSE) vs. WebSockets",
        choice: "Selected Server-Sent Events",
        rationale:
          "The client primarily streams AI reasoning output and status transitions from server to client. SSE provides native HTTP streaming, auto-reconnection, and seamless integration with Clerk JWT auth without WebSocket heartbeat management.",
      },
      {
        title: "Express 5.0 vs. Fastify",
        choice: "Selected Express 5.0",
        rationale:
          "Express 5 provides native async/await error propagation without unhandled rejection leaks and battle-tested stability for a mission-critical control plane where correctness beats synthetic micro-benchmarks.",
      },
    ],
    challenges: [
      {
        problem: "Cycle detection in complex microservice topologies causing infinite recursion.",
        solution:
          "Implemented Tarjan's strongly connected components algorithm with cycle suppression and visited-set tracking, guaranteeing blast-radius calculation terminates safely within 15ms.",
      },
      {
        problem: "LLM hallucinating inconsistent financial loss figures between queries.",
        solution:
          "Decoupled arithmetic entirely from the model. The backend calculates revenue loss deterministically (traffic baseline × average order value), and the LLM is restricted to formatting and contextualizing.",
      },
    ],
    reflections:
      "Context reinforced my core engineering stance: AI is at its best when paired with deterministic systems, not when tasked with replacing them.",
  },

  ledgermind: {
    id: "ledgermind",
    title: "LedgerMind",
    subtitle: "AI Finance Controller for Payment Reconciliation",
    role: "Backend Architect & Systems Engineer",
    stack: [
      "NestJS",
      "TypeScript",
      "PostgreSQL 16",
      "Prisma ORM",
      "Redis",
      "BullMQ",
      "Docker",
      "Next.js",
      "Google Gemini API",
    ],
    repo: "https://github.com/sudhanshukumar03/ledgerMind",
    image: "/images/ledgermind.jpg",
    statusBadge: "Fintech Reconciliation Engine",
    incident: {
      headline: "The ₹3.4M Month-End Mystery",
      narrative: [
        "It was the final day of the financial quarter for a direct-to-consumer e-commerce brand. The payment gateway dashboard reported ₹84.2M in gross collections. The order management system reported ₹87.6M in fulfilled orders. And the bank statement showed net deposits of ₹81.9M.",
        "Between internal orders, payment gateway collections, and physical bank deposits lay an unresolved gap of ₹3,400,000. Three accountants spent four sleepless days in Excel: exporting 140,000 transaction rows, writing fragile VLOOKUPs, and tracing batch settlement IDs.",
        "The causes were mundanely technical: network blips dropped 412 gateway webhook retries; banks deducted variable MDR fees and GST directly from payouts without line-item references; and late-night refunds settled on the subsequent day. The cost was 160 man-hours of high-stress financial forensics.",
      ],
      takeaway:
        "Deterministic rules match the money. The LLM only explains the anomalies.",
    },
    invariants: {
      headline: "The Deterministic Boundary",
      quote:
        "Never let a probabilistic machine learning model mutate financial balances. Deterministic rules match the money; AI investigates exceptions.",
      items: [
        {
          label: "Four-Tier Waterfall",
          text: "Transactions evaluate sequentially: Exact Gateway ID → Bank Settlement UTR → Fee-Aware Time Window → Metadata Similarity.",
        },
        {
          label: "Auditable Immutability",
          text: "Every matched record writes an immutable double-entry ledger entry with cryptographic SHA-256 state tracking.",
        },
        {
          label: "Sandboxed AI Investigation",
          text: "The Gemini AI layer receives sanitized discrepancy manifests and vector historical rules to hypothesize causes without write access to balances.",
        },
      ],
    },
    subsystems: [
      {
        title: "Tiered Waterfall Engine",
        bullets: [
          "Tier 1: O(1) exact database lookup on payment and order reference IDs (matches ~88% of volume).",
          "Tier 2: Clearing bank Unique Transaction Reference (UTR) matching against batch settlement manifests.",
          "Tier 3: Fee-aware dynamic time-window matching (evaluating Gross - MDR Fee - GST = Net in ±72h).",
          "Tier 4: Customer identity correlation via SHA-256 hashed emails, phone numbers, and device fingerprints.",
        ],
      },
      {
        title: "Asynchronous Webhook Ingestion & Deduplication",
        bullets: [
          "NestJS endpoints verify Razorpay HMAC-SHA256 signatures before queue insertion.",
          "BullMQ consumer enforces idempotent execution via Redis SETNX locks, preventing duplicate credits during gateway retry storms.",
          "Transaction amounts normalized into integer cents/paise to eliminate IEEE 754 floating-point rounding errors.",
        ],
      },
      {
        title: "AI Exception Triage Copilot",
        bullets: [
          "Unmatched exceptions trigger an automated analysis payload to Google Gemini via LangChain.",
          "Generates human-readable exception hypotheses (e.g., 'Likely disputed refund: Customer initiated chargeback 3 hours before batch close').",
          "Includes 1-click manual reconciliation actions with documented audit notes.",
        ],
      },
    ],
    decisions: [
      {
        title: "NestJS Modular Architecture vs. Express/Fastify",
        choice: "Selected NestJS",
        rationale:
          "Financial pipelines demand strict domain separation, dependency injection, and class-validator DTOs to enforce rigorous transaction contracts.",
      },
      {
        title: "Integer Arithmetic vs. Decimal Types",
        choice: "Selected Integer Storage (Paise/Cents)",
        rationale:
          "JavaScript floating-point arithmetic (0.1 + 0.2 !== 0.3) is unacceptable in finance. Storing currency as integers prevents rounding discrepancies across millions of transactions.",
      },
    ],
    challenges: [
      {
        problem: "Simultaneous duplicate webhook delivery during flash sales.",
        solution:
          "Configured Redis-backed distributed locks with atomic transaction isolation levels (SERIALIZABLE) in PostgreSQL for ledger writes.",
      },
    ],
    reflections:
      "Fintech engineering requires absolute discipline. AI is a magnificent investigator for anomalies, but the ledger itself must remain cold, mathematical, and unyielding.",
  },

  vyana: {
    id: "vyana",
    title: "Vyana",
    subtitle: "AI Health Monitoring System & Biomedical Vitals Pipeline",
    role: "Embedded Systems & Full-Stack Engineer",
    stack: [
      "React 19",
      "TypeScript",
      "Node.js",
      "FastAPI",
      "PostgreSQL 16",
      "ESP32 (C++ / FreeRTOS)",
      "WebSockets",
      "AD8232 ECG",
      "MAX30102 PPG",
      "HTML5 Canvas",
    ],
    repo: "https://github.com/sudhanshukumar03/healthguard",
    image: "/images/vyana.png",
    statusBadge: "Biomedical & AI Telemetry",
    incident: {
      headline: "The Phantom Arrhythmia on the Breadboard",
      narrative: [
        "It was 1:30 AM in the electronics laboratory. I had attached three biomedical Ag/AgCl disposable gel electrode pads to my chest: Right Arm, Left Arm, and Right Leg ground. The leads ran into an AD8232 heart rate monitor breakout wired into an ESP32 microcontroller on a breadboard.",
        "Suddenly, the live serial plotter erupted into chaotic spikes: heart rate calculating at 214 beats per minute, ECG waveform violently oscillating between 0V and 3.3V rail saturation. For five terrifying seconds, I wondered if I was experiencing sudden ventricular tachycardia.",
        "Then I noticed: an electric soldering iron was plugged into the same bench extension cord. The switching power supply was radiating 50Hz AC mains electromagnetic hum, and the unshielded breadboard jumper wires were acting like antennae. When I touched the desk, my body acted as a capacitor, shifting baseline voltage by 800mV.",
      ],
      takeaway:
        "In pure software, a variable is 1 or 0. In hardware, between 0 and 1 lies an infinite universe of electromagnetic noise, thermal drift, and analog non-linearity.",
    },
    invariants: {
      headline: "Physical-to-Digital Integrity",
      quote:
        "Hardware telemetry must be filtered at the analog layer first, calibrated in firmware second, and displayed with zero render lag third.",
      items: [
        {
          label: "Hardware-Level Noise Rejection",
          text: "Implemented active bandpass filtering (0.5Hz–40Hz) and right-leg drive feedback to cancel 50Hz mains hum before ADC digitization.",
        },
        {
          label: "Dual-Core Task Affinity",
          text: "Core 0 dedicated strictly to deterministic 500Hz ADC timer interrupts; Core 1 dedicated to WiFi stack and HTTP transmission.",
        },
        {
          label: "60 FPS Canvas Rendering",
          text: "Biomedical waveforms render onto HTML5 Canvas rather than DOM SVG nodes to eliminate DOM reflow bottlenecks.",
        },
      ],
    },
    subsystems: [
      {
        title: "Firmware Signal Processing (ESP32 C++)",
        bullets: [
          "FreeRTOS timer-driven ADC sampling at 500Hz for high-fidelity QRS complex resolution.",
          "Digital moving average filter and dynamic peak detection thresholding to extract pulse rate and heart rate variability (HRV).",
          "MAX30102 PPG red/infrared ratio-of-ratios calculation for blood oxygen saturation (SpO2).",
        ],
      },
      {
        title: "Ingestion & Cloud Invariant Engine",
        bullets: [
          "Node.js and FastAPI ingestion endpoints parse sensor JSON packets with CRC validation.",
          "Raw time-series vitals stored in PostgreSQL with indexed timestamp partitions.",
          "WebSockets broker broadcasts low-latency telemetry to active web sessions.",
        ],
      },
      {
        title: "Clinical Telemetry Console & AI Health Insights",
        bullets: [
          "Interactive React console with multi-metric trends comparing heart rate (BPM) and blood oxygen (SpO2) over time.",
          "High-performance floating ECG preview rendering continuous 25 mm/s sweep waveforms on clinical grid canvas.",
          "Automated AI health insights synthesizing circadian sleep schedules and daily activity recommendations from vitals baselines.",
          "Dual device mode: live hardware sensor connection via ESP32 alongside virtual device simulation for continuous testing.",
        ],
      },
    ],
    decisions: [
      {
        title: "FreeRTOS Dual-Core Affinity vs. Single-Threaded Arduino Loop",
        choice: "Selected FreeRTOS Dual-Core Tasks",
        rationale:
          "WiFi network handshakes can block CPU execution for up to 200ms. Dedicating Core 0 exclusively to the ADC timer interrupt prevents missed ECG heartbeats during network packet transmission.",
      },
      {
        title: "HTML5 Canvas vs. React SVG Components",
        choice: "Selected HTML5 Canvas",
        rationale:
          "Streaming 500 data points per second into React SVG nodes triggers massive DOM thrashing and garbage collection spikes. A 2D canvas context renders continuous sweeps at 60 FPS with near-zero memory footprint.",
      },
    ],
    challenges: [
      {
        problem: "Baseline wander caused by patient breathing and electrode motion.",
        solution:
          "Implemented a real-time two-pole high-pass digital filter in firmware to anchor the isoelectric baseline without distorting the ST segment.",
      },
    ],
    reflections:
      "Working across the full stack—from microvolts on copper pins to cloud databases and canvas graphics—forever cured me of treating the computer as an abstract black box.",
  },
};

// Backwards-compatible alias for any legacy links/IDs
caseStudies.healthguard = caseStudies.vyana;
