import logging
from typing import Any

from langchain_core.documents import Document
from langchain_chroma import Chroma

from app.config import get_settings
from app.rag.embeddings import get_embeddings

logger = logging.getLogger(__name__)

# Maps a legal domain → the collections most relevant to it
DOMAIN_COLLECTIONS: dict[str, list[str]] = {
    "constitutional": ["namibian_constitution", "local_docs", "government_gazette"],
    "corporate": ["companies_act", "close_corporations_act", "government_gazette"],
    "labour": ["labour_act", "local_docs", "government_gazette"],
    "tax": ["income_tax_act", "government_gazette"],
    "banking": ["banking_act", "bon_determinations", "namfisa", "government_gazette"],
    "criminal": ["namibian_constitution", "local_docs", "government_gazette"],
    "family": ["local_docs", "namibian_constitution", "government_gazette"],
    "property": ["local_docs", "namibian_constitution", "government_gazette"],
    "general": [
        "namibian_constitution",
        "companies_act",
        "labour_act",
        "income_tax_act",
        "banking_act",
        "close_corporations_act",
        "bon_determinations",
        "namfisa",
        "local_docs",
        "government_gazette",
    ],
}

ALL_COLLECTIONS: list[str] = [
    "namibian_constitution",
    "companies_act",
    "labour_act",
    "income_tax_act",
    "banking_act",
    "close_corporations_act",
    "bon_determinations",
    "namfisa",
    "local_docs",
    "government_gazette",
]


def _open_collection(name: str) -> Chroma | None:
    settings = get_settings()
    embeddings = get_embeddings()
    try:
        vs = Chroma(
            collection_name=name,
            embedding_function=embeddings,
            persist_directory=settings.chroma_db_path,
        )
        # Probe to confirm the collection has data
        if vs._collection.count() == 0:
            return None
        return vs
    except Exception as e:
        logger.debug(f"Could not open collection '{name}': {e}")
        return None


def retrieve_for_domain(query: str, domain: str, top_k: int = 8) -> list[Document]:
    """
    Retrieve the most relevant document chunks for a query within the given
    legal domain.  Returns up to `top_k` deduplicated chunks.
    """
    collection_names = DOMAIN_COLLECTIONS.get(domain, DOMAIN_COLLECTIONS["general"])
    per_collection_k = max(2, top_k // max(1, len(collection_names)))

    all_docs: list[Document] = []
    for name in collection_names:
        vs = _open_collection(name)
        if vs is None:
            continue
        try:
            docs = vs.similarity_search(query, k=per_collection_k)
            all_docs.extend(docs)
        except Exception as e:
            logger.warning(f"similarity_search failed for '{name}': {e}")

    # Deduplicate by content prefix while preserving order
    seen: set[str] = set()
    unique: list[Document] = []
    for doc in all_docs:
        key = doc.page_content[:120]
        if key not in seen:
            seen.add(key)
            unique.append(doc)

    return unique[:top_k]


def get_collection_stats() -> dict[str, int]:
    """Return chunk counts for every known collection."""
    settings = get_settings()
    embeddings = get_embeddings()
    stats: dict[str, int] = {}

    for name in ALL_COLLECTIONS:
        try:
            vs = Chroma(
                collection_name=name,
                embedding_function=embeddings,
                persist_directory=settings.chroma_db_path,
            )
            stats[name] = vs._collection.count()
        except Exception:
            stats[name] = 0

    return stats
