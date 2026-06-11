import logging
from pathlib import Path

from pypdf import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma

from app.config import get_settings
from app.rag.embeddings import get_embeddings

logger = logging.getLogger(__name__)


def extract_text_from_pdf(pdf_path: Path) -> str:
    """Extract full plain text from a PDF using pypdf (pure-Python, no DLL deps)."""
    reader = PdfReader(str(pdf_path))
    pages: list[str] = []
    for page in reader.pages:
        text = page.extract_text()
        if text:
            pages.append(text)
    return "\n".join(pages)


def ingest_pdf_to_collection(pdf_path: Path, collection_name: str) -> int:
    """
    Extract text from a PDF, split into chunks, embed and store in a named
    ChromaDB collection.  Returns the number of chunks ingested.
    """
    settings = get_settings()
    logger.info(f"Ingesting '{pdf_path.name}' → collection '{collection_name}' …")

    raw_text = extract_text_from_pdf(pdf_path)
    if not raw_text.strip():
        logger.warning(f"No text extracted from {pdf_path.name} — skipping.")
        return 0

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=settings.chunk_size,
        chunk_overlap=settings.chunk_overlap,
        separators=["\n\n", "\n", " ", ""],
    )
    chunks = splitter.split_text(raw_text)

    texts: list[str] = []
    metadatas: list[dict] = []
    ids: list[str] = []

    for i, chunk in enumerate(chunks):
        texts.append(chunk)
        metadatas.append({
            "source": pdf_path.name,
            "collection": collection_name,
            "chunk_index": i,
        })
        ids.append(f"{collection_name}_{i}")

    embeddings = get_embeddings()
    vectorstore = Chroma(
        collection_name=collection_name,
        embedding_function=embeddings,
        persist_directory=settings.chroma_db_path,
    )
    vectorstore.add_texts(texts=texts, metadatas=metadatas, ids=ids)

    logger.info(f"  ✓ Stored {len(texts)} chunks in '{collection_name}'")
    return len(texts)
