import operator
from typing import Annotated, Optional, TypedDict

from langchain_core.documents import Document

from app.models.schemas import Citation


class AgentState(TypedDict):
    # Conversation history — lists are merged via operator.add across graph nodes
    messages: Annotated[list[dict], operator.add]
    query: str
    legal_domain: Optional[str]
    retrieved_docs: list[Document]
    citations: list[Citation]
    final_answer: str
