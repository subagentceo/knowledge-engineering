CREATE SCHEMA IF NOT EXISTS claude_ai;

CREATE TABLE IF NOT EXISTS claude_ai.activity (
    id TEXT PRIMARY KEY,
    organization_uuid TEXT,
    actor_api_key_id TEXT,
    actor_email_address TEXT,
    actor_ip_address TEXT,
    actor_type TEXT,
    actor_unauthenticated_email_address TEXT,
    actor_user_agent TEXT,
    actor_user_id TEXT,
    created_at TIMESTAMPTZ,
    organization_id TEXT,
    type TEXT
);

CREATE TABLE IF NOT EXISTS claude_ai.activity_additional_field (
    index BIGINT NOT NULL,
    activity_id TEXT NOT NULL,
    activity_type TEXT,
    field_name TEXT,
    field_value TEXT,
    PRIMARY KEY (index, activity_id)
);

CREATE TABLE IF NOT EXISTS claude_ai.activity_additional_array_field (
    index BIGINT NOT NULL,
    activity_id TEXT NOT NULL,
    activity_type TEXT,
    array_field_name TEXT,
    field_name TEXT,
    field_value TEXT,
    PRIMARY KEY (index, activity_id)
);

CREATE TABLE IF NOT EXISTS claude_ai.organization_user (
    id TEXT NOT NULL,
    organization_uuid TEXT NOT NULL,
    created_at TIMESTAMPTZ,
    email TEXT,
    full_name TEXT,
    organization_role TEXT,
    PRIMARY KEY (id, organization_uuid)
);

CREATE TABLE IF NOT EXISTS claude_ai.organization (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ,
    name TEXT
);

CREATE TABLE IF NOT EXISTS claude_ai.compliance_role (
    id TEXT NOT NULL,
    organization_uuid TEXT NOT NULL,
    created_at TIMESTAMPTZ,
    description TEXT,
    name TEXT,
    updated_at TIMESTAMPTZ,
    PRIMARY KEY (id, organization_uuid)
);

CREATE TABLE IF NOT EXISTS claude_ai.compliance_role_permission (
    _fivetran_id TEXT PRIMARY KEY,
    compliance_role_id TEXT,
    organization_uuid TEXT,
    action TEXT,
    resource_id TEXT,
    resource_type TEXT
);

CREATE TABLE IF NOT EXISTS claude_ai.groups (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ,
    description TEXT,
    name TEXT,
    source_type TEXT,
    updated_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS claude_ai.group_role (
    group_id TEXT NOT NULL,
    role_id TEXT NOT NULL,
    PRIMARY KEY (group_id, role_id)
);

CREATE TABLE IF NOT EXISTS claude_ai.group_member (
    group_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    created_at TIMESTAMPTZ,
    email TEXT,
    updated_at TIMESTAMPTZ,
    PRIMARY KEY (group_id, user_id)
);

CREATE TABLE IF NOT EXISTS claude_ai.project (
    id TEXT PRIMARY KEY,
    organization_uuid TEXT,
    user_id TEXT,
    created_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ,
    description TEXT,
    instruction TEXT,
    is_private TEXT,
    name TEXT,
    organization_id TEXT,
    updated_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS claude_ai.project_attachment (
    id TEXT NOT NULL,
    project_id TEXT NOT NULL,
    PRIMARY KEY (id, project_id)
);

CREATE TABLE IF NOT EXISTS claude_ai.project_document (
    id TEXT NOT NULL,
    project_attachment_id TEXT NOT NULL,
    project_id TEXT NOT NULL,
    user_id TEXT,
    content TEXT,
    PRIMARY KEY (id, project_attachment_id, project_id)
);

CREATE TABLE IF NOT EXISTS claude_ai.project_document_metadata (
    id TEXT NOT NULL,
    claude_project_id TEXT NOT NULL,
    project_attachment_id TEXT NOT NULL,
    user_id TEXT,
    created_at TIMESTAMPTZ,
    filename TEXT,
    md_5 TEXT,
    mime_type TEXT,
    size_bytes BIGINT,
    PRIMARY KEY (id, claude_project_id, project_attachment_id)
);

CREATE TABLE IF NOT EXISTS claude_ai.chat (
    id TEXT PRIMARY KEY,
    organization_uuid TEXT,
    project_id TEXT,
    user_id TEXT,
    created_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ,
    href TEXT,
    model TEXT,
    name TEXT,
    organization_id TEXT,
    updated_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS claude_ai.chat_message (
    id TEXT NOT NULL,
    chat_id TEXT NOT NULL,
    created_at TIMESTAMPTZ,
    role TEXT,
    updated_at TIMESTAMPTZ,
    PRIMARY KEY (id, chat_id)
);

CREATE TABLE IF NOT EXISTS claude_ai.chat_message_content (
    index BIGINT NOT NULL,
    chat_id TEXT NOT NULL,
    chat_message_id TEXT NOT NULL,
    text TEXT,
    type TEXT,
    PRIMARY KEY (index, chat_id, chat_message_id)
);

CREATE TABLE IF NOT EXISTS claude_ai.chat_message_file (
    id TEXT NOT NULL,
    chat_id TEXT NOT NULL,
    chat_message_id TEXT NOT NULL,
    PRIMARY KEY (id, chat_id, chat_message_id)
);

CREATE TABLE IF NOT EXISTS claude_ai.chat_message_generated_file (
    id TEXT NOT NULL,
    chat_id TEXT NOT NULL,
    chat_message_id TEXT NOT NULL,
    PRIMARY KEY (id, chat_id, chat_message_id)
);

CREATE TABLE IF NOT EXISTS claude_ai.chat_message_artifact (
    id TEXT NOT NULL,
    version_id TEXT NOT NULL,
    chat_id TEXT NOT NULL,
    chat_message_id TEXT NOT NULL,
    PRIMARY KEY (id, version_id, chat_id, chat_message_id)
);

CREATE TABLE IF NOT EXISTS claude_ai.chat_file_metadata (
    id TEXT NOT NULL,
    chat_message_file_id TEXT NOT NULL,
    created_at TIMESTAMPTZ,
    file_name TEXT,
    md_5 TEXT,
    message_id TEXT,
    mime_type TEXT,
    size_bytes BIGINT,
    PRIMARY KEY (id, chat_message_file_id)
);

CREATE TABLE IF NOT EXISTS claude_ai.chat_generated_file_metadata (
    id TEXT NOT NULL,
    chat_message_generated_file_id TEXT NOT NULL,
    claude_chat_id TEXT,
    created_at TIMESTAMPTZ,
    filename TEXT,
    md_5 TEXT,
    mime_type TEXT,
    size_bytes BIGINT,
    PRIMARY KEY (id, chat_message_generated_file_id)
);

CREATE TABLE IF NOT EXISTS claude_ai.artifact_metadata (
    id TEXT NOT NULL,
    version_id TEXT NOT NULL,
    chat_message_artifact_id TEXT NOT NULL,
    claude_chat_id TEXT,
    artifact_type TEXT,
    created_at TIMESTAMPTZ,
    md_5 TEXT,
    size_bytes BIGINT,
    title TEXT,
    PRIMARY KEY (id, version_id, chat_message_artifact_id)
);
