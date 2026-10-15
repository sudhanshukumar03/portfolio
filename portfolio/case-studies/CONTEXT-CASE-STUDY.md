# Case Study: Context — Incident Intelligence & Causal Graphs

| | |
|---|---|
| **Project** | Context |
| **Role** | Architect & Full-Stack Developer |
| **Stack** | TypeScript 5.9, React 19, Express 5.0, PostgreSQL 16, Drizzle ORM, Vite 7, OpenAI GPT-4o-mini, Clerk |
| **Repository** | [github.com/sudhanshukumar03/Context](https://github.com/sudhanshukumar03/Context) |

---

## 1. The Incident: Tuesday, 2:14 AM

At 2:14 AM, PagerDuty triggers on `checkout-service`: 504 Gateway Timeouts, error rates leaping to 28%, and latency crossing 4,200ms. 

Within ninety seconds, six adjacent monitors light up red: `payment-v2` connection pool exhausted; `auth-session` Redis latency spike; `order-processor` queue depth exceeding 10,000; `api-gateway` dropping 5% of ingress traffic.

Thirty engineers join the incident call. One group suspects AWS network degradation in `us-east-1`. Another checks whether a midnight migration locked an active table. A third suspects Stripe webhook failures.

Every dashboard confirms things are broken. And nobody knows *why*.

Engineers begin the traditional incident triage ritual: Datadog in tab one, Grafana in tab two, Honeycomb in tab three, GitHub releases in tab four. They correlate timestamps by eye, ask in Slack who deployed what, and trace network hops from memory. Forty minutes in, someone discovers an engineer pushed a minor config change to `inventory-db` at 2:08 AM that accidentally dropped the max connection pool from 200 to 20.

The database hadn't crashed—it had simply started queueing requests. That queue choked `inventory-service`, which timed out `cart-service`, which brought down `checkout-service`.

The remediation was trivial:
```bash
kubectl rollout undo deployment/inventory-db
```
It took 30 seconds to run. The diagnosis took 44 minutes and cost an estimated $68,000 in failed transactions.

---

## 2. The Core Realization: Telemetry Deluge vs. Zero Causality

Modern distributed systems generate millions of logs, traces, and metrics. Each microservice faithfully records its own local symptoms:
- `checkout-service`: *"I am timing out."*
- `cart-service`: *"I am waiting on inventory."*
- `inventory-service`: *"I am waiting on DB connections."*
- `inventory-db`: *"I was redeployed 6 minutes ago."*

None of these alerts is a false positive. But thirty alerts describing symptoms do not equal an explanation of cause. Monitoring tools record *that* a metric crossed a threshold; they are silent on *why* it crossed it and how it propagated.

**The operational cost of an incident was never the recovery command. A rollback takes seconds. The cost is the human correlation time required to isolate patient zero.**

Context was built to solve this exact bottleneck.

---

## 3. The Approach: Topology Meets Causal AI

I established four foundational invariants for Context:

> **Graphs map causality. Telemetry streams evidence. AI explains root causes. Engineers command.**

### Invariant 1: Physical Topology Over Semantic Guesswork
Many teams attempt to use pure vector search over log streams to "diagnose" incidents with LLMs. This is fundamentally flawed: two completely unrelated services can throw identical timeout errors at the same timestamp. 

Instead, Context grounds everything in a **Directed Acyclic Graph (DAG)** of actual service dependencies. If Service A does not connect to Service B directly or transitively, an outage in B cannot be the causal root of A's failure. Topology acts as the deterministic mathematical guardrail.

### Invariant 2: Strictly Read-Only AI
In fintech, e-commerce, and healthcare systems, letting an autonomous AI agent issue blind `kubectl delete pod` commands or execute database migrations in production is irresponsible. 

Context's AI Incident Commander is strictly **read-only**. It ingests telemetry, traverses the dependency tree, performs multi-hop causal reasoning, calculates confidence scores, and drafts playbooks. But the human operator remains the commander who authorizes any production change.

### Invariant 3: Remediation Sandboxing
Operators are often hesitant to roll back deployments mid-outage out of fear that it might trigger a database schema mismatch or cascading restart loop. Context includes an in-memory simulation sandbox that models the expected recovery curve across dependent services over an 8-second simulation cycle before changes touch live clusters.

---

## 4. Key Subsystems Built

### 1. The Dynamic Dependency Graph Canvas
- Interactive SVG canvas built in **React 19** with force-directed physics.
- Renders services as nodes styled by state (`Healthy`, `Investigate`, `Degraded`).
- Visualizes directional blast radiuses with pulsing edges, allowing engineers to instantly spot upstream bottlenecks and downstream dependencies.
- Supports 50% to 250% zoom, pan, and node focus without DOM lag.

### 2. Multi-Source Telemetry Ingress Pipeline
- Built on **Express 5.0** and **PostgreSQL 16** via **Drizzle ORM**.
- Dedicated endpoints for Kubernetes deployment webhooks, PagerDuty/Datadog alert webhooks, and Slack incident bridge chat.
- Normalized into unified `service_events` and `service_messages` tables with millisecond-precision timestamps.

### 3. Role-Based AI Incident Commander
Incidents involve different stakeholders who need completely different information:
- **Engineers** need stack traces, affected endpoints, and copyable `kubectl` commands.
- **SREs** need MTTR estimates, cascading blast-radius percentages, and queue depth metrics.
- **Managers** need plain-English business impact summaries, incident duration, and dollars-per-hour at risk.

Context uses structured schema extraction with OpenAI models to generate all three lenses simultaneously from a single causal timeline.

---

## 5. Technical Decisions & Defenses

### Decision 1: Drizzle ORM over Prisma
In my earlier project KRAMA OS, I used Prisma. While Prisma's developer ergonomics are pleasant, its query engine overhead and opaque connection pooling added unwanted latency during high-frequency telemetry spikes. For Context, I switched to **Drizzle ORM**. Drizzle is lightweight, TypeScript-native, and compiles to raw SQL with zero runtime overhead, which is critical when ingesting webhook bursts during an active outage.

### Decision 2: Server-Sent Events (SSE) over Full WebSockets
The client primarily streams AI reasoning output, status transitions, and timeline updates from server to client. A bi-directional WebSocket connection would require additional reconnection logic, heartbeat pinging, and complex state management across reverse proxies. SSE provides native HTTP streaming, automatic browser reconnection, and effortless integration with HTTP-based authentication (Clerk JWTs).

### Decision 3: Express 5.0 over Fastify
While Fastify boasts higher synthetic benchmark numbers, Express 5.0 provides native async/await error propagation without uncaught rejection leaks, seamless middleware compatibility, and straightforward route modularity. For an incident control plane where correctness and reliability take precedence over microsecond benchmark vanity, Express 5 is battle-tested and rock-solid.

---

## 6. Challenges Faced & Resolved

1. **Cycle Detection in Complex Microservice Topologies**:
   - *Problem*: In real-world enterprise architectures, circular dependencies (Service A calls B, which calls back into A) can cause naive recursive DAG traversals to enter infinite loops.
   - *Fix*: Implemented Tarjan's strongly connected components algorithm with cycle suppression and visited-set tracking to ensure all blast-radius calculations terminate safely within 15ms.

2. **LLM Hallucinations in Financial Calculations**:
   - *Problem*: Early iterations asked the LLM to "estimate revenue loss based on the incident." The model frequently hallucinated wild, inconsistent numbers between queries.
   - *Fix*: Decoupled arithmetic from the LLM. The core backend calculates revenue loss deterministically by multiplying downstream service tier traffic baselines by average checkout value. The LLM is only permitted to format and contextualize the pre-calculated number.

---

## 7. Reflections

Context reinforced my core engineering stance: **AI is at its best when paired with deterministic systems, not when tasked with replacing them.** 

By constraining the model with a physical service topology graph and hard mathematical rules, the diagnosis shifts from probabilistic guessing to verifiable, explainable root-cause isolation.
