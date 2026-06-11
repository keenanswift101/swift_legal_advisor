from pathlib import Path
from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    anthropic_api_key: str
    chroma_db_path: str = "./chroma_db"
    model_name: str = "claude-sonnet-4-5-20250929"
    embedding_model: str = "sentence-transformers/all-mpnet-base-v2"
    retrieval_top_k: int = 8
    chunk_size: int = 1000
    chunk_overlap: int = 200
    cors_origins: list[str] = ["http://localhost:5173"]

    model_config = {
        "env_file": str(Path(__file__).parent.parent / ".env"),
        "env_file_encoding": "utf-8",
    }


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()  # type: ignore[call-arg]
