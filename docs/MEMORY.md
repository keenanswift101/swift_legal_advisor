# MEMORY.md — Project history, decisions & current state

Living memory of the Swifty project. Update when significant decisions are made.
Last updated: 12 June 2026.

## Identity

- **Product:** Swifty — Paralegal Assistant (Namibia)
- **Mission:** affordable first legal answers for low/middle-income Namibians
- **Formerly:** "NamibiaLex AI Legal Advisor" — fully rebranded June 2026
- **Owner:** Keenan Husselmann (khusselmann@x4o.co.za)

## Key decisions (and why)

| Decision | Rationale |
|---|---|
| Monochrome black/white/grey UI, no emojis | Professional, serious product for a legal context; flag + crisis red are the only colour |
| Guided intake wizard before chat | Target users don't know what to type into a blank box; tap-to-answer beats free text in distress |
| Composed intake message is plain first-person text | Transparent to the user (they see exactly what was sent) and doubles as retrieval keywords |
| Agent activity timeline driven by real SSE events | "Shows it's thinking" without fake animation; stages tick on actual domain/token events |
| Static Legal Info Library bundled in the frontend | Zero marginal cost, works offline/when AI is down, public-good fallback linked per case |
| Government Gazette = own collection mapped to ALL domains | Gazettes cut across every legal area and are the freshest source in the KB |
| Errors sanitized at backend AND frontend | Raw API errors (request IDs, billing messages) must never reach end users |
| ChromaDB + local all-mpnet-base-v2 embeddings | No per-query embedding cost; the entire KB is queryable offline |
| Sources kept in `corpus/`, DB git-ignored | Re-ingestable from source; vector DB is a build artifact |

## Knowledge base state (live counts, 12 Jun 2026)

Total **9,973 chunks** across 10 collections — full breakdown in [BRAIN.md](BRAIN.md).
`banking_act` is empty (download source 404) — banking relies on BoN/NAMFISA docs.

## Build history (June 2026)

1. RAG pipeline + ingestion of core statutes, BoN determinations, NAMFISA circulars
2. Rebrand NamibiaLex → Swifty; monochrome design; everyday-law scope (criminal/family/property domains added)
3. Markdown corpus ingested (legalCorpus, case digest, key statutes — 110 chunks)
4. 7 June-2026 Government Gazettes ingested (182 chunks)
5. Guided Case Intake wizard (8 categories, crisis banner with 10111/106)
6. Live agent activity timeline; light theme (white bg / black text)
7. Landing page; persistent chat input; "Start a new case" recovery
8. Error sanitization both layers; static Legal Info Library (8 guides) linked to cases
9. Domain classifier fix: chat.py VALID_DOMAINS now includes criminal/family/property
10. Documentation suite + IP audit + legal compliance review (this commit)

## Known issues / watch list

- **Anthropic API credits exhausted** (11 Jun 2026) — owner topping up; app degrades
  gracefully to friendly errors + guides in the meantime
- `banking_act` collection empty (LAC source 404) — find alternative source
- No auth, no persistence of conversations (by design for now; privacy selling point)
- No automated test suite — verification done via Playwright browser runs
- Domain classification quality: monitor "general" rate now that all 9 domains are valid

## Next steps (agreed roadmap)

1. Top up API credits → verify cited answers end-to-end again
2. Law firm / legal-aid pilot
3. JWT auth + saved matters (SQLite first)
4. BIPA trademark registration for "Swifty" (see IP-AUDIT.md)
5. Terms of Service + Privacy page (see LEGAL-COMPLIANCE.md)
