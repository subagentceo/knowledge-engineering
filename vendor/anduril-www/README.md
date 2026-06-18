# vendor/anduril-www

Deterministic, content-addressed mirror of the **www.anduril.com** marketing
site (288 pages). Companion to `vendor/anduril/`, which mirrors the
markdown-native developer docs (`developer.anduril.com`).

## Why this is a bespoke crawler, not the `vendor/` Cheerio pipeline

`www.anduril.com` is a WebGL/Hydrax single-page app. Every page renders into a
single `<canvas>` under `<div id="Stage">`:

- appending `.md` to a page URL returns **404 `text/html`** (no markdown surface);
- the server HTML has **no prose DOM** (no `<main>`/`<article>`/`<h1>`/`<p>`), so
  the standard `html-extract` transform yields nothing;
- JS rendering (headless browser) also returns empty — the content is pixels;
- the Sanity dataset (project `61nocsj5`, dataset `production`) is **not**
  anonymously readable (`count(*)` → 0), and the RSS `content:encoded` bodies are
  images-only.

What every page **does** serve deterministically, server-side, with no JS, is a
structured-metadata layer: `<title>`, `<meta name="description">`, Open Graph
tags, and a JSON-LD `WebPage` / `NewsArticle` block (headline, datePublished,
dateModified, publisher, image). That is the canonical extractable content, and
it is what this crawler mirrors.

## Determinism contract

Given unchanged upstream metadata, every committed byte — the `.md` bodies and
`manifest.json` — is identical across runs. No wall-clock timestamps land in
tracked output. Dates come from the page itself; change-tracking keys off a
sha256 over the extracted content fields (`content_sha256`, also embedded in each
file's front matter). Output is normalized through prettier, so it is CommonMark
(`spec.commonmark.org/0.31.2`) compliant and `prettier --check` stays green.

## Incremental contract

On re-run the crawler:

- **adds** brand-new sitemap URLs,
- **rewrites** a page only when its `content_sha256` changes,
- leaves unchanged pages **byte-for-byte untouched**,
- preserves a prior capture if a page is transiently unreachable.

`manifest.json` is the content-addressed state: `url → { sha256, path, section,
datePublished, dateModified }`, keys sorted for stable diffs.

## Run

```bash
npm run crawl:anduril-www
```

## Layout

```
vendor/anduril-www/
  README.md
  manifest.json                       # content-addressed state (sha256 per url)
  urls.md                             # generated page index
  www.anduril.com/<path>.md           # one CommonMark file per page
```
