# knowledge-coding-plugins

A Claude **plugin marketplace** for the coding surface — plugins that run inside a
Claude Code session, are grounded in this repo's `src/` + `scripts/`, and **push
commits / open PRs**.

## Why a separate marketplace (the differentiation)

The plugin ecosystem this repo consumes (`.claude/plugins.json`) splits cleanly by
**surface and intent**. This marketplace is the third leg:

| Marketplace                           | Surface           | Intent                                                         | Examples                                               |
| :------------------------------------ | :---------------- | :------------------------------------------------------------- | :----------------------------------------------------- |
| `anthropics/claude-plugins-official`  | Claude **Code**   | First-party developer tooling, generic                         | `mcp-server-dev`, `agent-decomposition`, `code-review` |
| `anthropics/knowledge-work-plugins`   | Claude **Cowork** | Knowledge-work workflows for non-engineers                     | docs/research/ops Cowork flows                         |
| **`knowledge-coding-plugins`** (this) | Claude **Code**   | Repo-changing engineering automation specific to this codebase | `anduril-crawl-plugin`                                 |

So:

- **Claude-official** = portable, vendor-neutral dev plugins anyone installs.
- **knowledge-work** = Cowork (folder-scoped, connector-driven, non-code) plugins.
- **knowledge-coding** = our code-grounded automations: they read/write the repo,
  invoke `scripts/*.ts` tools, and land changes via the `claude/*` → PR → automerge
  loop documented in `.claude/rules/pr-ops.md`.

A plugin belongs here when it (a) targets the Claude Code surface (not Cowork), and
(b) is tied to this repo's tools/conventions rather than being generically reusable.
If it's generic, upstream it to `claude-plugins-official`; if it's a Cowork flow, it
belongs in `knowledge-work-plugins`.

## Plugins

| Plugin                 | What it does                                                                                                                   |
| :--------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `anduril-crawl-plugin` | Deterministic sha256 incremental crawl → CommonMark mirror → delta PR. Markdown-native and JS-SPA (structured-metadata) modes. |

## Install

This marketplace is local to the repo. Register it alongside the others in
`.claude/plugins.json`, or load a plugin directly with `--plugin-dir`.
