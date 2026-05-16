# Developer Docs (developers.intercom.com)

Intercom's external API documentation. The purpose of this repo is to maintain reference docs, guides, and changelogs for developers integrating with Intercom.

## Stack

- Redocly Realm (docs-as-code platform)
- OpenAPI 3.0.1 specs (single YAML per version)
- Markdown with Redocly admonitions (`{% admonition type="danger" name="Title" %}`)
- Node.js >= 18.0.0


## Development


```bash
npm install
npm run dev  # http://127.0.0.1:4001
```

No linting or test commands exist. Only `npm start` and `npm run dev`.

## Structure


```
docs/references/
  @1.0/ ... @2.15/         # Stable versioned API docs
  @Preview/                # New features land here first
  versions.yaml            # Version list (default: "2.15")
docs/build-an-integration/ # Guides (auth, webhooks, SDKs)
docs/guides/               # Product guides
redocly.yaml               # Site config
redirects.yaml             # URL redirects
```

## Adding/Modifying API Fields

1. Edit OpenAPI YAML: `docs/references/@<version>/rest-api/api.intercom.io.yaml`
2. Add property definition AND update response examples
3. Add changelog entry: `docs/references/@<version>/changelog.md` — newest at top
4. Cross-version changes: `docs/build-an-integration/learn-more/rest-apis/unversioned-changes.md`


## Changelog Conventions

- **Preview**: New `##` sections at top (flat, living document)
- **Stable (v2.15, etc.)**: `## Breaking Changes` / `## New Features` grouping


## OpenAPI Specs

- Source of truth: [intercom/Intercom-OpenAPI](https://github.com/intercom/Intercom-OpenAPI) — manually copied, not auto-synced
- Self-contained single YAML files (no external `$ref`)
- Every operation needs `Intercom-Version` header (see guides for details)


## PR Workflow

- CODEOWNERS: `@intercom/team-data-interoperability` auto-reviews all PRs
- PRs trigger Redocly preview builds (check "Details" link)
- Merges auto-deploy to production in ~5-10 min
- Redocly "Visual Review" NOT required to merge
- Help: #team-devrel in Slack


## Detailed Guides

- `.claude/guides/openapi-conventions.md` — YAML patterns, examples, error responses
- `.claude/guides/content-conventions.md` — admonitions, markdown syntax, frontmatter, images
- `.claude/guides/version-management.md` — version directory anatomy, adding new versions