# LedgerMind — AI Finance Controller & Razorpay Reconciliation Engine

> *"Deterministic financial reconciliation first, LLM-driven exception analysis second. Never let a probabilistic model mutate financial ledger state."*

- **Repository**: [github.com/sudhanshukumar03/ledgerMind](https://github.com/sudhanshukumar03/ledgerMind)
- **Role**: Solo Backend Architect & Systems Engineer
- **Status**: Production-grade architecture / Active development
- **Stack**: NestJS, TypeScript, PostgreSQL 16, Prisma ORM, Redis, BullMQ, Docker, Next.js 14, Google Gemini API, Zod

---

## 1. Summary

LedgerMind is an automated financial reconciliation and anomaly detection platform built for high-growth e-commerce and SaaS platforms processing payments through Razorpay, bank transfers, and internal billing ledgers. It solves the critical operational challenge of fragmented payment records by running a four-tier deterministic matching algorithm to pair orders, payment gateway transactions, bank settlements, and refunds. When discrepancies inevitably occur, LedgerMind dispatches anomalies to an isolated AI investigation engine powered by Google Gemini, which synthesizes root-cause summaries and remediation proposals for finance controllers without ever modifying ledger balances autonomously.

---

## 2. The Problem: The Hidden Chaos of Modern Payments

Payment reconciliation sounds straightforward in theory: every customer order should have an identical payment gateway transaction and a matching bank settlement credit. In high-volume production reality, it is chaotic:
1. **Webhook Loss & Race Conditions**: Gateway webhooks arrive out of sequence, fail due to network timeouts, or trigger duplicate deliveries during retry storms.
2. **Settlement Discrepancies**: Gateways bundle hundreds of individual transactions into a single lump-sum daily settlement payout minus variable MDR (Merchant Discount Rate) fees and GST, making direct 1:1 row matching impossible without fee-aware reconciliation.
3. **Refund Timing Mismatches**: A refund requested at 11:58 PM may be deducted from tomorrow's settlement batch, resulting in false ledger imbalances.
4. **The "Throw AI at Money" Fallacy**: Many recent startups attempt to reconcile finance records using raw LLM prompts. This is dangerous: language models suffer from hallucinations, non-deterministic arithmetic errors, and token context limits. Money demands exact arithmetic and reproducible audit trails.

---

## 3. Core Architectural Principle: Strict Separation of Concerns

LedgerMind enforces an uncompromising rule:

> **The Ledger is Mathematical. The AI is Investigative.**

```
┌─────────────────────────────────────────────────────────────┐
│                   Ingress & Webhook Layer                   │
│   Razorpay Webhooks · Bank UTR CSVs · Internal Order APIs   │
│            HMAC-SHA256 Signature Verification               │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                    Idempotency & Queuing                    │
│   Redis Distributed Locks (`SETNX`) · BullMQ Worker Queue    │
│               Deduplication via Event Payload Hash           │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│             Deterministic Reconciliation Engine             │
│   Tier 1: Exact Gateway Payment ID Matching                 │
│   Tier 2: Bank UTR & Payout Reference Correlation            │
│   Tier 3: Fee-Adjusted Amount + Time-Window Matching         │
│   Tier 4: Metadata & Customer Identity Fuzzy Correlation    │
└──────────────┬──────────────────────────────┬───────────────┘
               │ Matched                      │ Unmatched / Discrepancy
┌──────────────▼──────────────┐┌──────────────▼───────────────┐
│     Balanced General Ledger ││    Exception Investigation   │
│   PostgreSQL Immutable Rows ││   Vector Retrieval + Gemini  │
│   Cryptographic Audit Hash  ││   Root-Cause & Suggested Fix │
│   Real-time Financial Dash  ││   Human Finance Controller   │
└─────────────────────────────┘└──────────────────────────────┘
```

---

## 4. The 4-Tier Deterministic Matching Engine

Every incoming financial record passes sequentially through four strict matching filters. If a record matches at an earlier tier, it is immediately reconciled and locked:

| Tier | Matching Strategy | Criteria | False Positive Rate |
|---|---|---|:---:|
| **Tier 1** | **Exact Identifier** | Direct match on `razorpay_payment_id` or `order_id` in gateway payload | 0.00% |
| **Tier 2** | **UTR & Settlement Ref** | Match on Unique Transaction Reference (UTR) issued by the clearing bank | < 0.01% |
| **Tier 3** | **Fee-Aware Window** | Exact net amount (`gross - fee - tax`) within a calibrated $\pm 72$-hour window | < 0.20% |
| **Tier 4** | **Metadata Correlation** | Customer email, phone hash, and device fingerprint similarity across orphan payments | Flagged for Review |

---

## 5. AI-Assisted Exception Intelligence

When a record fails Tier 1–3 matching (e.g., an unauthorized chargeback, an orphan payment where the user closed the browser mid-checkout, or a partial refund), it is tagged as an **Exception**.

Instead of leaving finance teams to manually cross-reference SQL tables and gateway logs:
1. LedgerMind packages the anomalous transaction, its timeline, gateway webhook headers, and adjacent customer payment attempts into a structured context payload.
2. The payload is sent to **Google Gemini 1.5** via a tightly constrained JSON schema.
3. The LLM identifies the failure mode (e.g., *"Customer experienced a session timeout at 14:02:11; a duplicate transaction succeeded at 14:04:30. Gateway holds two authorizations, but inventory only reserved one order"*).
4. The system presents the controller with a one-click actionable resolution (e.g., `Issue Refund on Duplicate Auth`).

---

## 6. Technical Challenges & Resolutions

### Challenge 1: Webhook Replay Attacks & Duplicate Delivery Storms
- **Issue**: Under peak traffic, Razorpay retry logic sends duplicate webhooks with identical event IDs or slightly modified retry timestamps, risking double-crediting balances.
- **Resolution**: Implemented distributed Redis locking with atomic `SETNX` keys (`lock:webhook:${eventId}`) with a 60-second TTL. If a concurrent webhook arrives while the first is being processed by BullMQ, it is rejected immediately with HTTP 200 (acknowledging receipt without re-executing state transitions).

### Challenge 2: Floating-Point Rounding Errors in Multi-Currency Settlements
- **Issue**: Standard JavaScript floating-point arithmetic (`0.1 + 0.2 !== 0.3`) causes minuscule rounding discrepancies in tax and MDR calculations, accumulating into ledger discrepancies over thousands of transactions.
- **Resolution**: Enforced integer-based storage (minor currency units / paisa / cents) across the entire PostgreSQL database and NestJS domain models. All fee ratios use big-number fixed-precision math libraries, guaranteeing zero precision leakage across millions of rows.

### Challenge 3: Heavy CSV Bank Statement Parsing Without Event Loop Blocking
- **Issue**: Reconciling monthly bank statements (50,000+ line CSVs) caused Node.js event loop lag when parsed synchronously in memory.
- **Resolution**: Designed a streaming chunk processor using Node.js readable streams and BullMQ batch workers. Statements are split into 1,000-row chunks, processed concurrently across worker threads, and aggregated into an atomic database transaction.

---

## 7. Links & Documentation

- **Live Codebase**: [github.com/sudhanshukumar03/ledgerMind](https://github.com/sudhanshukumar03/ledgerMind)
- **Deep-Dive Case Study**: [`case-studies/LEDGERMIND-CASE-STUDY.md`](../case-studies/LEDGERMIND-CASE-STUDY.md)
- **Local Preview Image**: `web/public/images/ledgermind.jpg`
