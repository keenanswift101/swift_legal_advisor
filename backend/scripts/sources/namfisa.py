#!/usr/bin/env python3
"""
Download relevant regulatory documents (Acts, Regulations, Standards,
Circulars, Directives, Guidance Notes) from NAMFISA's WP Download Manager
catalogue.

Usage (from backend/ directory):
    python -m scripts.sources.namfisa

PDFs are saved to data/raw/namfisa/<slug>.pdf
"""
import asyncio
import logging
import re
from pathlib import Path

import httpx

logger = logging.getLogger(__name__)

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"
    )
}

NAMFISA_BASE = "https://www.namfisa.com.na"
SITEMAP_URL = f"{NAMFISA_BASE}/wpdmpro-sitemap.xml"

OUTPUT_DIR = Path(__file__).resolve().parent.parent.parent / "data" / "raw" / "namfisa"

# Only pull documents that look like legal/regulatory material.
INCLUDE_PATTERNS = [
    r"\bact\b", r"\bacts\b", r"regulation", r"standard", r"circular",
    r"directive", r"guidance", r"determination", r"framework",
    r"\brules?\b", r"code-of-conduct", r"\bbill\b", r"amendment", r"notice",
]
# Exclude procurement, HR, and reporting noise that floods the sitemap.
EXCLUDE_PATTERNS = [
    r"\brfq\b", r"\brfp\b", r"\brfb\b", r"\bsc-rp\b", r"g-rfq", r"g-rfp",
    r"tender", r"quotation", r"vacanc", r"recruit", r"\bbulletin\b",
    r"newsletter", r"press-release", r"\bmedia\b", r"annual-report",
    r"presentation", r"minutes", r"agenda", r"advert",
    r"expression-of-interest", r"request-for", r"procurement",
    r"internship", r"\bcareer", r"\bjob-",
]

MAX_DOCUMENTS = 40
CONCURRENCY = 5

_INCLUDE_RE = re.compile("|".join(INCLUDE_PATTERNS), re.IGNORECASE)
_EXCLUDE_RE = re.compile("|".join(EXCLUDE_PATTERNS), re.IGNORECASE)
# The download button is rendered as <a ... data-downloadurl="...?wpdmdl=123&...">
# Older pages may instead link directly via href="...?wpdmdl=123...".
_WPDMDL_RE = re.compile(r'(?:data-downloadurl|href)="([^"]*\?wpdmdl=\d+[^"]*)"')
_LOC_RE = re.compile(r"<loc><!\[CDATA\[([^\]]+)\]\]></loc>")


def _slugify(text: str) -> str:
    text = re.sub(r"[^\w\s-]", "", text).strip().lower()
    return re.sub(r"[-\s]+", "_", text)


async def _get_download_url(client: httpx.AsyncClient, page_url: str) -> str | None:
    try:
        resp = await client.get(page_url, follow_redirects=True, timeout=60.0)
        if resp.status_code != 200:
            return None
        m = _WPDMDL_RE.search(resp.text)
        if not m:
            return None
        return m.group(1).replace("&amp;", "&")
    except Exception as exc:
        logger.error(f"  Failed to resolve download link for {page_url}: {exc}")
        return None


async def _process_one(client: httpx.AsyncClient, slug: str, page_url: str, sem: asyncio.Semaphore) -> bool:
    async with sem:
        dest = OUTPUT_DIR / f"{_slugify(slug)[:100]}.pdf"
        if dest.exists():
            logger.info(f"  Already exists: {dest.name} — skipping")
            return True

        dl_url = await _get_download_url(client, page_url)
        if not dl_url:
            logger.warning(f"  ✗ No download link found for {slug}")
            return False

        try:
            async with client.stream("GET", dl_url, timeout=180.0, follow_redirects=True) as resp:
                if resp.status_code != 200:
                    logger.warning(f"  ✗ HTTP {resp.status_code} for {slug}")
                    return False
                content_type = resp.headers.get("content-type", "")
                if "pdf" not in content_type.lower():
                    logger.warning(f"  ✗ Not a PDF ({content_type}) for {slug}")
                    return False
                with open(dest, "wb") as fh:
                    async for chunk in resp.aiter_bytes(8192):
                        fh.write(chunk)
            size_kb = dest.stat().st_size // 1024
            logger.info(f"  ✓ {dest.name}  ({size_kb} KB)")
            return True
        except Exception as exc:
            logger.error(f"  ✗ Failed [{slug}]: {exc}")
            if dest.exists():
                dest.unlink()
            return False


async def download_namfisa_documents(max_documents: int = MAX_DOCUMENTS) -> dict:
    """
    Crawl NAMFISA's Download Manager sitemap, filter to legal/regulatory
    documents, and download up to `max_documents` PDFs.
    """
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    async with httpx.AsyncClient(headers=HEADERS) as client:
        resp = await client.get(SITEMAP_URL, follow_redirects=True, timeout=60.0)
        resp.raise_for_status()
        urls = _LOC_RE.findall(resp.text)

        candidates: list[tuple[str, str]] = []
        for url in urls:
            slug = url.rstrip("/").rsplit("/", 1)[-1]
            if _EXCLUDE_RE.search(slug):
                continue
            if not _INCLUDE_RE.search(slug):
                continue
            candidates.append((slug, url))

        logger.info(
            f"Found {len(candidates)} candidate document(s) of {len(urls)} total "
            f"in sitemap, capping at {max_documents}"
        )
        candidates = candidates[:max_documents]

        sem = asyncio.Semaphore(CONCURRENCY)
        outcomes = await asyncio.gather(
            *(_process_one(client, slug, url, sem) for slug, url in candidates)
        )

    return {"total": len(candidates), "succeeded": sum(outcomes)}


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(asctime)s  %(levelname)s  %(message)s")
    result = asyncio.run(download_namfisa_documents())
    logger.info(f"\nNAMFISA documents: {result['succeeded']}/{result['total']} downloaded")
