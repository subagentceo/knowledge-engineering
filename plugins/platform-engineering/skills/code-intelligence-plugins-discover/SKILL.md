---
name: code-intelligence-plugins-discover
description: >
  Discover and install Claude Code plugins from a marketplace, audit
  plugin dependencies, and decide whether to add a new plugin vs
  extend an existing one. Use when adding a new capability to the
  chassis, when an upstream plugin gets updated, when checking a
  plugin's transitive dependencies, or when picking between two
  competing marketplace plugins.
license: Apache-2.0
compatibility: Designed for Claude Code v2.x plugin system. References the discover-plugins / plugin-marketplaces / plugin-dependencies docs vendored under vendor/anthropics/code.claude.com/docs/en/.
metadata:
  author: alex-jadecli
  version: "0.1.0"
---

# When to invoke

- Adding a new capability and unsure whether to extend an existing
  plugin or pull one from a marketplace
- An upstream plugin got an update — decide whether to re-pin
- Auditing a plugin's transitive dependencies before installing
- Picking between two competing marketplace plugins

# The 3 docs to read first

Vendored under `vendor/anthropics/code.claude.com/docs/en/`:

| Doc                          | When                                               |
|------------------------------|----------------------------------------------------|
| `discover-plugins.md`        | Finding plugins (built-in marketplaces, `claude plugins`) |
| `plugin-marketplaces.md`     | Distribution + how marketplaces resolve names      |
| `plugin-dependencies.md`     | Transitive deps, version pinning, `peerDeps`       |

# Decision tree

```
Is the capability covered by an existing plugin in plugins/?
├── Yes → extend that plugin (add a SKILL, a tool, a hook). Don't fork.
└── No  → check marketplaces:
         ├── Found in @anthropics/* official marketplace?
         │   └── Yes → install + pin via `claude plugins add`
         └── Found in a 3rd-party marketplace?
             ├── Audit dependencies (plugin-dependencies.md)
             ├── Read SKILL.md provenance + license
             └── If trusted → install. Else: fork inline.
```

# Extend vs fork

Default to **extend** — every new plugin adds maintenance surface.
Fork only when:

1. The upstream plugin's license is incompatible
2. The upstream removed a capability you depend on (vendor the old
   version before extending)
3. You need to wire a chassis-specific invariant (OAuth-only,
   GoogleOSV-only) that the upstream rejects

# Pinning

`claude plugins add <name>@<version>` pins. Avoid floating
`@latest` — the chassis's `npm run verify:freshness` flags
unconstrained plugin specs.

# Citations

- `vendor/anthropics/code.claude.com/docs/en/discover-plugins.md`
- `vendor/anthropics/code.claude.com/docs/en/plugin-marketplaces.md`
- `vendor/anthropics/code.claude.com/docs/en/plugin-dependencies.md`
- `vendor/anthropics/code.claude.com/docs/en/plugins.md` (overview)
- `vendor/anthropics/code.claude.com/docs/en/plugins-reference.md`
