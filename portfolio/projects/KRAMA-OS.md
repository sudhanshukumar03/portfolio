# KRAMA OS — Unified Productivity & Knowledge Operating System

> *"A single connected workspace where notes, tasks, sprints, goals, habits, and knowledge retrieval live under one unified schema."*

- **Repository**: [github.com/sudhanshukumar03/KRAMA](https://github.com/sudhanshukumar03/KRAMA)
- **Role**: Solo Architect & Full-Stack Engineer
- **Status**: Active development / Core workspace deployed
- **Stack**: Next.js 14 (App Router), TypeScript, Node.js, PostgreSQL 16, Prisma ORM, Redis, BullMQ, Tiptap Editor, pgvector, Tailwind CSS

---

## 1. Summary

KRAMA OS is an all-in-one productivity operating system designed to replace the fragmented stack of disconnected productivity apps (Notion, Linear, Todoist, habit trackers, and standalone AI note tools) with a single, highly performant relational architecture. In KRAMA OS, documentation directly links to issues, issues roll up to weekly sprints and quarterly goals, habits inform productivity metrics, and an embedded RAG assistant answers questions grounded in your entire project history.

---

## 2. The Problem

Modern knowledge workers and developers suffer from severe cognitive fragmentation:
1. **The Context-Switching Tax**: Notes live in Notion, engineering tasks in Linear or Jira, personal habits in mobile apps, and reference docs in Google Drive. Linking an active bug to a sprint goal or technical spec requires constant copy-pasting of URLs across browser tabs.
2. **Disconnected Data Models**: When a project deadline slips in your issue tracker, your weekly time-blocking calendar and habit goals don't know about it. There is no relational integrity across knowledge and execution.
3. **Superficial AI Integration**: Generic AI tools lack context. Asking ChatGPT for help requires copying paragraphs out of your spec documents into a prompt window, creating privacy risks and losing version history.

KRAMA OS solves this by unifying the entire personal and team execution lifecycle under a single relational database schema where notes, tasks, habits, and embeddings share the same primary keys.

---

## 3. Architecture & System Design

```
┌─────────────────────────────────────────────────────────────┐
│                       Client Layer                          │
│   Next.js 14 App Router · React Server Components · Tiptap   │
│          Zustand UI State · TanStack Query Caching          │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / SSE / REST
┌──────────────────────────────▼──────────────────────────────┐
│                    Application Server                       │
│    Next.js Route Handlers · Jose JWT Auth · Zod Validation   │
│                 AI Gateway (SHA-256 Caching)                │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
┌──────────────▼──────────────┐┌──────────────▼───────────────┐
│     PostgreSQL 16 Database  ││      Redis & BullMQ Engine   │
│   Prisma ORM (Schema Core)  ││   BullMQ Async Background    │
│  pgvector Document Chunks   ││   Document Chunking Queue    │
│  Row-Level Tenant Isolation ││   Embedding Generation Tasks │
└─────────────────────────────┘└──────────────────────────────┘
```

---

## 4. Key Subsystems Built

### 1. The Brain Workspace (Document Engine)
- Headless block editor built on **Tiptap** and **ProseMirror**.
- Supports nested infinite-depth page trees, markdown shortcuts, syntax-highlighted code blocks, mathematical LaTeX expressions, and callout callouts.
- Real-time auto-saving with optimistic local state updates and debounced database synchronization.

### 2. The Execution & Sprint Engine
- Dual-view task management: Kanban boards with drag-and-drop column reordering and compact table views with inline keyboard navigation.
- Native issue hierarchy: `Goal` → `Sprint / Milestone` → `Issue` → `Subtask`.
- Status transitions trigger automatic audit logging and recalculate parent progress percentages.

### 3. Integrated Planner & Habit Loop
- Time-blocking matrix aligning daily calendar slots with active sprint tasks.
- Streak-tracking habit engine that correlates completion rates with task velocity, giving engineers a realistic view of productivity without vanity metrics.

### 4. Context-Aware Vector Retrieval (RAG Pipeline)
- Whenever a document is saved, a **BullMQ** worker parses the document tree into semantic chunks (500 tokens with 50-token overlap).
- Chunks are vectorized using OpenAI text-embedding-3-small and indexed in **PostgreSQL** via **pgvector** using HNSW indexes.
- In-workspace AI assistant queries the vector store, retrieves relevant project specs and task histories, and synthesizes answers with clickable citations back to the source document block.

---

## 5. Technical Challenges & Resolutions

### Challenge 1: Document Tree Hydration & Relational Performance
- **Issue**: Recursive tree queries for infinite-nested document lists caused N+1 database queries when navigating deep folder structures in Prisma.
- **Resolution**: Refactored the folder tree schema to utilize PostgreSQL Materialized Paths (`path: "root/folder_a/doc_b"`). Fetching an entire workspace subtree now executes in a single indexed `WHERE path LIKE 'root/folder_a%'` query, reducing initial sidebar load time from 480ms to under 18ms.

### Challenge 2: Background Embedding Queuing Under Burst Editing
- **Issue**: Debounced autosaving of long documents was triggering hundreds of synchronous embedding API calls, saturating serverless compute limits and incurring unnecessary OpenAI token costs.
- **Resolution**: Implemented a Redis-backed **BullMQ** queue with job deduplication keys based on `doc_id`. Updates within a 30-second window debounce onto the same queued job. Only modified chunks (detected via SHA-256 content hashes) are re-embedded, cutting vector generation overhead by 78%.

### Challenge 3: Tiptap State Serialization vs. Next.js Server Components
- **Issue**: Serializing complex ProseMirror JSON documents on the client and hydrating them into React Server Components led to React hydration mismatch errors when SSR rendered rich text.
- **Resolution**: Built a clean separation boundary: server components fetch and pass clean JSON ASTs; dedicated client leaf components instantiate the Tiptap editor engine with fallback skeleton placeholders, eliminating SSR hydration errors while preserving instant paint times.

---

## 6. Links & Documentation

- **Live Codebase**: [github.com/sudhanshukumar03/KRAMA](https://github.com/sudhanshukumar03/KRAMA)
- **Deep-Dive Case Study**: [`case-studies/KRAMA-OS-CASE-STUDY.md`](../case-studies/KRAMA-OS-CASE-STUDY.md)
- **Local Preview Image**: `web/public/images/krama-os.jpg`
