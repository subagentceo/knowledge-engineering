"""
Messages API canonical types — mirrors POST /v1/messages exactly.

Source of truth: vendor/anthropics/platform.claude.com/docs/en/api/messages/create.md

@cite vendor/anthropics/platform.claude.com/docs/en/api/messages/create.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/messages.md
"""

from __future__ import annotations

from typing import Annotated, Any, Literal, Union

from pydantic import BaseModel, ConfigDict, Field

# ── Roles ──────────────────────────────────────────────────────────────────────

Role = Literal["user", "assistant"]
StopReason = Literal[
    "end_turn", "max_tokens", "stop_sequence", "tool_use", "pause_turn", "refusal"
]
CacheTTL = Literal["5m", "1h"]


# ── Cache control ──────────────────────────────────────────────────────────────

class CacheControlEphemeral(BaseModel):
    """Cache control breakpoint for prompt caching."""
    model_config = ConfigDict(extra="forbid")

    type: Literal["ephemeral"] = "ephemeral"
    ttl: CacheTTL = "5m"


# ── Citations (input) ──────────────────────────────────────────────────────────

class CitationCharLocationParam(BaseModel):
    cited_text: str
    document_index: int
    document_title: str | None = None
    end_char_index: int
    start_char_index: int
    type: Literal["char_location"] = "char_location"


class CitationPageLocationParam(BaseModel):
    cited_text: str
    document_index: int
    document_title: str | None = None
    end_page_number: int
    start_page_number: int
    type: Literal["page_location"] = "page_location"


class CitationContentBlockLocationParam(BaseModel):
    cited_text: str
    document_index: int
    document_title: str | None = None
    end_block_index: int
    start_block_index: int
    type: Literal["content_block_location"] = "content_block_location"


class CitationWebSearchResultLocationParam(BaseModel):
    cited_text: str
    encrypted_index: str
    title: str
    type: Literal["web_search_result_location"] = "web_search_result_location"
    url: str


class CitationSearchResultLocationParam(BaseModel):
    cited_text: str
    end_block_index: int
    search_result_index: int
    source: str
    start_block_index: int
    title: str
    type: Literal["search_result_location"] = "search_result_location"


TextCitationParam = Annotated[
    Union[
        CitationCharLocationParam,
        CitationPageLocationParam,
        CitationContentBlockLocationParam,
        CitationWebSearchResultLocationParam,
        CitationSearchResultLocationParam,
    ],
    Field(discriminator="type"),
]


# ── Content blocks (input) ─────────────────────────────────────────────────────

class TextBlockParam(BaseModel):
    type: Literal["text"] = "text"
    text: str
    cache_control: CacheControlEphemeral | None = None
    citations: list[TextCitationParam] | None = None


class ImageSourceBase64(BaseModel):
    type: Literal["base64"] = "base64"
    media_type: Literal["image/jpeg", "image/png", "image/gif", "image/webp"]
    data: str


class ImageSourceUrl(BaseModel):
    type: Literal["url"] = "url"
    url: str


class ImageBlockParam(BaseModel):
    type: Literal["image"] = "image"
    source: Union[ImageSourceBase64, ImageSourceUrl]
    cache_control: CacheControlEphemeral | None = None


class DocumentBlockParam(BaseModel):
    type: Literal["document"] = "document"
    source: dict[str, Any]
    title: str | None = None
    context: str | None = None
    cache_control: CacheControlEphemeral | None = None
    citations: dict[str, bool] | None = None


class ToolUseBlockParam(BaseModel):
    type: Literal["tool_use"] = "tool_use"
    id: str
    name: str
    input: dict[str, Any]
    cache_control: CacheControlEphemeral | None = None


class ToolResultBlockParam(BaseModel):
    type: Literal["tool_result"] = "tool_result"
    tool_use_id: str
    content: Union[str, list[Union[TextBlockParam, ImageBlockParam]]] | None = None
    is_error: bool | None = None
    cache_control: CacheControlEphemeral | None = None


class ThinkingBlockParam(BaseModel):
    type: Literal["thinking"] = "thinking"
    thinking: str
    signature: str


class RedactedThinkingBlockParam(BaseModel):
    type: Literal["redacted_thinking"] = "redacted_thinking"
    data: str


class SearchResultBlockParam(BaseModel):
    type: Literal["search_result"] = "search_result"
    source: str
    title: str
    content: list[TextBlockParam]
    citations: dict[str, bool] | None = None
    cache_control: CacheControlEphemeral | None = None


ContentBlockParam = Annotated[
    Union[
        TextBlockParam,
        ImageBlockParam,
        DocumentBlockParam,
        ToolUseBlockParam,
        ToolResultBlockParam,
        ThinkingBlockParam,
        RedactedThinkingBlockParam,
        SearchResultBlockParam,
    ],
    Field(discriminator="type"),
]


# ── Messages ───────────────────────────────────────────────────────────────────

