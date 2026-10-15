# Case Study: KRAMA OS — The Unified Knowledge & Execution System

| | |
|---|---|
| **Project** | KRAMA OS |
| **Role** | Solo Architect & Full-Stack Developer |
| **Stack** | Next.js 14 App Router, TypeScript, PostgreSQL 16, Prisma ORM, Redis, BullMQ, Tiptap 2, pgvector, Tailwind CSS |
| **Repository** | [github.com/sudhanshukumar03/KRAMA](https://github.com/sudhanshukumar03/KRAMA) |

---

## 1. The Incident: A Fragmented Monday Morning

At 9:30 AM on a sprint planning Monday, my screen was a graveyard of browser tabs:
- **Tab 1**: Notion containing a 2,000-word architecture RFC for an API refactor.
- **Tab 2**: Linear tracking eight open backlog tickets related to the same refactor.
- **Tab 3**: Todoist with daily personal habits and time blocks.
- **Tab 4**: Google Calendar with scheduled meetings.
- **Tab 5**: ChatGPT with a pasted code snippet from the RFC, asking for edge-case feedback.

In the middle of the morning, an urgent production bug arrived. I updated the issue in Linear. But the architectural doc in Notion remained outdated. The daily time-blocking schedule in Todoist had no idea my afternoon was now consumed by the bug. And ChatGPT had no access to the previous three weeks of design discussions unless I manually copied paragraphs into the chat prompt.

At the end of the day, I had worked eight intensely focused hours, but my tools painted a picture of total disarray. 

**The productivity industry has convinced engineers to buy five different subscriptions to solve one single human need: organizing thought and executing work.**

I decided to stop duct-taping external software and build **KRAMA OS**—a single, unified operating system where documents, tasks, sprint planning, habit loops, and context-aware AI live inside a single cohesive relational schema.

---

## 2. The Core Realization: The Relational Disconnect

Why do personal and team productivity suites fail over time?

The fundamental flaw of modern SaaS productivity tools is **data isolation**:
- A note in Notion is an opaque JSON blob inside a document graph. It has no strict foreign key relationship to an issue in Linear.
- An issue in Linear has a deadline and priority, but it cannot query your personal habit consistency or your available calendar time blocks.
- Standalone AI assistants are amnesiac: they do not know what you built last week, which technical decisions were made, or what constraints your database schema enforces.

When your knowledge base and your execution backlog live in separate databases, maintaining synchronization becomes manual labor. And whenever a process requires manual human synchronization, it inevitably decays into chaos.

**KRAMA OS was founded on a single architectural invariant:**
> **Knowledge without execution is daydreaming. Execution without knowledge is headless thrashing. Every task must link to a document, every document must roll up to a goal, and every AI prompt must be grounded in your actual data.**

---

## 3. The Approach: A Unified Relational Topology

Instead of building a note app that awkwardly adds a task checkbox, or a todo app that embeds a markdown textarea, I designed KRAMA OS around four tightly coupled relational entities in PostgreSQL:

1. **Pages (The Knowledge Layer)**: Infinite-depth, hierarchical documents powered by a headless block editor (Tiptap / ProseMirror).
2. **Issues & Sprints (The Execution Layer)**: Strict state machines with statuses (`Backlog`, `Todo`, `In Progress`, `Review`, `Done`), priorities, milestones, and assignees.
3. **Habits & Time Blocks (The Momentum Layer)**: Recurring behavioral tracking linked to quarterly milestones to reflect actual velocity.
4. **Vector Embeddings (The Retrieval Layer)**: Document chunks and task descriptions vectorized and indexed with `pgvector` to enable semantic search across the entire workspace.

---

## 4. Key Subsystems Built

### 1. The Headless Document Engine (Tiptap & ProseMirror)
- Built a custom block editor with real-time markdown shortcut support (`#`, `>` , `- `, `[]`).
- Extended ProseMirror schemas to support custom Node views: syntax-highlighted code blocks with language detection, interactive task list items with bidirectional database syncing, and embedded issue preview cards.
- Implemented debounced local auto-saving with optimistic UI updates and local cache invalidation via TanStack Query.

### 2. Multi-View Sprint Board
- Built a fluid Kanban interface using `@dnd-kit` with collision detection algorithms and optimistic position updates.
- Designed a companion table view for high-density keyboard-driven triage (arrow key navigation, inline status toggling with hotkeys).
- Configured automated rollup logic: dragging the final open issue of a milestone to `Done` automatically prompts the user to archive the milestone and recalculates goal completion percentages.

### 3. Asynchronous Vector Retrieval Pipeline
- Rather than running heavy AI embedding operations inside the synchronous Next.js request-response lifecycle, all document mutations dispatch a background job to **BullMQ** backed by **Redis**.
- The worker chunks modified markdown content into semantic blocks (500 tokens with 50-token sliding overlap) and hashes each chunk with SHA-256.
- If the content hash has not changed, the chunk is skipped. Only modified chunks generate OpenAI API calls, drastically reducing embedding latency and API costs.
- Vectors are stored in a dedicated PostgreSQL `document_embeddings` table equipped with an **HNSW** (Hierarchical Navigable Small World) index for fast approximate nearest neighbor search.

---

## 5. Technical Decisions & Defenses

### Decision 1: PostgreSQL + pgvector over Pinecone or Weaviate
Many modern AI architectures introduce an external vector database like Pinecone. I intentionally rejected this:
- An external vector database introduces two separate distributed systems that must be kept in sync. If a user deletes a private document in PostgreSQL, you must issue a corresponding delete call to Pinecone. If that external call fails or times out, orphaned private data remains in the vector store.
- By keeping vectors directly inside **PostgreSQL with pgvector**, relational deletions leverage native `ON DELETE CASCADE`. If a page is deleted, all associated chunk vectors and embeddings are pruned atomically within the same SQL transaction.

### Decision 2: Materialized Paths over Recursive CTEs
In early prototypes, retrieving the nested folder tree for the navigation sidebar relied on recursive Common Table Expressions (CTEs) traversing `parent_id` pointers.
- At 200+ nested documents, recursive queries took upwards of 420ms and saturated Prisma connection pools.
- I refactored the data model to use **Materialized Paths** (`path: "workspace/projects/krama/specs"`). A single indexed query with `WHERE path LIKE 'workspace/projects/%'` fetches the entire subtree in 14ms without recursion.

### Decision 3: Redis-Backed BullMQ Workers over Serverless Functions
Autosaving a 3,000-word design document triggers dozens of paragraph updates per minute.
- Firing serverless Edge functions for every keystroke quickly exceeds provider rate limits and burns through concurrency quotas.
- Deploying a dedicated BullMQ queue with **job debouncing** ensures that rapid typing events are collapsed into a single reconciliation job executed 15 seconds after the user pauses typing.

---

## 6. Hard Bugs & Engineering Hurdles

### The Tiptap SSR Hydration Mismatch
- **The Bug**: ProseMirror documents generate client-side DOM IDs for node reconciliation. During Next.js 14 Server-Side Rendering (SSR), the server HTML rendered without these dynamic IDs, causing React hydration mismatches on every page refresh.
- **The Fix**: Structured the editor into an isolated client-only boundary with a deterministic fallback skeleton loader. Server components pass immutable serialized JSON ASTs down, and the client component mounts Tiptap only after hydration completes, guaranteeing zero console warnings and rock-solid rendering stability.

### Prisma Connection Pool Saturation Under Queue Bursts
- **The Bug**: When a user imported an existing markdown repository with 40 files, the BullMQ worker spawned 40 concurrent chunking jobs. Each job opened its own Prisma connection, exhausting the default connection pool limit (10 connections) and throwing `Timed out fetching a new connection from the connection pool`.
- **The Fix**: Reconfigured the worker concurrency to a strict limit of 4 parallel jobs, implemented connection reuse via a singleton Prisma client instance with explicit connection timeouts, and grouped multiple chunk insertions into a single batch `prisma.chunk.createMany()` call.

---

## 7. Honest Retrospective: What I Learned & What I'd Redesign

1. **Prisma vs. Drizzle**: Prisma's query engine binary adds measurable cold-start latency and makes fine-grained SQL optimization difficult. While it served well for rapid schema prototyping in KRAMA OS, building my subsequent project (**Context**) with Drizzle ORM proved that lightweight TypeScript-native SQL mapping provides far superior transparency and control.
2. **Real-Time Collaboration**: v1 of KRAMA OS uses optimistic debounced saving. While ideal for solo engineers, true team collaboration requires a Conflict-Free Replicated Data Type (CRDT) engine like Yjs. Retrofitting Yjs onto an existing Tiptap schema after the fact is significantly more complex than designing for CRDTs from day one.
3. **The Focus Trap**: I originally attempted to build every feature at once—flashcards, voice notes, calendar syncing, and pomodoro timers. The product only found its rhythm when I ruthlessly pruned the distractions and focused exclusively on the core triangle: **Documents, Tasks, and Semantic Search**.

---

## 8. Current Status & Next Steps

- **Status**: Core workspace fully operational. Document editing, sprint boards, and pgvector RAG are working in active daily development.
- **Next Milestone**: Migrating the Tiptap synchronization layer to **Yjs over WebSockets** to support real-time multi-user cursor tracking, and adding offline-first IndexedDB persistence via RxDB.
