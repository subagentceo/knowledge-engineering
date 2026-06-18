---
title: Augment default analytics
description: Learn about augment default analytics in this guide.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Augment default analytics

Cloudflare provides analytics for [security events](https://developers.cloudflare.com/waf/analytics/security-events/), [traffic patterns](https://developers.cloudflare.com/analytics/account-and-zone-analytics/zone-analytics/), and more according to the level of your zone's plan.

To augment these default analytics and gather more information about potential DDoS attacks, explore the following options.

## Restore visitor IP addresses

When traffic [proxied through Cloudflare](https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/baseline/proxy-dns-records/) reaches your origin server, it will come from Cloudflare's IP addresses.

If needed, you can [restore the original visitor's IP address](https://developers.cloudflare.com/support/troubleshooting/restoring-visitor-ips/restoring-original-visitor-ips/) so you can have that information in your server logs.

## Cloudflare Logs

Enterprise customers can set up [Logpush](https://developers.cloudflare.com/logs/logpush/) jobs to regularly send Cloudflare logs to the SIEM system of their choice.

This data can help when looking at long-term DDoS attack trends or when you need custom visualizations.

## Bot Management

For more detailed analytics about potential bot attacks, Enterprise customers can also purchase [Bot Management](https://developers.cloudflare.com/bots/get-started/bot-management/).

For a full tour of Bot Analytics, see [our blog post ↗](https://blog.cloudflare.com/introducing-bot-analytics/). At a high level, the tool includes:

* **Requests by bot score**: View your total domain traffic and segment it vertically by traffic type. Keep an eye on _automated_ and _likely automated_ traffic.
* **Bot score distribution**: View the number of requests assigned a bot score 1 through 99.
* **Bot score source**: Identify the most common detection engines used to score your traffic. Hover over a tooltip to learn more about each engine.
* **Top requests by attribute**: View more detailed information on specific IP addresses and other characteristics.

Bot Analytics shows up to one week of data at a time and can display data up to 30 days old. Bot Analytics displays data in real time in most cases.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/advanced/improve-analytics/#page","headline":"Augment default analytics · Cloudflare Learning Paths","description":"Learn about augment default analytics in this guide.","url":"https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/advanced/improve-analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/prevent-ddos-attacks/advanced/","name":"Advanced DDoS protection"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/prevent-ddos-attacks/advanced/improve-analytics/","name":"Augment default analytics"}}]}
```
