---
name: structured-metadata-extract
description: Extract usable CommonMark from a JavaScript/WebGL single-page-app marketing site that has no prose DOM and no markdown surface, by reading the server-rendered structured-metadata layer (title, meta description, Open Graph, JSON-LD WebPage/NewsArticle). Trigger when a docs/marketing crawl returns empty or HTML-only, appending .md 404s, a headless render is blank, or you need to mirror a site like www.anduril.com that renders into a canvas. This is the "be more clever than the naive crawler" path.
---

# structured-metadata-extract

> The technique that mirrors `www.anduril.com` (288 pages) despite it being a
> WebGL/Hydrax canvas SPA. Grounded in `scripts/crawl-anduril-www.ts` and the
> `structured` mode of `scripts/incremental-crawl.ts`.

## When to reach for this (decision tree)

Try the cheap `markdown` mode first. Fall through to `structured` only when **all**
of these hold for the target host:

1. appending `.md` to a page URL returns **404 / `text/html`** (no markdown surface);
2. the server HTML has **no prose DOM** — no `<main>` / `<article>` / `<h1>` / `<p>`
   (content is rendered client-side into a `<canvas>`);
3. a headless/JS render still returns **empty** (the content is pixels, not text);
4. the CMS API is not anonymously readable (e.g. a private Sanity dataset:
   `count(*)` → 0) and the RSS `content:encoded` bodies are images-only.

If 1–4 are all true, the only deterministic, server-side, JS-free content is the
page's **structured-metadata layer**. Mirror that instead of fighting the canvas.

## What gets extracted (per page)

- `<title>`
- `<meta name="description">` (fallback: `og:description`)
- Open Graph (`og:title`, `og:description`)
- the JSON-LD block: `@type`, `headline`, `datePublished`, `dateModified`,
  `publisher` (for `WebPage` / `Article` / `NewsArticle`)

These render to a CommonMark file with YAML front matter (`url`, `type`, `section`,
`date_published`, `date_modified`, `content_sha256`) plus a `# heading`, the
description, and a `## Page facts` list. The `content_sha256` is computed over the
**extracted fields** (sorted-key JSON), not the raw HTML — so build-hash churn in
asset filenames never produces a false "changed".

## Run

```bash
tsx scripts/incremental-crawl.ts --target anduril-www            # all pages
tsx scripts/incremental-crawl.ts --target anduril-www --page-cap 5   # while developing
```

## How to confirm a site needs this (probes)

```bash
# 1. does .md exist?
curl -sL -o /dev/null -w "%{http_code} %{content_type}\n" https://HOST/PAGE.md

# 2. any prose DOM in server HTML?
curl -sL https://HOST/PAGE | grep -oiE '<(main|article|h1|p)\b' | sort | uniq -c

# 3. is the CMS dataset public? (Sanity example)
curl -sL "https://PROJECT.api.sanity.io/v2021-10-21/data/query/production?query=count(*)"
```

If (1) is 404, (2) is empty, and (3) is 0 → use `structured` mode.

## See also

- `incremental-crawl` — the engine, manifest, and determinism contracts
- `pr-changed-content` — PR only the delta after a crawl
