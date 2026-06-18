---
title: Instant Logs FAQ
description: Review frequently asked questions about Instant Logs.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Instant Logs FAQ

[❮ Back to FAQ](https://developers.cloudflare.com/logs/faq/)

### I am getting an HTTP 301 when attempting to connect to my WebSocket. What can I do?

Make sure you are using the `wss://` protocol when connecting to your WebSocket.

### I am getting an HTTP 429\. What can I do?

Connection requests are rate limited. Try your request again after waiting a few minutes.

### Why am I not receiving data?

First, double-check if you have a filter defined. If you do, it may be too strict (or incorrect) which ends up dropping all your data.

If you are confident in your filter, check the sample rate you used when creating the session. For example, a sample of 100 means you will receive one log for every 100 requests to your zone.

Finally, make sure the destination is proxied through Cloudflare (also known as orange clouded). We cannot log your request if it does not go through Cloudflare's global network.

### I am getting an error fetching my data. How can I solve this?

Make sure you have the correct permissions. To use Instant Logs you need Super Administrator, Administrator, Log Share, or Log Share Reader permissions.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/faq/instant-logs/#page","headline":"Instant Logs FAQ · Cloudflare Logs docs","description":"Review frequently asked questions about Instant Logs.","url":"https://developers.cloudflare.com/logs/faq/instant-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/faq/","name":"FAQ"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/faq/instant-logs/","name":"Instant Logs FAQ"}}]}
```
