#!/usr/bin/env bash
# Build + test every Python app under apps/ in dependency order.
# api-core is the shared lib (installed first, editable); the three services depend on it.
set -uo pipefail

cd /work/apps
RED=$'\033[31m'; GRN=$'\033[32m'; YEL=$'\033[33m'; RST=$'\033[0m'
fail=0
report=()

pip install -q --upgrade pip pytest >/dev/null

# api-core first — it's a file:// dependency for admin-api, compliance-api.
echo "${YEL}== installing api-core (shared lib) ==${RST}"
pip install -q -e ./api-core || { echo "${RED}api-core install FAILED${RST}"; fail=1; }

run_app () {
  local name="$1"; shift
  echo "${YEL}== $name ==${RST}"
  ( cd "$name" && pip install -q -e . ) \
    || { report+=("$name: ${RED}INSTALL FAIL${RST}"); fail=1; return; }
  if ( cd "$name" && python -m pytest tests -q ); then
    report+=("$name: ${GRN}PASS${RST}")
  else
    report+=("$name: ${RED}TEST FAIL${RST}"); fail=1
  fi
}

# api-core has its own tests too
if ( cd api-core && python -m pytest tests -q ); then
  report+=("api-core: ${GRN}PASS${RST}")
else
  report+=("api-core: ${RED}TEST FAIL${RST}"); fail=1
fi

run_app admin-api
run_app compliance-api
run_app fivetran-bridge

echo
echo "================ SUMMARY ================"
for line in "${report[@]}"; do echo -e "  $line"; done
echo "========================================"
exit $fail
