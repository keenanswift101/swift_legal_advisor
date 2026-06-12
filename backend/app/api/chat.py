import json
import logging
import re
import uuid

from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langchain_anthropic import ChatAnthropic

from app.agent.prompts import CLASSIFY_INTENT_PROMPT, LEGAL_ADVISOR_SYSTEM_PROMPT
from app.api.errors import user_facing_error
from app.config import get_settings
from app.models.schemas import ChatRequest
from app.rag.retriever import retrieve_for_domain

router = APIRouter()
logger = logging.getLogger(__name__)

VALID_DOMAINS = {
    "constitutional",
    "corporate",
    "labour",
    "tax",
    "banking",
    "criminal",
    "family",
    "property",
    "general",
}

_CITATION_PATTERNS = [
    r"((?:[\w\-]+\s+)+Act\s+\d+\s+of\s+\d{4}),?\s+s(?:ection)?\s+(\d+[A-Z]?(?:\(\d+\))*(?:\([a-z]\))*)",
    r"(Namibian Constitution),?\s+Art(?:icle)?\s+(\d+(?:\(\d+\))*(?:\([a-z]\))*)",
    r"((?:[\w\-]+\s+)+Act\s+\d+\s+of\s+\d{4})",
]


def _sse(event_type: str, payload) -> str:
    """Format a server-sent event data line."""
    return f"data: {json.dumps({'type': event_type, 'content': payload})}\n\n"


def _extract_citations(text: str) -> list[dict]:
    citations: list[dict] = []
    seen: set[str] = set()

    for pattern in _CITATION_PATTERNS:
        for match in re.finditer(pattern, text, re.IGNORECASE):
            act_name = match.group(1).strip()
            section = match.group(2).strip() if len(match.groups()) > 1 else "General"
            key = f"{act_name}|{section}"
            if key in seen:
                continue
            seen.add(key)
            start = max(0, match.start() - 100)
            end = min(len(text), match.end() + 220)
            excerpt = text[start:end].strip()
            citations.append({"act_name": act_name, "section": section, "excerpt": excerpt})

    return citations


@router.post("/chat")
async def chat(request: ChatRequest):
    """
    Streaming chat endpoint.

    SSE event types emitted (in order):
      1. {"type": "domain",    "content": "<domain_string>"}
      2. {"type": "token",     "content": "<token>"}   (repeated)
      3. {"type": "citations", "content": [Citation, …]}
      4. {"type": "done",      "content": "<session_id>"}

    On error:
      {"type": "error",  "content": "<message>"}
    """
    session_id = request.session_id or str(uuid.uuid4())
    settings = get_settings()

    async def generate():
        try:
            # ── Step 1: classify intent (fast, non-streaming call) ────────────
            classify_llm = ChatAnthropic(
                model=settings.model_name,
                anthropic_api_key=settings.anthropic_api_key,
                temperature=0,
                max_tokens=20,
            )
            prompt_text = CLASSIFY_INTENT_PROMPT.format(query=request.message)
            classify_resp = classify_llm.invoke([HumanMessage(content=prompt_text)])
            domain = classify_resp.content.strip().lower()
            if domain not in VALID_DOMAINS:
                domain = "general"

            yield _sse("domain", domain)

            # ── Step 2: retrieve relevant legal chunks ────────────────────────
            docs = retrieve_for_domain(
                request.message, domain, top_k=settings.retrieval_top_k
            )

            context_parts: list[str] = []
            for i, doc in enumerate(docs, 1):
                source = doc.metadata.get("source", "Unknown")
                context_parts.append(f"[Source {i} — {source}]\n{doc.page_content}")

            context = (
                "\n\n---\n\n".join(context_parts)
                if context_parts
                else "No specific documents retrieved. Apply training knowledge of Namibian law."
            )

            # ── Step 3: build message list with conversation history ───────────
            messages: list = [SystemMessage(content=LEGAL_ADVISOR_SYSTEM_PROMPT)]

            for turn in (request.history or []):
                role = turn.get("role", "")
                content = turn.get("content", "")
                if role == "user":
                    messages.append(HumanMessage(content=content))
                elif role == "assistant":
                    messages.append(AIMessage(content=content))

            user_prompt = (
                f"RETRIEVED LEGAL CONTEXT:\n{context}\n\n"
                "---\n\n"
                f"QUESTION: {request.message}\n\n"
                "Apply the IRAC framework fully. Cite every applicable statutory provision "
                "with the exact Act name, number, year, and section. Include the disclaimer."
            )
            messages.append(HumanMessage(content=user_prompt))

            # ── Step 4: stream the response ───────────────────────────────────
            stream_llm = ChatAnthropic(
                model=settings.model_name,
                anthropic_api_key=settings.anthropic_api_key,
                temperature=0.1,
                max_tokens=4096,
                streaming=True,
            )

            full_response = ""
            async for chunk in stream_llm.astream(messages):
                token = chunk.content
                if token:
                    full_response += token
                    yield _sse("token", token)

            # ── Step 5: extract citations and close ───────────────────────────
            citations = _extract_citations(full_response)
            yield _sse("citations", citations)
            yield f"data: {json.dumps({'type': 'done', 'content': session_id})}\n\n"

        except Exception as exc:
            logger.error(f"Chat error: {exc}", exc_info=True)
            yield _sse("error", user_facing_error(exc))

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
            "Connection": "keep-alive",
        },
    )
