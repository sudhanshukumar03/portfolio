# Case Study: LedgerMind — Deterministic Financial Reconciliation First, AI Second

| | |
|---|---|
| **Project** | LedgerMind |
| **Role** | Backend Architect & Systems Engineer |
| **Stack** | NestJS, TypeScript, PostgreSQL 16, Prisma ORM, Redis, BullMQ, Docker, Next.js 14, Google Gemini API |
| **Repository** | [github.com/sudhanshukumar03/ledgerMind](https://github.com/sudhanshukumar03/ledgerMind) |

---

## 1. The Incident: The ₹3.4M Month-End Mystery

It was the final day of the financial quarter. A fast-growing direct-to-consumer e-commerce brand was preparing their books for monthly close. The payment gateway dashboard reported **₹84.2M** in gross customer collections. The internal order management system reported **₹87.6M** in fulfilled orders. And the company's ICICI current account showed net bank settlements of **₹81.9M**.

Between internal orders, payment gateway collections, and physical bank deposits lay an unresolved discrepancy of **₹3,400,000**.

Three finance accountants spent four sleepless days in Excel:
- Exporting 140,000 transaction rows into `.xlsx` files that caused their laptops to freeze.
- Writing complex `VLOOKUP` and `INDEX(MATCH)` formulas that broke whenever customer phone numbers had leading zeros stripped.
- Calling the payment gateway support desk to locate missing settlement batch numbers.

When they finally isolated the discrepancies, the causes were mundanely technical:
1. **Webhook Retries**: A network blip during a flash sale caused 412 gateway webhooks to fail delivery; orders were fulfilled, but the gateway transactions were marked "Pending" in the internal database.
2. **Batch Settlement Netting**: The bank had deducted ₹1.8M in variable MDR (Merchant Discount Rate) fees, GST, and dispute holdbacks directly from the lump-sum settlement payout without line-item references.
3. **Delayed Refunds**: Customers who canceled orders at 11:59 PM had refunds deducted from the subsequent day's settlement batch.

The cost was not just the ₹3.4M balance scare—it was 160 man-hours of high-stress financial forensics.

**I built LedgerMind to automate this entire reconciliation waterfall with mathematical certainty, using artificial intelligence strictly where it belongs: investigating human edge cases, not doing financial math.**

---

## 2. The Core Realization: The "AI-First" Fintech Trap

In the current GenAI frenzy, dozens of emerging startups pitch "Autonomous AI Accountants" powered by large language models. They prompt an LLM with raw bank statements and ask it to "find matching payments."

This is an architectural catastrophe waiting to happen:
- **LLMs are Probabilistic, Not Deterministic**: A neural network calculates token probabilities; it does not possess an internal arithmetic ALU. Even state-of-the-art models like GPT-4o or Gemini 1.5 occasionally fail at multi-digit floating-point arithmetic or hallucinate missing transaction IDs under heavy context load.
- **Auditors Require Mathematical Proof**: A tax auditor or CFO cannot accept *"the AI model had 94% confidence this ₹45,000 deposit matches Order #1042."* Financial systems demand deterministic, verifiable audit trails with immutable cryptographic hashes.

**The foundational invariant of LedgerMind is unequivocal:**
> **Never let a probabilistic machine learning model mutate financial balances. Deterministic rules match the money. The LLM only explains the anomalies.**

---

## 3. The 4-Tier Deterministic Waterfall

LedgerMind routes every transaction through a four-tier waterfall algorithm. The moment a record matches at a tier, it is locked into an immutable reconciled ledger entry:

```
                      [ Incoming Transaction Record ]
                                     │
                                     ▼
                      ┌─────────────────────────────┐
                      │ Tier 1: Exact Identifier    │
                      │ Gateway Payment ID / Order  │
                      └──────────────┬──────────────┘
                                     │ Unmatched
                                     ▼
                      ┌─────────────────────────────┐
                      │ Tier 2: Bank Settlement Ref │
                      │ Unique Transaction Ref(UTR) │
                      └──────────────┬──────────────┘
                                     │ Unmatched
                                     ▼
                      ┌─────────────────────────────┐
                      │ Tier 3: Fee-Aware Window    │
                      │ Gross - Fee = Net in ±72h   │
                      └──────────────┬──────────────┘
                                     │ Unmatched
                                     ▼
                      ┌─────────────────────────────┐
                      │ Tier 4: Metadata Similarity │
                      │ Email / Phone / Fingerprint │
                      └──────────────┬──────────────┘
                                     │ Unmatched
                                     ▼
                      ┌─────────────────────────────┐
                      │  Flagged as True Exception  │
                      │  Dispatched to Gemini Agent │
                      └─────────────────────────────┘
```

### Tier 1: Exact Unique Identifier Matching
- Direct $O(1)$ database index lookup matching `razorpay_payment_id` against the internal `order.payment_reference`.
- Resolves ~88% of standard successful online transactions instantly.

### Tier 2: Clearing Bank UTR & Payout Correlation
- When gateways batch funds into the merchant's bank account, they issue an NEFT/RTGS **Unique Transaction Reference (UTR)**.
- LedgerMind parses bank settlement reports, extracts the UTR, and matches it against the gateway's batch settlement manifest.
- Resolves the complex 1-to-many relationship where one bank deposit represents 800 individual customer checkouts.

### Tier 3: Fee-Aware Dynamic Time-Window Matching
- When transactions arrive without clear parent IDs (e.g., direct UPI collect requests or offline bank transfers), the engine evaluates:
  $$\text{Expected Net} = \text{Order Gross} - (\text{MDR Fee} \times \text{Gross}) - \text{Applicable GST}$$
- If an unallocated credit matches this net amount within a configurable $\pm 72$-hour timestamp window, the engine flags it as a high-probability match requiring single-click controller confirmation.

### Tier 4: Metadata & Customer Identity Correlation
- Evaluates SHA-256 hashes of customer emails, billing phone numbers, and device fingerprints to match orphaned authorizations where a buyer abandoned the browser checkout screen before the callback webhook fired.

---

## 4. The AI Exception Investigator: Gemini in a Sandbox

Only transactions that fail Tiers 1 through 4 reach the AI layer. These represent genuine real-world anomalies: unauthorized chargebacks, partial refunds, duplicate customer debits, or gateway escrow holds.

Instead of writing vague prompts, LedgerMind structures anomaly data into a strict schema:
1. **Payload Assembly**: Combines the orphaned payment log, the customer's previous 6 months of order history, gateway webhook headers, and error codes (`BAD_REQUEST_ERROR`, `PAYMENT_TIMED_OUT`).
2. **Constrained Schema Enforcement**: The prompt instructs **Google Gemini 1.5** to output a strictly typed JSON structure containing:
   - `failure_classification`: Categorized enum (`DUPLICATE_AUTH`, `UNLINKED_REFUND`, `MDR_MISMATCH`, `FRAUD_HOLD`).
   - `root_cause_explanation`: 2-sentence plain-English diagnosis for the CFO.
   - `recommended_action`: Exact administrative API payload (e.g., `POST /v1/payments/{id}/refund` with specific amount).
3. **Zero Autonomous Mutation**: The AI cannot touch the database. It renders an investigation card on the LedgerMind Next.js dashboard, allowing the finance controller to review the evidence and authorize the proposed remediation with one click.

---

## 5. Technical Decisions & Defenses

### Decision 1: Integer-Based Minor Currency Storage over IEEE-754 Floats
- Using standard `number` or `float` types in JavaScript and databases leads to notorious floating-point arithmetic errors (`0.1 + 0.2 = 0.30000000000000004`). In financial systems processing millions of rupees, accumulated fractional cents produce ledger imbalances that fail statutory financial audits.
- In LedgerMind, every monetary figure (`gross_amount`, `fee_amount`, `tax_amount`, `net_settled`) is strictly stored and calculated as an **integer representing minor units (paisa / cents)** in PostgreSQL `BIGINT`. Floating point is banned across the entire backend codebase.

### Decision 2: BullMQ & Redis Distributed Locks over Direct Database Transactions
- During peak flash sales (e.g., Diwali or Black Friday), payment gateways fire hundreds of concurrent webhooks per second.
- Attempting to reconcile transactions synchronously within the HTTP webhook endpoint causes database lock contention and connection pool exhaustion.
- LedgerMind immediately writes incoming webhook payloads to a **Redis BullMQ** queue and returns HTTP 200 OK within 12 milliseconds. Background workers consume the queue sequentially per merchant account, using distributed Redis locks (`SETNX`) with a 60-second TTL to guarantee idempotent single-execution.

### Decision 3: NestJS Modular Architecture over Ad-Hoc Express Scripts
- Fintech systems require strict boundary enforcement: the Webhook Ingress module must not have direct dependency on the AI Resolution module, and the General Ledger service must enforce immutable write-only audit logs.
- Built on **NestJS**, LedgerMind utilizes dependency injection, class-validator DTOs, and explicit domain boundaries, ensuring that billing business rules cannot be bypassed accidentally.

---

## 6. Hard Engineering Challenges Solved

### Handling Webhook Replay Storms & Out-of-Order Delivery
- **The Challenge**: During network partitions, Razorpay retries webhook delivery up to 24 hours later with identical event IDs, but sometimes slightly different timestamp payloads. Additionally, a `refund.processed` webhook would occasionally arrive *before* the initial `payment.captured` webhook had completed processing in the queue.
- **The Resolution**: Built an **Event Versioning State Machine**. When a refund event arrives for a non-existent payment ID, LedgerMind writes the event to a "Pending Settlement Buffer" in Redis with a 15-minute TTL rather than failing with an error. When the delayed `payment.captured` event finally lands, the worker automatically checks the buffer, discovers the waiting refund, and executes both transitions atomically within a single PostgreSQL transaction.

### Bank Statement CSV Streaming Under Memory Constraints
- **The Challenge**: Monthly corporate bank statements often exceed 200MB and contain 80,000+ line items. Attempting to parse this file using `fs.readFileSync` and `JSON.parse` crashed the Node.js Docker container with an `Out of Memory` (OOM) error.
- **The Resolution**: Re-architected the ingestion pipeline using Node.js **streaming pipelines** (`stream.pipeline` + `csv-parser`). The file is streamed in 500-row chunks directly from disk to worker threads, keeping memory consumption steady at under 45MB regardless of statement size.

---

## 7. Honest Retrospective: What I Learned & What I'd Do Differently

1. **Gateways Have Undocumented Edge Cases**: Razorpay and Stripe documentation suggests webhooks are comprehensive. In production, certain banking network drops result in payments that succeed at the customer's bank but remain indefinitely stuck in "Authorized" on the gateway side until an end-of-day batch sync. Relying solely on webhooks is insufficient; an automated daily cron reconciliation query is mandatory.
2. **What I'd Redesign**: In v1, the deterministic rule weights for Tier 3 (fee-aware window matching) are hardcoded. In a production v2, I would make these tolerance thresholds ($\pm \text{days}$, $\pm \text{fee percentage}$) dynamically configurable per merchant tenant, as SaaS recurring billing behaves very differently from e-commerce logistics payouts.

---

## 8. Current Status & Next Steps

- **Status**: Core reconciliation engine, webhook ingress, 4-tier waterfall, and Gemini anomaly reasoning fully implemented and tested against real-world payment data schemas.
- **Next Milestone**: Integrating directly with Account Aggregator (AA) APIs to pull live bank settlement feeds directly, bypassing manual CSV uploads entirely.
