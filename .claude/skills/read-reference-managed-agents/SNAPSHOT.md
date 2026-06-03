# Reference snapshot

**Snapshot date:** 2026-06-02
**Source:** `https://platform.claude.com/docs/en/managed-agents/<topic>.md`
**Fetched via:** v1's `create-reference-managed-agents` workflow, then bundled.

## What's bundled

20 conceptual `/managed-agents/` markdown docs — the canonical, machine-readable `.md` variants (Mintlify):

```
agent-setup           cloud-containers      define-outcomes       dreams
environments          events-and-streaming  files                 github
mcp-connector         memory                multi-agent           onboarding
overview              permission-policies   quickstart            sessions
skills                tools                 vaults                webhooks
```

Plus generated:
- `manifest.md` — human-readable H1/H2/H3 outline with line ranges
- `manifest.tsv` — `file <TAB> level <TAB> header <TAB> start_line <TAB> end_line`

## Refreshing

To pull current versions of the docs, run the companion `update-reference-managed-agents` skill, then regenerate the manifest:

```bash
python3 scripts/build_manifest.py references/
```

`update-` is the only network-touching skill in the CRUD set. Read / delete operate on local files.

## When to suspect staleness

Bundled docs are a point-in-time snapshot. Be skeptical when the user's question concerns:
- **New event types** in the session event stream
- **New beta header values** (current as of snapshot: `managed-agents-2026-04-01`)
- **Endpoints announced after the snapshot date**
- **Pre-installed packages or runtime versions** in cloud containers

For settled surface area (overview, basic session lifecycle, vault model, define-outcomes structure), the snapshot is fine for a long time.
