---
title: Get started
description: Learn how to set up AI Crawl Control.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-crawl-control/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Get started

This guide instructs you on how to:

* View AI crawlers that are interacting with pages in your domain (a [Cloudflare zone](https://developers.cloudflare.com/fundamentals/concepts/accounts-and-zones/#zones)).
* Use AI Crawl Control to block individual crawlers from accessing your content.

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/).
2. [Connect your domain to Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/).
3. Make sure your domain is [proxying traffic through Cloudflare](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/#cloudflare-as-a-reverse-proxy).

## 1\. Monitor AI crawler activity at a glance

1. Go to **AI Crawl Control**.  
[ Go to **AI Crawl Control** ](https://dash.cloudflare.com/?to=/:account/:zone/ai)
2. Review the snapshot of your AI crawler activity in the **Overview** tab.
3. Use the filters to view activity by specific date ranges, crawlers, operators, hostnames, or paths.

## 2\. Block specific AI crawlers

* [ All plans ](#tab-panel-6522)
* [ Paid plans ](#tab-panel-6523)

To block specific AI crawlers:

1. Go to **AI Crawl Control**.  
[ Go to **AI Crawl Control** ](https://dash.cloudflare.com/?to=/:account/:zone/ai)
2. Review which AI crawlers are accessing your domain in the **Crawlers** tab.
3. In the **Action** column, select **Block**.

Quality of AI crawler detection

On the free plan, AI Crawl Control identifies AI crawlers based on their [user agent strings ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/User-Agent). This enables AI Crawl Control to detect well-known, self-identifying AI crawlers.

Upgrade your plan to enable a more thorough detection using Cloudflare's [Bot Management detection ID](https://developers.cloudflare.com/bots/reference/bot-management-variables/#ruleset-engine-fields) field.

To block specific AI crawlers:

1. Go to **AI Crawl Control**.  
[ Go to **AI Crawl Control** ](https://dash.cloudflare.com/?to=/:account/:zone/ai)
2. Review which AI crawlers are accessing your domain in the **Crawlers** tab.
3. In the **Action** column, select **Block**.

For more information, refer to [Manage AI crawlers](https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers/).

You can also create more complex rules when taking action on AI crawlers, using [Cloudflare WAF](https://developers.cloudflare.com/waf/). For more information on creating more specific rules, refer to [Create a custom rule in the dashboard](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/).

## 3\. Explore detailed metrics

* [ All plans ](#tab-panel-6521)

For more detailed analytics, use the **Metrics** tab.

1. Go to **AI Crawl Control**.  
[ Go to **AI Crawl Control** ](https://dash.cloudflare.com/?to=/:account/:zone/ai)
2. Review detailed breakdowns by date range, crawler, operator, status code, hostname, or path in the **Metrics** tab.

Note that on free plans, the **Metrics** tab only displays metrics for the past 24 hours.

## Plan comparison

| All plans                                                                                                                       | Enterprise plans with Bot Management                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AI crawler detection via [user agent strings ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/User-Agent) | Advanced AI crawler detection via [Bot Management detection ID](https://developers.cloudflare.com/bots/reference/bot-management-variables/#ruleset-engine-fields)                   |
| Maximum 24-hour analytics window                                                                                                | Configurable analytics timeframes                                                                                                                                                   |
| Allow/block controls                                                                                                            | Allow/block controls, and the ability to charge AI crawlers using [pay per crawl](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/what-is-pay-per-crawl/) |

## Next steps

* [Manage AI crawlers](https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers/) with granular allow/block controls.
* [Analyze AI traffic](https://developers.cloudflare.com/ai-crawl-control/features/analyze-ai-traffic/) to understand crawler patterns and content popularity.
* [Explore pay per crawl](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/what-is-pay-per-crawl/) to test content monetization options (private beta).

## Related resources

Refer to the following related resources:

* Cloudflare blog: [Start auditing and controlling the AI models accessing your content ↗](https://blog.cloudflare.com/nl-nl/cloudflare-ai-audit-control-ai-content-crawlers/)
* Block AI crawlers that do not adhere to recommended guidelines using [Cloudflare AI Labyrinth](https://developers.cloudflare.com/bots/additional-configurations/ai-labyrinth/).
* [Direct AI crawlers with managed robots.txt](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-crawl-control/get-started/#page","headline":"Get started with Cloudflare AI Crawl Control · Cloudflare AI Crawl Control docs","description":"Learn how to set up AI Crawl Control.","url":"https://developers.cloudflare.com/ai-crawl-control/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-crawl-control/","name":"AI Crawl Control"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-crawl-control/get-started/","name":"Get started"}}]}
```
