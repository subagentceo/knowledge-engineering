---
title: Verified bots
description: Bots confirmed by Cloudflare as legitimate, such as search engine crawlers.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Verified bots

A verified bot is a bot that Cloudflare has confirmed as legitimate, such as search engine crawlers and monitoring services.

You can request for your bot to be added to Cloudflare's bots and agents directory by filling out an [online application ↗](https://dash.cloudflare.com/?to=/:account/configurations/verified-bots) in the Cloudflare dashboard.

Note

A bot cannot be registered as both a verified bot and a signed agent. Review Cloudflare's [signed agents](https://developers.cloudflare.com/bots/concepts/bot/signed-agents/) to determine how to identify your bot.

## Verified bot requirement

For a bot to be verified, it must meet the following requirements:

1. The bot must follow [verified bots policy](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/policy/).
2. The bot must be verified using one of the following verification methods:  
   * [Web Bot Auth](https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/)  
   * [IP validation](https://developers.cloudflare.com/bots/reference/bot-verification/ip-validation/)

Once Cloudflare approves a verified bot, it should appear on [Cloudflare Radar's bots and agents directory ↗](https://radar.cloudflare.com/verified-bots).

---

## Verification methods

The bot must be verified using one of the following validation methods:

* [Web Bot Auth](https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/)
* [IP validation](https://developers.cloudflare.com/bots/reference/bot-verification/ip-validation/)

---

## Categories

You can segment your verified bot traffic by its type and purpose by adding the Verified Bot Categories field `cf.verified_bot_category` as a filter criteria in [WAF Custom rules](https://developers.cloudflare.com/waf/custom-rules/), [Advanced Rate Limiting](https://developers.cloudflare.com/waf/rate-limiting-rules/), and Late Transform rules.

Warning

The Verified Bot Categories field is not compatible with legacy Firewall rules.

Availability

Verified Bot Categories is available on all plans.

Academic research

**String value**: `Academic Research`

**Definition**: Gathers data for scholarly research or academic purposes.

**Example**: Library of Congress, TurnItInBot, Bibliothèque nationale de France

Accessibility

**String value**: `Accessibility`

**Definition**: Scans websites to identify their accessibility.

**Example**: Accessible Web Bot

Advertising or marketing

**String value**: `Advertising & Marketing`

**Definition**: Automates marketing tasks including, but not limited to, ad placement and performance tracking.

**Example**: Google Adsbot

Aggregators

**String value**: `Aggregator`

**Definition**: Collects content from various online sources and consolidates it in one place.

**Example**: Pinterest, Indeed Jobsbot

AI Assistant

**String value**: `AI Assistant`

**Definition**: Automated AI bot driven by user action.

**Example**: Perplexity-User, DuckAssistBot

AI Crawler

**String value**: `AI Crawler`

**Definition**: Crawls websites for content that is used for training AI models.

**Example**: Google Bard, ChatGPT bot

AI Search

**String value**: `AI Search`

**Definition**: Powers AI-driven search experiences.

**Example**: OAI-SearchBot

Archiver

**String value**: `Archiver`

**Definition**: Saves snapshots of websites to preserve digital content for historical records.

**Example**: Internet Archive, CommonCrawl

Feed fetcher

**String value**: `Feed Fetcher`

**Definition**: Retrieves updates from feeds to power readers or other applications.

**Example**: RSS or Podcast feed updaters

Monitoring or analytics

**String value**: `Monitoring & Analytics`

**Definition**: Tracks a website's uptime, performance, and user traffic to gather key monitoring metrics.

**Example**: Uptime Monitors

Page preview

**String value**: `Page Preview`

**Definition**: Generates previews for links shared on social media or in messaging apps.

**Example**: Facebook, Slack, Twitter, or Discord Link Preview tools

Search engine crawler

**String value**: `Search Engine Crawler`

**Definition**: A bot that discovers and indexes web pages for search results.

**Example**: Googlebot, Bingbot, Yandexbot, Baidubot

Search engine optimization

**String value**: `Search Engine Optimization`

**Definition**: Analyzes websites to improve their standing in search engine results pages.

**Example**: Google Lighthouse, GT Metrix, Pingdom, AddThis

Security

**String value**: `Security`

**Definition**: Scans websites to detect security vulnerabilities and potential threats.

**Example**: Vulnerability Scanners, SSL Domain Control Validation (DCV) Check Tools

Social media marketing

**String value**: `Social Media Marketing`

**Definition**: Manages and automates activities on social platforms.

**Example**: Brandwatch

Webhooks

**String value**: `Webhooks`

**Definition**: An automated messenger that sends data from one application to another for specific events.

**Example**: Payment processors, WordPress Integration tools

Other

**String value**: `Other`

**Definition**: A dedicated category for bots that do not fit into the other classifications.

Cloudflare reserves the right to re-assign verified bot categories if the bot's public documentation and observed behavior differ from the category listed in the bot submission form.

---

## Inactive verified bots

Once Cloudflare lists a bot as a verified bot, this entry is cached and may get delisted if no traffic is seen in the Cloudflare network coming from the bot for a defined period of time.

It takes approximately 24 hours for an inactive IP to be removed as a verified bot.

---

### Known issues

The Yandex bot is classified as a Verified Bot, but traffic may occasionally be blocked by a [WAF Managed Rule](https://developers.cloudflare.com/waf/managed-rules/) (such as the rule with ID `...f6cbb163`).

This typically occurs when Yandex updates its source IP address ranges. The new IPs are temporarily unrecognized by the WAF Managed Rules until the updated Verified Bot IP list is fully synchronized across the Cloudflare network.

To restore Yandex traffic, deploy a [WAF exception](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/) that temporarily skips the managed rule with ID `<RuleID id="2854e3f18ad946049e6d90ccf6cbb163" />` when a request is coming from the **Yandex IP** and the user-agent contains **Yandex**. This ensures that legitimate Yandex traffic bypasses the blocking rule without disabling security features for other traffic.

You can also create a [WAF Custom Rule](https://developers.cloudflare.com/waf/custom-rules/skip/) with the _Skip_ action targeting the managed ruleset that contains the blocking rule. The rule expression should specifically match the request's Yandex IP and User-Agent.

The issue is transient and will resolve automatically once the new Yandex IP addresses are fully propagated to Cloudflare's systems. This propagation typically takes up to 48 hours. If the bot remains blocked after 48 hours, contact [Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/).

---

## Availability

Verified bots are excluded by default when [Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/) is enabled to block definite bots.

[Super Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/) and [Enterprise Bot Management](https://developers.cloudflare.com/bots/get-started/bot-management/) customers have the option to block or allow verified bots.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/bots/concepts/bot/verified-bots/#page","headline":"Verified bots · Cloudflare bot solutions docs","description":"Bots confirmed by Cloudflare as legitimate, such as search engine crawlers.","url":"https://developers.cloudflare.com/bots/concepts/bot/verified-bots/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/bots/concepts/bot/","name":"Bots"}},{"@type":"ListItem","position":5,"item":{"@id":"/bots/concepts/bot/verified-bots/","name":"Verified bots"}}]}
```
