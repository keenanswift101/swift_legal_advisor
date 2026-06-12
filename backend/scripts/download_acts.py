#!/usr/bin/env python3
"""
Download key Namibian legal acts as PDFs from the Legal Assistance Centre (LAC).

Usage (from backend/ directory):
    python scripts/download_acts.py

PDFs are saved to data/raw/<collection_name>.pdf
Also prints instructions for copying the local Constitution supplement PDF.
"""
import asyncio
import logging
import sys
from pathlib import Path

import httpx

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)s  %(message)s",
)
logger = logging.getLogger(__name__)

BASE_URL = "https://www.lac.org.na/laws/annoSTAT"

# Maps output filename stem → URL-encoded filename on lac.org.na
ACTS: dict[str, str] = {
    "namibian_constitution": "Namibian%20Constitution.pdf",
    "companies_act": "Companies%20Act%2028%20of%202004.pdf",
    "labour_act": "Labour%20Act%2011%20of%202007.pdf",
    "income_tax_act": "Income%20Tax%20Act%2024%20of%201981.pdf",
    "banking_act": "Banking%20Institutions%20Act%202%20of%202023.pdf",
    "close_corporations_act": "Close%20Corporations%20Act%2026%20of%201988.pdf",
}

OUTPUT_DIR = Path(__file__).parent.parent / "data" / "raw"
LOCAL_PDF_SOURCE = (
    r"C:\Users\Anthony Bagley\Downloads\F1065283089_NAM9565 2 (1).pdf"
)
LOCAL_PDF_DEST = OUTPUT_DIR / "local_constitution_supplement.pdf"


async def _download_one(
    client: httpx.AsyncClient, stem: str, filename: str
) -> bool:
    dest = OUTPUT_DIR / f"{stem}.pdf"
    if dest.exists():
        logger.info(f"  Already exists: {dest.name} — skipping")
        return True

    url = f"{BASE_URL}/{filename}"
    logger.info(f"  Downloading {stem} …")
    try:
        async with client.stream(
            "GET", url, timeout=180.0, follow_redirects=True
        ) as resp:
            if resp.status_code != 200:
                logger.error(f"  ✗ HTTP {resp.status_code} for {stem}")
                return False

            with open(dest, "wb") as fh:
                async for chunk in resp.aiter_bytes(8192):
                    fh.write(chunk)

        size_kb = dest.stat().st_size // 1024
        logger.info(f"  ✓ {dest.name}  ({size_kb} KB)")
        return True

    except Exception as exc:
        logger.error(f"  ✗ Failed [{stem}]: {exc}")
        if dest.exists():
            dest.unlink()          # remove partial download
        return False


async def main() -> int:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    logger.info(f"Saving PDFs to: {OUTPUT_DIR}\n")

    headers = {
        "User-Agent": (
            "Swifty/1.0 (Namibian paralegal assistant; "
            "academic/internal use; contact: info@swifty.legal)"
        ),
        "Accept": "application/pdf,application/octet-stream,*/*",
    }

    results: dict[str, bool] = {}
    async with httpx.AsyncClient(headers=headers) as client:
        tasks = [_download_one(client, stem, fname) for stem, fname in ACTS.items()]
        outcomes = await asyncio.gather(*tasks)

    for (stem, _), ok in zip(ACTS.items(), outcomes):
        results[stem] = ok

    succeeded = sum(results.values())
    failed = [k for k, v in results.items() if not v]

    logger.info(f"\n{'─'*50}")
    logger.info(f"Download summary: {succeeded}/{len(ACTS)} acts downloaded successfully")
    if failed:
        logger.warning(f"Failed: {failed}")

    # ── Local PDF copy instructions ──────────────────────────────────────────
    logger.info(f"\n{'─'*50}")
    logger.info("LOCAL PDF STEP (manual):")
    logger.info(f"  Copy your local Namibian legal PDF to data/raw/ as:")
    logger.info(f"    Source : {LOCAL_PDF_SOURCE}")
    logger.info(f"    Dest   : {LOCAL_PDF_DEST}")
    logger.info(
        "  Or run:  copy \"C:\\Users\\Anthony Bagley\\Downloads\\F1065283089_NAM9565 2 (1).pdf\" "
        f"\"{LOCAL_PDF_DEST}\""
    )
    logger.info(f"{'─'*50}")
    logger.info("Next step:  python scripts/ingest_all.py")

    return 0 if succeeded > 0 else 1


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
