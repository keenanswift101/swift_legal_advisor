# BRAIN.md — Everything the Swifty agent knows

A complete inventory of the agent's knowledge, where it lives, and its limits.
Last verified against the live database: **12 June 2026 — 9,973 chunks, status: ready**.

## 1. How knowledge is stored

Documents are ingested **once**: text extracted (pypdf for PDFs, raw for
markdown) → split into chunks (RecursiveCharacterTextSplitter, settings in
`backend/app/config.py`) → embedded locally with
`sentence-transformers/all-mpnet-base-v2` (768-dim) → persisted in **ChromaDB**
(`backend/chroma_db/`). At question time only vector search runs (~50 ms);
source files are never re-read.

## 2. Vector collections (live counts)

| Collection | Chunks | Contents | Source |
|---|---:|---|---|
| `companies_act` | 1,125 | Companies Act 28 of 2004 | NamibLII/LAC |
| `income_tax_act` | 681 | Income Tax Act 24 of 1981 (as amended) | NamibLII/LAC |
| `labour_act` | 356 | Labour Act 11 of 2007 | NamibLII/LAC |
| `namibian_constitution` | 271 | Constitution of Namibia (full text) | NamibLII/LAC |
| `close_corporations_act` | 194 | Close Corporations Act 26 of 1988 | NamibLII/LAC |
| `bon_determinations` | 3,701 | Bank of Namibia determinations & circulars (~38 PDFs) | bon.com.na |
| `namfisa` | 3,353 | NAMFISA circulars, standards & directives (~34 PDFs) | namfisa.com.na |
| `local_docs` | 110 | Curated reference corpus (see §3) | `corpus/*.md` |
| `government_gazette` | 182 | Government Gazettes Nos. 8934–8940 (1–5 June 2026) | gazettes.africa |
| `banking_act` | 0 | **EMPTY — source 404.** Banking queries rely on BoN/NAMFISA | — |
| **Total** | **9,973** | | |

## 3. The curated corpus (`local_docs`, from `corpus/`)

- **legalCorpus.md** (56 chunks) — legal system overview; full court hierarchy
  (Supreme, High NAHCMD/NAHCNLD, Labour, Electoral, Magistrates', Community
  courts); Constitution full text; index of **407 Namibian Acts**; key
  legislation summaries by topic; recent case law summaries; fundamental legal
  principles (constitutional supremacy, sources of law, Art 144 international law)
- **namibia_case_law_digest.md** (6 chunks) — citation formats (NASC/NAHCMD/
  NAHCNLD/NALCMD), 2025 case headnotes
- **namibia_key_statutes.md** (48 chunks) — **full text**: Labour Act 11 of 2007
  (definitions; child/forced labour; s 5 discrimination & sexual harassment;
  hours 45/wk; overtime 1.5×; leave; termination & unfair dismissal; Labour
  Commissioner process), Anti-Corruption Act 8 of 2003, High Court Act 16 of 1990

## 4. Domain routing

The classifier (small Claude call) labels each question; retrieval fans out to
that domain's collections (`DOMAIN_COLLECTIONS`, `backend/app/rag/retriever.py`):

| Domain | Collections searched |
|---|---|
| constitutional | constitution · local_docs · gazette |
| corporate | companies_act · close_corporations_act · gazette |
| labour | labour_act · local_docs · gazette |
| tax | income_tax_act · gazette |
| banking | banking_act · bon_determinations · namfisa · gazette |
| criminal | constitution · local_docs · gazette |
| family | local_docs · constitution · gazette |
| property | local_docs · constitution · gazette |
| general | **all ten collections** |

`government_gazette` is in every route — gazettes cut across all areas and are
the freshest source.

## 5. Knowledge in the system prompt (`backend/app/agent/prompts.py`)

The Swifty persona carries a statute table of ~18 instruments it may reference
from model knowledge even without retrieval, including: Combating of Domestic
Violence Act 4 of 2003 · Combating of Rape Act 8 of 2000 · Maintenance Act 9 of
2003 · Child Care and Protection Act 3 of 2015 · Married Persons Equality Act 1
of 1996 · Magistrates' Courts Act 32 of 1944 · Criminal Procedure Act 51 of 1977
· Labour Act 11 of 2007 · Companies Act 28 of 2004 · Income Tax Act 24 of 1981 ·
the Constitution. Answers follow **IRAC** (Issue → Rule → Application →
Conclusion) internally, rendered in plain language, always with citations and a
disclaimer.

## 6. Static knowledge shipped to users (no AI required)

- **Legal Info Library** (`frontend/src/data/guides.ts`) — 8 plain-language
  guides distilled from the corpus: safety/protection orders · eviction & tenant
  rights · unfair dismissal · maintenance & family · debt & scams · defamation ·
  crime & police · courts/legal aid. Served even when the backend is down.
- **Intake flows** (`frontend/src/data/intake.ts`) — 8 categories × ~4 questions
  of encoded paralegal triage logic (e.g. labour time limits, small-claims
  thresholds, danger escalation).
- **Crisis contacts** — Police 10111, GBV Helpline 106, LAC +264 61 223 356,
  Law Society +264 61 218 202, Directorate of Legal Aid.

## 7. Known limits (be honest about these)

- **No live case-law database** — case knowledge = digest headnotes + model
  training; citations to specific judgments must be treated cautiously
- **banking_act empty**; subsidiary legislation/regulations mostly absent
- Gazette coverage is one week of June 2026 — not a historical archive
- English only; no automated currency checking of statutes (amendments after
  corpus compilation won't be reflected)
- The agent must never present itself as a substitute for a legal practitioner
  (see LEGAL-COMPLIANCE.md)

## 8. Updating the brain

```bash
cd backend
python scripts/ingest_md_files.py       # after editing corpus/*.md
python scripts/ingest_gazette_pdfs.py   # after adding gazettes to corpus/ (update list in script)
python scripts/ingest_all.py            # re-pull core statutes
```
Then update the counts here (`curl localhost:8000/api/collections`) and the
guides in `frontend/src/data/guides.ts` if the law changed.
