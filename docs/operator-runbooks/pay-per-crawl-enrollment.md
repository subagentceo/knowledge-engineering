# Pay Per Crawl enrollment — subagentknowledge.com

Operator runbook (B18). Source: [`docs/research/2026-06-10-pay-per-crawl.md`](../research/2026-06-10-pay-per-crawl.md).
Estimated operator time: ~15 min + beta wait.

## Steps (browser, authenticated Cloudflare dashboard)

1. **Apply for the private beta**: https://www.cloudflare.com/paypercrawl-signup/
   (or via Enterprise AE). No GA date — apply early; enrollment itself is
   distribution via the crawler Discovery API.
2. On acceptance, enable **Pay Per Crawl** under AI Crawl Control.
3. **Connect Stripe** for payouts (Cloudflare is merchant of record).
4. **Set the zone price**: start at the floor, **$0.01/request** — maximize
   volume first; raise on high-demand paths once the dashboard shows data.
5. **Per-crawler actions**: Charge verified AI crawlers (GPTBot, ClaudeBot, …);
   **Allow** search/user crawlers (Googlebot, Claude-SearchBot, Claude-User)
   so human discovery stays free.
6. **Configuration Rules — free shop window** (Disable Pay Per Crawl on):
   `/`, `/llms.txt`, `/sitemap.xml`, `/robots.txt`, `/vendor-stats.json`,
   `/team-stats.json`, `/table-semantics.json`
7. **Charged shelves** (default zone price applies): `/cite/*` (144 stable
   CSL-JSON items, already served low-token by the worker — B17),
   `/citations.json`, `/memories.json`, `/vendor/*` mirror pages.
8. Verify robots.txt: shipped by B17 with `Allow: /` + Content-Signals
   (`search=yes, ai-input=yes, ai-train=yes`) — paid access, not blocking.
9. Monitor: AI Crawl Control dashboard + Robots.txt compliance tab; revisit
   pricing monthly.

## Pricing tiers (decided)

| surface | tier | rationale |
|---|---|---|
| discovery (llms.txt, sitemap, robots, stats feeds) | free | advertises the corpus; drives Discovery API + crawl queues |
| `/cite/*` + citations.json + memories.json | charged ($0.01 floor) | the citation-grade payload; low tokens per request = high crawl value |
| `/vendor/*` mirror pages | charged ($0.01 floor) | 5,401-doc long tail; freshness via the 24/7 loop drives re-crawls |

## Risk noted

Charging ClaudeBot/GPTBot may reduce training-set inclusion if operators
decline to pay — floor pricing + monthly review is the hedge (see report §5).
