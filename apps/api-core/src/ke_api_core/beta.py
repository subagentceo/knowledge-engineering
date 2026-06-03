"""
Beta API surface — POST /v1/messages with the `anthropic-beta` header.

The beta shape is a superset of stable Message; we re-export the stable types
and add beta-only extensions (extended context windows, fast mode, etc.).

@cite vendor/anthropics/platform.claude.com/docs/en/api/beta/messages.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/beta/models.md
"""

from __future__ import annotations

from typing import Literal

from pydantic import BaseModel

from .messages import Message, MessageCreateParams

# Stable shape is the baseline; beta extensions are additive.

BetaMessageCreateParams = MessageCreateParams
BetaMessage = Message

KnownBetaHeaders = Literal[
    "managed-agents-2026-04-01",
    "fast-mode-2026-02-01",
    "context-1m-2025-08-07",
    "prompt-caching-2024-07-31",
    "message-batches-2024-09-24",
    "files-api-2025-04-14",
    "computer-use-2025-01-24",
]


class BetaHeaders(BaseModel):
    """Wrapper carrying the set of beta flags for a single request."""
    headers: list[KnownBetaHeaders | str]
