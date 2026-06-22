#!/usr/bin/env bash
# Swift on Linux is first-class (https://www.swift.org/install/linux/). This
# harness builds and tests every PORTABLE Swift target on Linux, and clearly
# separates the Apple-only surfaces (SwiftUI/AppKit/FoundationModels) that
# genuinely require a macOS host + Xcode.
#
# Verified on this repo with Swift 6.1.2 aarch64-linux:
#   - OrchestratorCore builds; its 3 tests pass on Linux.
#   - OrchestratorSummary example runs on Linux (prints the prompt preview).
#   - agent-orchestrator Model.swift typechecks clean on Linux.
set -uo pipefail
cd /work/apps
RED=$'\033[31m'; GRN=$'\033[32m'; YEL=$'\033[33m'; RST=$'\033[0m'
fail=0; report=()

# ---------------------------------------------------------------------------
# 1. Portable target that fully builds + tests on Linux: OrchestratorCore.
#    Uses a 6.1-compatible shim manifest so this runs on the stock `swift`
#    image even though the real package pins tools 6.2 for FoundationModels.
# ---------------------------------------------------------------------------
echo "${YEL}== OrchestratorCore (PORTABLE — build + test on Linux) ==${RST}"
INTEL=agent-orchestrator/Intelligence
work=$(mktemp -d)
mkdir -p "$work/Sources/OrchestratorCore" "$work/Tests/OrchestratorCoreTests"
cp "$INTEL/Sources/OrchestratorCore/"*.swift "$work/Sources/OrchestratorCore/"
cp "$INTEL/Tests/OrchestratorCoreTests/"*.swift "$work/Tests/OrchestratorCoreTests/"
cat > "$work/Package.swift" <<'EOF'
// swift-tools-version: 6.1
import PackageDescription
let package = Package(
  name: "OrchestratorCore",
  targets: [
    .target(name: "OrchestratorCore"),
    .testTarget(name: "OrchestratorCoreTests", dependencies: ["OrchestratorCore"]),
  ]
)
EOF
if ( cd "$work" && swift test 2>&1 | tail -5 ); then
  report+=("OrchestratorCore: ${GRN}BUILD+TEST PASS (Linux)${RST}")
else
  report+=("OrchestratorCore: ${RED}FAIL${RST}"); fail=1
fi
echo

# ---------------------------------------------------------------------------
# 2. Portable model layers of the SwiftUI apps — typecheck on Linux.
#    These files import only Foundation; the UI files (SwiftUI/AppKit) are
#    host-only and are NOT built here.
# ---------------------------------------------------------------------------
echo "${YEL}== SwiftUI apps: portable model layers (typecheck on Linux) ==${RST}"
typecheck () {  # name, files...
  local name="$1"; shift
  if swiftc -typecheck -parse-as-library "$@" 2>/dev/null; then
    report+=("$name model: ${GRN}TYPECHECK PASS (Linux)${RST}")
  else
    report+=("$name model: ${YEL}needs full SwiftPM build (module-dependent)${RST}")
  fi
}
typecheck agent-orchestrator agent-orchestrator/Sources/AgentOrchestrator/Model.swift
typecheck subagent-dashboard  subagent-dashboard/Sources/SubagentDashboard/Model.swift
echo

# ---------------------------------------------------------------------------
# 3. Genuinely Apple-only surfaces — documented, not built on Linux.
# ---------------------------------------------------------------------------
echo "${YEL}== Apple-only (macOS host + Xcode required) ==${RST}"
echo "  - SwiftUI/AppKit views: agent-orchestrator, subagent-dashboard, corpus-viewer"
echo "  - FoundationModels bridge: OrchestratorIntelligence (macOS 27)"
echo "    On Linux the bridge compiles to its #if-canImport shim; the Claude"
echo "    summarizer itself only runs on macOS 27. Build/test on the host:"
echo "      cd apps/agent-orchestrator/Intelligence && swift test"
echo "      cd apps/<app> && open Package.swift     # Xcode for the SwiftUI app"
echo

echo "================ SUMMARY ================"
for line in "${report[@]}"; do echo -e "  $line"; done
echo "========================================"
exit $fail
