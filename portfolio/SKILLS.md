# Technical Skills Inventory

Every skill listed here is backed by shipped software, academic coursework, or active system implementations. Grouped by functional discipline to maintain high signal-to-noise ratio.

---

## 1. Core Languages
- **TypeScript & JavaScript (ESNext)**: Daily production language across frontend (React 19, Next.js 16) and backend runtimes (Node.js 22, Express 5, NestJS).
- **C++**: Data Structures & Algorithms, competitive programming on LeetCode, and embedded firmware programming on ESP32.
- **Python**: AI workflows, telemetry processing with FastAPI, and sensor analytics scripts.
- **SQL**: Relational modeling, complex joins, subqueries, and indexing in PostgreSQL.

---

## 2. Frontend Engineering
- **Frameworks & Core**: React 19, Next.js 16 (App Router, Turbopack, Server Components), Vite 7.
- **Styling & Design Systems**: Tailwind CSS v4, Vanilla CSS tokens, CSS sticky composition, responsive mobile-first typography.
- **State & Data Fetching**: TanStack Query (React Query), Zustand, Server-Sent Events (SSE).
- **Rich Text & Editors**: Tiptap headless editor integration for collaborative document suites.

---

## 3. Backend & API Architecture
- **Runtimes & Frameworks**: Node.js, Express 5.0, NestJS, FastAPI.
- **Architectural Patterns**: Monorepos (Turborepo), clean layered architecture (Controller-Service-Repository), microservice dependency graphs, and webhook ingestion pipelines.
- **Asynchronous Processing**: Redis & BullMQ message queues for offloading CPU-intensive workloads, digest emails, and payment reconciliations.
- **Authentication & Security**: Custom JWT auth with rotating refresh tokens, Clerk multi-tenant organization boundaries, HMAC-SHA256 signature verification.

---

## 4. Applied Artificial Intelligence & GenAI
- **Frameworks & SDKs**: OpenAI SDK, Google Gemini API, LangChain, LangGraph.
- **Retrieval-Augmented Generation (RAG)**: Chunking strategies, embedding generation, hybrid search (keyword BM25 + vector similarity), and metadata filtering.
- **Vector Stores**: `pgvector` in PostgreSQL, Pinecone.
- **AI Infrastructure**: Response caching gateways (SHA-256 query hashing in Redis) to prevent redundant API token expenditure.

---

## 5. Databases & Persistence
- **Relational Databases**: PostgreSQL 16 (Drizzle ORM, Prisma ORM), connection pooling, schema migrations, and relational integrity constraints.
- **NoSQL & Caching**: MongoDB, Redis (key-value caching, Pub/Sub, rate limiting).

---

## 6. DevOps, Cloud & Tooling
- **Containerization**: Docker, Docker Compose for multi-service environments (Node, Postgres, Redis).
- **CI/CD & Source Control**: GitHub Actions, Git, branch protection workflows.
- **Hosting & Deployments**: Vercel (frontend), Railway (backend services), Nginx reverse proxying.
- **Package Management**: pnpm, Turborepo workspaces.

---

## 7. Embedded Systems & Hardware Interfacing
- **Hardware Platform**: ESP32 microcontrollers.
- **Biosensors**: MAX30102 (pulse oximetry / heart rate), AD8232 (single-lead ECG), DS18B20 (temperature), MPU6050 (accelerometer/gyroscope).
- **Communication Protocols**: I2C, SPI, UART, ADC sampling, calibration curves, and interrupt service routines.
