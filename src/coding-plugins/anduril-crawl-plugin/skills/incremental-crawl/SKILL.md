---
name: incremental-crawl
description: Mirror a vendor documentation surface to deterministic, CommonMark-compliant markdown using a sha256 content-addressed manifest, so re-runs only rewrite new or changed pages. Trigger when asked to crawl/mirror a docs site (llms.txt + sitemap.xml), refresh an existing vendor mirror, set up incremental doc ingestion, or "PR the new and changed content" for a vendor like code.claude.com, developer.anduril.com, or www.anduril.com. Drives scripts/incremental-crawl.ts.
---

# incremental-crawl

> The reusable engine. Grounded in `scripts/incremental-crawl.ts` (config-driven)
> and `scripts/crawl-anduril-www.ts` (the original worked example for the
> structured-metadata mode).

Mirror a vendor doc surface to markdown with two hard contracts:

- **Deterministic** — given unchanged upstream, every committed byte (the `.md`
  bodies _and_ `manifest.json`) is identical across runs. No wall-clock lands in
  tracked output; dates come from the page itself.
- **Incremental** — change detection keys off a sha256 of the page content
  (`content_sha256`, in each file's front matter and in the manifest). A re-run
  **adds** new sitemap URLs, **rewrites** only pages whose hash changed, leaves
  unchanged pages byte-for-byte untouched, and preserves a prior capture if a page
  is transiently unreachable.

## Two modes

| Mode         | Use for                                           | How content is obtained                                                                  |
| :----------- | :------------------------------------------------ | :--------------------------------------------------------------------------------------- |
| `markdown`   | markdown-native surfaces (llms.txt + sitemap.xml) | fetch the page's `.md` (reject HTML) — e.g. `code.claude.com`, `developer.anduril.com`   |
| `structured` | JS/WebGL SPAs with no prose DOM                   | extract server-rendered `<title>` + meta + Open Graph + JSON-LD — e.g. `www.anduril.com` |

Pick `structured` only when `markdown` fails (page `.md` 404s or returns HTML, and
the DOM has no `<main>`/`<article>`/`<h1>`). See the
`structured-metadata-extract` skill for that decision tree.

## Run

```bash
# list configured targets
tsx scripts/incremental-crawl.ts --list

# full incremental crawl of a target
tsx scripts/incremental-crawl.ts --target code-claude

# print only the new/changed file paths (for scoping a PR) — see pr-changed-content
tsx scripts/incremental-crawl.ts --target code-claude --changed-only

# bound the run while developing a new target
tsx scripts/incremental-crawl.ts --target anduril-www --page-cap 5
```

Output (per target, `out_dir` from the config):

```
<out_dir>/
  manifest.json                  # url -> { sha256, path }, keys sorted (stable diffs)
  <host>/<path>.md               # one CommonMark file per page (prettier-normalized)
```

## Add a new target

Append an entry to `scripts/crawl-targets.json`:

```json
{
  "name": "code-claude",
  "mode": "markdown",
  "host": "code.claude.com",
  "out_dir": "vendor/code-claude-incremental",
  "sitemap_xml": "https://code.claude.com/sitemap.xml",
  "llms_txt": "https://code.claude.com/docs/llms.txt",
  "allow_prefix": "https://code.claude.com/",
  "page_cap": 0
}
```

- `page_cap: 0` = uncapped (still rate-limited by the fetch pool).
- `markdown` mode also harvests `.md` links from `llms_txt` and dedupes them with
  the sitemap URLs (strips the `.md` so the fetch step re-adds it cleanly).

## CommonMark compliance

Every file is normalized through prettier (the repo's CommonMark analog), so output
passes `prettier --check` and stays byte-stable. Verify after a crawl:

```bash
npx prettier --check "<out_dir>/**/*.md"
```

## See also

- `structured-metadata-extract` — when and how to use `structured` mode
- `pr-changed-content` — turn `--changed-only` output into a delta PR
