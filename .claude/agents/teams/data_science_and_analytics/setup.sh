#!/usr/bin/env bash
# =============================================================================
# setup.sh - Data Science & Analytics team bootstrap
#
# Outcomes:
#   O1 - Leaves PostgreSQL 16 and Redis 7 healthy on the local host.
#   O3 - Prints the session transcript URL on every exit (success or failure).
#
# Owner: teams/data_science_and_analytics
#
# Behaviour:
#   - Starts postgresql and redis-server via SysV init scripts.
#   - Polls each service for readiness (pg_isready, redis-cli ping == PONG).
#   - Exits 0 on success, non-zero on any failure.
#   - On every exit, derives the transcript URL from
#     CLAUDE_CODE_REMOTE_SESSION_ID by replacing the leading "cse_" prefix
#     with "session_", and prints it.
#
# Strict-mode bash, shellcheck-clean idioms only. No package installs.
# =============================================================================

set -euo pipefail
IFS=$'\n\t'

# ---- Constants --------------------------------------------------------------
readonly PG_SERVICE="postgresql"
readonly REDIS_SERVICE="redis-server"
readonly READINESS_TIMEOUT_SEC=30
readonly READINESS_INTERVAL_SEC=1

# ---- Logging ----------------------------------------------------------------
log() {
    local level="$1"
    shift
    printf '[%s] [%s] %s\n' \
        "$(date -u +'%Y-%m-%dT%H:%M:%SZ')" \
        "${level}" \
        "$*"
}

log_info()  { log "INFO"  "$@"; }
log_warn()  { log "WARN"  "$@" >&2; }
log_error() { log "ERROR" "$@" >&2; }

# ---- Transcript URL (Outcome O3) -------------------------------------------
print_transcript_url() {
    local session_id="${CLAUDE_CODE_REMOTE_SESSION_ID:-}"
    if [[ -z "${session_id}" ]]; then
        log_warn "CLAUDE_CODE_REMOTE_SESSION_ID is unset; skipping transcript URL."
        return 0
    fi
    local transcript="https://claude.ai/code/${session_id/#cse_/session_}"
    log_info "Transcript: ${transcript}"
}

# Always print transcript URL on exit, regardless of success/failure.
# Capture $? as the very first statement so the original rc is preserved.
on_exit() {
    local rc=$?
    print_transcript_url
    exit "${rc}"
}
trap on_exit EXIT

# ---- Service helpers --------------------------------------------------------
start_service() {
    local svc="$1"
    log_info "Starting service: ${svc}"
    if ! service "${svc}" start >/dev/null 2>&1; then
        log_error "Failed to invoke 'service ${svc} start'."
        return 1
    fi
}

# Generic poll loop.
# Usage: wait_for_ready <human-name> <timeout-sec> <interval-sec> <cmd...>
wait_for_ready() {
    local name="$1"
    local timeout="$2"
    local interval="$3"
    shift 3
    local elapsed=0

    while (( elapsed < timeout )); do
        if "$@" >/dev/null 2>&1; then
            log_info "${name} is ready (after ${elapsed}s)."
            return 0
        fi
        sleep "${interval}"
        elapsed=$(( elapsed + interval ))
    done

    log_error "${name} did not become ready within ${timeout}s."
    return 1
}

# ---- Health checks ----------------------------------------------------------
check_postgres_ready() {
    pg_isready -q
}

check_redis_ready() {
    local reply
    reply="$(redis-cli ping 2>/dev/null || true)"
    [[ "${reply}" == "PONG" ]]
}

# ---- Main -------------------------------------------------------------------
main() {
    log_info "Bootstrapping data_science_and_analytics services (Outcome O1)."

    start_service "${PG_SERVICE}"
    start_service "${REDIS_SERVICE}"

    wait_for_ready "PostgreSQL" \
        "${READINESS_TIMEOUT_SEC}" "${READINESS_INTERVAL_SEC}" \
        check_postgres_ready

    wait_for_ready "Redis" \
        "${READINESS_TIMEOUT_SEC}" "${READINESS_INTERVAL_SEC}" \
        check_redis_ready

    log_info "All services healthy: postgresql=ready, redis=PONG."
}

main "$@"
