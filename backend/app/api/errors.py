"""Map internal exceptions to safe, plain-language messages for end users.

The real exception must always be logged server-side; only these
sanitized messages may be sent over the wire.
"""


def user_facing_error(exc: Exception) -> str:
    text = str(exc).lower()

    if "credit balance" in text or "billing" in text or "quota" in text:
        return (
            "Swifty is temporarily unavailable while we restore service "
            "capacity. Please try again a little later."
        )
    if "overloaded" in text or "rate limit" in text or "429" in text or "529" in text:
        return (
            "Swifty is helping many people right now. Please wait a moment "
            "and try again."
        )
    if "timeout" in text or "timed out" in text or "connection" in text:
        return (
            "We couldn't reach the legal research service. Please check your "
            "internet connection and try again."
        )
    if "authentication" in text or "api key" in text or "401" in text:
        return (
            "Swifty is temporarily unavailable due to a configuration issue. "
            "Please try again later."
        )
    return (
        "Something went wrong while preparing your answer. Please try again "
        "in a moment."
    )
