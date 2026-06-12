import json
import logging
import uuid

from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_anthropic import ChatAnthropic

from app.agent.drafting_prompts import (
    DOCUMENT_DRAFTING_SYSTEM_PROMPT,
    DOCUMENT_TYPES,
    build_drafting_prompt,
)
from app.api.errors import user_facing_error
from app.config import get_settings

router = APIRouter()
logger = logging.getLogger(__name__)


class DraftRequest(BaseModel):
    doc_type_id: str
    fields: dict[str, str] = {}


def _sse(event_type: str, payload) -> str:
    return f"data: {json.dumps({'type': event_type, 'content': payload})}\n\n"


@router.get("/document-types")
async def get_document_types():
    """Return the list of supported document types with their field schemas."""
    return DOCUMENT_TYPES


@router.post("/draft")
async def draft_document(request: DraftRequest):
    """Stream a drafted legal document as server-sent events."""
    doc_type = next((d for d in DOCUMENT_TYPES if d["id"] == request.doc_type_id), None)
    if not doc_type:
        async def error_gen():
            yield _sse("error", f"Unknown document type: {request.doc_type_id}")
        return StreamingResponse(error_gen(), media_type="text/event-stream")

    settings = get_settings()
    llm = ChatAnthropic(
        model=settings.model_name,
        api_key=settings.anthropic_api_key,
        streaming=True,
        max_tokens=4096,
    )

    doc_id = str(uuid.uuid4())
    prompt = build_drafting_prompt(doc_type["label"], request.fields)

    async def generate():
        try:
            yield _sse("start", doc_type["label"])
            async for chunk in llm.astream([
                SystemMessage(content=DOCUMENT_DRAFTING_SYSTEM_PROMPT),
                HumanMessage(content=prompt),
            ]):
                token = chunk.content
                if token:
                    yield _sse("token", token)
            yield _sse("done", doc_id)
        except Exception as exc:
            logger.error(f"Draft error: {exc}", exc_info=True)
            yield _sse("error", user_facing_error(exc))

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )
