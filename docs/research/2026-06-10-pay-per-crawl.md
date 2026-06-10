---
status: complete
updated: 2026-06-10T05:35Z
consumed_by: [B17, B18, B20]
---

# Research: Cloudflare frontend delivery (2025–26) + Pay Per Crawl for subagentknowledge.com

Date: 2026-06-10. Local mirror citations use repo paths under `/home/user/knowledge-engineering/`.

## 1. Cloudflare frontend 2026 state of the art (fast static SPA on Workers)

- **Workers Static Assets is the canonical hosting path** (Pages is in maintenance mode; the MCP server even ships a `migrate_pages_to_workers_guide`). Worker code + assets deploy as one unit with global edge caching. [Static Assets docs](https://developers.cloudflare.com/workers/static-assets/); local index: `vendor/cloudflare/developers.cloudflare.com/workers/llms.txt`.
- **Free asset serving:** with compatibility date `2025-04-01`+ (`assets_navigation_prefers_asset_serving`), navigation requests serve assets directly without invoking the Worker — fewer billable invocations, lower latency for the SPA shell. [SPA routing docs](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/).
- **`run_worker_first`** now accepts route-pattern arrays with glob/negation — run the Worker only for `/api/*`, `/citations.json` etc.; everything else is pure asset path. [Binding docs](https://developers.cloudflare.com/workers/static-assets/binding/).
- **Smart Placement** (all plans) moves Worker execution near backends; caveat: combined with `run_worker_first` the whole script is placed as one unit, so keep asset routes out of the Worker. [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement/).
- **103 Early Hints**: Cloudflare caches `Link: preload/preconnect` headers and emits them before the final response; settable from a Worker. [Early Hints example](https://developers.cloudflare.com/workers/examples/103-early-hints/).
- **Speculation Rules API** rolled out including free plans — prerender/prefetch of likely next navigations. [Community rollout thread](https://community.cloudflare.com/t/speculation-rules-api-rollout-to-free-plans/708111).
- **Observatory + Smart Shield** (Birthday Week 2025): dashboard performance diagnosis with one-click fixes (early hints, speculation, compression), all plan tiers. [Blog](https://blog.cloudflare.com/introducing-observatory-and-smart-shield/); local: `vendor/cloudflare/developers.cloudflare.com/smart-shield/`, `speed/llms.txt`.
- **Images + Image Resizing merged** into one product; transformations without Cloudflare storage. [Blog](https://blog.cloudflare.com/merging-images-and-image-resizing/).
- **Cloudflare Vite plugin**: dev runs in `workerd`, production parity for SPA + Worker. [Blog](https://blog.cloudflare.com/introducing-the-cloudflare-vite-plugin/).

## 2. Pay Per Crawl mechanics

Local mirror index of the entire doc tree: `vendor/cloudflare/developers.cloudflare.com/ai-crawl-control/llms.txt` (lines 31–44 list every Pay Per Crawl page).

- **Product**: feature of **AI Crawl Control** (formerly AI Audit). Site owners set a price per request; participating AI crawlers either send payment intent and get **HTTP 200 + `crawler-charged`** header, or get **HTTP 402 Payment Required + `crawler-price`** header. [What is Pay Per Crawl](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/what-is-pay-per-crawl/), [launch blog](https://blog.cloudflare.com/introducing-pay-per-crawl/).
- **Crawler side**: requests declare `crawler-exact-price` or `crawler-max-price` (one per request). Since Dec 2025 those headers **must be covered by the Web Bot Auth `signature-input`** — cryptographic HTTP message signatures prevent spoofed identity, tampered prices, and replays. [Crawl pages](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-ai-owner/crawl-pages/), [Web Bot Auth](https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/) (local: `vendor/cloudflare/developers.cloudflare.com/bots/llms.txt` lines 59–76).
- **Money flow**: Cloudflare is merchant of record; aggregates billing events (`crawler-charged` on 200s), charges the crawler operator, pays site owners via **Stripe Connect**. Minimum price $0.01/request; one flat per-zone price for all "Charge" crawlers (custom in-band pricing added Dec 2025). [Set a price](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/set-a-pay-per-crawl-price/), [Manage payouts](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/manage-payouts/).
- **Per-crawler choice**: Allow / Charge / Block per crawler. [Select crawlers](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/select-crawlers-to-charge/).
- **Dec 2025 enhancements**: (1) **Discovery API** — `GET https://crawlers-api.ai-audit.cfdata.org/charged_zones` (Web Bot Auth-authenticated) lets verified crawlers programmatically find participating domains; (2) **per-URI configuration** via Configuration Rules ("Disable Pay Per Crawl" on URI patterns) — free homepage/nav, charged content; (3) **`crawler-error` header** with 11 error codes. [Changelog 2025-12-10](https://developers.cloudflare.com/changelog/post/2025-12-10-pay-per-crawl-enhancements/).
- **Status**: still **private beta**; signup form or Enterprise AE. [Signup](https://www.cloudflare.com/paypercrawl-signup/), [FAQ](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/faq/).
- **robots.txt / AI Audit integration**: AI Crawl Control's Robots.txt tab (Oct 2025) tracks crawler compliance and **Content Signals** (`search`, `ai-input`, `ai-train` directives); managed robots.txt is prepended to your own on all plans; Robotcop enforces robots.txt at the edge. [Robots.txt tab changelog](https://developers.cloudflare.com/changelog/post/2025-10-21-track-robots-txt/), [managed robots.txt](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/), [Robotcop blog](https://blog.cloudflare.com/ai-audit-enforcing-robots-txt/). Transform Rules can add licensing headers to crawler responses (local: `ai-crawl-control/llms.txt` line 24).
- **Contrast**: x402 is the open crypto (USDC) analog; Pay Per Crawl is fiat/Stripe inside Cloudflare. [DevelopersIO comparison](https://dev.classmethod.jp/en/articles/lets-change-the-world-with-x402-questioning-ai-company-ethics/).

## 3. Enrollment checklist for subagentknowledge.com

1. Zone on Cloudflare with the Worker (static assets binding) already proxied — done by architecture.
2. Apply for the **private beta** at [paypercrawl-signup](https://www.cloudflare.com/paypercrawl-signup/) (or Enterprise AE).
3. Enable Pay Per Crawl in account settings; connect **Stripe** for payouts ([Connect Stripe](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/connect-to-stripe/)).
4. Set the per-request price — start at the floor ($0.01) to maximize volume.
5. In AI Crawl Control, set per-crawler actions: **Charge** for verified AI crawlers (GPTBot, ClaudeBot, etc.), **Allow** search indexers (Claude-SearchBot, Googlebot) so discovery stays free.
6. Add Configuration Rules: disable Pay Per Crawl on `/`, `/llms.txt`, `/sitemap.xml`, `/robots.txt`, `/vendor-stats.json` (free discovery surface); charge the 5,401 doc pages and CSL-JSON/feed payloads.
7. robots.txt: explicitly **Allow** ClaudeBot/GPTBot/etc. and add Content Signals (`search=yes, ai-input=yes, ai-train=yes`) — the point is paid access, not blocking. Anthropic's bots honor robots.txt and Crawl-delay (local: `vendor/claude-sitemap/support/en/articles/8896518-...md`).
8. Monitor via the AI Crawl Control dashboard + GraphQL API (local: `ai-crawl-control/llms.txt` lines 41, 51).

## 4. Growth strategies — attract paying crawlers

- **Be discoverable in the Discovery API** by enrolling: verified crawlers pull `charged_zones` to build crawl queues — enrollment itself is distribution ([Dec 2025 changelog](https://developers.cloudflare.com/changelog/post/2025-12-10-pay-per-crawl-enhancements/)).
- **Free shop window, paid shelves**: keep `llms.txt` (per-section indexes like Cloudflare's own), sitemap.xml, homepage, and `vendor-stats.json` free; they advertise the 5,401-doc corpus and stable URLs that justify paying 402s.
- **Stable, semantic URLs + `Accept: text/markdown`-style content negotiation** (mirror Cloudflare's docs pattern, `ai-crawl-control/llms.txt` line 5) — low-token markdown responses make each paid crawl high-value, encouraging repeat crawls.
- **Freshness signals**: lastmod in sitemaps, ETag/Last-Modified, a changes feed — paying crawlers re-crawl what changes; the citation pipeline's incremental updates are the revenue engine.
- **Tiering via per-URI rules**: free abstracts/first-N-lines pages linking to charged full CSL-JSON datasets; only one zone-wide price exists today, so "tiers" = free vs. charged URI patterns (custom in-band pricing may enable true tiers).
- **Licensing/provenance headers** via Transform Rules on crawler responses (citation metadata, `Link rel="cite-as"`) — differentiates the corpus as citation-grade.
- **Price low, measure, iterate** with the Robots.txt compliance tab and GraphQL analytics; raise price on high-demand paths once volume data exists.
- **Keep Claude-User / Claude-SearchBot allowed**: user-directed fetches and search indexing drive human researchers who recommend the corpus (local Anthropic article cited above).

## 5. Risks / unknowns

- **Private beta**: no GA date, acceptance not guaranteed, terms may change; only Cloudflare-verified crawlers participate — long-tail agents can't pay yet.
- **Buyer adoption is the bottleneck**: it's unclear which AI companies actually pay today (skeptical take: [Leaky Paywall](https://leakypaywall.com/cloudflare-pay-per-crawl-income-or-spare-change/)). Anthropic's public docs describe robots.txt opt-out, not payment ([ppc.land](https://ppc.land/anthropic-clarifies-what-its-three-web-crawlers-do-and-how-to-block-them/)).
- **Revenue share/fees undocumented** publicly; single zone-wide price limits price discrimination.
- **Charging ClaudeBot/GPTBot may reduce training-set inclusion** if those operators decline to pay — a citation site's influence partly depends on being in models.
- **x402/crypto rails** are a competing standard; protocol fragmentation possible.
- **Local mirror is shallow**: `vendor/cloudflare/` holds only `llms.txt` indexes, not page bodies, and developers.cloudflare.com 403s generic fetchers (observed during this research) — itself a demo of why verified-crawler access matters. Consider mirroring the Pay Per Crawl pages into `vendor/`.
