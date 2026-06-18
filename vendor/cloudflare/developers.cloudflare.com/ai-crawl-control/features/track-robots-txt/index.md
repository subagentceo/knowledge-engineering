---
title: Directives
description: Monitor AI crawler interactions with your robots.txt files.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-crawl-control/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Directives

The **Directives** tab in AI Crawl Control provides insights into how AI crawlers interact with your `robots.txt` files across your hostnames. You can monitor request patterns, verify file availability, identify crawlers that violate your directives, and assess your site's readiness for AI agents.

To access directives insights:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **AI Crawl Control**.  
[ Go to **AI Crawl Control** ](https://dash.cloudflare.com/?to=/:account/:zone/ai)
3. Go to the **Directives** tab.

## Check managed robots.txt status

The status card at the top of the tab shows whether Cloudflare is managing your `robots.txt` file.

When enabled, Cloudflare will include directives to block common AI crawlers used for training and include its [Content Signals Policy](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/#content-signals-policy) in your `robots.txt`. For more details on how Cloudflare manages your `robots.txt` file, refer to [Managed robots.txt](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/).

## Filter robots.txt request data

You can apply filters at the top of the tab to narrow your analysis of robots.txt requests:

* Filter by specific crawler name (for example, Googlebot or specific AI bots).
* Filter by the entity running the crawler to understand direct licensing opportunities or existing agreements.
* Filter by general use cases (for example, AI training, general search, or AI assistant).
* Select a custom time frame for historical analysis.

The values in all tables and metrics will update according to your filters.

## Monitor robots.txt availability

The **Robots.txt availability** table shows the historical request frequency and health status of `robots.txt` files across your hostnames over the selected time frame.

| Column          | Description                                                                                                                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Path            | The specific hostname's robots.txt file being requested. Paths are listed from the most requested to the least.                                                                                                           |
| Requests        | The total number of requests made to this path. Requests are broken down into:\- **Successful:** HTTP status codes below 400 (including **200 OK** and redirects).\- **Unsuccessful:** HTTP status codes of 400 or above. |
| Status          | The HTTP status code from pinging the robots.txt file.                                                                                                                                                                    |
| Content Signals | An indicator showing whether the robots.txt file contains [Content Signals ↗](https://contentsignals.org/), directives for usage in AI training, search, or AI input.                                                     |

From this table, you can take the following actions:

* Monitor for a high number of unsuccessful requests, which suggests that crawlers are having trouble accessing your `robots.txt` file.  
   * If the **Status** is `404 Not Found`, create a `robots.txt` file to provide clear directives.  
   * If the file exists, check for upstream WAF rules or other security settings that may be blocking access.
* If the **Content Signals** column indicates that signals are missing, add them to your `robots.txt` file. You can do this by following the [Content Signals ↗](https://contentsignals.org/) instructions or by enabling [Managed robots.txt](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/) to have Cloudflare manage them for you.

## Track robots.txt violations

The **Robots.txt violations** table identifies AI crawlers that have requested paths explicitly disallowed by your `robots.txt` file. This helps you identify non-compliant crawlers and take appropriate action.

How violations are calculated

The Violations table identifies mismatches between your **current** `robots.txt` directives and past crawler requests. Because violations are not logged in real-time, recently added or changed rules may cause previously legitimate requests to be flagged as violations.

For example, if you add a new `Disallow` rule, all past requests to that path will appear as violations, even though they were not violations at the time of the request.

| Column     | Description                                                                                                                            |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Crawler    | The name of the bot that violated your robots.txt directives. The operator of the crawler is listed directly beneath the crawler name. |
| Path       | The specific URL or path the crawler attempted to access that was disallowed by your robots.txt file.                                  |
| Directive  | The exact line from your robots.txt file that disallowed access to the path.                                                           |
| Violations | The count of HTTP requests made to the disallowed path/directive pair within the selected time frame.                                  |

When you identify crawlers violating your `robots.txt` directives, you have several options:

* Navigate to the [**Crawlers** tab](https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers/) to permanently block the non-compliant crawler.
* Use [Cloudflare WAF](https://developers.cloudflare.com/waf/) to create a path-specific security rules for the violating crawler.
* Use [Redirect Rules](https://developers.cloudflare.com/rules/url-forwarding/) to guide violating crawlers to an appropriate area of your site.

## Check Agent Readiness

The **Agent Readiness** card helps you assess how well your site is configured for AI agents. Select **Check readiness score** to scan your site against emerging standards for AI agent interaction, including:

* **Robots.txt configuration**: Whether your site has a valid `robots.txt` file with appropriate directives
* **Markdown for Agents**: Whether your site supports content negotiation for AI-optimized content delivery
* **Content Signals Policy**: Whether your site signals content usage preferences to AI crawlers

The scan is powered by [isitagentready.com ↗](https://isitagentready.com). Results include recommendations for improving your site's compatibility with AI agents and crawlers.

## Related resources

* [Manage AI crawlers](https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers/)
* [Analyze AI traffic](https://developers.cloudflare.com/ai-crawl-control/features/analyze-ai-traffic/)
* [Cloudflare WAF](https://developers.cloudflare.com/waf/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-crawl-control/features/track-robots-txt/#page","headline":"Directives · Cloudflare AI Crawl Control docs","description":"Monitor AI crawler interactions with your robots.txt files.","url":"https://developers.cloudflare.com/ai-crawl-control/features/track-robots-txt/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-crawl-control/","name":"AI Crawl Control"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-crawl-control/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-crawl-control/features/track-robots-txt/","name":"Directives"}}]}
```
