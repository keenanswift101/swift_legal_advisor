#!/usr/bin/env python3
"""
Download supplementary regulatory documents from Bank of Namibia and NAMFISA
into data/raw/<source>/ subdirectories, ready for scripts/ingest_all.py.

Usage (from backend/ directory):
    python scripts/download_sources.py
"""
import asyncio
import logging
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

logging.basicConfig(level=logging.INFO, format="%(asctime)s  %(levelname)s  %(message)s")
logger = logging.getLogger(__name__)


async def main() -> int:
    from scripts.sources.bon import download_bon_determinations
    from scripts.sources.namfisa import download_namfisa_documents

    logger.info("=" * 52)
    logger.info("  Bank of Namibia — Determinations")
    logger.info("=" * 52)
    bon_result = await download_bon_determinations()

    logger.info("")
    logger.info("=" * 52)
    logger.info("  NAMFISA — Regulatory documents")
    logger.info("=" * 52)
    namfisa_result = await download_namfisa_documents()

    logger.info("")
    logger.info("=" * 52)
    logger.info("  Summary")
    logger.info("=" * 52)
    logger.info(f"  BoN determinations:  {bon_result['succeeded']}/{bon_result['total']}")
    logger.info(f"  NAMFISA documents:   {namfisa_result['succeeded']}/{namfisa_result['total']}")

    if bon_result["succeeded"] == 0 and namfisa_result["succeeded"] == 0:
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
