#!/usr/bin/env python3
"""Generate one consolidated YAML+SQL file per Fivetran table, from the two ERDs.

Two connectors:
  compliance/  → Claude.ai data (chats, projects, artifacts, activity, groups).
                 THIS IS THE USER'S DATA (they use claude.ai).
  platform/    → org/billing data (usage/cost/claude_code reports, workspaces).

Each table → one .yaml file holding typed semantics AND its PostgreSQL 16 DDL.
Source of truth: the two attached Fivetran ERD PDFs (column-level read).

col = (name, sql_type, constraint_or_None)   # PK handled via `pk` list
"""
from __future__ import annotations
import os, sys

# ── helpers ────────────────────────────────────────────────────────────────────
def q(s): return '"' + str(s).replace('"', '\\"') + '"'

def col_kind(name, sqlt):
    if name.endswith("_at"): return "time_dimension"
    if sqlt in ("BIGINT", "NUMERIC", "INTEGER") and (
        name.startswith("tokens") or name.endswith(("_token", "_tokens", "_count",
        "_amount", "_added", "_removed", "_sessions", "_accepted", "_rejected",
        "_requests", "_request", "_bytes", "by_claude_code"))
    ): return "measure"
    return "dimension"

def ddl_for(schema, name, pk, cols):
    body = []
    single_pk = pk[0] if len(pk) == 1 else None
    for cname, sqlt, cons in cols:
        line = f"    {cname} {sqlt}"
        if cname == single_pk: line += " PRIMARY KEY"
        elif cons: line += f" {cons}"
        body.append(line)
    if len(pk) > 1:
        body.append(f"    PRIMARY KEY ({', '.join(pk)})")
    return f"CREATE TABLE IF NOT EXISTS {schema}.{name} (\n" + ",\n".join(body) + "\n);"

def yaml_for(connector, schema, name, kind, grain, pk, cols, cites):
    o = []
    o.append("# yaml-language-server: $schema=../../../../schemas/fivetran-table-semantics.schema.json")
    o.append("---")
    o.append("apiVersion: anthropic.com/v1")
    o.append("kind: FivetranTableSemantics")
    o.append(f"table_kind: {kind}")
    o.append("")
    o.append("metadata:")
    o.append(f"  name: {name}")
    o.append("  labels:")
    o.append(f"    connector: {connector}")
    o.append("")
    o.append("spec:")
    o.append("  version: 1.0.0")
    o.append(f"  schema: {schema}")
    o.append(f"  grain: {q(grain)}")
    o.append(f"  primary_key: [{', '.join(pk)}]")
    o.append("  load_type: incremental")
    o.append("  codeowners:")
    o.append("    - data-coworker")
    o.append("  columns:")
    for cname, sqlt, _cons in cols:
        o.append(f"    - name: {cname}")
        o.append(f"      kind: {col_kind(cname, sqlt)}")
        o.append(f"      sql_type: {sqlt.lower()}")
    o.append("  ddl: |")
    for line in ddl_for(schema, name, pk, cols).splitlines():
        o.append(f"    {line}")
    o.append("")
    for c in cites:
        o.append(f"# @cite {c}")
    return "\n".join(o) + "\n"

T = "TEXT"; TS = "TIMESTAMPTZ"; BIG = "BIGINT"; NUM = "NUMERIC"; JS = "JSONB"; NN = "NOT NULL"

