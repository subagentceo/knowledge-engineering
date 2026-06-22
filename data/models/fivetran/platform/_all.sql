CREATE SCHEMA IF NOT EXISTS anthropic_claude;

CREATE TABLE IF NOT EXISTS anthropic_claude.organization (
    id TEXT PRIMARY KEY,
    name TEXT,
    type TEXT
);

CREATE TABLE IF NOT EXISTS anthropic_claude.workspace (
    id TEXT PRIMARY KEY,
    archived_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ,
    data_residency_allowed_inference_geo TEXT,
    data_residency_default_inference_geo TEXT,
    data_residency_workspace_geo TEXT,
    display_color TEXT,
    name TEXT,
    type TEXT
);

CREATE TABLE IF NOT EXISTS anthropic_claude.workspace_member (
    user_id TEXT NOT NULL,
    workspace_id TEXT NOT NULL,
    type TEXT,
    workspace_role TEXT,
    PRIMARY KEY (user_id, workspace_id)
);

CREATE TABLE IF NOT EXISTS anthropic_claude.users (
    id TEXT PRIMARY KEY,
    added_at TIMESTAMPTZ,
    email TEXT,
    name TEXT,
    role TEXT,
    type TEXT
);

CREATE TABLE IF NOT EXISTS anthropic_claude.invite (
    id TEXT PRIMARY KEY,
    email TEXT,
    expires_at TIMESTAMPTZ,
    invited_at TIMESTAMPTZ,
    role TEXT,
    status TEXT,
    type TEXT
);

CREATE TABLE IF NOT EXISTS anthropic_claude.api_key (
    id TEXT PRIMARY KEY,
    workspace_id TEXT,
    created_at TIMESTAMPTZ,
    created_by_id TEXT,
    created_by_type TEXT,
    name TEXT,
    partial_key_hint TEXT,
    status TEXT,
    type TEXT
);

CREATE TABLE IF NOT EXISTS anthropic_claude.model (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ,
    display_name TEXT,
    type TEXT
);

CREATE TABLE IF NOT EXISTS anthropic_claude.message_usage_report (
    _fivetran_id TEXT PRIMARY KEY,
    ending_at TIMESTAMPTZ,
    starting_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS anthropic_claude.message_usage_report_result (
    index BIGINT NOT NULL,
    message_usage_report_fivetran_id TEXT NOT NULL,
    api_key_id TEXT,
    workspace_id TEXT,
    cache_creation_ephemeral_1_h_input_token BIGINT,
    cache_creation_ephemeral_5_m_input_token BIGINT,
    cache_read_input_token BIGINT,
    context_window TEXT,
    model TEXT,
    output_token BIGINT,
    server_tool_use_web_search_request BIGINT,
    service_tier TEXT,
    uncached_input_token BIGINT,
    PRIMARY KEY (index, message_usage_report_fivetran_id)
);

CREATE TABLE IF NOT EXISTS anthropic_claude.cost_report (
    _fivetran_id TEXT PRIMARY KEY,
    ending_at TIMESTAMPTZ,
    starting_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS anthropic_claude.cost_report_result (
    index BIGINT NOT NULL,
    cost_report_fivetran_id TEXT NOT NULL,
    workspace_id TEXT,
    amount NUMERIC,
    context_window TEXT,
    cost_type TEXT,
    currency TEXT,
    description TEXT,
    inference_geo TEXT,
    model TEXT,
    service_tier TEXT,
    speed TEXT,
    token_type TEXT,
    PRIMARY KEY (index, cost_report_fivetran_id)
);

CREATE TABLE IF NOT EXISTS anthropic_claude.claude_code_usage_report (
    _fivetran_id TEXT PRIMARY KEY,
    organization_id TEXT,
    actor_api_key_name TEXT,
    actor_email_address TEXT,
    actor_type TEXT,
    core_metrics_commits_by_claude_code BIGINT,
    core_metrics_lines_of_code_added BIGINT,
    core_metrics_lines_of_code_removed BIGINT,
    core_metrics_num_sessions BIGINT,
    core_metrics_pull_requests_by_claude_code BIGINT,
    customer_type TEXT,
    date TIMESTAMPTZ,
    subscription_type TEXT,
    terminal_type TEXT,
    tool_actions_accepted BIGINT,
    tool_actions_rejected BIGINT
);

CREATE TABLE IF NOT EXISTS anthropic_claude.claude_code_usage_report_model_breakdown (
    index BIGINT NOT NULL,
    claude_code_usage_report_fivetran_id TEXT NOT NULL,
    estimated_cost_amount NUMERIC,
    estimated_cost_currency TEXT,
    model TEXT,
    tokens_cache_creation BIGINT,
    tokens_cache_read BIGINT,
    tokens_input BIGINT,
    tokens_output BIGINT,
    PRIMARY KEY (index, claude_code_usage_report_fivetran_id)
);

CREATE TABLE IF NOT EXISTS anthropic_claude.file (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ,
    downloadable TEXT,
    filename TEXT,
    mime_type TEXT,
    size_bytes BIGINT,
    type TEXT
);

CREATE TABLE IF NOT EXISTS anthropic_claude.skill (
    id TEXT PRIMARY KEY,
    name TEXT,
    type TEXT
);

CREATE TABLE IF NOT EXISTS anthropic_claude.skill_version (
    id TEXT PRIMARY KEY,
    skill_id TEXT,
    created_at TIMESTAMPTZ,
    description TEXT,
    directory TEXT,
    name TEXT,
    type TEXT,
    version TEXT
);

CREATE TABLE IF NOT EXISTS anthropic_claude.message_batch (
    id TEXT PRIMARY KEY,
    workspace_id TEXT,
    archived_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ,
    ended_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    processing_status TEXT,
    type TEXT
);

CREATE TABLE IF NOT EXISTS anthropic_claude.message_batch_result (
    custom_id TEXT NOT NULL,
    message_batch_id TEXT NOT NULL,
    error TEXT,
    message TEXT,
    result_type TEXT,
    PRIMARY KEY (custom_id, message_batch_id)
);
