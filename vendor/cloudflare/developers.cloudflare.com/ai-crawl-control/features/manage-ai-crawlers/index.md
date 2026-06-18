---
title: Manage AI crawlers
description: Allow, block, or configure actions for AI crawlers.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-crawl-control/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manage AI crawlers

AI Crawl Control enables you to take specific action for each AI crawler.

To manage AI crawlers:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **AI Crawl Control**.  
[ Go to **AI Crawl Control** ](https://dash.cloudflare.com/?to=/:account/:zone/ai)
3. Go to the **Crawlers** tab.

## Review AI crawler activity

The **Crawlers** tab displays a table of AI crawlers that are requesting access to your content, and how they interact with your pages. The table provides the following information.

| Column                | Details                                                                                                                                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Crawler               | The name of the AI crawler and the operator that owns it.                                                                                                                                                    |
| Category              | The category of the AI crawler. Refer to [Verified bot categories](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/#categories).                                                           |
| Requests              | The total number of allowed and unsuccessful requests, with trend chart. Unsuccessful requests may come from any rule or response error, not just the block action in AI Crawl Control.                      |
| Robots.txt violations | The number of times the AI crawler has violated your robots.txt file.                                                                                                                                        |
| Action                | The action you wish to take for the AI crawler. Refer to [Take action for each AI crawler](https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers/#take-action-for-each-ai-crawler). |

Quality of AI crawler detection

On the free plan, AI Crawl Control identifies AI crawlers based on their [user agent strings ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/User-Agent). This enables AI Crawl Control to detect well-known, self-identifying AI crawlers.

Upgrade your plan to enable a more thorough detection using Cloudflare's [Bot Management detection ID](https://developers.cloudflare.com/bots/reference/bot-management-variables/#ruleset-engine-fields) field.

### Filter AI crawler data

You can use filters to narrow the scope of your result:

* **Name:** Search the name of the AI crawler.
* **Operator:** Filter by the AI crawler operator.
* **Category:** Filter by the category of the AI crawler (for example, AI crawler, AI assistant, or archiver).

The values of the table will update according to your filter.

## Take action for each AI crawler

* [ Without pay per crawl ](#tab-panel-6519)
* [ With pay per crawl ](#tab-panel-6520)

For each AI crawler, you can choose to allow or block access.

Allow access 

* **Summary:** You can allow an AI crawler to scrape your content.
* **When to use:** Allow AI crawlers that offer services which provide value through citations, referrals, or existing agreements.
* **Implementation:** From the **Actions** column, select **Allow**.

Note that you can still choose to [Enforce robots.txt](https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers/#take-action-for-each-ai-crawler).

Block access 

* **Summary:** You can block an AI crawler to completely stop the AI crawler from scraping your webpage.
* **When to use:** Block AI crawlers when their behavior do not align with your content strategy, or violate your policies.
* **Implementation:** From the **Actions** column, select **Block**.

Note that you can configure the response that gets returned when blocking an AI crawler. Refer to [Configure block response](https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers/#configure-block-response).

Pay per crawl closed beta

Pay per crawl is currently in closed beta.

To find out how to join the beta program, reach out to us at [Pay per crawl signup ↗](http://www.cloudflare.com/paypercrawl-signup/), or contact your account executive if you are an existing Enterprise customer.

To learn more about pay per crawl, refer to Cloudflare blog: [Introducing pay per crawl: enabling content owners to charge AI crawlers for access ↗](https://blog.cloudflare.com/introducing-pay-per-crawl/).

For each AI crawler, you can take one of three actions: allow, charge, or block.

Allow access 

* **Summary:** You can allow an AI crawler to scrape your content.
* **When to use:** Allow AI crawlers that offer services which provide value through citations, referrals, or existing agreements.
* **Implementation:** From the **Actions** column, select **Allow**. Note that you can still choose to [Enforce robots.txt](https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers/#take-action-for-each-ai-crawler).

For more details on how this rule interacts with other Cloudflare settings, refer to [How it works](https://developers.cloudflare.com/bots/concepts/bot/#how-it-works).

Block access 

* **Summary:** You can block an AI crawler to completely stop the AI crawler from scraping your webpage.
* **When to use:** Block AI crawlers when their behavior do not align with your content strategy, or violate your policies.
* **Implementation:** From the **Actions** column, select **Block**.

Note that you can configure the response that gets returned when blocking an AI crawler. Refer to [Configure block response](https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers/#configure-block-response).

Charge for crawl (private beta) 

* **Summary:** You can charge the owner of the AI crawler for each successful crawl request.
* **When to use:** Charge AI crawlers when your content has training value, and you want to explore monetization options.
* **Implementation:** From the **Actions** column, select **Charge**.

For more information, refer to [What is Pay Per Crawl?](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/what-is-pay-per-crawl/).

Need more advanced control?

You can also create more complex rules when taking action on AI crawlers, using [Cloudflare WAF](https://developers.cloudflare.com/waf/). For more information on creating more specific rules, refer to [Create a custom rule in the dashboard](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/).

## WAF rule management

When you block a crawler in AI Crawl Control, the system creates or updates a WAF custom rule on your zone to enforce that block. For advanced scenarios such as adding path-based exceptions or extra user agents, you can extend this rule directly in WAF.

For more information, refer to [AI Crawl Control with Cloudflare WAF](https://developers.cloudflare.com/ai-crawl-control/configuration/ai-crawl-control-with-waf/).

## Configure block response

 Available on Paid plans 

When blocking an AI crawler, you can configure the details of the response that gets returned to the AI crawler. Specifically, you can configure:

* The response code
* The response body

This provides you with a channel to open dialogue with the AI crawler owner, and to inform the AI crawler how to properly license their content, thereby creating a direct path from crawling attempt to commercial agreement.

To edit these values:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **AI Crawl Control**.  
[ Go to **AI Crawl Control** ](https://dash.cloudflare.com/?to=/:account/:zone/ai)
3. Go to the **Settings** tab.
4. Under **Block response**, select **Edit**.
5. Once you have edited the values, select **Save**.

Note

You must have opted to block at least one AI crawler to configure a custom block response.

### Edit the response code

You can choose which HTTP response code to return when blocking an AI crawler.

Use the dropdown menu to select the desired response code. You can choose from:

* `403 Forbidden`: Use this option if you wish to indicate that you do not want the AI crawler to access your content.
* `402 Payment Required`: Use this option if you wish to indicate that the AI crawler must pay to access your content.

Note

AI Crawl Control uses [Cloudflare WAF](https://developers.cloudflare.com/waf/) to return custom block responses. If you have manually configured the AI Crawl Control WAF rule to return a response code other than `403` or `402`, AI Crawl Control will not be able to enforce the response code you have selected, and the dropdown will appear blank. Ensure you have selected either `403` or `402`.

Refer to [Configure a custom response for blocked requests](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/#configure-a-custom-response-for-blocked-requests) and [AI Crawl Control with Cloudflare WAF](https://developers.cloudflare.com/ai-crawl-control/configuration/ai-crawl-control-with-waf/) for more information.

### Edit the response body

You can write a custom message (HTTP response body) to return when blocking an AI crawler.

In the **Response body** text field, enter the response you wish to display for the AI crawler in plain text.

## Related resources

* Use [pay per crawl](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/what-is-pay-per-crawl/) to charge AI crawlers every time they access your content.
* Learn how AI Crawl Control interacts with WAF, including advanced rule customization, in [AI Crawl Control with Cloudflare WAF](https://developers.cloudflare.com/ai-crawl-control/configuration/ai-crawl-control-with-waf/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers/#page","headline":"Manage AI crawlers · Cloudflare AI Crawl Control docs","description":"Allow, block, or configure actions for AI crawlers.","url":"https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-crawl-control/","name":"AI Crawl Control"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-crawl-control/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-crawl-control/features/manage-ai-crawlers/","name":"Manage AI crawlers"}}]}
```
