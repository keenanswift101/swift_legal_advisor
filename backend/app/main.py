from contextlib import asynccontextmanager
import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.api.chat import router as chat_router
from app.api.drafting import router as drafting_router
from app.api.ingest import router as ingest_router

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(name)s  %(levelname)s  %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting Swifty Paralegal Assistant API …")
    from app.rag.embeddings import get_embeddings
    get_embeddings()
    logger.info("Embedding model ready.")
    yield
    logger.info("Shutting down.")


settings = get_settings()

app = FastAPI(
    title="Swifty Paralegal Assistant API",
    description="AI paralegal assistant for Namibian law — everyday legal guidance for all Namibians",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router, prefix="/api")
app.include_router(drafting_router, prefix="/api")
app.include_router(ingest_router, prefix="/api")


@app.get("/")
async def root():
    return {"service": "Swifty Paralegal Assistant", "version": "1.0.0", "status": "online"}


@app.get("/health")
async def health():
    return {"status": "healthy"}
