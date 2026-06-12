import logging
import re

from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langchain_anthropic import ChatAnthropic

from app.agent.prompts import CLASSIFY_INTENT_PROMPT, LEGAL_ADVISOR_SYSTEM_PROMPT
from app.agent.state import AgentState
from app.config import get_settings
from app.models.schemas import Citation
from app.rag.retriever import retrieve_for_domain

logger = logging.getLogger(__name__)

VALID_DOMAINS = {"constitutional", "corporate", "labour", "tax", "banking", "criminal", "family", "property", "general"}

# Citation extraction patterns — ordered from most to least specific
_CITATION_PATTERNS = [
    # "Companies Act 28 of 2004, s 53(1)(a)"
    r"((?:[\w\-]+\s+)+Act\s+\d+\s+of\s+\d{4}),?\s+s(?:ection)?\s+(\d+[A-Z]?(?:\(\d+\))*(?:\([a-z]\))*)",
    # "Namibian Constitution, Art 12(1)(a)"
    r"(Namibian Constitution),?\s+Art(?:icle)?\s+(\d+(?:\(\d+\))*(?:\([a-z]\))*)",
    # Bare act reference without section — lower priority
    r"((?:[\w\-]+\s+)+Act\s+\d+\s+of\s+\d{4})",
]


def _make_llm(max_tokens: int = 4096, temperature: float = 0.1) -> ChatAnthropic:
    s = get_settings()
    return ChatAnthropic(
        model=s.model_name,
        anthropic_api_key=s.anthropic_api_key,
        temperature=temperature,
        max_tokens=max_tokens,
    )


# ─────────────────────────────────────────────────────────────────────────────
#  Node 1 — Classify the legal domain of the incoming query
# ─────────────────────────────────────────────────────────────────────────────

def classify_intent(state: AgentState) -> dict:
    llm = _make_llm(max_tokens=20, temperature=0)
    prompt = CLASSIFY_INTENT_PROMPT.format(query=state["query"])
    response = llm.invoke([HumanMessage(content=prompt)])
    domain = response.content.strip().lower()
    if domain not in VALID_DOMAINS:
        domain = "general"
    logger.info(f"[classify_intent] domain = '{domain}'")
    return {"legal_domain": domain}


# ─────────────────────────────────────────────────────────────────────────────
#  Node 2 — Retrieve relevant legal document chunks from ChromaDB
# ─────────────────────────────────────────────────────────────────────────────

def retrieve_context(state: AgentState) -> dict:
    settings = get_settings()
    domain = state.get("legal_domain") or "general"
    docs = retrieve_for_domain(state["query"], domain, top_k=settings.retrieval_top_k)
    logger.info(f"[retrieve_context] {len(docs)} chunks retrieved for domain '{domain}'")
    return {"retrieved_docs": docs}


# ─────────────────────────────────────────────────────────────────────────────
#  Node 3 — Apply IRAC reasoning using Claude with retrieved context
# ─────────────────────────────────────────────────────────────────────────────

def reason_legally(state: AgentState) -> dict:
    llm = _make_llm()

    # Build context block from retrieved documents
    context_parts: list[str] = []
    for i, doc in enumerate(state.get("retrieved_docs", []), 1):
        source = doc.metadata.get("source", "Unknown source")
        context_parts.append(f"[Source {i} — {source}]\n{doc.page_content}")

    context = (
        "\n\n---\n\n".join(context_parts)
        if context_parts
        else "No specific documents retrieved from the knowledge base. "
             "Apply your training knowledge of Namibian law."
    )

    # Assemble message list: system → history → current query
    messages: list = [SystemMessage(content=LEGAL_ADVISOR_SYSTEM_PROMPT)]

    for turn in state.get("messages", []):
        role = turn.get("role", "")
        content = turn.get("content", "")
        if role == "user":
            messages.append(HumanMessage(content=content))
        elif role == "assistant":
            messages.append(AIMessage(content=content))

    user_prompt = (
        f"RETRIEVED LEGAL CONTEXT:\n{context}\n\n"
        "---\n\n"
        f"QUESTION: {state['query']}\n\n"
        "Apply the IRAC framework fully. Cite every applicable statutory provision "
        "with the exact Act name, number, year, and section. Include the disclaimer."
    )
    messages.append(HumanMessage(content=user_prompt))

    response = llm.invoke(messages)
    logger.info("[reason_legally] answer generated.")
    return {"final_answer": response.content}


# ─────────────────────────────────────────────────────────────────────────────
#  Node 4 — Extract structured citations from the generated answer
# ─────────────────────────────────────────────────────────────────────────────

def format_response(state: AgentState) -> dict:
    answer = state.get("final_answer", "")
    citations: list[Citation] = []
    seen: set[str] = set()

    for pattern in _CITATION_PATTERNS:
        for match in re.finditer(pattern, answer, re.IGNORECASE):
            act_name = match.group(1).strip()
            section = match.group(2).strip() if len(match.groups()) > 1 else "General"
            key = f"{act_name}|{section}"
            if key in seen:
                continue
            seen.add(key)

            # Grab a short excerpt surrounding the citation
            start = max(0, match.start() - 100)
            end = min(len(answer), match.end() + 220)
            excerpt = answer[start:end].strip()

            citations.append(
                Citation(act_name=act_name, section=section, excerpt=excerpt, source=act_name)
            )

    logger.info(f"[format_response] extracted {len(citations)} citations.")
    return {"citations": citations}
