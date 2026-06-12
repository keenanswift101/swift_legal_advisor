from pydantic import BaseModel
from typing import Optional


class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None
    history: list[dict] = []
    # UI language code; the agent answers in this language ('en', 'af', …)
    language: Optional[str] = None


class Citation(BaseModel):
    act_name: str
    section: str
    excerpt: str
    source: Optional[str] = None


class ChatResponse(BaseModel):
    answer: str
    citations: list[Citation] = []
    legal_domain: Optional[str] = None
    session_id: Optional[str] = None
