"""
Plugin manifest schema — Skills, Connectors, and Agents taxonomy for the KG marketplace.

@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
@cite seeds/citations/define-outcomes.md
"""

from __future__ import annotations

import re
from enum import Enum
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field, field_validator


class PluginKind(str, Enum):
    skill = "skill"
    connector = "connector"
    agent = "agent"
    workflow = "workflow"


class PluginStage(str, Enum):
    installed = "installed"
    planned = "planned"
    declared = "declared"
    deprecated = "deprecated"


class MarketplaceRef(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str
    repo: str
    ref: str
    comment: Optional[str] = None


class PluginCapability(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str
    description: str


class PluginManifest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: str
    kind: PluginKind
    display_name: str
    version: str = "0.1.0"
    description: str
    marketplace: Optional[str] = None
    package: Optional[str] = None
    entrypoint: Optional[str] = None
    capabilities: list[PluginCapability] = Field(default_factory=list)
    tags: list[str] = Field(default_factory=list, max_length=50)
    stage: PluginStage = PluginStage.declared

    @field_validator("entrypoint")
    @classmethod
    def _validate_entrypoint(cls, v: str | None) -> str | None:
        if v is None:
            return v
        if v.startswith("/") or ".." in v:
            raise ValueError("entrypoint must be a relative path without parent traversal")
        return v

    @field_validator("package")
    @classmethod
    def _validate_package(cls, v: str | None) -> str | None:
        if v is None:
            return v
        if not re.match(r"^(@[a-z0-9-]+/)?[a-z0-9._-]+(/[a-z0-9._-]+)*$", v):
            raise ValueError(f"invalid package name: {v!r}")
        return v

    @field_validator("tags")
    @classmethod
    def _validate_tags(cls, v: list[str]) -> list[str]:
        for tag in v:
            if len(tag) > 100:
                raise ValueError(f"tag exceeds 100 chars: {tag!r}")
        return v


class PluginRegistry(BaseModel):
    model_config = ConfigDict(extra="forbid")

    schema_version: str = "1"
    marketplaces: list[MarketplaceRef] = Field(default_factory=list)
    plugins: list[PluginManifest]

    def by_kind(self, kind: PluginKind) -> list[PluginManifest]:
        return [p for p in self.plugins if p.kind == kind]

    def by_stage(self, stage: PluginStage) -> list[PluginManifest]:
        return [p for p in self.plugins if p.stage == stage]


def load_registry(
    plugins: list[dict],
    marketplaces: list[dict] | None = None,
) -> PluginRegistry:
    return PluginRegistry(
        marketplaces=[MarketplaceRef(**m) for m in (marketplaces or [])],
        plugins=[PluginManifest(**p) for p in plugins],
    )
