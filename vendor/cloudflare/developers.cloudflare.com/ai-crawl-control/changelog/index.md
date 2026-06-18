---
title: Changelog
description: View recent changes and updates.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-crawl-control/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Changelog

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/ai-crawl-control.xml) 

## 2026-04-17

  
**Introducing Redirects for AI Training**   

Cloudflare's network now supports redirecting verified AI training crawlers to canonical URLs when they request deprecated or duplicate pages. When enabled via **AI Crawl Control** \> **Quick Actions**, AI training crawlers that request a page with a canonical tag pointing elsewhere receive a 301 redirect to the canonical version. Humans, search engine crawlers, and AI Search agents continue to see the original page normally.

This feature leverages your existing `<link rel="canonical">` tags. No additional configuration required beyond enabling the toggle. Available on Pro, Business, and Enterprise plans at no additional cost.

Refer to the [Redirects for AI Training documentation](https://developers.cloudflare.com/ai-crawl-control/reference/redirects-for-ai-training/) for details.

## 2026-04-17

  
**Tools to prepare your site for the agentic Internet**   

AI Crawl Control now includes new tools to help you prepare your site for the agentic Internet—a web where AI agents are first-class citizens that discover and interact with content differently than human visitors.

#### Content Format insights

The **Metrics** tab now includes a **Content Format** chart showing what content types AI systems request versus what your origin serves. Understanding these patterns helps you optimize content delivery for both human and agent consumption.

#### Directives tab (formerly Robots.txt)

The **Robots.txt** tab has been renamed to **Directives** and now includes a link to check your site's [Agent Readiness ↗](https://isitagentready.com) score.

Refer to our [blog post on preparing for the agentic Internet ↗](https://blog.cloudflare.com/agent-readiness/) for more on why these capabilities matter.

## 2026-03-24

  
**Advanced WAF customization for AI Crawl Control blocks**   

AI Crawl Control now supports extending the underlying WAF rule with custom modifications. Any changes you make directly in the WAF custom rules editor — such as adding path-based exceptions, extra user agents, or additional expression clauses — are preserved when you update crawler actions in AI Crawl Control.

If the WAF rule expression has been modified in a way AI Crawl Control cannot parse, a warning banner appears on the **Crawlers** page with a link to view the rule directly in WAF.

For more information, refer to [WAF rule management](https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers/#waf-rule-management).

## 2026-02-09

  
**Analytics enhancements**   

AI Crawl Control metrics have been enhanced with new views, improved filtering, and better data visualization.

![AI Crawl Control path patterns](https://developers.cloudflare.com/_astro/ai-crawl-control-path-patterns.0xT_lucE_1Png6i.webp) 

**Path pattern grouping**

* In the **Metrics** tab > **Most popular paths** table, use the new **Patterns** tab that groups requests by URI pattern (`/blog/*`, `/api/v1/*`, `/docs/*`) to identify which site areas crawlers target most. Refer to the screenshot above.

**Enhanced referral analytics**

* Destination patterns show which site areas receive AI-driven referral traffic.
* In the **Metrics** tab, a new **Referrals over time** chart shows trends by operator or source.

**Data transfer metrics**

* In the **Metrics** tab > **Allowed requests over time** chart, toggle **Bytes** to show bandwidth consumption.
* In the **Crawlers** tab, a new **Bytes Transferred** column shows bandwidth per crawler.

**Image exports**

* Export charts and tables as images for reports and presentations.

Learn more about [analyzing AI traffic](https://developers.cloudflare.com/ai-crawl-control/features/analyze-ai-traffic/).

## 2026-02-04

  
**New reference documentation**   

New reference documentation is now available for AI Crawl Control:

* **[GraphQL API reference](https://developers.cloudflare.com/ai-crawl-control/reference/graphql-api/)** — Query examples for crawler requests, top paths, referral traffic, and data transfer. Includes key filters for detection IDs, user agents, and referrer domains.
* **[Bot reference](https://developers.cloudflare.com/ai-crawl-control/reference/bots/)** — Detection IDs and user agents for major AI crawlers from OpenAI, Anthropic, Google, Meta, and others.
* **[Worker templates](https://developers.cloudflare.com/ai-crawl-control/reference/worker-templates/)** — Deploy the x402 Payment-Gated Proxy to monetize crawler access or charge bots while letting humans through free.

## 2026-01-13

  
**AI Crawl Control Read Only role now available**   

Account administrators can now assign the **AI Crawl Control Read Only** role to provide read-only access to AI Crawl Control at the domain level.

Users with this role can view the **Overview**, **Crawlers**, **Metrics**, **Robots.txt**, and **Settings** tabs but cannot modify crawler actions or settings.

This role is specific for AI Crawl Control. You still require correct permissions to access other areas / features of the dashboard.

To assign, go to **Manage Account** \> **Members** and add a policy with the **AI Crawl Control Read Only** role scoped to the desired domain.

## 2025-12-18

  
**New AI Crawl Control Overview tab**   

The **Overview** tab is now the default view in AI Crawl Control. The previous default view with controls for individual AI crawlers is available in the **Crawlers** tab.

#### What's new

* **Executive summary** — Monitor total requests, volume change, most common status code, most popular path, and high-volume activity
* **Operator grouping** — Track crawlers by their operating companies (OpenAI, Microsoft, Google, ByteDance, Anthropic, Meta)
* **Customizable filters** — Filter your snapshot by date range, crawler, operator, hostname, or path
![AI Crawl Control Overview tab showing executive summary, metrics, and crawler groups](https://developers.cloudflare.com/_astro/ai-crawl-control-overview-tab.Duwqq4bm_ZmNhCs.webp) 

#### Get started

1. Log in to the Cloudflare dashboard and select your account and domain.
2. Go to **AI Crawl Control**, where the **Overview** tab opens by default with your activity snapshot.
3. Use filters to customize your view by date range, crawler, operator, hostname, or path.
4. Navigate to the **Crawlers** tab to manage controls for individual crawlers.

Learn more about [analyzing AI traffic](https://developers.cloudflare.com/ai-crawl-control/features/analyze-ai-traffic/) and [managing AI crawlers](https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers/).

## 2025-12-10

  
**Pay Per Crawl (Private beta) - Discovery API, custom pricing, and advanced configuration**   

Pay Per Crawl is introducing enhancements for both AI crawler operators and site owners, focusing on programmatic discovery, flexible pricing models, and granular configuration control.

#### For AI crawler operators

#### Discovery API

A new authenticated API endpoint allows verified crawlers to programmatically discover domains participating in Pay Per Crawl. Crawlers can use this to build optimized crawl queues, cache domain lists, and identify new participating sites. This eliminates the need to discover payable content through trial requests.

The API endpoint is `GET https://crawlers-api.ai-audit.cfdata.org/charged_zones` and requires Web Bot Auth authentication. Refer to [Discover payable content](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-ai-owner/discover-payable-content/) for authentication steps, request parameters, and response schema.

#### Payment header signature requirement

Payment headers (`crawler-exact-price` or `crawler-max-price`) must now be included in the Web Bot Auth `signature-input` header components. This security enhancement prevents payment header tampering, ensures authenticated payment intent, validates crawler identity with payment commitment, and protects against replay attacks with modified pricing. Crawlers must add their payment header to the list of signed components when [constructing the signature-input header](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-ai-owner/crawl-pages/#22-sign-your-request-with-web-bot-auth).

#### New `crawler-error` header

Pay Per Crawl error responses now include a new `crawler-error` header with 11 specific [error codes](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-ai-owner/error-codes/) for programmatic handling. Error response bodies remain unchanged for compatibility. These codes enable robust error handling, automated retry logic, and accurate spending tracking.

#### For site owners

#### Configure free pages

Site owners can now offer free access to specific pages like homepages, navigation, or discovery pages while charging for other content. Create a [Configuration Rule](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/advanced-configuration/#disable-pay-per-crawl-by-uri-pattern) in **Rules** \> **Configuration Rules**, set your URI pattern using wildcard, exact, or prefix matching on the **URI Full** field, and enable the **Disable Pay Per Crawl** setting. When disabled for a URI pattern, crawler requests pass through without blocking or charging.

Some paths are always free to crawl. These paths are: `/robots.txt`, `/sitemap.xml`, `/security.txt`, `/.well-known/security.txt`, `/crawlers.json`.

#### Get started

**AI crawler operators**: [Discover payable content](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-ai-owner/discover-payable-content/) | [Crawl pages](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-ai-owner/crawl-pages/)

**Site owners**: [Advanced configuration](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/advanced-configuration/)

## 2025-11-10

  
**Crawler drilldowns with extended actions menu**   

AI Crawl Control now supports per-crawler drilldowns with an extended actions menu and status code analytics. Drill down into Metrics, Cloudflare Radar, and Security Analytics, or export crawler data for use in [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/), [Redirect Rules](https://developers.cloudflare.com/rules/url-forwarding/), and robots.txt files.

#### What's new

#### Status code distribution chart

The **Metrics** tab includes a status code distribution chart showing HTTP response codes (2xx, 3xx, 4xx, 5xx) over time. Filter by individual crawler, category, operator, or time range to analyze how specific crawlers interact with your site.

![AI Crawl Control status code distribution chart](https://developers.cloudflare.com/_astro/ai-crawl-control-status-codes.DESJcAiK_TSrPM.webp) 

#### Extended actions menu

Each crawler row includes a three-dot menu with per-crawler actions:

* **View Metrics** — Filter the AI Crawl Control Metrics page to the selected crawler.
* **View on Cloudflare Radar** — Access verified crawler details on Cloudflare Radar.
* **Copy User Agent** — Copy user agent strings for use in WAF custom rules, Redirect Rules, or robots.txt files.
* **View in Security Analytics** — Filter Security Analytics by detection IDs (Bot Management customers).
* **Copy Detection ID** — Copy detection IDs for use in WAF custom rules (Bot Management customers).
![AI Crawl Control crawler actions menu](https://developers.cloudflare.com/_astro/ai-crawl-control-crawler-info.Dwc39LqI_182so6.webp) 

#### Get started

1. Log in to the Cloudflare dashboard, and select your account and domain.
2. Go to **AI Crawl Control** \> **Metrics** to access the status code distribution chart.
3. Go to **AI Crawl Control** \> **Crawlers** and select the three-dot menu for any crawler to access per-crawler actions.
4. Select multiple crawlers to use bulk copy buttons for user agents or detection IDs.

Learn more about [AI Crawl Control](https://developers.cloudflare.com/ai-crawl-control/).

## 2025-10-21

  
**New Robots.txt tab for tracking crawler compliance**   

AI Crawl Control now includes a **Robots.txt** tab that provides insights into how AI crawlers interact with your `robots.txt` files.

#### What's new

The Robots.txt tab allows you to:

* Monitor the health status of `robots.txt` files across all your hostnames, including HTTP status codes, and identify hostnames that need a `robots.txt` file.
* Track the total number of requests to each `robots.txt` file, with breakdowns of successful versus unsuccessful requests.
* Check whether your `robots.txt` files contain [Content Signals ↗](https://contentsignals.org/) directives for AI training, search, and AI input.
* Identify crawlers that request paths explicitly disallowed by your `robots.txt` directives, including the crawler name, operator, violated path, specific directive, and violation count.
* Filter `robots.txt` request data by crawler, operator, category, and custom time ranges.

#### Take action

When you identify non-compliant crawlers, you can:

* Block the crawler in the [Crawlers tab](https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers/)
* Create custom [WAF rules](https://developers.cloudflare.com/waf/) for path-specific security
* Use [Redirect Rules](https://developers.cloudflare.com/rules/url-forwarding/) to guide crawlers to appropriate areas of your site

To get started, go to **AI Crawl Control** \> **Robots.txt** in the Cloudflare dashboard. Learn more in the [Track robots.txt documentation](https://developers.cloudflare.com/ai-crawl-control/features/track-robots-txt/).

## 2025-10-14

  
**Enhanced AI Crawl Control metrics with new drilldowns and filters**   

AI Crawl Control now provides enhanced metrics and CSV data exports to help you better understand AI crawler activity across your sites.

#### What's new

#### Track crawler requests over time

Visualize crawler activity patterns over time, and group data by different dimensions:

* **By Crawler** — Track activity from individual AI crawlers (GPTBot, ClaudeBot, Bytespider)
* **By Category** — Analyze crawler purpose or type
* **By Operator** — Discover which companies (OpenAI, Anthropic, ByteDance) are crawling your site
* **By Host** — Break down activity across multiple subdomains
* **By Status Code** — Monitor HTTP response codes to crawlers (200s, 300s, 400s, 500s)

![AI Crawl Control requests over time chart with grouping tabs](https://developers.cloudflare.com/_astro/ai-crawl-control-requests-over-time.BtRyz0OT_ZpotRm.webp "Interactive chart showing crawler requests over time with filterable dimensions")

Interactive chart showing crawler requests over time with filterable dimensions

#### Analyze referrer data (Paid plans)

Identify traffic sources with referrer analytics:

* View top referrers driving traffic to your site
* Understand discovery patterns and content popularity from AI operators

![AI Crawl Control top referrers breakdown](https://developers.cloudflare.com/_astro/ai-crawl-control-top-referrers.CEUAwpd8_YrhT4.webp "Bar chart showing top referrers and their respective traffic volumes")

Bar chart showing top referrers and their respective traffic volumes

#### Export data

Download your filtered view as a CSV:

* Includes all applied filters and groupings
* Useful for custom reporting and deeper analysis

#### Get started

1. Log in to the Cloudflare dashboard, and select your account and domain.
2. Go to **AI Crawl Control** \> **Metrics**.
3. Use the grouping tabs to explore different views of your data.
4. Apply filters to focus on specific crawlers, time ranges, or response codes.
5. Select **Download CSV** to export your filtered data for further analysis.

Learn more about [AI Crawl Control](https://developers.cloudflare.com/ai-crawl-control).

## 2025-08-27

  
**Enhanced crawler insights and custom 402 responses**   

We improved AI crawler management with detailed analytics and introduced custom HTTP 402 responses for blocked crawlers. AI Audit has been renamed to AI Crawl Control and is now generally available.

**Enhanced Crawlers tab:**

* View total allowed and blocked requests for each AI crawler
* Trend charts show crawler activity over your selected time range per crawler
![Updated AI Crawl Control table showing request counts and trend charts](https://developers.cloudflare.com/_astro/ai-crawl-control-table.BDr0Qd-5_ZKex0W.webp) 

**Custom block responses (paid plans):**You can now return HTTP 402 "Payment Required" responses when blocking AI crawlers, enabling direct communication with crawler operators about licensing terms.

For users on paid plans, when blocking AI crawlers you can configure:

* **Response code:** Choose between 403 Forbidden or 402 Payment Required
* **Response body:** Add a custom message with your licensing contact information
![AI Crawl Control block response configuration interface](https://developers.cloudflare.com/_astro/ai-crawl-control-block-response.L4duQj7-_Z2mHb4X.webp) 

Example 402 response:

```

HTTP 402 Payment Required

Date: Mon, 24 Aug 2025 12:56:49 GMT

Content-type: application/json

Server: cloudflare

Cf-Ray: 967e8da599d0c3fa-EWR

Cf-Team: 2902f6db750000c3fa1e2ef400000001


{

  "message": "Please contact the site owner for access."

}


```

## 2025-07-01

  
**Introducing Pay Per Crawl (private beta)**   

We are introducing a new feature of [AI Crawl Control](https://developers.cloudflare.com/ai-crawl-control/) — Pay Per Crawl. [Pay Per Crawl](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/what-is-pay-per-crawl/) enables site owners to require payment from AI crawlers every time the crawlers access their content, thereby fostering a fairer Internet by enabling site owners to control and monetize how their content gets used by AI.

![Pay per crawl](https://developers.cloudflare.com/_astro/pay-per-crawl.B5bv2nwT_1TH6vv.webp) 

**For Site Owners:**

* Set pricing and select which crawlers to charge for content access
* Manage payments via Stripe
* Monitor analytics on successful content deliveries

**For AI Crawler Owners:**

* Use HTTP headers to request and accept pricing
* Receive clear confirmations on charges for accessed content

Learn more in the [Pay Per Crawl documentation](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/what-is-pay-per-crawl/).

## 2025-07-01

  
**AI Crawl Control refresh**   

We redesigned the AI Crawl Control dashboard to provide more intuitive and granular control over AI crawlers.

* From the new **AI Crawlers** tab: block specific AI crawlers.
* From the new **Metrics** tab: view AI Crawl Control metrics.
![Block AI crawlers](https://developers.cloudflare.com/_astro/manage-ai-crawlers.6UgS8dSG_Z1HRWpI.webp) ![Analyze AI crawler activity](https://developers.cloudflare.com/_astro/analyze-metrics.C52pJZVg_1C7hti.webp) 

To get started, explore:

* [Manage AI crawlers](https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers/).
* [Analyze AI traffic](https://developers.cloudflare.com/ai-crawl-control/features/analyze-ai-traffic/).

## 2024-09-23

  
**AI Crawl Control**   

Every site on Cloudflare now has access to [**AI Audit**](https://developers.cloudflare.com/ai-crawl-control/), which summarizes the crawling behavior of popular and known AI services.

You can use this data to:

* Understand how and how often crawlers access your site (and which content is the most popular).
* Block specific AI bots accessing your site.
* Use Cloudflare to enforce your `robots.txt` policy via an automatic WAF rule.
![View AI bot activity with AI Audit](https://developers.cloudflare.com/_astro/ai-crawl-control-overview.Dr_yGKOC_ZRyCQG.webp) 

To get started, explore [AI audit](https://developers.cloudflare.com/ai-crawl-control/).

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/ai-crawl-control/changelog/#page","headline":"Changelog · Cloudflare AI Crawl Control docs","description":"View recent changes and updates.","url":"https://developers.cloudflare.com/ai-crawl-control/changelog/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-crawl-control/","name":"AI Crawl Control"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-crawl-control/changelog/","name":"Changelog"}}]}
```
