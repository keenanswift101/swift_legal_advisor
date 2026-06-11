import logging
from pathlib import Path

from fastapi import APIRouter, BackgroundTasks

from app.rag.retriever import get_collection_stats

router = APIRouter()
logger = logging.getLogger(__name__)

# Map filename stem keywords → ChromaDB collection names
_COLLECTION_MAP: dict[str, str] = {
    "namibian_constitution": "namibian_constitution",
    "companies_act": "companies_act",
    "labour_act": "labour_act",
    "income_tax_act": "income_tax_act",
    "banking_act": "banking_act",
    "close_corporations_act": "close_corporations_act",
}


@router.get("/collections")
async def list_collections():
    """Return chunk counts for every ChromaDB collection."""
    stats = get_collection_stats()
    total = sum(stats.values())
    return {
        "collections": stats,
        "total_chunks": total,
        "status": "ready" if total > 0 else "empty — run ingest first",
    }


@router.post("/ingest")
async def trigger_ingest(background_tasks: BackgroundTasks):
    """
    Trigger a full re-ingestion of all PDFs in backend/data/raw/ in the background.
    Files are mapped to collections by filename stem; unrecognised files go to local_docs.
    """

    def _run():
        from app.rag.ingestion import ingest_pdf_to_collection

        data_dir = Path(__file__).parent.parent.parent.parent / "data" / "raw"
        if not data_dir.exists():
            logger.error(f"data/raw/ not found at {data_dir}. Run download_acts.py first.")
            return

        pdf_files = list(data_dir.glob("*.pdf"))
        logger.info(f"Ingestion triggered — {len(pdf_files)} PDF(s) found.")

        for pdf_path in sorted(pdf_files):
            stem = pdf_path.stem.lower().replace(" ", "_").replace("-", "_")
            collection = _COLLECTION_MAP.get(stem, "local_docs")

            # Fuzzy fallback match
            if collection == "local_docs":
                for key, col_name in _COLLECTION_MAP.items():
                    if key.replace("_", "") in stem.replace("_", ""):
                        collection = col_name
                        break

            try:
                count = ingest_pdf_to_collection(pdf_path, collection)
                logger.info(f"  ✓ {pdf_path.name} → '{collection}' ({count} chunks)")
            except Exception as exc:
                logger.error(f"  ✗ {pdf_path.name} failed: {exc}")

        logger.info("Background ingestion complete.")

    background_tasks.add_task(_run)
    return {"message": "Ingestion started in background. Check /api/collections for progress."}
