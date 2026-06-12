#!/usr/bin/env python3
"""
Ingest Namibian legal Markdown reference files into ChromaDB.

Files ingested:
  - legalCorpus.md        → local_docs  (Constitution, legislation index, case law, legal principles)
  - namibia_case_law_digest.md → local_docs  (case citation guide, 2025 headnotes)
  - namibia_key_statutes.md    → local_docs  (full Labour Act, Anti-Corruption Act, High Court Act)

Usage (from backend/ directory):
    python scripts/ingest_md_files.py
"""
import logging
import sys
from pathlib import Path

# Make backend app importable
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)s  %(message)s",
)
logger = logging.getLogger(__name__)

CORPUS_DIR = Path(__file__).resolve().parent.parent.parent / "corpus"

MD_FILES = [
    (CORPUS_DIR / "legalCorpus.md",               "local_docs"),
    (CORPUS_DIR / "namibia_case_law_digest.md",    "local_docs"),
    (CORPUS_DIR / "namibia_key_statutes.md",       "local_docs"),
]


def main() -> int:
    from app.rag.ingestion import ingest_text_to_collection

    total_chunks = 0
    results: list[tuple[str, int]] = []

    for md_path, collection in MD_FILES:
        if not md_path.exists():
            logger.warning(f"File not found: {md_path} — skipping")
            results.append((md_path.name, -1))
            continue

        text = md_path.read_text(encoding="utf-8")
        chunks = ingest_text_to_collection(text, md_path.name, collection)
        results.append((md_path.name, chunks))
        total_chunks += chunks

    logger.info("")
    logger.info("=" * 52)
    logger.info("  Markdown Ingestion Summary")
    logger.info("=" * 52)
    for name, chunks in results:
        status = f"{chunks} chunks" if chunks >= 0 else "NOT FOUND"
        logger.info(f"  {name:<50} {status}")
    logger.info("-" * 52)
    logger.info(f"  Total new chunks: {total_chunks}")
    logger.info("=" * 52)

    return 0 if total_chunks > 0 else 1


if __name__ == "__main__":
    sys.exit(main())
