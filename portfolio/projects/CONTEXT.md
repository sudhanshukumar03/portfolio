# Context — Autonomous Incident Intelligence & Causal Dependency Graph

> *"Your system already knows it's failing. Context explains why."*

- **Repository**: [github.com/sudhanshukumar03/Context](https://github.com/sudhanshukumar03/Context)
- **Role**: Architect & Full-Stack Developer
- **Status**: Production-grade system / active development
- **Stack**: TypeScript 5.9, Express 5.0, React 19, Vite 7, PostgreSQL 16, Drizzle ORM, OpenAI GPT-4o-mini, Clerk

---

## 1. Summary

Context is an incident intelligence platform that transforms hundreds of fragmented alerts across Kubernetes, Datadog, PagerDuty, and Slack into an explainable causal graph. It isolates true root causes in seconds, calculates financial revenue exposure, simulates remediation actions in an isolated sandbox, and delivers tailored incident briefs for Engineers, SREs, and Managers.

---

## 2. The Core Problem

Modern microservice architectures generate hundreds of thousands of signals every minute. When a failure happens, each subsystem faithfully reports its own symptoms:
- `checkout-service`: *"I am timing out."*
- `cart-service`: *"I am waiting on inventory."*
- `inventory-service`: *"I am waiting on DB connections."*
- `inventory-db`: *"I was redeployed 6 minutes ago."*

None of these alerts is wrong. But thirty simultaneous symptom alerts do not equal an explanation of cause. Engineers spend 40+ minutes jumping between four dashboards, guessing in Slack, and correlating timestamps by eye—while transactions fail and revenue burns. 

The fix is usually trivial (e.g., `kubectl rollout undo deployment/inventory-db` in 30 seconds). The diagnosis is what costs tens of thousands of dollars.

---

## 3. Four System Invariants

The entire architecture is governed by four strict rules in an exact order:

> **Graphs map causality. Telemetry streams evidence. AI explains root causes. Engineers command.**

1. **Topology First**: Microservice dependencies form a directed acyclic graph (DAG) that dictates how failures can physically propagate.
2. **Causal Root-Cause Isolation**: Alerts are symptoms; deployments and configuration drifts are triggers. The system traces downstream cascades back up to patient zero.
3. **AI Never Mutates Production**: The AI Incident Commander is strictly read-only. It inspects evidence, computes confidence scores, and formats playbooks. Only authorized human engineers can execute remediation commands.
4. **Isolated Simulation**: Remediation actions (`rollout undo`, `throttle`, `restart`) are simulated in an in-memory sandbox first to project recovery before touching production clusters.

---

## 4. Subsystems & Responsibilities

| Subsystem | Responsibility | Mutates Prod? | Storage / Technology |
|---|---|:---:|---|
| **Telemetry Ingress** | Ingest K8s rollouts, PagerDuty alerts, Slack incident logs | No | `service_events`, `service_messages` |
| **Dependency Graph Engine** | Directional topology mapping, force layout, blast-radius calculation | No | In-memory DAG + `service_dependencies` |
| **Risk & Cascade Evaluator** | Calculate revenue at risk ($/hr), failure probability for healthy nodes | No | Real-time graph computation |
| **AI Incident Commander** | Multi-hop causal reasoning, role-based briefing synthesis | **Never** | OpenAI GPT-4o-mini structured JSON |
| **Remediation Sandbox** | Dry-run rollback, throttling, and restarts in an 8s recovery lifecycle | Simulation only | In-memory sandbox state |
| **Incident Operator** | Review evidence, evaluate financial impact, authorize commands | **Authorizes** | Production cluster |

---

## 5. Technical Stack

- **Frontend**:
  - React 19 & Vite 7 for near-instant rendering.
  - Interactive SVG force-directed topology canvas with 50%–250% zoom and animated propagation pulses.
  - Low-latency AudioWorklet PCM16 streaming player for voice-synthesized incident briefs.
- **Backend**:
  - Express 5.0 on Node.js 22 with modular route architecture.
  - Server-Sent Events (SSE) for streaming AI reasoning and telemetry pings in real time.
  - Clerk auth for organization-scoped multi-tenant boundaries and JWT verification.
- **Database**:
  - PostgreSQL 16 with Drizzle ORM.
  - Relational schema modeling `organizations`, `users`, `services`, `service_dependencies`, `service_events`, and `service_messages`.
- **AI & Reasoning**:
  - OpenAI GPT-4o-mini with rigid schema enforcement and confidence calibration.

---

## 6. Key Features

- **Interactive Topology Graph**: Visualizes live health (`Healthy`, `Investigate`, `Degraded`), directional dependency edges, and cascading blast radiuses.
- **Causal Incident Timeline**: Organizes events into logical phases: *Trigger* → *Impact* → *Recovery*, cutting out noisy intermediate warnings.
- **Role-Based Intelligence**:
  - **Engineer Lens**: Technical root cause, affected endpoints, and copyable `kubectl` commands.
  - **SRE Lens**: Blast radius percentages, MTTR projections, and downstream risk graphs.
  - **Manager Lens**: Plain-English executive summaries, incident duration counters, and revenue-loss estimations.
- **Remediation Sandbox**: Allows operators to test rollbacks, throttling, and pod restarts in an isolated simulation before applying them to Kubernetes.
