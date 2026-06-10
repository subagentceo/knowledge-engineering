/**
 * session-2026-06-05.ts — loop tick outcomes for the 2026-06-05 session.
 *
 * Tick T1 (tick id: 2026-06-05-T1).
 *   - 2026-06-05-O1: PR #370 rescue — auto-merge enabled (all checks green, was blocked)
 *   - 2026-06-05-O2: t12-1 — OMA vendor docs (README + architecture + api-reference + governance-schema)
 *   - 2026-06-05-O3: t10-2 + t11-5 — domain-product-map + agent-surface-gap architecture docs
 *   - 2026-06-05-O4: Heartbeat tick 2026-06-05-T1
 *
 * Tick T2 (tick id: 2026-06-05-T2).
 *   - 2026-06-05-O5: t14-5 — @modelcontextprotocol/hono MCP server scaffold (src/mcp-hono/server.ts)
 *   - 2026-06-05-O6: t13-4 — 300+ connectors catalog (vendor/connectors/catalog.json + README)
 *   - 2026-06-05-O7: Heartbeat tick 2026-06-05-T2
 *
 * Tick T3 (tick id: 2026-06-05-T3).
 *   - 2026-06-05-O8: t9-2 — WSL2 model selection for RTX 2080 Ti 11GB VRAM (docs/research/wsl2-model-selection.md)
 *   - 2026-06-05-O9: t11-1 — skills.sh catalog mirror (vendor/skills-sh/anthropics/sources.json + README, 25 skills)
 *   - 2026-06-05-O10: Heartbeat tick 2026-06-05-T3
 *
 * Tick T4 (tick id: 2026-06-05-T4).
 *   - 2026-06-05-O11: t13-1 — infra/wsl2/: WSL2 Ubuntu-24.04 persistent container spec + Dockerfile
 *   - 2026-06-05-O12: t8-4 — docs/research/worker-errors-2026-06-03.md: 4 CF workers throwing exceptions (OAuth violation)
 *   - 2026-06-05-O13: t7-7 — docs/cloudflare-ai-free-tier.md: CF Workers AI free tier analysis
 *   - 2026-06-05-O14: Heartbeat tick 2026-06-05-T4
 *
 * Tick T5 (tick id: 2026-06-05-T5).
 *   - 2026-06-05-O15: fix(deps) — hono 4.12.18 → 4.12.23 CVE fix (PR #409, replaces DIRTY #398)
 *   - 2026-06-05-O16: t9-7 — scripts/bootstrap/: per-surface Claude agent bootstrap scripts (PR #410)
 *   - 2026-06-05-O17: t14-3 — vendor/anthropic-ai-npm/dxt.md: @anthropic-ai/dxt Desktop Extension reference
 *   - 2026-06-05-O18: Heartbeat tick 2026-06-05-T5
 *
 * Tick T6 (tick id: 2026-06-05-T6).
 *   - 2026-06-05-O19: t3-1+t3-2+t4-1 — vendor/swift/: swiftly installer + Docker Hub swift + linux docker install docs
 *   - 2026-06-05-O20: t14-2 — infra/claude-code-subprocessor/: platform matrix + docker-entrypoint (6 platforms, OAuth-only)
 *   - 2026-06-05-O21: Heartbeat tick 2026-06-05-T6
 *
 * Tick T7 (tick id: 2026-06-05-T7).
 *   - 2026-06-05-O22: t4-2+t4-3 — vendor/swift/sourcekit-lsp/: README + editor integration docs
 *   - 2026-06-05-O23: t13-2 — infra/tailscale/: Tailscale home mesh tailnet policy + README
 *   - 2026-06-05-O24: t2-1 — scripts/audit_container.py: swiftly + swift binary checks added
 *   - 2026-06-05-O25: Heartbeat tick 2026-06-05-T7
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite seeds/citations/define-outcomes.md
 */

import { z } from "zod";

export const SessionOutcomeSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.enum(["achieved", "pending", "failed"]),
  category: z.enum(["telemetry", "ci", "swift", "prompt", "vendor", "data", "sdk", "infra"]),
  evidence: z.array(z.string()),
  cite: z.array(z.string()),
  cost_session_id: z.string().optional(),
  commit_sha: z.string().optional(),
});

export type SessionOutcome = z.infer<typeof SessionOutcomeSchema>;

