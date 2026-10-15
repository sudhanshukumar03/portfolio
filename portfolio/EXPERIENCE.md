# Engineering Experience & Project Leadership

A record of software systems, distributed services, and end-to-end applications designed, built, and shipped.

---

## Full-Stack & AI Systems Developer — Independent / Project Engineering
**2023 – Present** · Bengaluru, Karnataka

Engineered and deployed production-grade web applications, distributed incident tooling, and autonomous data pipelines from scratch:

- **Context (Real-Time Incident Intelligence)**:
  - Architected a service-dependency graph engine in TypeScript and Express 5.0 to map microservice topologies and calculate cascading blast radiuses during active outages.
  - Implemented multi-source telemetry ingestion for Kubernetes rollouts, PagerDuty alerts, and Slack bridge logs, cutting ad-hoc human triage time.
  - Designed an isolated in-memory simulation sandbox allowing SREs to dry-run `kubectl rollout undo` and pod restarts before applying changes to production.
  - **Stack**: TypeScript, Express 5.0, React 19, Vite 7, PostgreSQL 16, Drizzle ORM, OpenAI GPT-4o-mini, Clerk.

- **KRAMA OS (Unified Workspace Monorepo)**:
  - Engineered a Turborepo monorepo unifying notes, sprint Kanban boards, and habits under a single PostgreSQL relational schema with Prisma ORM.
  - Built an AI Gateway that calculates SHA-256 hashes of queries and caches responses in Redis, eliminating redundant upstream LLM API calls and cutting operational costs.
  - Integrated a `pgvector` RAG pipeline with hybrid search to ground contextual AI assistance in private user documents.
  - Offloaded background tasks (daily planning digests, notification queues) to asynchronous BullMQ workers.
  - **Stack**: Next.js 16, React 19, TypeScript, PostgreSQL, Prisma, Redis, BullMQ, Tiptap, pgvector.

- **LedgerMind (Fintech Reconciliation Controller)**:
  - Designed a high-throughput webhook ingestion pipeline for Razorpay payment gateways with HMAC-SHA256 signature verification.
  - Implemented a four-tier deterministic reconciliation engine (Exact ID → Bank UTR → Time-window proximity → Metadata similarity) handling high volumes of transactions, settlements, and refund logs.
  - Leveraged Google Gemini via LangChain strictly as a secondary investigation agent to examine unreconciled exceptions and suggest human resolutions.
  - **Stack**: NestJS, PostgreSQL, Prisma, Redis, BullMQ, Docker, Next.js, Gemini API.

- **HealthGuard (IoT Biosensor Pipeline to Clinical Dashboard)**:
  - Interfaced ESP32 microcontrollers with MAX30102 pulse oximetry, AD8232 ECG, and DS18B20 temperature sensors via I2C/SPI interfaces.
  - Developed real-time telemetry streaming over serial/HTTP into a Node.js and FastAPI ingestion pipeline backed by PostgreSQL.
  - Built an editorial, high-density React clinical dashboard displaying real-time vitals, trend lines, and Python AI anomaly alerts.
  - **Stack**: ESP32 (C++), Node.js, FastAPI, PostgreSQL, Python, React.
