#!/usr/bin/env python3
"""
Ingest Namibian Government Gazette PDFs into ChromaDB.

Files are ingested into the 'government_gazette' collection.

Usage (from backend/ directory):
    python scripts/ingest_gazette_pdfs.py
"""
import logging
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)s  %(message)s",
)
logger = logging.getLogger(__name__)

CORPUS_DIR = Path(__file__).resolve().parent.parent.parent / "corpus"
COLLECTION = "government_gazette"

GAZETTE_PDFS = [
    CORPUS_DIR / "na-government-gazette-dated-2026-06-01-no-8934.pdf",
    CORPUS_DIR / "na-government-gazette-dated-2026-06-03-no-8935.pdf",
    CORPUS_DIR / "na-government-gazette-dated-2026-06-04-no-8936.pdf",
    CORPUS_DIR / "na-government-gazette-dated-2026-06-04-no-8937.pdf",
    CORPUS_DIR / "na-government-gazette-dated-2026-06-04-no-8938.pdf",
    CORPUS_DIR / "na-government-gazette-dated-2026-06-05-no-8939.pdf",
    CORPUS_DIR / "na-government-gazette-dated-2026-06-05-no-8940.pdf",
]


def main() -> int:
    from app.rag.ingestion import ingest_pdf_to_collection

    total_chunks = 0
    results: list[tuple[str, int]] = []

    for pdf_path in GAZETTE_PDFS:
        if not pdf_path.exists():
            logger.warning(f"File not found: {pdf_path} — skipping")
            results.append((pdf_path.name, -1))
            continue
        chunks = ingest_pdf_to_collection(pdf_path, COLLECTION)
        results.append((pdf_path.name, chunks))
        total_chunks += chunks

    logger.info("")
    logger.info("=" * 60)
    logger.info("  Government Gazette Ingestion Summary")
    logger.info("=" * 60)
    for name, chunks in results:
        status = f"{chunks} chunks" if chunks >= 0 else "NOT FOUND"
        logger.info(f"  {name:<55} {status}")
    logger.info("-" * 60)
    logger.info(f"  Total new chunks: {total_chunks}")
    logger.info("=" * 60)

    return 0 if total_chunks > 0 else 1


if __name__ == "__main__":
    sys.exit(main())
