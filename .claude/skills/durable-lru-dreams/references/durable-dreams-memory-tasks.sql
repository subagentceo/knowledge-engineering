-- durable-dreams-memory-tasks.sql
-- pg_durable-style connected state machine: dreams, memory stores, tasks, outcomes.
-- Redis LRU cache layer sits above this (see lru_cache_contract below).
--
-- @cite platform.claude.com/docs/en/managed-agents/dreams
-- @cite platform.claude.com/docs/en/managed-agents/memory
-- @cite platform.claude.com/docs/en/managed-agents/define-outcomes
--
-- Tables:
--   durable_memory_store  — tracks API memory stores + redis LRU metadata
--   durable_dream         — tracks dream lifecycle (mirrors API dream resource)
--   durable_task          — generic task FSM (generalizes domain_task)
--   durable_outcome       — outcome evaluation results from graded sessions
--   durable_event_log     — append-only audit log across all four entities
--
-- Redis LRU contract (implemented in application layer, not SQL):
--   key pattern: memstore:{store_id}  → JSON blob of memories
--   TTL: configurable per store (default 3600s)
--   eviction: allkeys-lru
--   write-behind: redis SET on read from API; postgres UPDATE on write-through

-- ============================================================
-- MEMORY STORES
-- ============================================================
CREATE TABLE IF NOT EXISTS durable_memory_store (
    store_id        TEXT PRIMARY KEY,                -- memstore_01...
    name            TEXT,
    description     TEXT,
    access          TEXT NOT NULL DEFAULT 'read_write'
                    CHECK (access IN ('read_write', 'read_only')),
    memory_count    INT NOT NULL DEFAULT 0,
    memory_limit    INT NOT NULL DEFAULT 2000,       -- API hard limit
    status          TEXT NOT NULL DEFAULT 'active'
                    CHECK (status IN ('active', 'archived', 'deleted')),
    -- LRU cache metadata (redis layer)
    cached_at       TIMESTAMPTZ,                     -- last redis SET
    cache_ttl_secs  INT NOT NULL DEFAULT 3600,
    cache_hits      BIGINT NOT NULL DEFAULT 0,
    cache_misses    BIGINT NOT NULL DEFAULT 0,
    -- provenance
    source_dream_id TEXT,                            -- if this store was produced by a dream
    parent_store_id TEXT REFERENCES durable_memory_store(store_id),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- DREAMS
-- ============================================================
CREATE TABLE IF NOT EXISTS durable_dream (
    dream_id        TEXT PRIMARY KEY,                -- drm_01...
    status          TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'running', 'completed', 'failed', 'canceled')),
    model           TEXT NOT NULL DEFAULT 'claude-opus-4-8',
    instructions    TEXT,
    -- inputs
    input_store_id  TEXT NOT NULL REFERENCES durable_memory_store(store_id),
    session_ids     TEXT[] NOT NULL DEFAULT '{}',
    -- outputs
    output_store_id TEXT REFERENCES durable_memory_store(store_id),
    session_id      TEXT,                            -- the pipeline session
    -- metrics
    input_tokens    BIGINT NOT NULL DEFAULT 0,
    output_tokens   BIGINT NOT NULL DEFAULT 0,
    -- lifecycle
    error_type      TEXT,
    error_message   TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    ended_at        TIMESTAMPTZ,
    archived_at     TIMESTAMPTZ,
    -- link to the task that triggered this dream (if any)
    triggered_by_task TEXT
);

