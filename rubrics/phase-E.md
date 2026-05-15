---
phase: E
title: support.claude.com mirror — Intercom help-center as a mirror-first lane
status: done
issue: docs/plans/founder-refactor-2026-05-15.md
pr: pending (this PR)
---

# Phase E — support.claude.com mirror (rubric)

Brings the 341 EN articles of `https://support.claude.com` into the
chassis as a first-class vendor mirror. The Intercom help-center returns
`Content-Type: text/markdown` when `.md` is appended to any
`/en/articles/<id>-<slug>` URL — live-probed at the session-start that
drove this plan. The new `support-mdfirst` transform automates that
suffix dance and the sitemap-driven crawl materializes the full set
under `vendor/claude-support/`.

Cited from:
- `seeds/posture/session-start.xml` (.md-first hard rule per host)
- `vendor/anthropics/code.claude.com/docs/en/commands.md` (markdown-doc precedent)
- `docs/plans/founder-refactor-2026-05-15.md` (Phase E outcomes O-E1…O-E5)

## Outcomes covered

| Outcome | What |
| :---: | :--- |
| **O-E1** | New transform mode `support-mdfirst` in `scripts/lib/transforms.ts` — appends `.md`, sends `Accept: text/markdown`, rejects HTML responses. Test coverage in `transforms.test.ts`. |
| **O-E2** | `vendor/claude-support/crawl.json` — `sitemap_xml_sources: ["https://support.claude.com/sitemap.xml"]`, `transform: "support-mdfirst"`, `allow_prefixes` restricts to `/en/articles/`, `page_cap: 400`. |
| **O-E3** | First crawl materialized 341 articles → `vendor/claude-support/support.claude.com/en/articles/<id-slug>.md`. 0 failures. |
| **O-E4** | `src/mcp/lanes/support-claude.ts` — `support_article` already mirror-first via `mirrorOrFetch`; adds new `support_search` tool that text-matches article titles directly from the mirror manifest with no HTTP round-trip. |
| **O-E5** | `src/lib/vendor-catalog.test.ts` — removes `anthropic-support` from `EXCLUDED_IDS` (now in scope) and adds `DIR_ALIASES["anthropic_support"] → "claude-support"`. The v2 catalog entity already declared the sitemap URL. |

## Criteria

### C1. Mirror count matches sitemap discovery

```bash
find vendor/claude-support -path '*/en/articles/*.md' | wc -l
```

Expected: `341`.

Additionally `vendor/claude-support/urls.md` declares `count: 341` in
its frontmatter.

### C2. `support-mdfirst` transform passes its unit tests

```bash
npx tsx scripts/lib/transforms.test.ts | grep "support-mdfirst"
```

Expected: 4 passing assertions (URL rewrite happy-path, trailing slash
→ `index.md`, hard-reject `text/html`, hard-reject `<!doctype`).

### C3. Mirror manifest shape test green

```bash
npx tsx src/lib/claude-support-mirror.test.ts
```

Expected: `6 passed, 0 failed`. Asserts manifest registration, exact
URL count, URL shape regex, every URL → on-disk file, sample article
body sanity, `crawl.json.transform === "support-mdfirst"`.

### C4. Catalog reconcile (no orphan vendor dir, no orphan catalog entity)

```bash
npx tsx src/lib/vendor-catalog.test.ts
```

Expected: 21 passing. The two crucial rows:
- `vendor/claude-support/crawl.json includes sitemap https://support.claude.com/sitemap.xml`
- `every vendor/<dir>/crawl.json maps to a catalog entity (modulo legacy allow-list)`

### C5. Lane exposes mirror to the model

`support_search` tool registered in `src/mcp/lanes/support-claude.ts`,
substring-matches against article titles derived from URL slugs, returns
hits with `source: "vendor/claude-support/urls.md"`. No live HTTP.

### Verify chain

```bash
unset ANTHROPIC_API_KEY
npm run lint
npm run verify:libs              # includes claude-support-mirror.test.ts
npm run verify:citations
npm run verify:gates
```

Expected: all green.

## Why this matters

The chassis already mirrors developer-facing docs (`code.claude.com`,
`platform.claude.com`, `claude.com/docs`). The support center is a
distinct surface — it carries onboarding, billing, content-policy, and
desktop-app docs that the model otherwise had to fetch live. Bringing
it into the mirror:

1. Removes a public-internet dependency from `support_article`.
2. Adds a free text-search surface (`support_search`) the model can use
   for help-center discovery without spending an HTTP RTT per query.
3. Closes the v2 catalog gap (the `anthropic_support` entity was carried
   as `EXCLUDED_IDS`-with-reason for 4+ phases; now properly mirrored).

## Follow-ups (out of scope for this phase)

- **Collection-level mirror**: `support_collection` still live-HTTPs the
  collection-listing HTML. The Intercom JSON API isn't public; the next
  iteration could derive collection membership from the sitemap +
  in-page `<a rel="bookmark">` rather than re-fetching HTML.
- **Re-crawl cadence**: today's count of 341 is point-in-time. A
  `/schedule` SlashCommand for weekly re-crawl belongs in Phase G under
  the refresh-vendors umbrella.
