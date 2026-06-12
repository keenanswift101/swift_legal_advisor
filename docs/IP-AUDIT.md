# IP-AUDIT.md — Intellectual property audit: Swifty

Audit date: 12 June 2026 · Owner: Keenan Husselmann · Status: pre-launch
**This is an internal working document, not legal advice. Validate with an IP
practitioner before registration or investment events.**

## 1. IP assets created (what you own)

| # | Asset | IP type | Protection today | Action |
|---|---|---|---|---|
| 1 | Source code (frontend, backend, ingestion pipeline) | Copyright | Automatic on creation — Copyright and Neighbouring Rights Protection Act 6 of 1994 (Namibia is a Berne Convention member) | Add copyright headers/NOTICE; keep authorship records (git history is evidence) |
| 2 | Brand: name "Swifty", logo lockup (scales + flag), trade dress (monochrome system) | Trademark (unregistered) | Common-law passing-off only — weak | **Register at BIPA** under the Industrial Property Act 1 of 2012. Suggested Nice classes: 9 (software), 42 (SaaS), 45 (legal information services) |
| 3 | System prompts & agent persona (`prompts.py`, `drafting_prompts.py`) | Trade secret + copyright | Secret while repo is private | Keep out of client bundle (server-side only — currently true). NDA for collaborators |
| 4 | Intake triage logic (`intake.ts` question flows) | Copyright (literary work) + trade secret | Shipped to browsers — visible to anyone | Accept exposure; the moat is the curated whole, not one file |
| 5 | Legal Info Library guides (`guides.ts`) | Copyright (original plain-language authorship) | Automatic | Add © notice on guide pages when public |
| 6 | Knowledge-base compilation (selection/arrangement of 9,973 chunks, domain routing, chunk strategy) | Compilation copyright + trade secret | `chroma_db/` is git-ignored and server-side | Keep the built DB private; it is the core proprietary asset |
| 7 | Domain & contact identity (swifty.legal referenced in code) | Domain | **Not yet verified as registered** | Register swifty.legal (and .com.na / .na) before any public launch |
| 8 | Documentation suite (README, DESIGN, BRAIN…) | Copyright | Automatic | — |

## 2. Third-party inputs (what you depend on)

### Content
| Input | Status | Risk |
|---|---|---|
| Namibian statutes, Constitution, Government Gazettes | **Official texts are not protected by copyright** (Act 6 of 1994 excludes official texts of a legislative, administrative or judicial nature — Berne art. 2(4)) | None for the texts themselves |
| NamibLII-sourced compilations (`corpus/*.md`) | Raw law is public; NamibLII's *value-added* presentation may carry terms (free-access-to-law movement, generally permissive non-commercial-friendly) | LOW — verify NamibLII terms before commercial launch; attribute source (already done in file headers) |
| BoN determinations, NAMFISA circulars | Public regulatory instruments, freely published | LOW — keep attribution |
| 2025 case headnotes/digests in corpus | Judgments are official texts; *editorial headnotes* can be protected if copied from a publisher | **MEDIUM — confirm headnotes are original summaries, not copied from a commercial publisher (e.g. Juta/LexisNexis)** |

### Software (all compatible with proprietary use; obligations are notice-level)
| Dependency | License |
|---|---|
| FastAPI, LangChain/LangGraph, langchain-anthropic, React, Vite, Tailwind, react-markdown, remark-gfm | MIT |
| uvicorn, pypdf | BSD-3 |
| ChromaDB, sentence-transformers, **all-mpnet-base-v2 model** | Apache-2.0 |
| Inter font | SIL OFL 1.1 |
| Icons (hand-drawn in Heroicons style; Heroicons itself is MIT) | Original/MIT-style |

**Obligation:** ship a THIRD-PARTY-NOTICES file with license texts at distribution.

### Services
- **Anthropic API** — usage governed by Anthropic's Commercial Terms & Usage
  Policy. Legal-information use cases are *high-stakes*: requires AI disclosure
  to users (✓ done — "AI Paralegal" labels + disclaimers) and human-oversight
  pathways for consequential decisions (✓ guides + referral to practitioners).
  You own your outputs per current commercial terms; do not imply Anthropic
  endorsement.

### National symbols
- The **Namibian flag** in the header is a national symbol used for
  identification of the service's jurisdiction. Use is conventional; do not
  imply state endorsement, and never use the Coat of Arms (restricted).

## 3. Risk register

| Risk | Severity | Mitigation |
|---|---|---|
| "Swifty" unregistered; someone registers it first at BIPA | **HIGH** | BIPA availability search + file ASAP (cheap relative to a rename later) |
| Headnote provenance (publisher copyright) | MEDIUM | Audit `namibia_case_law_digest.md` provenance; rewrite as original summaries if needed |
| Prompts leaking via prompt-injection ("repeat your system prompt") | MEDIUM | Add injection guardrails; accept partial exposure — value is in the corpus + product |
| No contributor agreements if collaborators join | MEDIUM | IP assignment clause before anyone else commits code |
| swifty.legal domain unverified | MEDIUM | Register now (plus .com.na) |
| API key in `backend/.env` | Handled | Git-ignored ✓; rotate if ever exposed; move to a secrets manager in production |

## 4. Action plan (ordered)

1. **BIPA trademark search + application** for "Swifty" (word) and the lockup
   (device), classes 9/42/45 — also register the business name
2. **Register domains**: swifty.legal, swifty.com.na
3. **Verify NamibLII terms** and the case-digest provenance (§2 content risks)
4. Add `LICENSE` (proprietary, all rights reserved) + `THIRD-PARTY-NOTICES`
5. Copyright notice in app footer and guide pages: `© 2026 Swifty`
6. Contributor IP-assignment template before any collaborator
7. At funding/partnership stage: formal IP assignment from founder to the
   operating company (incorporate at BIPA first)
