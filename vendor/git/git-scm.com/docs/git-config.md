# git-config(1) — Includes and Conditional Includes (mirror)

> Authoritative source: [git-scm.com/docs/git-config](https://git-scm.com/docs/git-config) — section "CONFIGURATION FILE > Includes".
> Upstream raw: [github.com/git/htmldocs/blob/gh-pages/config.adoc](https://github.com/git/htmldocs/blob/gh-pages/config.adoc).
>
> This file is a **partial mirror** of only the Includes / Conditional Includes spec, which is the load-bearing reference for this repo's multi-identity `[includeIf]` pattern (`seeds/operator-config/git/*.inc`, `docs/operator-runbooks/identity-inheritance.md`).
>
> Fetched via Context7 `/git/htmldocs` on 2026-05-18. Refresh by re-querying Context7 or by manually pulling [the upstream config.adoc](https://github.com/git/htmldocs/blob/gh-pages/config.adoc).

## Includes

The `include` and `includeIf` directives allow for the inclusion of configuration directives from other files. `includeIf` directives may be conditionally ignored based on an evaluation. The `include.path` or `includeIf.*.path` variable specifies the file to be included, and relative paths are resolved based on the location of the file containing the directive.

**Included configuration files are processed as if their contents were directly present at the location of the include directive. Relative paths for included files are resolved relative to the configuration file containing the include directive.**

### Example

```
[include]
    path = /path/to/foo.inc       ; include by absolute path
    path = foo.inc                ; relative to current config file
    path = ~/foo.inc              ; relative to $HOME
```

## Conditional Includes

The `includeIf.<condition>.path` variable allows you to conditionally include configuration files. The condition starts with a keyword followed by a colon and specific data.

Supported keywords:

| Keyword | Meaning |
|---|---|
| `gitdir` | The data is a glob pattern matched case-sensitively against `$GIT_DIR` for the current repository. |
| `gitdir/i` | Same as `gitdir`, but matched case-insensitively. |
| `onbranch` | The data is a refname (or glob) of the currently-checked-out branch. |
| `hasconfig:remote.*.url` | The data is a glob pattern matched against the URL of any remote in the current configuration. Files included via this option are prohibited from setting `remote.*.url` themselves (avoids chicken-and-egg). |

### gitdir / gitdir/i pattern semantics (from the upstream docs)

- Patterns can include `**` (any number of path components) and standard `?`/`[...]` glob characters.
- A pattern starting with `~/` is expanded to `$HOME/...` before matching.
- A pattern ending in `/` matches any path under that directory.

### Example: per-directory identity (the pattern used in this repo)

```
[includeIf "gitdir/i:~/alex-jadecli/"]
    path = ~/.config/git/alex.inc

[includeIf "gitdir/i:~/admin-jadecli/"]
    path = ~/.config/git/admin.inc
```

When `git config` is read from a repo under `~/admin-jadecli/foo/`, the `admin.inc` file is loaded **as if its contents were inlined at this point**. If `admin.inc` itself contains:

```
[include]
    path = ./alex.inc
```

then `alex.inc` (resolved relative to `admin.inc`, i.e., `~/.config/git/alex.inc`) is **also processed as if its contents were directly present**. This is how transitive / inheritance-style configuration works: an included file may itself contain `[include]` directives, and they resolve relative to the file containing them.

The upstream spec does not document a cycle-detection or depth-limit policy; the practical implementation in `git` (as of 2.x) detects include cycles and stops with an error, and there is a `core.includeDepth` style behavior with a reasonable default. For 2-level chains like the one in this repo (`admin.inc` → `alex.inc`), there is no concern.

## Why this matters for this repo

This file is cited by:

- `seeds/operator-config/git/*.inc` — the per-identity config files in this repo
- `seeds/operator-config/ssh/config.fragment` — referenced indirectly via the broader multi-identity pattern
- `docs/operator-runbooks/identity-inheritance.md` — the operator runbook
- `scripts/apply-identity-profiles.sh` — header citation
- `src/lib/identity-profiles.test.ts` — JSDoc `@cite`

The OIDENT1 PR (#245) originally cited `vendor/docs-github/.../github-cli/quickstart.md` — that page is about `gh auth switch`, NOT about `git`'s `[include]` semantics. This vendor doc is the correct citation root for the `[includeIf]` + `[include]` inheritance pattern. The `gh-cli` doc remains a valid citation for the `gh auth login -u <user>` operator step, which is a separate concern.

## See also

- Upstream HTML doc: [git-scm.com/docs/git-config#_includes](https://git-scm.com/docs/git-config#_includes)
- Release notes that introduced `includeIf`: Git 2.13.0 — `RelNotes/2.13.0.adoc`
- Release notes that clarified `include.path` / `includeIf.<condition>.path` semantics: Git 2.14.0 — `RelNotes/2.14.0.adoc`