# ── COMPLIANCE connector (claude.ai) — the user's data ─────────────────────────
COMPLIANCE = [
 ("activity","activity event","one row per claude.ai compliance activity",["id"],[
   ("id",T,NN),("organization_uuid",T,None),("actor_api_key_id",T,None),
   ("actor_email_address",T,None),("actor_ip_address",T,None),("actor_type",T,None),
   ("actor_unauthenticated_email_address",T,None),("actor_user_agent",T,None),
   ("actor_user_id",T,None),("created_at",TS,None),("organization_id",T,None),("type",T,None)]),
 ("activity_additional_field","activity event","one row per activity scalar extra field",["index","activity_id"],[
   ("index",BIG,NN),("activity_id",T,NN),("activity_type",T,None),
   ("field_name",T,None),("field_value",T,None)]),
 ("activity_additional_array_field","activity event","one row per activity array extra field",["index","activity_id"],[
   ("index",BIG,NN),("activity_id",T,NN),("activity_type",T,None),
   ("array_field_name",T,None),("field_name",T,None),("field_value",T,None)]),
 ("organization_user","entity","one row per claude.ai org user",["id","organization_uuid"],[
   ("id",T,NN),("organization_uuid",T,NN),("created_at",TS,None),
   ("email",T,None),("full_name",T,None),("organization_role",T,None)]),
 ("organization","entity","one row per claude.ai organization",["id"],[
   ("id",T,NN),("created_at",TS,None),("name",T,None)]),
 ("compliance_role","entity","one row per compliance role",["id","organization_uuid"],[
   ("id",T,NN),("organization_uuid",T,NN),("created_at",TS,None),
   ("description",T,None),("name",T,None),("updated_at",TS,None)]),
 ("compliance_role_permission","entity","one row per role permission",["_fivetran_id"],[
   ("_fivetran_id",T,NN),("compliance_role_id",T,None),("organization_uuid",T,None),
   ("action",T,None),("resource_id",T,None),("resource_type",T,None)]),
 ("groups","entity","one row per claude.ai group",["id"],[
   ("id",T,NN),("created_at",TS,None),("description",T,None),
   ("name",T,None),("source_type",T,None),("updated_at",TS,None)]),
 ("group_role","entity","one row per (group, role)",["group_id","role_id"],[
   ("group_id",T,NN),("role_id",T,NN)]),
 ("group_member","entity","one row per (group, user) membership",["group_id","user_id"],[
   ("group_id",T,NN),("user_id",T,NN),("created_at",TS,None),
   ("email",T,None),("updated_at",TS,None)]),
 ("project","entity","one row per claude.ai project",["id"],[
   ("id",T,NN),("organization_uuid",T,None),("user_id",T,None),("created_at",TS,None),
   ("deleted_at",TS,None),("description",T,None),("instruction",T,None),
   ("is_private",T,None),("name",T,None),("organization_id",T,None),("updated_at",TS,None)]),
 ("project_attachment","entity","one row per project attachment",["id","project_id"],[
   ("id",T,NN),("project_id",T,NN)]),
 ("project_document","entity","one row per project document",["id","project_attachment_id","project_id"],[
   ("id",T,NN),("project_attachment_id",T,NN),("project_id",T,NN),
   ("user_id",T,None),("content",T,None)]),
 ("project_document_metadata","entity","one row per project document file",["id","claude_project_id","project_attachment_id"],[
   ("id",T,NN),("claude_project_id",T,NN),("project_attachment_id",T,NN),
   ("user_id",T,None),("created_at",TS,None),("filename",T,None),
   ("md_5",T,None),("mime_type",T,None),("size_bytes",BIG,None)]),
 ("chat","entity","one row per claude.ai chat",["id"],[
   ("id",T,NN),("organization_uuid",T,None),("project_id",T,None),("user_id",T,None),
   ("created_at",TS,None),("deleted_at",TS,None),("href",T,None),("model",T,None),
   ("name",T,None),("organization_id",T,None),("updated_at",TS,None)]),
 ("chat_message","entity","one row per chat message",["id","chat_id"],[
   ("id",T,NN),("chat_id",T,NN),("created_at",TS,None),("role",T,None),("updated_at",TS,None)]),
 ("chat_message_content","entity","one row per message content block",["index","chat_id","chat_message_id"],[
   ("index",BIG,NN),("chat_id",T,NN),("chat_message_id",T,NN),("text",T,None),("type",T,None)]),
 ("chat_message_file","entity","one row per message file ref",["id","chat_id","chat_message_id"],[
   ("id",T,NN),("chat_id",T,NN),("chat_message_id",T,NN)]),
 ("chat_message_generated_file","entity","one row per message generated file ref",["id","chat_id","chat_message_id"],[
   ("id",T,NN),("chat_id",T,NN),("chat_message_id",T,NN)]),
 ("chat_message_artifact","entity","one row per message artifact",["id","version_id","chat_id","chat_message_id"],[
   ("id",T,NN),("version_id",T,NN),("chat_id",T,NN),("chat_message_id",T,NN)]),
 ("chat_file_metadata","entity","one row per chat file",["id","chat_message_file_id"],[
   ("id",T,NN),("chat_message_file_id",T,NN),("created_at",TS,None),("file_name",T,None),
   ("md_5",T,None),("message_id",T,None),("mime_type",T,None),("size_bytes",BIG,None)]),
 ("chat_generated_file_metadata","entity","one row per generated chat file",["id","chat_message_generated_file_id"],[
   ("id",T,NN),("chat_message_generated_file_id",T,NN),("claude_chat_id",T,None),
   ("created_at",TS,None),("filename",T,None),("md_5",T,None),
   ("mime_type",T,None),("size_bytes",BIG,None)]),
 ("artifact_metadata","entity","one row per artifact version",["id","version_id","chat_message_artifact_id"],[
   ("id",T,NN),("version_id",T,NN),("chat_message_artifact_id",T,NN),("claude_chat_id",T,None),
   ("artifact_type",T,None),("created_at",TS,None),("md_5",T,None),
   ("size_bytes",BIG,None),("title",T,None)]),
]

