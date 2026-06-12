from langgraph.graph import END, START, StateGraph

from app.agent.nodes import (
    classify_intent,
    format_response,
    reason_legally,
    retrieve_context,
)
from app.agent.state import AgentState


def build_legal_advisor_graph():
    """
    Build and compile the Swifty paralegal LangGraph agent.

    Flow:
      START → classify_intent → retrieve_context → reason_legally → format_response → END
    """
    graph = StateGraph(AgentState)

    graph.add_node("classify_intent", classify_intent)
    graph.add_node("retrieve_context", retrieve_context)
    graph.add_node("reason_legally", reason_legally)
    graph.add_node("format_response", format_response)

    graph.add_edge(START, "classify_intent")
    graph.add_edge("classify_intent", "retrieve_context")
    graph.add_edge("retrieve_context", "reason_legally")
    graph.add_edge("reason_legally", "format_response")
    graph.add_edge("format_response", END)

    return graph.compile()


# Module-level singleton — compiled once at import time
legal_advisor_graph = build_legal_advisor_graph()
