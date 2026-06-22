"""
Tests for data/models/alloydb/ — Kimball DW model YAML validation.

Validates structure, required fields, column kinds, SQL types, and
cross-references to cowork/templates/task-state-machine.ts enums.

@cite data/models/alloydb/
@cite cowork/templates/task-state-machine.ts
"""
from __future__ import annotations

import re
from pathlib import Path

import pytest
import yaml

MODEL_DIR = Path(__file__).parent / "alloydb"

VALID_API_VERSION = "anthropic.com/v1"
VALID_KINDS = {"AlloyDbTableSemantics"}
VALID_TABLE_KINDS = {"fact", "dim", "events", "rpt"}
VALID_SCD_TYPES = {0, 1, 2, 3, 4}
VALID_COLUMN_KINDS = {"dimension", "measure", "time_dimension", "degenerate_dimension"}
VALID_LOAD_TYPES = {"append", "upsert", "full", "incremental"}

TASK_STATES = {"pending", "in_progress", "blocked", "completed", "failed"}
TASK_EVENTS = {"claim", "complete", "block", "unblock", "fail", "retry"}
DOMAINS = {"product-management", "data", "engineering", "design"}


def all_model_files() -> list[Path]:
    return sorted(MODEL_DIR.glob("*.yaml"))


def load_model(path: Path) -> dict:
    return yaml.safe_load(path.read_text())


@pytest.fixture(params=[p.name for p in all_model_files()], ids=lambda n: n)
def model(request):
    return load_model(MODEL_DIR / request.param)


class TestModelStructure:
    def test_has_required_top_level_fields(self, model):
        assert model.get("apiVersion") == VALID_API_VERSION
        assert model.get("kind") in VALID_KINDS
        assert "metadata" in model
        assert "spec" in model

    def test_metadata_has_name(self, model):
        name = model["metadata"]["name"]
        assert name
        assert re.match(r"^[a-z][a-z0-9_]*$", name), f"bad name: {name}"

    def test_table_kind_valid(self, model):
        tk = model.get("table_kind")
        assert tk in VALID_TABLE_KINDS, f"table_kind={tk}"

    def test_scd_type_valid(self, model):
        scd = model.get("scd_type")
        if scd is not None:
            assert scd in VALID_SCD_TYPES, f"scd_type={scd}"

    def test_has_columns(self, model):
        cols = model["spec"].get("columns", [])
        assert len(cols) > 0, "no columns"

    def test_columns_have_required_fields(self, model):
        for col in model["spec"]["columns"]:
            assert "name" in col, f"column missing name: {col}"
            assert "sql_type" in col, f"{col['name']} missing sql_type"
            assert "description" in col, f"{col['name']} missing description"

    def test_column_kinds_valid(self, model):
        for col in model["spec"]["columns"]:
            kind = col.get("kind")
            if kind:
                assert kind in VALID_COLUMN_KINDS, f"{col['name']}: kind={kind}"

    def test_column_names_are_snake_case(self, model):
        for col in model["spec"]["columns"]:
            name = col["name"]
            assert re.match(r"^[a-z][a-z0-9_]*$", name), f"bad column name: {name}"

    def test_has_grain_if_fact_or_events(self, model):
        tk = model.get("table_kind")
        if tk in ("fact", "events"):
            assert model.get("grain"), f"{model['metadata']['name']}: fact/events table missing grain"

    def test_spec_has_version(self, model):
        assert model["spec"].get("version"), "spec missing version"


class TestCrossReferences:
    """Validate that models referencing task states/events use the canonical values."""

    def test_state_columns_reference_valid_states(self):
        for path in all_model_files():
            model = load_model(path)
            for col in model["spec"]["columns"]:
                desc = col.get("description", "")
                if "state" in col["name"] and "One of:" in desc:
                    listed = set(re.findall(r"[a-z_]+", desc.split("One of:")[1].split(".")[0]))
                    if listed & TASK_STATES:
                        assert listed <= TASK_STATES, (
                            f"{path.name}.{col['name']}: states {listed - TASK_STATES} not in canonical set"
                        )

    def test_event_columns_reference_valid_events(self):
        for path in all_model_files():
            model = load_model(path)
            for col in model["spec"]["columns"]:
                desc = col.get("description", "")
                if col["name"] == "event" and "One of:" in desc:
                    listed = set(re.findall(r"[a-z_]+", desc.split("One of:")[1].split(".")[0]))
                    if listed & TASK_EVENTS:
                        assert listed <= TASK_EVENTS, (
                            f"{path.name}.{col['name']}: events {listed - TASK_EVENTS} not in canonical set"
                        )


class TestNamingConventions:
    def test_fact_tables_start_with_fact(self):
        for path in all_model_files():
            model = load_model(path)
            name = model["metadata"]["name"]
            tk = model.get("table_kind")
            if tk == "fact":
                assert name.startswith("fact_") or name.startswith("dim_"), (
                    f"{path.name}: fact table {name} should start with fact_ or dim_"
                )

    def test_all_files_have_yaml_header(self):
        for path in all_model_files():
            content = path.read_text()
            assert "apiVersion" in content, f"{path.name} missing apiVersion"