# ── PLATFORM connector (org/billing) ───────────────────────────────────────────
PLATFORM = [
 ("organization","entity","one row per organization",["id"],[
   ("id",T,NN),("name",T,None),("type",T,None)]),
 ("workspace","entity","one row per workspace",["id"],[
   ("id",T,NN),("archived_at",TS,None),("created_at",TS,None),
   ("data_residency_allowed_inference_geo",T,None),("data_residency_default_inference_geo",T,None),
   ("data_residency_workspace_geo",T,None),("display_color",T,None),("name",T,None),("type",T,None)]),
 ("workspace_member","entity","one row per (user, workspace)",["user_id","workspace_id"],[
   ("user_id",T,NN),("workspace_id",T,NN),("type",T,None),("workspace_role",T,None)]),
 ("users","entity","one row per org user",["id"],[
   ("id",T,NN),("added_at",TS,None),("email",T,None),("name",T,None),("role",T,None),("type",T,None)]),
 ("invite","entity","one row per org invite",["id"],[
   ("id",T,NN),("email",T,None),("expires_at",TS,None),("invited_at",TS,None),
   ("role",T,None),("status",T,None),("type",T,None)]),
 ("api_key","entity","one row per API key",["id"],[
   ("id",T,NN),("workspace_id",T,None),("created_at",TS,None),("created_by_id",T,None),
   ("created_by_type",T,None),("name",T,None),("partial_key_hint",T,None),("status",T,None),("type",T,None)]),
 ("model","entity","one row per available model",["id"],[
   ("id",T,NN),("created_at",TS,None),("display_name",T,None),("type",T,None)]),
 ("message_usage_report","usage","one row per message usage report",["_fivetran_id"],[
   ("_fivetran_id",T,NN),("ending_at",TS,None),("starting_at",TS,None)]),
 ("message_usage_report_result","usage","one row per usage report row",["index","message_usage_report_fivetran_id"],[
   ("index",BIG,NN),("message_usage_report_fivetran_id",T,NN),("api_key_id",T,None),("workspace_id",T,None),
   ("cache_creation_ephemeral_1_h_input_token",BIG,None),("cache_creation_ephemeral_5_m_input_token",BIG,None),
   ("cache_read_input_token",BIG,None),("context_window",T,None),("model",T,None),
   ("output_token",BIG,None),("server_tool_use_web_search_request",BIG,None),
   ("service_tier",T,None),("uncached_input_token",BIG,None)]),
 ("cost_report","usage","one row per cost report",["_fivetran_id"],[
   ("_fivetran_id",T,NN),("ending_at",TS,None),("starting_at",TS,None)]),
 ("cost_report_result","usage","one row per cost report line",["index","cost_report_fivetran_id"],[
   ("index",BIG,NN),("cost_report_fivetran_id",T,NN),("workspace_id",T,None),("amount",NUM,None),
   ("context_window",T,None),("cost_type",T,None),("currency",T,None),("description",T,None),
   ("inference_geo",T,None),("model",T,None),("service_tier",T,None),("speed",T,None),("token_type",T,None)]),
 ("claude_code_usage_report","usage","one row per claude code usage report",["_fivetran_id"],[
   ("_fivetran_id",T,NN),("organization_id",T,None),("actor_api_key_name",T,None),
   ("actor_email_address",T,None),("actor_type",T,None),
   ("core_metrics_commits_by_claude_code",BIG,None),("core_metrics_lines_of_code_added",BIG,None),
   ("core_metrics_lines_of_code_removed",BIG,None),("core_metrics_num_sessions",BIG,None),
   ("core_metrics_pull_requests_by_claude_code",BIG,None),("customer_type",T,None),("date",TS,None),
   ("subscription_type",T,None),("terminal_type",T,None),
   ("tool_actions_accepted",BIG,None),("tool_actions_rejected",BIG,None)]),
 ("claude_code_usage_report_model_breakdown","usage","one row per (cc report, model)",
   ["index","claude_code_usage_report_fivetran_id"],[
   ("index",BIG,NN),("claude_code_usage_report_fivetran_id",T,NN),("estimated_cost_amount",NUM,None),
   ("estimated_cost_currency",T,None),("model",T,None),("tokens_cache_creation",BIG,None),
   ("tokens_cache_read",BIG,None),("tokens_input",BIG,None),("tokens_output",BIG,None)]),
 ("file","entity","one row per workspace file",["id"],[
   ("id",T,NN),("created_at",TS,None),("downloadable",T,None),("filename",T,None),
   ("mime_type",T,None),("size_bytes",BIG,None),("type",T,None)]),
 ("skill","entity","one row per workspace skill",["id"],[
   ("id",T,NN),("name",T,None),("type",T,None)]),
 ("skill_version","entity","one row per skill version",["id"],[
   ("id",T,NN),("skill_id",T,None),("created_at",TS,None),("description",T,None),
   ("directory",T,None),("name",T,None),("type",T,None),("version",T,None)]),
 ("message_batch","entity","one row per message batch",["id"],[
   ("id",T,NN),("workspace_id",T,None),("archived_at",TS,None),("created_at",TS,None),
   ("ended_at",TS,None),("expires_at",TS,None),("processing_status",T,None),("type",T,None)]),
 ("message_batch_result","entity","one row per batch result",["custom_id","message_batch_id"],[
   ("custom_id",T,NN),("message_batch_id",T,NN),("error",T,None),
   ("message",T,None),("result_type",T,None)]),
]