class MessageParam(BaseModel):
    role: Role
    content: Union[str, list[ContentBlockParam]]


# ── Output content blocks ──────────────────────────────────────────────────────

class TextBlock(BaseModel):
    type: Literal["text"] = "text"
    text: str
    citations: list[dict[str, Any]] | None = None


class ToolUseBlock(BaseModel):
    type: Literal["tool_use"] = "tool_use"
    id: str
    name: str
    input: dict[str, Any]


class ServerToolUseBlock(BaseModel):
    type: Literal["server_tool_use"] = "server_tool_use"
    id: str
    name: str
    input: dict[str, Any]


class ThinkingBlock(BaseModel):
    type: Literal["thinking"] = "thinking"
    thinking: str
    signature: str


class RedactedThinkingBlock(BaseModel):
    type: Literal["redacted_thinking"] = "redacted_thinking"
    data: str


ContentBlock = Annotated[
    Union[TextBlock, ToolUseBlock, ServerToolUseBlock, ThinkingBlock, RedactedThinkingBlock],
    Field(discriminator="type"),
]


# ── Usage ──────────────────────────────────────────────────────────────────────

class ServerToolUsage(BaseModel):
    web_search_requests: int = 0


class CacheCreation(BaseModel):
    ephemeral_5m_input_tokens: int = 0
    ephemeral_1h_input_tokens: int = 0


class Usage(BaseModel):
    """Token-accounting object returned with every Message response."""
    input_tokens: int = 0
    output_tokens: int = 0
    cache_creation_input_tokens: int | None = None
    cache_read_input_tokens: int | None = None
    cache_creation: CacheCreation | None = None
    server_tool_use: ServerToolUsage | None = None
    service_tier: Literal["standard", "priority", "batch"] | None = None


# ── Tools (input definitions) ──────────────────────────────────────────────────

class InputSchema(BaseModel):
    type: Literal["object"] = "object"
    properties: dict[str, Any] | None = None
    required: list[str] | None = None


class ToolDefinition(BaseModel):
    name: str
    description: str | None = None
    input_schema: InputSchema
    cache_control: CacheControlEphemeral | None = None
    type: Literal["custom"] | None = None


class ToolChoiceAuto(BaseModel):
    type: Literal["auto"] = "auto"
    disable_parallel_tool_use: bool | None = None


class ToolChoiceAny(BaseModel):
    type: Literal["any"] = "any"
    disable_parallel_tool_use: bool | None = None


class ToolChoiceTool(BaseModel):
    type: Literal["tool"] = "tool"
    name: str
    disable_parallel_tool_use: bool | None = None


class ToolChoiceNone(BaseModel):
    type: Literal["none"] = "none"


ToolChoice = Annotated[
    Union[ToolChoiceAuto, ToolChoiceAny, ToolChoiceTool, ToolChoiceNone],
    Field(discriminator="type"),
]


# ── Top-level request / response ───────────────────────────────────────────────

class MessageMetadata(BaseModel):
    user_id: str | None = None


class ThinkingConfigEnabled(BaseModel):
    type: Literal["enabled"] = "enabled"
    budget_tokens: int


class ThinkingConfigDisabled(BaseModel):
    type: Literal["disabled"] = "disabled"


ThinkingConfig = Annotated[
    Union[ThinkingConfigEnabled, ThinkingConfigDisabled],
    Field(discriminator="type"),
]


class MessageCreateParams(BaseModel):
    """Body for POST /v1/messages."""
    model_config = ConfigDict(extra="forbid")

    model: str
    max_tokens: int
    messages: list[MessageParam]
    system: Union[str, list[TextBlockParam]] | None = None
    metadata: MessageMetadata | None = None
    stop_sequences: list[str] | None = None
    stream: bool | None = None
    temperature: float | None = Field(default=None, ge=0.0, le=1.0)
    top_k: int | None = Field(default=None, ge=0)
    top_p: float | None = Field(default=None, ge=0.0, le=1.0)
    tools: list[ToolDefinition] | None = None
    tool_choice: ToolChoice | None = None
    thinking: ThinkingConfig | None = None
    service_tier: Literal["auto", "standard_only"] | None = None


class Message(BaseModel):
    """Response from POST /v1/messages."""
    id: str
    type: Literal["message"] = "message"
    role: Literal["assistant"] = "assistant"
    content: list[ContentBlock]
    model: str
    stop_reason: StopReason | None = None
    stop_sequence: str | None = None
    usage: Usage


# ── Count Tokens ───────────────────────────────────────────────────────────────

class CountTokensParams(BaseModel):
    model: str
    messages: list[MessageParam]
    system: Union[str, list[TextBlockParam]] | None = None
    tools: list[ToolDefinition] | None = None
    thinking: ThinkingConfig | None = None
    tool_choice: ToolChoice | None = None


class CountTokensResponse(BaseModel):
    input_tokens: int