-- ============================================================
-- TASKS (generic durable FSM, pg_durable pattern)
-- ============================================================
CREATE TABLE IF NOT EXISTS durable_task (
    task_id         TEXT PRIMARY KEY,
    kind            TEXT NOT NULL,                    -- 'domain_activation', 'dream_consolidation', 'outcome_eval', ...
    state           TEXT NOT NULL DEFAULT 'PENDING'
                    CHECK (state IN ('PENDING', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELED', 'WAITING')),
    -- payload (task-specific data)
    payload         JSONB NOT NULL DEFAULT '{}',
    -- retry / lease
    attempts        INT NOT NULL DEFAULT 0,
    max_attempts    INT NOT NULL DEFAULT 5,
    locked_by       TEXT,
    locked_until    TIMESTAMPTZ,
    -- connections
    memory_store_id TEXT REFERENCES durable_memory_store(store_id),
    dream_id        TEXT REFERENCES durable_dream(dream_id),
    outcome_id      TEXT,
    -- lifecycle
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- OUTCOMES (graded session results)
-- ============================================================
CREATE TABLE IF NOT EXISTS durable_outcome (
    outcome_id      TEXT PRIMARY KEY,
    session_id      TEXT NOT NULL,
    rubric_file_id  TEXT,                            -- Files API file_id for the rubric
    rubric_text     TEXT,                            -- inline rubric (alternative to file)
    -- grader result
    result          TEXT CHECK (result IN ('pass', 'fail', 'interrupted', 'pending')),
    explanation     TEXT,
    iterations      INT NOT NULL DEFAULT 0,
    -- connections
    task_id         TEXT REFERENCES durable_task(task_id),
    memory_store_id TEXT REFERENCES durable_memory_store(store_id),
    -- lifecycle
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    evaluated_at    TIMESTAMPTZ
);

-- ============================================================
-- EVENT LOG (append-only audit across all entities)
-- ============================================================
CREATE TABLE IF NOT EXISTS durable_event_log (
    id              BIGSERIAL PRIMARY KEY,
    entity_type     TEXT NOT NULL CHECK (entity_type IN ('dream', 'memory_store', 'task', 'outcome')),
    entity_id       TEXT NOT NULL,
    event           TEXT NOT NULL,                   -- 'created', 'state_change', 'cached', 'evicted', ...
    from_state      TEXT,
    to_state        TEXT,
    note            TEXT,
    at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- FUNCTIONS (pg_durable pattern: idempotent + atomic)
-- ============================================================

-- Advance any durable entity's state + log
CREATE OR REPLACE FUNCTION durable_advance(
    p_entity_type TEXT, p_entity_id TEXT, p_to TEXT, p_note TEXT DEFAULT NULL
) RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE v_from TEXT; v_table TEXT;
BEGIN
    IF p_entity_type = 'dream' THEN v_table := 'durable_dream';
    ELSIF p_entity_type = 'task' THEN v_table := 'durable_task';
    ELSIF p_entity_type = 'memory_store' THEN v_table := 'durable_memory_store';
    ELSE RETURN NULL;
    END IF;

    EXECUTE format('SELECT CASE WHEN %I = ''durable_dream'' THEN status
                         WHEN %I = ''durable_task'' THEN state
                         WHEN %I = ''durable_memory_store'' THEN status END
                    FROM %I WHERE %s = $1 FOR UPDATE',
                   v_table, v_table, v_table, v_table,
                   CASE v_table WHEN 'durable_dream' THEN 'dream_id'
                                WHEN 'durable_task' THEN 'task_id'
                                WHEN 'durable_memory_store' THEN 'store_id' END)
    INTO v_from USING p_entity_id;

    IF v_from IS NULL OR v_from = p_to THEN RETURN v_from; END IF;

    EXECUTE format('UPDATE %I SET %s = $1, updated_at = now() WHERE %s = $2',
                   v_table,
                   CASE v_table WHEN 'durable_dream' THEN 'status'
                                WHEN 'durable_task' THEN 'state'
                                WHEN 'durable_memory_store' THEN 'status' END,
                   CASE v_table WHEN 'durable_dream' THEN 'dream_id'
                                WHEN 'durable_task' THEN 'task_id'
                                WHEN 'durable_memory_store' THEN 'store_id' END)
    USING p_to, p_entity_id;

    INSERT INTO durable_event_log(entity_type, entity_id, event, from_state, to_state, note)
    VALUES (p_entity_type, p_entity_id, 'state_change', v_from, p_to, p_note);

    RETURN p_to;
END $$;

-- Claim a task (atomic lease, FOR UPDATE SKIP LOCKED)
CREATE OR REPLACE FUNCTION durable_task_claim(p_runner TEXT, p_kind TEXT DEFAULT NULL, p_lease INT DEFAULT 120)
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE v_id TEXT;
BEGIN
    SELECT task_id INTO v_id FROM durable_task
     WHERE state IN ('PENDING', 'FAILED')
       AND (p_kind IS NULL OR kind = p_kind)
       AND (locked_until IS NULL OR locked_until < now())
       AND attempts < max_attempts
     ORDER BY created_at
     FOR UPDATE SKIP LOCKED
     LIMIT 1;
    IF v_id IS NULL THEN RETURN NULL; END IF;
    UPDATE durable_task SET locked_by = p_runner,
        locked_until = now() + (p_lease || ' seconds')::interval,
        attempts = attempts + 1, updated_at = now()
     WHERE task_id = v_id;
    RETURN v_id;
END $$;

-- Record a cache event (redis LRU tracking in postgres)
CREATE OR REPLACE FUNCTION memory_store_cache_event(p_store_id TEXT, p_event TEXT)
RETURNS VOID LANGUAGE plpgsql AS $$
BEGIN
    IF p_event = 'hit' THEN
        UPDATE durable_memory_store SET cache_hits = cache_hits + 1 WHERE store_id = p_store_id;
    ELSIF p_event = 'miss' THEN
        UPDATE durable_memory_store SET cache_misses = cache_misses + 1 WHERE store_id = p_store_id;
    ELSIF p_event = 'set' THEN
        UPDATE durable_memory_store SET cached_at = now() WHERE store_id = p_store_id;
    ELSIF p_event = 'evict' THEN
        UPDATE durable_memory_store SET cached_at = NULL WHERE store_id = p_store_id;
    END IF;
    INSERT INTO durable_event_log(entity_type, entity_id, event, note)
    VALUES ('memory_store', p_store_id, 'cache_' || p_event, NULL);
END $$;

-- ============================================================
-- VIEWS
-- ============================================================
CREATE OR REPLACE VIEW dream_pipeline_status AS
SELECT d.dream_id, d.status, d.model,
       d.input_store_id, ins.memory_count AS input_memories,
       d.output_store_id, outs.memory_count AS output_memories,
       d.input_tokens + d.output_tokens AS total_tokens,
       d.created_at, d.ended_at,
       d.ended_at - d.created_at AS duration
FROM durable_dream d
LEFT JOIN durable_memory_store ins ON ins.store_id = d.input_store_id
LEFT JOIN durable_memory_store outs ON outs.store_id = d.output_store_id;

CREATE OR REPLACE VIEW memory_store_lru_stats AS
SELECT store_id, name, memory_count, memory_limit,
       cache_hits, cache_misses,
       CASE WHEN cache_hits + cache_misses > 0
            THEN round(cache_hits::numeric / (cache_hits + cache_misses), 3)
            ELSE 0 END AS hit_rate,
       cached_at, cache_ttl_secs,
       CASE WHEN cached_at IS NOT NULL
            AND cached_at + (cache_ttl_secs || ' seconds')::interval > now()
            THEN 'hot' ELSE 'cold' END AS cache_status
FROM durable_memory_store
WHERE status = 'active';

CREATE OR REPLACE VIEW task_progress AS
SELECT kind, state, count(*) AS n FROM durable_task GROUP BY kind, state ORDER BY kind, n DESC;

-- ============================================================
-- REDIS LRU CONTRACT (application-layer, not SQL)
-- ============================================================
-- Key pattern:    memstore:{store_id}
-- Value:          JSON array of {path, content, version} objects
-- TTL:            durable_memory_store.cache_ttl_secs (default 3600)
-- Eviction:       maxmemory-policy = allkeys-lru
-- Write-through:  on memory write → SET redis key + UPDATE postgres row
-- Read-through:   on cache miss → GET from API → SET redis → postgres cache_event('set')
-- Eviction hook:  redis keyspace notification → postgres cache_event('evict')
--
-- Example (Python):
--   redis.setex(f"memstore:{store_id}", ttl, json.dumps(memories))
--   cursor.execute("SELECT memory_store_cache_event(%s, 'set')", [store_id])