export const outcomes: SessionOutcome[] = [
  {
    id: "2026-06-05-O5",
    title: "t14-5 — src/mcp-hono/server.ts: Hono HTTP transport for MCP bridge (coworker-feature-dev)",
    status: "achieved",
    category: "sdk",
    evidence: [
      "src/mcp-hono/server.ts",
      "src/mcp-hono/server.test.ts",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
    commit_sha: "29c67f3",
  },
  {
    id: "2026-06-05-O6",
    title: "t13-4 — 300+ connectors catalog: vendor/connectors/catalog.json + README (329 connectors, 25 categories)",
    status: "achieved",
    category: "vendor",
    evidence: [
      "vendor/connectors/catalog.json",
      "vendor/connectors/README.md",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
    commit_sha: "088fdb4",
  },
  {
    id: "2026-06-05-O7",
    title: "Heartbeat tick 2026-06-05-T2 — PRs #397/#370 rescued, t13-4 achieved (PR #400), t14-5 in_progress, t12-2 blocked",
    status: "achieved",
    category: "infra",
    evidence: [
      "seeds/memory/heartbeat/last-tick.md",
      ".claude/mailbox/agent_orchestrator.jsonl",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/prompts/loop-orchestrator.md",
    ],
  },

  {
    id: "2026-06-05-O1",
    title: "PR #370 rescue — enabled auto-merge (all checks green, was blocked for >10h)",
    status: "achieved",
    category: "ci",
    evidence: [
      "seeds/memory/heartbeat/last-tick.md",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
  },
  {
    id: "2026-06-05-O2",
    title: "t12-1 — OMA vendor docs: README + architecture + api-reference + governance-schema",
    status: "achieved",
    category: "vendor",
    evidence: [
      "vendor/open-managed-agents/README.md",
      "vendor/open-managed-agents/architecture.md",
      "vendor/open-managed-agents/api-reference.md",
      "vendor/open-managed-agents/governance-schema.md",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
    commit_sha: "91d2f0a",
  },
  {
    id: "2026-06-05-O3",
    title: "t10-2 + t11-5 — docs/architecture: domain-product-map + agent-surface-gap",
    status: "achieved",
    category: "infra",
    evidence: [
      "docs/architecture/domain-product-map.md",
      "docs/architecture/agent-surface-gap.md",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
    commit_sha: "f074114",
  },
  {
    id: "2026-06-05-O4",
    title: "Heartbeat tick 2026-06-05-T1 — PR #370 rescued, O2+O3 dispatched, outcomes registered",
    status: "achieved",
    category: "infra",
    evidence: [
      "seeds/memory/heartbeat/last-tick.md",
      ".claude/mailbox/agent_orchestrator.jsonl",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/prompts/loop-orchestrator.md",
    ],
  },
  {
    id: "2026-06-05-O8",
    title: "t9-2 — docs/research/wsl2-model-selection.md: optimal LLMs for RTX 2080 Ti 11GB VRAM in WSL2",
    status: "achieved",
    category: "data",
    evidence: [
      "docs/research/wsl2-model-selection.md",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
    commit_sha: "7ee6b3a",
  },
  {
    id: "2026-06-05-O9",
    title: "t11-1 — vendor/skills-sh/: skills.sh catalog mirror (25 Anthropic skills, ~2M installs)",
    status: "achieved",
    category: "vendor",
    evidence: [
      "vendor/skills-sh/anthropics/sources.json",
      "vendor/skills-sh/README.md",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
    commit_sha: "ea3010e",
  },
  {
    id: "2026-06-05-O10",
    title: "Heartbeat tick 2026-06-05-T3 — PRs #402/#403 merged, #370/#404 in CI, O8+O9 achieved",
    status: "achieved",
    category: "infra",
    evidence: [
      "seeds/memory/heartbeat/last-tick.md",
      ".claude/mailbox/agent_orchestrator.jsonl",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/prompts/loop-orchestrator.md",
    ],
  },
  {
    id: "2026-06-05-O11",
    title: "t13-1 — infra/wsl2/: WSL2 Ubuntu-24.04 persistent container spec + Dockerfile (CUDA 12.4.1, Node 20, Swift 6.1, OAuth-only)",
    status: "achieved",
    category: "infra",
    evidence: [
      "infra/wsl2/Dockerfile",
      "infra/wsl2/setup.sh",
      "infra/wsl2/README.md",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
    commit_sha: "862bff8",
  },
  {
    id: "2026-06-05-O12",
    title: "t8-4 — docs/research/worker-errors-2026-06-03.md: 4 CF workers throwing exceptions (ANTHROPIC_API_KEY binding violates OAuth posture)",
    status: "achieved",
    category: "data",
    evidence: [
      "docs/research/worker-errors-2026-06-03.md",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
    commit_sha: "49cb290",
  },
  {
    id: "2026-06-05-O13",
    title: "t7-7 — docs/cloudflare-ai-free-tier.md: CF Workers AI free tier analysis (10K neurons/day, bge-base-en-v1.5 strategy)",
    status: "achieved",
    category: "data",
    evidence: [
      "docs/cloudflare-ai-free-tier.md",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
    commit_sha: "49cb290",
  },
  {
    id: "2026-06-05-O14",
    title: "Heartbeat tick 2026-06-05-T4 — PRs #406/#407 merged (WSL2+research), convention fixes applied, O11-O13 achieved",
    status: "achieved",
    category: "infra",
    evidence: [
      "seeds/memory/heartbeat/last-tick.md",
      ".claude/mailbox/agent_orchestrator.jsonl",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/prompts/loop-orchestrator.md",
    ],
  },
  {
    id: "2026-06-05-O15",
    title: "fix(deps) — hono 4.12.18 → 4.12.23: 4 Medium CVEs patched (GHSA-2gcr/3hrh/f577/xrhx), replaces DIRTY PR #398",
    status: "achieved",
    category: "ci",
    evidence: [
      "package.json",
      "package-lock.json",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
    commit_sha: "116afc7",
  },
  {
    id: "2026-06-05-O16",
    title: "t9-7 — scripts/bootstrap/: per-surface Claude agent bootstrap scripts (wsl-cli, macos-cli, vscode-agent, ghostty-agent + README)",
    status: "achieved",
    category: "infra",
    evidence: [
      "scripts/bootstrap/wsl-cli.sh",
      "scripts/bootstrap/macos-cli.sh",
      "scripts/bootstrap/vscode-agent.sh",
      "scripts/bootstrap/ghostty-agent.sh",
      "scripts/bootstrap/README.md",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
    commit_sha: "8813010",
  },
  {
    id: "2026-06-05-O17",
    title: "t14-3 — vendor/anthropic-ai-npm/dxt.md: @anthropic-ai/dxt Desktop Extension format reference (deprecated v0.2.6 → successor @anthropic-ai/mcpb)",
    status: "achieved",
    category: "vendor",
    evidence: [
      "vendor/anthropic-ai-npm/dxt.md",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
    commit_sha: "bdc82b7",
  },
  {
    id: "2026-06-05-O18",
    title: "Heartbeat tick 2026-06-05-T5 — hono CVE fix (PR #409, merged) + bootstrap scripts (PR #410) + dxt investigation (PR #412)",
    status: "achieved",
    category: "infra",
    evidence: [
      "seeds/memory/heartbeat/last-tick.md",
      ".claude/mailbox/agent_orchestrator.jsonl",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/prompts/loop-orchestrator.md",
    ],
  },
  {
    id: "2026-06-05-O19",
    title: "t3-1+t3-2+t4-1 — vendor/swift/: swiftly 1.1.2 installer + Docker Hub swift image matrix + linux docker install docs",
    status: "achieved",
    category: "vendor",
    evidence: [
      "vendor/swift/swift.org/install/linux/swiftly.md",
      "vendor/swift/hub.docker.com/swift.md",
      "vendor/swift/swift.org/install/linux/docker.md",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
    commit_sha: "61eca827",
  },
  {
    id: "2026-06-05-O20",
    title: "t14-2 — infra/claude-code-subprocessor/: platform binary matrix + docker-entrypoint (6 platforms, OAuth-only posture)",
    status: "achieved",
    category: "infra",
    evidence: [
      "infra/claude-code-subprocessor/matrix.yaml",
      "infra/claude-code-subprocessor/docker-entrypoint.sh",
      "infra/claude-code-subprocessor/README.md",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
    commit_sha: "cd038a41",
  },
  {
    id: "2026-06-05-O21",
    title: "Heartbeat tick 2026-06-05-T6 — PR #410 OAUTO17 rescue + O19 swift vendor docs (PR #415) + O20 subprocessor matrix (PR #414)",
    status: "achieved",
    category: "infra",
    evidence: [
      "seeds/memory/heartbeat/last-tick.md",
      ".claude/mailbox/agent_orchestrator.jsonl",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/prompts/loop-orchestrator.md",
    ],
  },
  {
    id: "2026-06-05-O22",
    title: "t4-2+t4-3 — vendor/swift/sourcekit-lsp/: README + editor integration docs (BBEdit/JetBrains/Nova/Sublime/Theia)",
    status: "achieved",
    category: "vendor",
    evidence: [
      "vendor/swift/sourcekit-lsp/README.md",
      "vendor/swift/sourcekit-lsp/editor-integration.md",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
    commit_sha: "6ecba3e",
  },
  {
    id: "2026-06-05-O23",
    title: "t13-2 — infra/tailscale/: Tailscale home mesh tailnet policy (HuJSON ACL) + README for WSL2/macOS/Docker surfaces",
    status: "achieved",
    category: "infra",
    evidence: [
      "infra/tailscale/tailnet-policy.hujson",
      "infra/tailscale/README.md",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
    commit_sha: "b0e38e5",
  },
  {
    id: "2026-06-05-O24",
    title: "t2-1 — scripts/audit_container.py: swiftly + swift binary checks added (none apt-installable; key: Dockerfile uses tarball path → t3-4 unblocked)",
    status: "achieved",
    category: "infra",
    evidence: [
      "scripts/audit_container.py",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
    commit_sha: "d78863f",
  },
  {
    id: "2026-06-05-O25",
    title: "Heartbeat tick 2026-06-05-T7 — BLOCKED drain (PRs #410/#414/#415/#416 auto-merge enabled) + PR #417 merged + O22+O23+O24 achieved",
    status: "achieved",
    category: "infra",
    evidence: [
      "seeds/memory/heartbeat/last-tick.md",
      ".claude/mailbox/agent_orchestrator.jsonl",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/prompts/loop-orchestrator.md",
    ],
  },

  // ── Tick T8 (2026-06-05) ──────────────────────────────────────────────────
  {
    id: "2026-06-05-O26",
    title: "t3-4 — scripts/audit_container.py: add swift tarball check + infra/wsl2/Dockerfile: swiftly-not-in-Docker comment",
    status: "achieved",
    category: "infra",
    evidence: [
      "scripts/audit_container.py",
      "infra/wsl2/Dockerfile",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "vendor/swift/swift.org/install/linux/swiftly.md",
    ],
    commit_sha: "fe5d3f6",
  },
  {
    id: "2026-06-05-O27",
    title: "t9-8 — scripts/bootstrap/wsl-gpu-setup.sh: NVIDIA GPU passthrough for WSL2 Ubuntu 24.04 (RTX 2080 Ti)",
    status: "achieved",
    category: "infra",
    evidence: [
      "scripts/bootstrap/wsl-gpu-setup.sh",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
    commit_sha: "fe5d3f6",
  },
  {
    id: "2026-06-05-O28",
    title: "t14-6 — vendor/modelcontextprotocol/reference-servers.md: 7 active + 10 archived official MCP reference servers catalog",
    status: "achieved",
    category: "vendor",
    evidence: [
      "vendor/modelcontextprotocol/reference-servers.md",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "vendor/modelcontextprotocol/modelcontextprotocol.io/examples.md",
    ],
    commit_sha: "a9d8a8e",
  },
  {
    id: "2026-06-05-O29",
    title: "t13-3 — vendor/connectors/google-drive.yaml: extended Google Drive connector spec (OAuth 2.0, 4 capabilities, MCP reference server details)",
    status: "achieved",
    category: "vendor",
    evidence: [
      "vendor/connectors/google-drive.yaml",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "vendor/modelcontextprotocol/reference-servers.md",
    ],
    commit_sha: "a9d8a8e",
  },
  {
    id: "2026-06-05-O30",
    title: "Heartbeat tick 2026-06-05-T8 — OAUTO17 drain (7 PRs rescued), t3-4+t9-8 (PR #422), t14-6+t13-3 (PR #423) dispatched with auto-merge",
    status: "achieved",
    category: "infra",
    evidence: [
      "seeds/memory/heartbeat/last-tick.md",
      ".claude/mailbox/agent_orchestrator.jsonl",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/prompts/loop-orchestrator.md",
    ],
  },
];

for (const o of outcomes) {
  SessionOutcomeSchema.parse(o);
}
