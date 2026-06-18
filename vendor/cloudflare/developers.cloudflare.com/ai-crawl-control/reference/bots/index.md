---
title: Bot reference
description: Detection IDs and user agents for major AI crawlers.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-crawl-control/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Bot reference

A selection of crawlers from major AI operators. For an up-to-date list of verified bots, see the [Cloudflare Radar Bots Directory ↗](https://radar.cloudflare.com/bots/directory).

| Crawler               | Operator     | Category      | Detection IDs       | User Agent            |
| --------------------- | ------------ | ------------- | ------------------- | --------------------- |
| GPTBot                | OpenAI       | AI Crawler    | 123815556, 33563875 | GPTBot                |
| ChatGPT-User          | OpenAI       | AI Assistant  | 132995013, 33563857 | ChatGPT-User          |
| OAI-SearchBot         | OpenAI       | AI Search     | 126255384, 33563986 | OAI-SearchBot         |
| ClaudeBot             | Anthropic    | AI Crawler    | 33563859            | ClaudeBot             |
| Claude-SearchBot      | Anthropic    | AI Search     | 33564301            | Claude-SearchBot      |
| Claude-User           | Anthropic    | AI Assistant  | 33564303            | Claude-User           |
| PerplexityBot         | Perplexity   | AI Search     | 33563889            | PerplexityBot         |
| Perplexity-User       | Perplexity   | AI Assistant  | 33564371            | Perplexity-User       |
| Googlebot             | Google       | Search Engine | 120623194, 33554459 | Googlebot             |
| Google-CloudVertexBot | Google       | AI Crawler    | 133730073, 33564321 | Google-CloudVertexBot |
| BingBot               | Microsoft    | Search Engine | 117479730, 33554461 | bingbot               |
| Bytespider            | ByteDance    | AI Crawler    | 33563853            | Bytespider            |
| CCBot                 | Common Crawl | AI Crawler    | 133621792, 33563855 | CCBot                 |
| Meta-ExternalAgent    | Meta         | AI Crawler    | 124581738, 33563982 | meta-externalagent    |
| Meta-ExternalFetcher  | Meta         | AI Assistant  | 132272919, 33563980 | meta-externalfetcher  |
| FacebookBot           | Meta         | AI Crawler    | 33563972            | FacebookBot           |
| Applebot              | Apple        | AI Search     | 120424214, 33563845 | Applebot              |
| Amazonbot             | Amazon       | AI Crawler    | 118601807, 33563839 | Amazonbot             |
| DuckAssistBot         | DuckDuckGo   | AI Assistant  | 126666910, 33564037 | DuckAssistBot         |
| MistralAI-User        | Mistral      | AI Assistant  | 128950951, 33564323 | MistralAI-User        |

Note

[Bot Management](https://developers.cloudflare.com/bots/get-started/bot-management/) customers can use `cf.bot_management.detection_ids` in [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/). All other plans can use user agent matching in robots.txt or WAF rules.

## Referrer domains by operator

When visitors arrive at your site from an AI platform, the referrer indicates which operator's service sent them.

| Operator   | Domains                                             |
| ---------- | --------------------------------------------------- |
| OpenAI     | openai.com, chatgpt.com                             |
| Anthropic  | anthropic.com, claude.ai                            |
| Perplexity | perplexity.ai                                       |
| Google     | google.com, youtube.com                             |
| Microsoft  | bing.com, msn.com, microsoft.com                    |
| Meta       | facebook.com, instagram.com, whatsapp.com, meta.com |
| DuckDuckGo | duckduckgo.com, duck.com                            |
| ByteDance  | bytedance.com, tiktok.com                           |
| Apple      | apple.com, icloud.com                               |
| Amazon     | amazon.com, alexa.com                               |

## Related

* [Analyze AI traffic](https://developers.cloudflare.com/ai-crawl-control/features/analyze-ai-traffic/) — View crawler activity in the dashboard
* [GraphQL API reference](https://developers.cloudflare.com/ai-crawl-control/reference/graphql-api/) — Query crawler analytics
* [Cloudflare Radar Bots Directory ↗](https://radar.cloudflare.com/bots/directory) — Up-to-date list of verified bots

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-crawl-control/reference/bots/#page","headline":"Bot reference · Cloudflare AI Crawl Control docs","description":"Detection IDs and user agents for major AI crawlers.","url":"https://developers.cloudflare.com/ai-crawl-control/reference/bots/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-crawl-control/","name":"AI Crawl Control"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-crawl-control/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-crawl-control/reference/bots/","name":"Bot reference"}}]}
```
