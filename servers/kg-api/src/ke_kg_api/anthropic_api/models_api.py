"""
Models API canonical types — /v1/models

@cite vendor/anthropics/platform.claude.com/docs/en/api/models/list.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/models/retrieve.md
"""

from __future__ import annotations

from typing import Literal

from pydantic import BaseModel


class ModelInfo(BaseModel):
    id: str
    type: Literal["model"] = "model"
    display_name: str
    created_at: str


class ModelList(BaseModel):
    data: list[ModelInfo]
    has_more: bool = False
    first_id: str | None = None
    last_id: str | None = None
