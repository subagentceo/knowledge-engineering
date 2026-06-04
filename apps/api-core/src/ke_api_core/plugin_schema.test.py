"""
@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
@cite seeds/citations/define-outcomes.md
"""

import pytest
from pydantic import ValidationError

from ke_api_core.plugin_schema import (
    PluginCapability,
    PluginKind,
    PluginManifest,
    PluginRegistry,
    PluginStage,
    MarketplaceRef,
    load_registry,
)


def test_plugin_manifest_kinds():
    assert PluginKind.skill == "skill"
    assert PluginKind.connector == "connector"
    assert PluginKind.agent == "agent"
    assert PluginKind.workflow == "workflow"
    assert len(PluginKind) == 4


def test_plugin_stages():
    assert PluginStage.installed == "installed"
    assert PluginStage.planned == "planned"
    assert PluginStage.declared == "declared"
    assert PluginStage.deprecated == "deprecated"
    assert len(PluginStage) == 4


def _make_skill(id: str, stage: PluginStage = PluginStage.declared) -> PluginManifest:
    return PluginManifest(
        id=id,
        kind=PluginKind.skill,
        display_name=f"Skill {id}",
        description="A test skill.",
        stage=stage,
    )


def _make_connector(id: str, stage: PluginStage = PluginStage.declared) -> PluginManifest:
    return PluginManifest(
        id=id,
        kind=PluginKind.connector,
        display_name=f"Connector {id}",
        description="A test connector.",
        stage=stage,
    )


def test_plugin_registry_by_kind():
    registry = PluginRegistry(
        plugins=[
            _make_skill("skill-a"),
            _make_skill("skill-b"),
            _make_connector("connector-a"),
        ]
    )
    skills = registry.by_kind(PluginKind.skill)
    connectors = registry.by_kind(PluginKind.connector)
    agents = registry.by_kind(PluginKind.agent)

    assert len(skills) == 2
    assert {p.id for p in skills} == {"skill-a", "skill-b"}
    assert len(connectors) == 1
    assert connectors[0].id == "connector-a"
    assert agents == []


def test_plugin_registry_by_stage():
    registry = PluginRegistry(
        plugins=[
            _make_skill("s1", PluginStage.installed),
            _make_skill("s2", PluginStage.declared),
            _make_connector("c1", PluginStage.planned),
            _make_connector("c2", PluginStage.installed),
        ]
    )
    installed = registry.by_stage(PluginStage.installed)
    declared = registry.by_stage(PluginStage.declared)
    planned = registry.by_stage(PluginStage.planned)

    assert {p.id for p in installed} == {"s1", "c2"}
    assert {p.id for p in declared} == {"s2"}
    assert {p.id for p in planned} == {"c1"}


def test_plugin_manifest_extra_fields_forbidden():
    with pytest.raises(ValidationError):
        PluginManifest(
            id="bad",
            kind=PluginKind.skill,
            display_name="Bad",
            description="Has extra.",
            unknown_field="oops",
        )


def test_load_registry():
    registry = load_registry(
        plugins=[
            {
                "id": "test-skill",
                "kind": "skill",
                "display_name": "Test",
                "description": "A skill loaded via load_registry.",
            }
        ]
    )
    assert isinstance(registry, PluginRegistry)
    assert len(registry.plugins) == 1
    assert registry.plugins[0].id == "test-skill"
    assert registry.plugins[0].kind == PluginKind.skill
    assert registry.plugins[0].stage == PluginStage.declared
