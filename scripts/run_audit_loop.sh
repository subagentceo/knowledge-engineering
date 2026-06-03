#!/usr/bin/env bash
# Ralf-loop: retry container audit until all tools present (or max iterations exceeded).
# @cite seeds/posture/session-start.xml
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MAX=${AUDIT_MAX_ITERATIONS:-5}
i=0

until python3 "$SCRIPT_DIR/audit_container.py"; do
    i=$((i + 1))
    if [ "$i" -ge "$MAX" ]; then
        echo "audit_loop: failed after $MAX iterations" >&2
        exit 1
    fi
    echo "audit_loop: retry $i/$MAX" >&2
done

echo "audit_loop: all tools present" >&2
