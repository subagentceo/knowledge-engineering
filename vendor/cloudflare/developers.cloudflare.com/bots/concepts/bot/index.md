---
title: Bots
description: Automated software programs that interact with websites and APIs.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Bots

A **bot** is a software application programmed to do certain tasks.

Bots can be used for good (chatbots, search engine crawlers) or for evil (inventory hoarding, credential stuffing).

More information

For more background, refer to [What is a bot? ↗](https://www.cloudflare.com/learning/bots/what-is-a-bot/).

## Verified bots and signed agents

Cloudflare maintains an internal directory of [verified bot](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/) and [signed agents](https://developers.cloudflare.com/bots/concepts/bot/signed-agents/) that are associated with search engine optimization (SEO), website monitoring, and more.

You can use this directory to prevent any bot protection measures from impacting otherwise helpful bots and agents, such as search crawlers.

For a partial list of verified bots and signed agents, refer to [Cloudflare Radar ↗](https://radar.cloudflare.com/verified-bots).

Note

The method for allowing or blocking verified bots depends on [your plan](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/#availability).

## AI bots

To prevent AI-related usage of your site content (such as training language models or generating search answers), you can turn on a managed rule that blocks known AI crawlers that use data for training models ("AI Bots"). A managed rule is a rule that Cloudflare maintains and updates — you turn it on, but you do not write or edit the rule yourself.

### Which bots are blocked

When you enable this feature, Cloudflare will block the following bots:

* `Amazonbot` (Amazon)
* `Applebot` (Apple)
* `Bytespider` (ByteDance)
* `ClaudeBot` (Anthropic)
* `DuckAssistBot` (DuckDuckGo)
* `Google-CloudVertexBot` (Google)
* `GoogleOther` (Google)
* `GPTBot` (OpenAI)
* `Meta-ExternalAgent` (Meta)
* `PetalBot` (Huawei)
* `TikTokSpider` (ByteDance)
* `CCBot` (Common Crawl)

In addition to this list, [verified bots ↗](https://radar.cloudflare.com/bots#verified-bots) that are classified as AI crawlers, as well as a number of unverified bots that behave similarly, are included in the rule. This rule does not include verified bots that fall into the `Search Engine` categories.

These categories, and the bots classified in these categories, may change from time to time.

If you are a bot operator and feel your bot may have been incorrectly categorized, [add your bot to the list of verified bots ↗](https://dash.cloudflare.com/?to=/:account/configurations/verified-bots).

### How it works

When you enable this feature, Cloudflare detects and blocks two categories of AI bots:

* **Well-behaved AI crawlers** that comply with `robots.txt`, respect crawl rates, and do not hide their behavior from your website.
* **Evasive AI crawlers** that do not follow these conventions but are detected through additional signatures.

### Rule evaluation order

Cloudflare evaluates bot-related rules in a specific order. When a request matches a rule and receives a terminating action (such as block or challenge), it does not continue to later rules in the sequence.

1. **Custom rules** (WAF custom rules you create) — evaluated first.
2. **Block AI bots** (the managed AI rule) — evaluated second.
3. **Other Super Bot Fight Mode rules** (definitely automated, likely automated, verified bots) — evaluated last.

The Block AI bots rule takes precedence over all other Super Bot Fight Mode rules. For example, if you have enabled **Block AI bots** and **Allow verified bots**, verified AI bots will still be blocked.

For Bot Management customers, custom rules run before the Block AI bots rule. If your custom rule challenges definitely automated traffic, AI bots will receive that challenge instead of reaching the Block AI bots rule. Because the challenge is a terminating action, Cloudflare does not evaluate the request against later rules in the sequence.

The SBFM settings for verified, definitely automated, and likely bots also affect evaluation. If these settings are set to `allow`, the request is not matched to any SBFM rule and proceeds to the next phase — where the Block AI bots rule can still block it. If the setting is `block`, the request is blocked in the earlier phase and does not reach the AI rule at all. If the setting is `challenge`, the request matches a rule and receives a terminating action, so it will not continue to later rules.

For self-serve non-Bot Management customers, all rules for verified, definitely automated, and likely bots run in the phase following the AI bots rule.

flowchart LR
accTitle: Super Bot Fight Mode and custom rules execution order diagram
accDescr: This diagram details the execution order of custom rules before Super Bot Fight Mode managed rules.
A[Custom rules] --> B[Block AI bots<br>managed rule] --> C[Other SBFM managed rules]

This feature is available on all Cloudflare plans.

Note

The method for blocking AI bots depends on [your plan](https://developers.cloudflare.com/bots/get-started/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/concepts/bot/#page","headline":"Bots · Cloudflare bot solutions docs","description":"Automated software programs that interact with websites and APIs.","url":"https://developers.cloudflare.com/bots/concepts/bot/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/bots/concepts/bot/","name":"Bots"}}]}
```
