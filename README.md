# Swifty — AI Paralegal Assistant for Namibia

**Plain-language legal guidance for everyday Namibians** — from domestic violence and
eviction to unfair dismissal and child maintenance — grounded in real Namibian law,
with sources cited in every answer.

> Swifty provides general legal information, not formal legal advice.
> See [docs/LEGAL-COMPLIANCE.md](docs/LEGAL-COMPLIANCE.md).

---

## Why this exists

A first legal answer in Namibia can cost more than a week's wages. Swifty gives
low- and middle-income Namibians a free, private first answer: it listens to the
situation through a guided intake, researches actual statutes and case law, and
explains rights and next steps in plain language — with a free static Legal Info
Library as a fallback that works even when the AI is unavailable.

## Features

| Feature | What it does |
|---|---|
| **Guided Case Intake** | Tap-to-answer wizard for 8 everyday situations (GBV, eviction, dismissal, maintenance, debt, defamation, crime, other) — composes a structured case summary for the agent |
| **Live agent pipeline** | "Reading your situation → Identifying the area of law → Searching statutes → Writing your guidance" — driven by real SSE events, not animation |
| **RAG over Namibian law** | ~10,000 chunks: Constitution, Companies Act, Labour Act, Income Tax Act, BoN determinations, NAMFISA circulars, Government Gazettes and more (see [docs/BRAIN.md](docs/BRAIN.md)) |
| **Citations on every answer** | Statute names, sections and excerpts in a slide-out source panel |
| **Document Drafter** | Letters of demand, affidavits, agreements — streamed, printable, downloadable |
| **Legal Info Library** | 8 static plain-language guides bundled into the frontend — zero-cost, offline-capable fallback linked to the user's case |
| **Crisis safety layer** | GBV flows surface Police 10111 / GBV Helpline 106 with tap-to-call, escalating when danger is flagged |

## Architecture

```
┌─────────────────────────┐         ┌────────────────────────────────────┐
│  Frontend (React+Vite)  │  /api   │  Backend (FastAPI)                 │
│  Landing → Intake wizard ├────────►  /chat  SSE: domain→tokens→cites   │
│  Chat + activity timeline│  proxy  │  /draft SSE: document streaming   │
│  Legal Info Library      │         │  /collections, /document-types    │
└─────────────────────────┘         └───────┬───────────────┬───────────┘
                                            │               │
                                   ┌────────▼──────┐ ┌──────▼──────────┐
                                   │ ChromaDB      │ │ Anthropic API   │
                                   │ 10 collections│ │ (Claude)        │
                                   │ ~10k chunks   │ │ classify+answer │
                                   └───────────────┘ └─────────────────┘
            Embeddings: sentence-transformers/all-mpnet-base-v2 (local, free)
```

**Query flow:** classify intent → route to domain collections → similarity search
→ Claude reasons over retrieved chunks with the Swifty system prompt → stream
tokens → extract citations. PDFs are ingested once; queries never touch them.

## Quickstart

```bash
# Backend (Python 3.11+)
cd backend
pip install -r requirements.txt
# create backend/.env with ANTHROPIC_API_KEY=...
uvicorn app.main:app --reload          # http://localhost:8000

# Frontend (Node 18+)
cd frontend
npm install
npm run dev                            # http://localhost:5173
```

The knowledge base persists in `backend/chroma_db/` (git-ignored). To rebuild it:

```bash
cd backend
python scripts/ingest_all.py           # statutes from NamibLII/LAC
python scripts/download_sources.py     # BoN + NAMFISA PDFs
python scripts/ingest_md_files.py      # corpus/*.md reference files
python scripts/ingest_gazette_pdfs.py  # corpus/ Government Gazettes
```

## Repository layout

```
├── frontend/            React + TypeScript + Tailwind (Vite)
│   └── src/
│       ├── components/  UI: LandingPage, IntakeWizard, ChatWindow,
│       │                AgentActivity, GuidePage, DraftingPanel, …
│       ├── data/        intake.ts (wizard flows) · guides.ts (info library)
│       ├── hooks/       useChat (SSE streaming state) · useDrafting
│       └── services/    api.ts (SSE parsing)
├── backend/
│   ├── app/
│   │   ├── api/         chat.py · drafting.py · ingest.py · errors.py
│   │   ├── agent/       prompts.py (Swifty persona + IRAC) · graph.py
│   │   └── rag/         ingestion.py · retriever.py · embeddings.py
│   ├── scripts/         downloaders + ingesters
│   └── chroma_db/       vector store (git-ignored)
├── corpus/              source documents (gazettes, statute/reference md)
└── docs/                DESIGN · BRAIN · MEMORY · IP-AUDIT · LEGAL-COMPLIANCE
```

## Documentation

- [CLAUDE.md](CLAUDE.md) — instructions for AI-assisted development on this repo
- [docs/DESIGN.md](docs/DESIGN.md) — brand & design system (monochrome + Namibian flag)
- [docs/BRAIN.md](docs/BRAIN.md) — everything the agent knows: collections, statutes, guides
- [docs/MEMORY.md](docs/MEMORY.md) — project history, decisions and current state
- [docs/IP-AUDIT.md](docs/IP-AUDIT.md) — intellectual property inventory and protection plan
- [docs/LEGAL-COMPLIANCE.md](docs/LEGAL-COMPLIANCE.md) — legal status of operating Swifty in Namibia

## Roadmap

1. **Pilot** — law firm / legal aid clinic pilot with feedback loop
2. **Accounts & matters** — JWT auth, saved matters (SQLite → Postgres)
3. **IP registration** — BIPA trademark for "Swifty" (see IP audit)
4. **Multi-tenancy** — firm workspaces over the shared knowledge base
5. **Coverage** — more statutes, case law, regional languages

## License & status

Proprietary — all rights reserved (pre-launch). Statutory texts in the knowledge
base are public legal documents; see [docs/IP-AUDIT.md](docs/IP-AUDIT.md) for the
full third-party inventory.
