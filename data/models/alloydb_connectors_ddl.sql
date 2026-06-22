-- AlloyDB / PostgreSQL 16 — desktop connector warehouse tables.
-- Contracts: data/models/alloydb/{dim_desktop,dim_tools,fact_connectors}.yaml
-- (semver'd; validated by src/lib/table-semantics.ts).
-- @cite data/models/alloydb_cache_ddl.sql (house DW conventions)

CREATE SCHEMA IF NOT EXISTS dw;

-- ── dim_desktop — SCD Type 2 (dim_desktop.yaml v0.1.0) ───────────────────

CREATE TABLE IF NOT EXISTS dw.dim_desktop (
    surrogate_key       BIGINT      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    slug                TEXT        NOT NULL,
    row_effective_from  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    row_effective_to    TIMESTAMPTZ NOT NULL DEFAULT 'infinity',
    is_current          BOOLEAN     NOT NULL DEFAULT TRUE,
    display_name        TEXT        NOT NULL,
    publisher           TEXT        NOT NULL
                            CHECK (publisher IN (
                                'Anthropic','Anthropic & Partner',
                                'Community','Vendor'
                            )),
    os_target           TEXT        NOT NULL
                            CHECK (os_target IN (
                                'macos','windows','android','cross-platform'
                            )),
    access_model        TEXT        NOT NULL
                            CHECK (access_model IN (
                                'applescript','native-process','browser-extension',
                                'filesystem','adb','stdin-mcp'
                            )),
    mcp_namespace       TEXT,
    mcp_namespace_uuid  TEXT,
    semver              TEXT,
    tool_count_readonly SMALLINT    NOT NULL DEFAULT 0,
    tool_count_write    SMALLINT    NOT NULL DEFAULT 0,
    requires_approval   BOOLEAN     NOT NULL DEFAULT TRUE,
    marketplace_url     TEXT,
    loaded_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (slug, row_effective_from)
);

CREATE INDEX IF NOT EXISTS idx_dim_desktop_current
    ON dw.dim_desktop (slug) WHERE is_current;
CREATE INDEX IF NOT EXISTS idx_dim_desktop_os
    ON dw.dim_desktop (os_target, is_current);

INSERT INTO dw.dim_desktop
    (slug, display_name, publisher, os_target, access_model,
     mcp_namespace, mcp_namespace_uuid,
     tool_count_readonly, tool_count_write, requires_approval, marketplace_url)
VALUES
    ('macos',
     'Macos', 'Anthropic', 'macos', 'native-process',
     'mcp__Macos__', NULL, 3, 7, TRUE,
     'https://claude.ai/marketplace/macos'),
    ('filesystem',
     'Filesystem', 'Anthropic', 'cross-platform', 'filesystem',
     NULL, '5f7bfa4d-99d7-4188-a5cc-313c7b326267', 5, 2, TRUE,
     'https://claude.ai/marketplace/filesystem'),
    ('word-by-anthropic',
     'Word (By Anthropic)', 'Anthropic', 'macos', 'native-process',
     'mcp__Word__By_Anthropic___', NULL, 7, 2, TRUE,
     'https://claude.ai/marketplace/word-by-anthropic'),
    ('control-chrome',
     'Control Chrome', 'Community', 'cross-platform', 'browser-extension',
     'mcp__Control_Chrome__', NULL, 3, 4, TRUE,
     'https://claude.ai/marketplace/control-chrome')
ON CONFLICT (slug, row_effective_from) DO NOTHING;

-- ── dim_tools — SCD Type 1 (dim_tools.yaml v0.1.0) ───────────────────────

CREATE TABLE IF NOT EXISTS dw.dim_tools (
    surrogate_key           BIGINT      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    connector_slug          TEXT        NOT NULL,
    tool_name               TEXT        NOT NULL,
    permission_tier         TEXT        NOT NULL
                                CHECK (permission_tier IN ('readonly','write','system')),
    description             TEXT,
    requires_user_approval  BOOLEAN     NOT NULL DEFAULT TRUE,
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (connector_slug, tool_name)
);

CREATE INDEX IF NOT EXISTS idx_dim_tools_connector
    ON dw.dim_tools (connector_slug);
CREATE INDEX IF NOT EXISTS idx_dim_tools_tier
    ON dw.dim_tools (permission_tier);

INSERT INTO dw.dim_tools
    (connector_slug, tool_name, permission_tier, description, requires_user_approval)
VALUES
    -- Macos
    ('macos','Snapshot', 'readonly','Take a screenshot of the macOS desktop.',FALSE),
    ('macos','Wait',     'readonly','Wait for a specified duration.',FALSE),
    ('macos','Scrape',   'readonly','Scrape visible text from a macOS window.',FALSE),
    ('macos','App',      'write',   'Open or switch to a macOS application.',TRUE),
    ('macos','Shell',    'system',  'Run an arbitrary shell command on macOS.',TRUE),
    ('macos','Click',    'write',   'Click at screen coordinates.',TRUE),
    ('macos','Type',     'write',   'Type text into the focused element.',TRUE),
    ('macos','Scroll',   'write',   'Scroll at screen coordinates.',TRUE),
    ('macos','Move',     'write',   'Move mouse cursor to coordinates.',FALSE),
    ('macos','Shortcut', 'write',   'Trigger a macOS keyboard shortcut.',TRUE),
    -- Filesystem
    ('filesystem','list_recent_files',    'readonly','List recently accessed files.',FALSE),
    ('filesystem','read_file_content',    'readonly','Read the text content of a file.',FALSE),
    ('filesystem','search_files',         'readonly','Search for files by name or content.',FALSE),
    ('filesystem','get_file_metadata',    'readonly','Retrieve metadata (size, dates) for a file.',FALSE),
    ('filesystem','get_file_permissions', 'readonly','Get POSIX permissions for a file.',FALSE),
    ('filesystem','create_file',          'write',   'Create a new file with given content.',TRUE),
    ('filesystem','copy_file',            'write',   'Copy a file to a new path.',TRUE),
    ('filesystem','download_file_content','write',   'Download remote content to a local file.',TRUE),
    -- Word (By Anthropic)
    ('word-by-anthropic','open_document',    'readonly','Open a Word document from disk.',FALSE),
    ('word-by-anthropic','get_document_text','readonly','Extract all text content from the open document.',FALSE),
    ('word-by-anthropic','create_document',  'write',  'Create a new blank Word document.',TRUE),
    ('word-by-anthropic','insert_text',      'write',  'Insert text at the current cursor position.',TRUE),
    ('word-by-anthropic','replace_text',     'write',  'Find and replace text in the document.',TRUE),
    ('word-by-anthropic','format_text',      'write',  'Apply formatting (bold, italic, heading) to a range.',TRUE),
    ('word-by-anthropic','save_document',    'write',  'Save the current document to disk.',TRUE),
    ('word-by-anthropic','close_document',   'write',  'Close the document (prompts to save if unsaved).',TRUE),
    ('word-by-anthropic','export_pdf',       'write',  'Export the document as a PDF file.',TRUE),
    -- Control Chrome
    ('control-chrome','list_tabs',       'readonly','List all open Chrome tabs.',FALSE),
    ('control-chrome','get_current_tab', 'readonly','Get the currently active tab.',FALSE),
    ('control-chrome','get_page_content','readonly','Get HTML content of the active tab.',FALSE),
    ('control-chrome','open_url',        'write',   'Open a URL in a new or existing tab.',TRUE),
    ('control-chrome','close_tab',       'write',   'Close a specific tab by ID.',TRUE),
    ('control-chrome','reload_tab',      'write',   'Reload the specified tab.',TRUE),
    ('control-chrome','switch_to_tab',   'write',   'Switch focus to a tab by ID.',FALSE)
ON CONFLICT (connector_slug, tool_name) DO NOTHING;

-- ── fact_connectors — append-only snapshot (fact_connectors.yaml v0.1.0) ──

CREATE TABLE IF NOT EXISTS dw.fact_connectors (
    surrogate_key       BIGINT      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    date_key            INTEGER     NOT NULL REFERENCES dw.dim_date(date_key),
    connector_sk        BIGINT      NOT NULL REFERENCES dw.dim_desktop(surrogate_key),
    session_id          TEXT        NOT NULL,
    is_installed        BOOLEAN     NOT NULL DEFAULT FALSE,
    is_enabled          BOOLEAN     NOT NULL DEFAULT FALSE,
    tool_calls_readonly INTEGER     NOT NULL DEFAULT 0,
    tool_calls_write    INTEGER     NOT NULL DEFAULT 0,
    approval_prompts    INTEGER     NOT NULL DEFAULT 0,
    approval_granted    INTEGER     NOT NULL DEFAULT 0,
    approval_denied     INTEGER     NOT NULL DEFAULT 0,
    tool_errors         INTEGER     NOT NULL DEFAULT 0,
    approval_rate       NUMERIC(5,4)
                            GENERATED ALWAYS AS (
                                approval_granted::numeric / NULLIF(approval_prompts, 0)
                            ) STORED,
    snapshot_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (date_key, connector_sk, session_id)
);

CREATE INDEX IF NOT EXISTS idx_fact_connectors_date
    ON dw.fact_connectors (date_key);
CREATE INDEX IF NOT EXISTS idx_fact_connectors_connector
    ON dw.fact_connectors (connector_sk);
CREATE INDEX IF NOT EXISTS idx_fact_connectors_session
    ON dw.fact_connectors (session_id);

-- ── dim_agent_templates — SCD Type 1 (dim_agent_templates.yaml v0.1.0) ──────
-- @cite https://github.com/BuilderIO/agent-native
-- @cite https://www.agent-native.com/templates/analytics
-- @cite https://www.agent-native.com/templates/plan

CREATE TABLE IF NOT EXISTS dw.dim_agent_templates (
    surrogate_key   BIGINT      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    slug            TEXT        NOT NULL UNIQUE,
    display_name    TEXT        NOT NULL,
    tagline         TEXT,
    template_url    TEXT,
    live_demo_url   TEXT,
    install_cmd     TEXT,
    domain_fit      TEXT        NOT NULL
                        CHECK (domain_fit IN (
                            'analytics','plan','content','communication',
                            'productivity','knowledge','dispatch','design'
                        )),
    pm_relevance    TEXT        NOT NULL DEFAULT 'medium'
                        CHECK (pm_relevance IN ('high','medium','low')),
    ke_fit_score    SMALLINT    NOT NULL DEFAULT 3
                        CHECK (ke_fit_score BETWEEN 1 AND 5),
    install_status  TEXT        NOT NULL DEFAULT 'consider'
                        CHECK (install_status IN (
                            'installed','recommended','consider','skip'
                        )),
    connector_deps  TEXT[],
    source_repo     TEXT,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_dim_agent_templates_domain
    ON dw.dim_agent_templates (domain_fit);
CREATE INDEX IF NOT EXISTS idx_dim_agent_templates_status
    ON dw.dim_agent_templates (install_status);

INSERT INTO dw.dim_agent_templates
    (slug, display_name, tagline, template_url, live_demo_url, install_cmd,
     domain_fit, pm_relevance, ke_fit_score, install_status,
     connector_deps, source_repo)
VALUES
    ('analytics',
     'Agent-Native Analytics',
     'Open-source Amplitude/Mixpanel/Looker alternative — AI writes the SQL.',
     'https://www.agent-native.com/templates/analytics',
     'https://analytics.agent-native.com',
     'npx @agent-native/core@latest create my-analytics-app --template analytics',
     'analytics', 'high', 5, 'recommended',
     ARRAY['jira','github','sentry','stripe'],
     'https://github.com/BuilderIO/agent-native/tree/main/templates/analytics'),

    ('plan',
     'Agent-Native Plans',
     'Visual plan surface for Codex, Claude Code & coding agents.',
     'https://www.agent-native.com/templates/plan',
     'https://plan.agent-native.com',
     'npx @agent-native/core@latest skills add visual-plan',
     'plan', 'high', 5, 'recommended',
     ARRAY[]::TEXT[],
     'https://github.com/BuilderIO/agent-native/tree/main/templates/plan'),

    ('brain',
     'Agent-Native Brain',
     'Company chat over cited memory from Slack, GitHub, Granola, Clips.',
     'https://www.agent-native.com/templates/brain',
     'https://brain.agent-native.com',
     'npx @agent-native/core@latest create my-brain-app --template brain',
     'knowledge', 'high', 5, 'recommended',
     ARRAY['slack'],
     'https://github.com/BuilderIO/agent-native/tree/main/templates/brain'),

    ('calendar',
     'Agent-Native Calendar',
     'AI-native calendar + scheduling layer.',
     'https://www.agent-native.com/templates/calendar',
     NULL,
     'npx @agent-native/core@latest create my-calendar-app --template calendar',
     'productivity', 'medium', 3, 'consider',
     ARRAY[]::TEXT[],
     'https://github.com/BuilderIO/agent-native/tree/main/templates/calendar'),

    ('content',
     'Agent-Native Content',
     'Content planning, drafting, and publishing workflow.',
     'https://www.agent-native.com/templates/content',
     NULL,
     'npx @agent-native/core@latest create my-content-app --template content',
     'content', 'medium', 3, 'consider',
     ARRAY[]::TEXT[],
     'https://github.com/BuilderIO/agent-native/tree/main/templates/content'),

    ('slides',
     'Agent-Native Slides',
     'Agent-generated slide decks from structured content.',
     'https://www.agent-native.com/templates/slides',
     NULL,
     'npx @agent-native/core@latest create my-slides-app --template slides',
     'communication', 'medium', 3, 'consider',
     ARRAY[]::TEXT[],
     'https://github.com/BuilderIO/agent-native/tree/main/templates/slides'),

    ('mail',
     'Agent-Native Mail',
     'AI-native email management and triage.',
     'https://www.agent-native.com/templates/mail',
     NULL,
     'npx @agent-native/core@latest create my-mail-app --template mail',
     'communication', 'low', 2, 'skip',
     ARRAY[]::TEXT[],
     'https://github.com/BuilderIO/agent-native/tree/main/templates/mail'),

    ('forms',
     'Agent-Native Forms',
     'Dynamic AI-powered form builder.',
     'https://www.agent-native.com/templates/forms',
     NULL,
     'npx @agent-native/core@latest create my-forms-app --template forms',
     'productivity', 'low', 2, 'skip',
     ARRAY[]::TEXT[],
     'https://github.com/BuilderIO/agent-native/tree/main/templates/forms'),

    ('clips',
     'Agent-Native Clips',
     'Video clip management and AI summarization.',
     'https://www.agent-native.com/templates/clips',
     NULL,
     'npx @agent-native/core@latest create my-clips-app --template clips',
     'knowledge', 'medium', 3, 'consider',
     ARRAY[]::TEXT[],
     'https://github.com/BuilderIO/agent-native/tree/main/templates/clips'),

    ('dispatch',
     'Agent-Native Dispatch',
     'Agent task dispatch and routing layer.',
     'https://www.agent-native.com/templates/dispatch',
     NULL,
     'npx @agent-native/core@latest create my-dispatch-app --template dispatch',
     'dispatch', 'high', 4, 'recommended',
     ARRAY[]::TEXT[],
     'https://github.com/BuilderIO/agent-native/tree/main/templates/dispatch'),

    ('design',
     'Agent-Native Design',
     'AI-native design tool for components and layout.',
     'https://www.agent-native.com/templates/design',
     NULL,
     'npx @agent-native/core@latest create my-design-app --template design',
     'design', 'medium', 3, 'consider',
     ARRAY[]::TEXT[],
     'https://github.com/BuilderIO/agent-native/tree/main/templates/design'),

    ('assets',
     'Agent-Native Assets',
     'Asset library and management for agent-native apps.',
     'https://www.agent-native.com/templates/assets',
     NULL,
     'npx @agent-native/core@latest create my-assets-app --template assets',
     'design', 'low', 2, 'consider',
     ARRAY[]::TEXT[],
     'https://github.com/BuilderIO/agent-native/tree/main/templates/assets')
ON CONFLICT (slug) DO NOTHING;
