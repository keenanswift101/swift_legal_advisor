#!/usr/bin/env python3
"""
Download active Determinations issued under the Banking Institutions Act
from the Bank of Namibia website.

Usage (from backend/ directory):
    python -m scripts.sources.bon

PDFs are saved to data/raw/bon_determinations/<slug>.pdf
"""
import asyncio
import logging
import re
from pathlib import Path
from urllib.parse import urljoin

import httpx
from bs4 import BeautifulSoup

logger = logging.getLogger(__name__)

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"
    )
}

BON_BASE = "https://www.bon.com.na"
DETERMINATIONS_URL = (
    f"{BON_BASE}/About-Us/Laws-and-Regulations/"
    f"Bylaws-issued-under-the-Banking-Institutions-Act,/Determinations.aspx"
)

OUTPUT_DIR = Path(__file__).resolve().parent.parent.parent / "data" / "raw" / "bon_determinations"


def _slugify(text: str) -> str:
    text = re.sub(r"[^\w\s-]", "", text).strip().lower()
    return re.sub(r"[-\s]+", "_", text)


async def _download_one(client: httpx.AsyncClient, url: str, dest: Path) -> bool:
    if dest.exists():
        logger.info(f"  Already exists: {dest.name} — skipping")
        return True
    try:
        async with client.stream("GET", url, timeout=120.0, follow_redirects=True) as resp:
            if resp.status_code != 200:
                logger.warning(f"  ✗ HTTP {resp.status_code} for {dest.name}")
                return False
            content_type = resp.headers.get("content-type", "")
            if "pdf" not in content_type.lower():
                logger.warning(f"  ✗ Not a PDF ({content_type}) for {dest.name}")
                return False
            with open(dest, "wb") as fh:
                async for chunk in resp.aiter_bytes(8192):
                    fh.write(chunk)
        size_kb = dest.stat().st_size // 1024
        logger.info(f"  ✓ {dest.name}  ({size_kb} KB)")
        return True
    except Exception as exc:
        logger.error(f"  ✗ Failed [{dest.name}]: {exc}")
        if dest.exists():
            dest.unlink()
        return False


async def download_bon_determinations() -> dict:
    """
    Scrape the BoN Determinations page and download every PDF listed under
    'Current Determinations' (skipping anything under a 'Repealed' heading).
    """
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    async with httpx.AsyncClient(headers=HEADERS) as client:
        resp = await client.get(DETERMINATIONS_URL, follow_redirects=True, timeout=60.0)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "lxml")

        targets: dict[str, Path] = {}
        for a in soup.find_all("a", href=True):
            href = a["href"]
            if "getattachment" not in href.lower():
                continue

            # Skip anything that falls under a "Repealed" heading
            heading_text = ""
            for el in a.find_all_previous(["h1", "h2", "h3", "h4"]):
                heading_text = el.get_text(strip=True).lower()
                break
            if "repealed" in heading_text:
                continue

            title = a.get_text(strip=True) or "untitled_determination"
            url = urljoin(BON_BASE, href)
            dest = OUTPUT_DIR / f"{_slugify(title)[:80]}.pdf"
            targets[url] = dest

        logger.info(f"Found {len(targets)} active determination(s) to download")

        outcomes = await asyncio.gather(
            *(_download_one(client, url, dest) for url, dest in targets.items())
        )

    return {"total": len(targets), "succeeded": sum(outcomes)}


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(asctime)s  %(levelname)s  %(message)s")
    result = asyncio.run(download_bon_determinations())
    logger.info(f"\nBoN determinations: {result['succeeded']}/{result['total']} downloaded")