CITES = {
 "compliance": ["Fivetran ERD: Claude Compliance (claude.ai export)",
                "uploads/Claude Compliance_diagram.pdf"],
 "platform": ["Fivetran ERD: Claude Platform (Admin/API)",
              "uploads/Claude Platform_diagram.pdf",
              "https://fivetran.com/docs/connectors/applications/claude-platform/api-configuration"],
}

def emit(connector, schema, tables, base):
    d = os.path.join(base, connector)
    os.makedirs(d, exist_ok=True)
    allddl = [f"CREATE SCHEMA IF NOT EXISTS {schema};", ""]
    for name, kind, grain, pk, cols in tables:
        kindword = "usage" if kind == "usage" else ("compliance" if connector == "compliance" else "entity")
        with open(os.path.join(d, f"{name}.yaml"), "w") as f:
            f.write(yaml_for(connector, schema, name, kindword, grain, pk, cols, CITES[connector]))
        allddl.append(ddl_for(schema, name, pk, cols)); allddl.append("")
    with open(os.path.join(d, "_all.sql"), "w") as f:
        f.write("\n".join(allddl))
    return len(tables)

if __name__ == "__main__":
    base = sys.argv[1]
    n1 = emit("compliance", "claude_ai", COMPLIANCE, base)
    n2 = emit("platform", "anthropic_claude", PLATFORM, base)
    print(f"compliance: {n1} tables, platform: {n2} tables, total {n1+n2}")
