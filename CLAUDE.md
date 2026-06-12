# CLAUDE.md — Swifty (AI Paralegal Assistant, Namibia)

Guidance for AI-assisted development in this repository.

## What this is

A RAG-based paralegal assistant for Namibian law. FastAPI backend + React frontend.
Target users are low/middle-income Namibians — every user-facing word must be
**plain language, warm, non-judgmental**. No legal jargon in UI copy.

## Commands

```bash
# Backend — run from backend/ (Python 3.11+, deps in requirements.txt)
uvicorn app.main:app --reload --port 8000

# Frontend — run from frontend/
npm run dev          # dev server on 5173, /api proxied to :8000
npx tsc --noEmit     # type-check (no test suite yet)
npx vite build       # production build

# Knowledge base (run from backend/; embeds locally, no API cost)
python scripts/ingest_all.py           # core statutes
python scripts/download_sources.py     # BoN + NAMFISA PDFs
python scripts/ingest_md_files.py      # corpus/*.md
python scripts/ingest_gazette_pdfs.py  # corpus/ gazettes
```

## Critical rules

- **`backend/.env` holds `ANTHROPIC_API_KEY`. Never print, log, echo or commit it.**
- **Raw errors must never reach users.** All API exceptions go through
  `user_facing_error()` in `backend/app/api/errors.py`; the frontend has a second
  net in `friendlyError()` (`frontend/src/hooks/useChat.ts`). Keep both intact.
- **Black/white/grey only** in the UI (the Namibian flag and red crisis/error
  accents are the only exceptions). No emojis anywhere — use the SVG components
  in `frontend/src/components/icons.tsx`.
- Answers must cite sources and carry the "not formal legal advice" disclaimer —
  enforced by the system prompt in `backend/app/agent/prompts.py`.

## Architecture map

- **Chat pipeline** (`backend/app/api/chat.py`): classify intent (small Claude
  call) → `retrieve_for_domain()` → stream Claude answer → regex-extract
  citations. SSE events in order: `domain`, `token`×n, `citations`, `done`
  (or `error`).
- **Domains** must stay in sync in THREE places:
  `VALID_DOMAINS` in `backend/app/api/chat.py`, `DOMAIN_COLLECTIONS` in
  `backend/app/rag/retriever.py`, and `CLASSIFY_INTENT_PROMPT` in
  `backend/app/agent/prompts.py`. (There is also a `VALID_DOMAINS` in
  `backend/app/agent/nodes.py` for the LangGraph path.)
- **ChromaDB** persists in `backend/chroma_db/` (git-ignored). Chunk IDs:
  `{collection}_{file-stem}_{i}`. Re-ingesting the same file overwrites rather
  than duplicates. Embeddings: `all-mpnet-base-v2` via HuggingFace, loaded once
  at startup (first request after boot is slow).
- **Frontend state**: `App.tsx` holds `mode` (`landing | chat | draft`) and the
  guide overlay state. Chat state lives in `ChatContext` (survives mode
  switches). The intake wizard (`IntakeWizard.tsx`) is driven entirely by data
  in `frontend/src/data/intake.ts`; the static guides by
  `frontend/src/data/guides.ts` — guide ids intentionally equal intake category
  ids, and `DOMAIN_TO_GUIDE` maps classifier domains onto guides.
- **Intake → agent contract**: `composeIntakeMessage()` produces the structured
  first-person message; its leading line and option labels are retrieval
  keywords — edit with care.

## Conventions

- TypeScript strict; functional React components; Tailwind utility classes using
  the remapped `navy-*` (surfaces) / `gold-*` (ink) tokens — see
  `frontend/tailwind.config.js` and docs/DESIGN.md before adding colors.
- Backend: type hints, module-level `logger = logging.getLogger(__name__)`.
- Verification is done by driving the real app (Playwright against :5173, system
  Edge channel) — there is no unit-test suite yet.

## Gotchas

- uvicorn is usually run **without** `--reload` here — restart it after backend
  edits.
- Orphaned servers: closed terminals on Windows leave uvicorn/Vite processes
  alive. If the app looks stale, check listeners on :8000/:5173-5175 and kill
  them before relaunching.
- `banking_act` collection is empty (source 404) — banking queries lean on
  `bon_determinations` + `namfisa`.
- Backend errors with "credit balance is too low" mean the Anthropic account is
  out of credits; the app degrades to friendly errors + static guides by design.
