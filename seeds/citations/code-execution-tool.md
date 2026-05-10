---
slug: code-execution-tool
source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool.md
local: vendor/anthropics/platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool.md
drives: comparison — built-in code-exec tool vs @cloudflare/codemode (Phase 11)
---

# code-execution-tool — extract

## Header tree

- # Code execution tool
  - ## Model compatibility
  - ## Platform availability
  - ## Quick start
  - ## How code execution works
  - ## Using code execution with other execution tools
  - ## How to use the tool
    - ### Upload and analyze your own files
  - ## Tool definition
  - ## Response format
    - ### Bash command response

## Plan-relevant pull quotes

> Run Python and bash code in a sandboxed container to analyze data,
> generate files, and iterate on solutions.

> The code execution tool allows Claude to run Bash commands and
> manipulate files, including writing code, in a **secure, sandboxed
> environment**.

> `code_execution_20260120` adds REPL state persistence and
> [programmatic tool calling] from within the sandbox, and is available
> on Opus 4.5+ and Sonnet 4.5+ only.

## Why this drives Phase 11 (comparison only)

Phase 11 documents the trade-off in `docs/architecture.md`:
- **Built-in Anthropic code-execution tool** — simpler, ships as a
  configurable tool on the Messages API, but coupled to Anthropic
  infrastructure for sandboxing and lacks our `servers/` filesystem-tree
  pattern.
- **`@cloudflare/codemode`** — gives us the full filesystem-tree pattern
  + `DynamicWorkerExecutor`, runs on Cloudflare Sandboxes (which we
  already wired in Phase 0g/8), and integrates with the Workers-resident
  long-arc goal.

We stay with codemode for the bridge; managed-agents-style sub-agents
(if ever introduced — note the operator posture's "no Managed Agents
API") could use the built-in tool.
