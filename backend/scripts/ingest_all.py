#!/usr/bin/env python3
"""
Ingest all PDFs in data/raw/ into their ChromaDB collections.

Usage (from backend/ directory):
    python scripts/ingest_all.py

Each file is matched to a collection by its filename stem.
Unrecognised files are placed in the 'local_docs' collection.
"""
import logging
import shutil
import sys
from pathlib import Path

# ── make sure `from app.xxx import ...` resolves against backend/ ────────────
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)s  %(message)s",
)
logger = logging.getLogger(__name__)

_COLLECTION_MAP: dict[str, str] = {
    "namibian_constitution": "namibian_constitution",
    "companies_act": "companies_act",
    "labour_act": "labour_act",
    "income_tax_act": "income_tax_act",
    "banking_act": "banking_act",
    "close_corporations_act": "close_corporations_act",
}

# Local PDF source (user downloads folder)
_LOCAL_PDF_SRC = Path(
    r"C:\Users\Anthony Bagley\Downloads\F1065283089_NAM9565 2 (1).pdf"
)
_LOCAL_PDF_DEST_STEM = "local_constitution_supplement"


def _resolve_collection(pdf_path: Path) -> str:
    stem = pdf_path.stem.lower().replace(" ", "_").replace("-", "_")
    if stem in _COLLECTION_MAP:
        return _COLLECTION_MAP[stem]
    # Fuzzy match — strip underscores for comparison
    clean = stem.replace("_", "")
    for key, col in _COLLECTION_MAP.items():
        if key.replace("_", "") in clean:
            return col
    return "local_docs"


def _copy_local_pdf(data_dir: Path) -> None:
    dest = data_dir / f"{_LOCAL_PDF_DEST_STEM}.pdf"
    if dest.exists():
        logger.info(f"  Local PDF already present: {dest.name}")
        return
    if _LOCAL_PDF_SRC.exists():
        shutil.copy2(_LOCAL_PDF_SRC, dest)
        logger.info(f"  ✓ Copied local PDF → {dest.name}")
    else:
        logger.warning(
            f"  Local PDF not found at:\n    {_LOCAL_PDF_SRC}\n"
            "  Copy it manually to data/raw/ to include it in the knowledge base."
        )


def main() -> int:
    data_dir = Path(__file__).resolve().parent.parent / "data" / "raw"

    if not data_dir.exists():
        logger.error(
            f"data/raw/ directory not found: {data_dir}\n"
            "Run scripts/download_acts.py first."
        )
        return 1

    # Attempt to copy the local PDF supplement automatically
    _copy_local_pdf(data_dir)

    top_level_pdfs = sorted(data_dir.glob("*.pdf"))
    subdir_pdfs = sorted(data_dir.glob("*/*.pdf"))

    if not top_level_pdfs and not subdir_pdfs:
        logger.error(f"No PDFs found in {data_dir}. Run download_acts.py first.")
        return 1

    # Top-level files keep the existing stem-based resolution; files placed in
    # a subdirectory (e.g. data/raw/bon_determinations/*.pdf) use the
    # subdirectory name directly as the collection name.
    targets: list[tuple[Path, str]] = []
    for pdf_path in top_level_pdfs:
        targets.append((pdf_path, _resolve_collection(pdf_path)))
    for pdf_path in subdir_pdfs:
        targets.append((pdf_path, pdf_path.parent.name))

    logger.info(
        f"Found {len(targets)} PDF(s) in {data_dir} "
        f"({len(top_level_pdfs)} top-level, {len(subdir_pdfs)} in subdirectories)"
    )

    # Lazy import after sys.path is set
    from app.rag.ingestion import ingest_pdf_to_collection
    from app.rag.retriever import get_collection_stats

    results: dict[str, dict] = {}
    for pdf_path, collection in targets:
        label = f"{pdf_path.parent.name}/{pdf_path.name}" if pdf_path.parent != data_dir else pdf_path.name
        try:
            count = ingest_pdf_to_collection(pdf_path, collection)
            results[label] = {"collection": collection, "chunks": count, "status": "ok"}
            logger.info(f"  ✓ {label}  →  '{collection}'  ({count} chunks)")
        except Exception as exc:
            results[label] = {"collection": collection, "error": str(exc), "status": "failed"}
            logger.error(f"  ✗ {label}  →  FAILED: {exc}")

    # ── Final summary ─────────────────────────────────────────────────────────
    stats = get_collection_stats()
    logger.info("\n" + "═" * 52)
    logger.info("  ChromaDB Collection Summary")
    logger.info("═" * 52)
    total = 0
    for col, cnt in stats.items():
        status = "✓" if cnt > 0 else "○ empty"
        logger.info(f"  {status:2}  {col:<30}  {cnt:>6} chunks")
        total += cnt
    logger.info("─" * 52)
    logger.info(f"  Total chunks in knowledge base: {total}")
    logger.info("═" * 52)

    failed = [k for k, v in results.items() if v["status"] == "failed"]
    if failed:
        logger.warning(f"\n{len(failed)} file(s) failed ingestion: {failed}")
        return 1

    logger.info("\nAll files ingested. Start the API with:")
    logger.info("  uvicorn app.main:app --reload")
    return 0


if __name__ == "__main__":
    sys.exit(main())
