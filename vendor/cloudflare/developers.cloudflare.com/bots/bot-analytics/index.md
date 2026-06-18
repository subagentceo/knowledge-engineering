---
title: Bot Analytics
description: Use Bot Analytics to examine bot traffic patterns on your domain.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Bot Analytics

## Business and Enterprise

Business and Enterprise customers without Bot Management can use **Bot Analytics** to dynamically examine bot traffic. These dashboards offer less functionality than Bot Management for Enterprise but still help you understand bot traffic on your domain.

### Access

You can access Bot Analytics by going to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/login), and selecting your account and domain.

Old dashboard: **Security** \> **Bots**.

New dashboard: **Security** \> **Analytics** \> **Bot analysis**.

![View Bot Analytics in the Cloudflare dashboard. For more details, keep reading.](https://developers.cloudflare.com/_astro/bot-analytics-dashboard-biz.RDfO3DgS_Z1sosFo.webp) 

### Features

For a full tour of Bot Analytics, see [our blog post ↗](https://blog.cloudflare.com/introducing-bot-analytics/). At a high level, the tool includes:

* **Requests by traffic type**: View your total domain traffic segmented vertically by traffic type. Keep an eye on _automated_ and _likely automated_ traffic.
* **Requests by detection source**: Identify the most common detection engines used to score your traffic. Hover over a tooltip to learn more about each engine.
* **Top requests by attribute**: View more detailed information on specific IP addresses and other characteristics.

Bot Analytics shows up to 72 hours of data at a time and can display data up to 30 days old. Bot Analytics displays data in real time in most cases.

Cloudflare uses adaptive bitrate technology to show sampled data — most customers will see a 1-10% sample depending on how much information they are trying to view. Tooltips on the page will display the current sample rate.

### Common uses

Business and Enterprise customers without Bot Management can use Bot Analytics to:

* Understand bot traffic
* Study recent attacks to find trends and detailed information
* Learn more about Cloudflare’s detection engines with real data

For more details and granular control over bot traffic, consider upgrading to [Bot Management for Enterprise](https://developers.cloudflare.com/bots/bot-analytics/#enterprise-bot-management).

## Enterprise Bot Management

Enterprise customers with Bot Management can use **Bot Analytics** to dynamically examine bot traffic.

### Access

You can access Bot Analytics by going to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/login), and selecting your account and domain.

Old dashboard: **Security** \> **Bots**.

New dashboard: **Security** \> **Analytics** \> **Bot analysis**.

![View Bot Analytics in the Cloudflare dashboard. For more details, keep reading.](https://developers.cloudflare.com/_astro/bot-analytics-dashboard-ent.DA4XLihG_Zb6GXB.webp) 

### Features

For a full tour of Bot Analytics, see [our blog post ↗](https://blog.cloudflare.com/introducing-bot-analytics/). At a high level, the tool includes:

* **Requests by bot score**: View your total domain traffic and segment it vertically by traffic type. Keep an eye on _automated_ and _likely automated_ traffic.
* **Bot score distribution**: View the number of requests assigned a bot score 1 through 99.
* **Bot score source**: Identify the most common detection engines used to score your traffic. Hover over a tooltip to learn more about each engine.
* **Top requests by attribute**: View more detailed information on specific IP addresses and other characteristics.

Bot Analytics shows up to one week of data at a time and can display data up to 30 days old. Bot Analytics displays data in real time in most cases.

Cloudflare uses adaptive bitrate technology to show sampled data — most customers will see a 1-10% sample depending on how much information they are trying to view. Tooltips on the page will display the current sample rate.

### Common uses

Bot Management customers can use Bot Analytics to:

* Understand traffic during [your onboarding phase](https://developers.cloudflare.com/bots/get-started/bot-management/).
* Tune WAF custom rules to be effective but not overly aggressive.
* Study recent attacks to find trends and detailed information.
* Learn more about Cloudflare’s detection engines with real data.

### API

Data from Bot Analytics is also available via the GraphQL API. You can access bot scores, bot sources, [bot tags](https://developers.cloudflare.com/bots/concepts/bot-tags/), and bot _decisions_ (_automated_, _likely automated_, etc.), and more.

Read the [GraphQL Analytics API documentation](https://developers.cloudflare.com/analytics/graphql-api/) for more information about GraphQL and basic querying.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/bots/bot-analytics/#page","headline":"Cloudflare Bot Analytics · Cloudflare bot solutions docs","description":"Use Bot Analytics to examine bot traffic patterns on your domain.","url":"https://developers.cloudflare.com/bots/bot-analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/bot-analytics/","name":"Bot Analytics"}}]}
```
